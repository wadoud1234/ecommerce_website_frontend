import { generateSlug } from "$lib/helpers/strings.js";
import db from "$lib/server/db";
import { categoryModel, productModel } from "$lib/server/db/schema.js";
import { and, between, eq, gt, inArray, like, lte } from "drizzle-orm";

export async function GET({ url }) {
	console.log("FETCHED ON SERVER");
	const { keyword, categories, minPrice, maxPrice, pageNumber } =
		Object.fromEntries(url.searchParams.entries());
	const listOfCategories: string[] =
		categories?.length > 0 ? categories?.split(",") : new Array<string>();
	console.log({ listOfCategories });

	// const listOfCategoriesId = await db.query.categoryModel.findMany({
	// where: and(
	// listOfCategories && listOfCategories.length > 0
	// ? eq(categoryModel.slug, generateSlug(listOfCategories))
	// : undefined,
	// ),
	// columns: {
	// id: true,
	// },
	// });
	const wantedCategoryId = await Promise.all(
		listOfCategories?.map((categoryName) =>
			db.query.categoryModel.findFirst({
				where: eq(categoryModel.slug, generateSlug(categoryName)),
				columns: { id: true },
			}),
		),
	).then((categoriesArray) =>
		categoriesArray
			.filter((category) => {
				if (category?.id) return category;
			})
			.map((category) => {
				const id = category?.id || "";
				return id;
			}),
	);

	const products = await db.query.productModel.findMany({
		where: and(
			between(
				productModel.price,
				Number(minPrice || 0),
				Number(maxPrice || Number.MAX_SAFE_INTEGER)
					? Number(maxPrice || Number.MAX_SAFE_INTEGER)
					: Number.MAX_SAFE_INTEGER,
			),
			wantedCategoryId && wantedCategoryId.length > 0
				? inArray(productModel.categoryId, wantedCategoryId)
				: undefined,
			keyword ? like(productModel.name, `%${keyword || ""}%`) : undefined,
		),
		columns: {
			id: true,
			name: true,
			slug: true,
			sold: true,
			rating: true,
			mainImage: true,
			price: true,
		},
		limit: Number(pageNumber || 0) > 0 ? Number(pageNumber) : 10,
	});
	return new Response(JSON.stringify(products), {
		status: 200,
	});
}
