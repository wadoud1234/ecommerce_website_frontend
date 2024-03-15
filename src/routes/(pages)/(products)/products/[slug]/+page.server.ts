import prisma from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { User } from "@prisma/client";
export const load: PageServerLoad = async ({ parent }) => {
	const { user, product: productFromParent } = await parent();

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
	const relatedProducts = await prisma.product.findMany({
		where: {
			userId: productFromParent.userId,
			id: { not: productFromParent.id },
		},
		include: { images: true },
	});

	const AllProducts = await prisma.product.findMany({
		where: { id: { not: productFromParent.id } },
		include: { images: true },
	});

	const showProducts = [
		...AllProducts.map((product) => ({
			...product,
			picture: product?.images?.[0]?.link,
		})),
	];

	const { images, ...product } = productFromParent;
	return {
		user,
		product: { ...product, picture: images[0].link },
		images: images.map((image) => image.link),
		products: showProducts,
		relatedProducts: relatedProducts.map((product) => ({
			...product,
			picture: product?.images?.[0]?.link,
		})),
		seller,
		productCategory: productCategory.name,
	};
};
