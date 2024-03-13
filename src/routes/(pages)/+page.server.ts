import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {
	const products = await prisma.product.findMany({
		include: { images: true },
	});
	const showProducts = products.map((product) => ({
		...product,
		picture: product.images[0].link,
	}));
	return {
		user: locals.user,
		products: showProducts,
	};
};
