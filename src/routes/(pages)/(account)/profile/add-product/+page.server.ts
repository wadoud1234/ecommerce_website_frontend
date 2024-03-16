import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import AddProductSchema from "./AddProductSchema";
import { setMessage, superValidate } from "sveltekit-superforms";
import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import { generateProductSearchText, generateSlug } from "$lib/helpers/strings";
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(AddProductSchema)),
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
			return setMessage(form, "Bad Inputs", { status: 400 });
		}
		const { name, description, price, quantity, images } = form.data;
		console.log({ formData: form.data });

		const userId = event.locals.user.id;
		let category = await prisma.category.findUnique({
			where: { slug: generateSlug(form.data.category) },
		});
		console.log({ category });

		if (!category || !category.name) {
			category = await prisma.category.create({
				data: {
					name: form.data.category,
					slug: generateSlug(form.data.category),
				},
			});
		}
		const product = await prisma.product.create({
			data: {
				categoryId: category.id,
				name,
				slug: generateSlug(name),
				searchText: generateProductSearchText(name, description || ""),
				description,
				price,
				quantity,
				userId,
			},
		});
		console.log({ product });

		const savedImages = images[0].split(",").map((image) => ({
			link: image,
			productId: product.id,
		}));
		console.log({ savedImages });

		const something = await prisma.productImage.createMany({
			data: savedImages,
		});
		console.log({ something });

		return redirect(302, `/products/${product.slug}`);
	},
} satisfies Actions;
