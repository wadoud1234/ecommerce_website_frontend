import prisma from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
export const load: PageServerLoad = async ({ parent }) => {
	const { user, product: productFromParent } = await parent();
	console.log({ productFromParent });

	if (!productFromParent) return redirect(304, "/");
	const relatedProducts = await prisma.product.findMany({
		where: {
			userId: productFromParent.userId,
			id: { not: productFromParent.id },
		},
		include: { images: true },
	});
	console.log({ relatedProducts });

	const AllProducts = await prisma.product.findMany({
		where: { id: { not: productFromParent.id } },
		include: { images: true },
	});
	console.log({ AllProducts });

	const showProducts = [
		...AllProducts.map((product) => ({
			...product,
			picture: product?.images?.[0]?.link,
		})),
	];
	console.log({ showProducts });

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
	};
};
