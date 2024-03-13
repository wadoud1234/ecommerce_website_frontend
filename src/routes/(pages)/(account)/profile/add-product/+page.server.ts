import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import AddProductSchema from "./AddProductSchema";
import { setMessage, superValidate } from "sveltekit-superforms";
import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import slugify from "slugify";
export const load: PageServerLoad = async () => {
	console.log("LOAD");

	return {
		form: await superValidate(zod(AddProductSchema)),
	};
};

export const actions = {
	default: async (event) => {
		console.log("ACTION");

		if (!event.locals.user || !event.locals.user.id) {
			return redirect(300, "/auth/login");
		}
		const form = await superValidate(event, zod(AddProductSchema));

		if (!form.valid) {
			console.log({ errors: form.errors });
			return setMessage(form, "Bad Inputs", { status: 400 });
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
		const savedImages = images[0].split(",").map((image) => ({
			link: image,
			productId: product.id,
		}));

		const productImages = await prisma.productImage.createMany({
			data: savedImages,
		});

		return redirect(302, `/products/${product.slug}`);
	},
} satisfies Actions;
