import prisma from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ parent }) => {
	const { user, product: productFromParent, images } = await parent();

	if (!productFromParent) return redirect(304, "/");
	const seller = await prisma.user.findUnique({
		where: { id: productFromParent.userId },
		select: {
			id: true,
			name: true,
			avatar: true,
			email: true,
			isAdmin: true,
			description: true,
			emailVerified: true,
		},
	});
	if (!seller || !seller.name) error(404, "Something wrong happened");
	const productCategory = await prisma.category.findFirst({
		where: { id: productFromParent.categoryId },
		select: { name: true },
	});

	if (!productCategory || !productCategory.name) error(404, "Bad Category");
	const relatedProductsPromise = prisma.product.findMany({
		where: {
			userId: productFromParent.userId,
			id: { not: productFromParent.id },
		},
	});

	const productsPromise = prisma.product.findMany({
		where: { id: { not: productFromParent.id } },
	});

	// const { images, ...product } = productFromParent;
	return {
		user,
		product: productFromParent,
		images,
		productsPromise,
		relatedProductsPromise,
		seller,
		productCategory: productCategory.name,
	};
};
