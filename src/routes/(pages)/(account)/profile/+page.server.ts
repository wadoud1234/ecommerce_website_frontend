import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		throw redirect(302, "/auth/login");
	}
	const userLinks = await prisma.userLinks.findMany({
		where: {
			userId: user.id,
		},
	});
	const userProducts = await prisma.product.findMany({
		where: { userId: user.id },
		include: { images: true },
	});
	const products = userProducts.map((product) => ({
		...product,
		picture: product.images[0].link,
	}));
	return {
		user,
		products,
		links: userLinks,
	};
};
