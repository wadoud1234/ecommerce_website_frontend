import type { LayoutServerLoad } from "./$types";
import { getUserFromLocalsOrRedirect } from "$lib/server/auth";

export const load: LayoutServerLoad = async ({ locals }) => {
	const user = getUserFromLocalsOrRedirect(locals);
	return {
		user,
	};
};
