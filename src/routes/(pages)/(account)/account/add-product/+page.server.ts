import { getUserFromLocals } from "$lib/server/auth";
import db from "$lib/server/db";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
	const user = getUserFromLocals(locals);
	if (!user?.id) return redirect(302, "/auth/login");
	const categories = await db.query.categoryModel.findMany({
		columns: { name: true, slug: true },
	});
	return {
		categories,
	};
};
