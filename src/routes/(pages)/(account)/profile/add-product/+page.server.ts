import { zod } from "sveltekit-superforms/adapters";
import type { Actions, PageServerLoad } from "./$types";
import AddProductSchema from "./AddProductSchema";
import { setMessage, superValidate } from "sveltekit-superforms";
import { fail, redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import { generateProductSearchText, generateSlug } from "$lib/helpers/strings";
import { getUserFromLocalsOrRedirect } from "$lib/server/auth";
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(AddProductSchema)),
	};
};

export const actions = {
	default: async (event) => {
		const user = getUserFromLocalsOrRedirect(event.locals);
		const form = await superValidate(event, zod(AddProductSchema));

		if (!form.valid) {
			return setMessage(form, "Bad Inputs", { status: 400 });
		}
		const { name, description, price, quantity, images } = form.data;

		const userId = user.id;
		let category = await prisma.category.findUnique({
			where: { slug: generateSlug(form.data.category) },
		});

		if (!category || !category.name) {
			category = await prisma.category.create({
				data: {
					name: form.data.category,
					slug: generateSlug(form.data.category),
				},
			});
		}
		const uploadedImages = images[0].split(",");

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
				mainImage: uploadedImages[0],
			},
		});

		const savedImages = uploadedImages.slice(1, 4).map((image) => ({
			link: image,
			productId: product.id,
		}));

		const something = await prisma.productImage.createMany({
			data: savedImages,
		});

		return redirect(302, `/products/${product.slug}`);
	},
} satisfies Actions;
