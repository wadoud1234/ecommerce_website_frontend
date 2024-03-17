import { redirect, error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
	const { visitedUser, productsPromise, userLinksPromise, actualUser } =
		await parent();
	if (!visitedUser) {
		error(404, "NO USER FOUND");
	}

	return {
		visitedUser,
		user: actualUser,
		productsPromise,
		userLinksPromise,
	};
};
