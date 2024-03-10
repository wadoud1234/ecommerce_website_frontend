import type { User } from "lucia";
import type { LayoutServerLoad } from "./$types";
import prisma from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ parent, params }) => {
	const { user } = (await parent()) as { user: User | null };
	const productSlug = params.slug;
	const product = await prisma.product.findUnique({
		where: { slug: productSlug },
		include: { images: true },
	});

	const imagesLinks = product?.images.map((image) => image.link) || [];

	// console.log({ productId, product });
	return { user, product, images: imagesLinks };
};
