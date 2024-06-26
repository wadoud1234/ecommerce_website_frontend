import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { getUserFromLocals } from "$lib/server/auth";
import db from "$lib/server/db";
import { eq } from "drizzle-orm";
import { userModel } from "$lib/server/db/schema";

export const load: LayoutServerLoad = async ({ locals, params }) => {
	const actualUser = getUserFromLocals(locals);
	const visitedUser = await db.query.userModel.findFirst({
		where: eq(userModel.name, params.name),
	});

	if (!visitedUser || !visitedUser?.name) {
		error(404, "NO USER FOUND");
	}

	if (visitedUser.id === actualUser?.id) {
		return redirect(302, "/account/profile");
	}
	const userLinksPromise = db.query.userLinksModel.findMany({
		where: eq(userModel.id, visitedUser.id),
		columns: { provider: true, link: true },
	});

	const productsPromise = db.query.productModel.findMany({
		where: eq(userModel.id, visitedUser.id),
	});

	return {
		userLinksPromise,
		productsPromise,
		actualUser,
		visitedUser,
	};
};
