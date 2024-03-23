import db from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const categories = await db.query.category.findMany({
		columns: { name: true, slug: true },
	});
	return {
		categories,
	};
};
