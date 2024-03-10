import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import AddProductSchema from "./AddProductSchema";
import { setMessage, superValidate } from "sveltekit-superforms";
import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import slugify from "slugify";
export const load = async (event) => {
	const result = await superValidate(zod(AddProductSchema));
	return {
		form: result,
	};
};

export const actions = {
	default: async (event) => {
		if (!event.locals.user || !event.locals.user.id) {
			return redirect(300, "/auth/login");
		}
		const form = await superValidate(event, zod(AddProductSchema));
		console.log({ form });

		if (!form.valid) {
			console.log(form.errors);

			return setMessage(form, "Invalid credentials", { status: 400 });
		}
		const { name, description, price, quantity, images } = form.data;
		const userId = event.locals.user.id;
		const product = await prisma.product.create({
			data: {
				name,
				slug: slugify(name, { lower: true }),
				description,
				price,
				quantity,
				userId,
			},
		});
		console.log({ product });

		const productImages = await prisma.productImage.createMany({
			data: images.map((image) => ({
				link: image,
				productId: product.id,
			})),
		});
		console.log({ productImages });

		return redirect(302, `/products/${product.slug}`);
	},
} satisfies Actions;
