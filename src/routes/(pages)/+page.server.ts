import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";
export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	const productsPromise = db.query.product.findMany({
		columns: {
			name: true,
			price: true,
			mainImage: true,
			rating: true,
			sold: true,
			slug: true,
		},
	});

	return {
		productsPromise,
		categoryProductsPromise: [],
		user,
	};
};
