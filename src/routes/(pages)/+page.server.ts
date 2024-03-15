import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals, url }) => {
	const products = await prisma.product.findMany({
		include: { images: true },
	});
	const showProducts = products.map((product) => ({
		...product,
		picture: product.images[0].link,
	}));
	const category = url.searchParams.get("category");
	console.log({ category });

	if (!category) {
		return {
			user: locals.user,
			products: showProducts,
			categoryProducts: null,
		};
	}
	const categoryInfo = await prisma.category.findFirst({
		where: { slug: category },
		select: { id: true },
	});
	const categoryProducts = await prisma.product.findMany({
		where: { categoryId: categoryInfo?.id },
		include: { images: true },
	});
	console.log({ categoryProducts });

	return {
		user: locals.user,
		products: showProducts,
		categoryProducts: categoryProducts.map((product) => ({
			...product,
			picture: product.images[0].link,
		})),
	};
};
