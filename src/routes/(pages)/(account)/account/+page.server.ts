import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();
	if (!user || !user.name) return redirect(301, "/auth/login");
	return redirect(302, "/account/profile");
};
