import type { PageServerLoad } from "./$types";
import { getUserFromLocalsOrRedirect } from "$lib/server/auth";
import db from "$lib/server/db";
import { eq } from "drizzle-orm";
import { productModel, userLinksModel } from "$lib/server/db/schema";
export const load: PageServerLoad = async ({ locals }) => {
	const user = getUserFromLocalsOrRedirect(locals);

	const userLinksPromise = db.query.userLinksModel.findMany({
		where: eq(userLinksModel.userId, user.id),
	});
	const productsPromise = db.query.productModel.findMany({
		where: eq(productModel.userId, user.id),
	});
	return {
		productsPromise,
		userLinksPromise,
		user,
	};
};
