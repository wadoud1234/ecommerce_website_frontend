import { getUserFromLocals } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const user = getUserFromLocals(locals);
	if (user) return redirect(302, "/account/profile");
	return redirect(302, "/auth/login");
};
