import { getUserFromLocals } from "$lib/server/auth.js";

export const load = async ({ locals }) => {
	const user = getUserFromLocals(locals);
	return {
		user,
	};
};
