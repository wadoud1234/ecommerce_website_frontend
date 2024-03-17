import type { LayoutServerLoad } from "./$types";
import prisma from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import { getUserFromLocals } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const user = getUserFromLocals(locals);
	const productSlug = params.slug;

	const product = await prisma.product.findUnique({
		where: { slug: productSlug },
	});

	if (!product || !product?.slug) {
		return redirect(300, "/google");
	}
	const secondaryImages = await prisma.productImage.findMany({
		where: { productId: product.id },
		select: { link: true },
	});

	const images = [
		product?.mainImage,
		...secondaryImages.map((image) => image.link),
	];

	return { user, product, images };
};
