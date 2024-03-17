import { getUserFromLocals } from "$lib/server/auth.js";

export const load = async ({ locals }) => {
	return {
		user: getUserFromLocals(locals),
	};
};
