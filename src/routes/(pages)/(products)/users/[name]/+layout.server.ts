import prisma from "$lib/server/prisma";
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getUserFromLocals } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const actualUser = getUserFromLocals(locals);
	const visitedUser = await prisma.user.findUnique({
		where: { name: params.name },
	});

	if (!visitedUser || !visitedUser?.name) {
		error(404, "NO USER FOUND");
	}

	if (visitedUser.id === actualUser?.id) {
		return redirect(302, "/profile");
	}

	const userLinksPromise = prisma.userLink.findMany({
		where: { userId: visitedUser.id },
		select: { provider: true, link: true },
	});
	const productsPromise = prisma.product.findMany({
		where: { userId: visitedUser.id },
	});
	return {
		actualUser,
		visitedUser,
		userLinksPromise,
		productsPromise,
	};
};
