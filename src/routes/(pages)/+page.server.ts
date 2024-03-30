import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";
import { generateSlug } from "$lib/helpers/strings";
import { categoryModel } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { ProductToShow } from "$lib/types";
import { BadgePlus } from "lucide-svelte";
export const load: PageServerLoad = async ({ url, parent }) => {
	const { user } = await parent();

	const category = url.searchParams.get("category");

	let categoryProductsPromise:
		| {
				name: string;
				slug: string;
				price: number;
				rating: number;
				sold: number;
				mainImage: string;
		  }[]
		| undefined;
	if (category) {
		categoryProductsPromise = await db.query.categoryModel
			.findFirst({
				where: eq(categoryModel.slug, generateSlug(category)),
				columns: {
					name: true,
				},
				with: {
					products: {
						limit: 10,
						columns: {
							name: true,
							price: true,
							mainImage: true,
							rating: true,
							sold: true,
							slug: true,
						},
					},
				},
			})
			.then((data) => data?.products);
		console.log({ objs: categoryProductsPromise });
	}
	const productsPromise = db.query.productModel.findMany({
		limit: 10,
		columns: {
			name: true,
			price: true,
			mainImage: true,
			rating: true,
			sold: true,
			slug: true,
		},
	});
	const categories = await db.query.categoryModel.findMany({
		columns: { name: true, slug: true },
	});
	return {
		productsPromise,
		categoryProductsPromise,
		categories: categories.map((cat) => {
			return {
				...cat,
			};
		}),
		user,
	};
};
