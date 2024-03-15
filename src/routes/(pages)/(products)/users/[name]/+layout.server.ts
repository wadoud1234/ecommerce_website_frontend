import prisma from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params, parent }) => {
	const { user: actualUser } = await parent();
	const visitedUser = await prisma.user.findUnique({
		where: { name: params.name },
	});

	if (!visitedUser || !visitedUser?.name) {
		error(404, "NO USER FOUND");
	}

	if (visitedUser.id === actualUser?.id) {
		return redirect(302, "/profile");
	}

	const userLinks = await prisma.userLinks.findMany({
		where: {
			userId: visitedUser.id,
		},
	});
	const userProducts = await prisma.product.findMany({
		where: { userId: visitedUser.id },
		include: { images: true },
	});
	const products = userProducts.map((product) => ({
		...product,
		picture: product.images[0].link,
	}));
	return { actualUser, visitedUser, userLinks, products };
};
