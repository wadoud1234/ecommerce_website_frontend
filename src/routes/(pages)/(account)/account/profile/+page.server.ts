import type { PageServerLoad } from "./$types";
import { getUserFromLocalsOrRedirect } from "$lib/server/auth";
import db from "$lib/server/db";
import { eq } from "drizzle-orm";
import { product, userLinks } from "$lib/server/db/schema";
export const load: PageServerLoad = async ({ locals }) => {
	const user = getUserFromLocalsOrRedirect(locals);

	const userLinksPromise = db.query.userLinks.findMany({
		where: eq(userLinks.userId, user.id),
	});
	const productsPromise = db.query.product.findMany({
		where: eq(product.userId, user.id),
	});
	return {
		productsPromise,
		userLinksPromise,
		user,
	};
};
