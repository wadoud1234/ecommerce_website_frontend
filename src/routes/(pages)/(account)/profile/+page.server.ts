import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { products } from "$lib/data";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { user } = await parent();

	if (!user) {
		throw redirect(302, "/auth/login");
	}
	const userLinks = await prisma.userLinks.findMany({
		where: {
			userId: user.id,
		},
	});
	return {
		user,
		products,
		links: userLinks,
	};
};
