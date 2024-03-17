import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";
import { getUserFromLocalsOrRedirect } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
	const user = getUserFromLocalsOrRedirect(locals);

	const userLinksPromise = prisma.userLink.findMany({
		where: { userId: user.id },
	});
	const productsPromise = prisma.product.findMany({
		where: { userId: user.id },
	});
	return {
		user,
		productsPromise,
		userLinksPromise,
	};
};
