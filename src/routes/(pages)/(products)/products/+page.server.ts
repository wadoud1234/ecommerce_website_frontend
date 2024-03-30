import type { PageServerLoad } from "./$types";
import type { Product, ProductToShow } from "$lib/types";
import db from "$lib/server/db";
import { and, between, desc, eq, inArray, like } from "drizzle-orm";
import { categoryModel, productModel } from "$lib/server/db/schema";
import { generateSlug } from "$lib/helpers/strings";

function filterProductsFunction(
	priceFilter: string,
	products: ProductToShow[],
) {
	let filterResults: typeof products;
	switch (priceFilter) {
		case "less than 100":
			filterResults = [...products.filter((product) => product.price <= 100)];
			break;
		case "101-300":
			filterResults = [
				...products.filter(
					(product) => product.price > 100 && product.price <= 300,
				),
			];
			break;
		case "301-600":
			filterResults = [
				...products.filter(
					(product) => product.price > 300 && product.price <= 600,
				),
			];
			break;
		case "601-1000":
			filterResults = [
				...products.filter(
					(product) => product.price > 600 && product.price <= 1000,
				),
			];
			break;
		case "over 1001":
			filterResults = [...products.filter((product) => product.price > 1000)];
			break;
		default:
			filterResults = [...products];
			break;
	}
	return filterResults;
}

export const load: PageServerLoad = async ({ parent, url }) => {
	const { user } = await parent();
	const { keyword, category, pageNumber, maxPrice, minPrice } =
		Object.fromEntries(url.searchParams.entries());
	console.log("CATEGORIES", url.searchParams.getAll("category"));

	console.log("SERVER CATEGORY PARAMS", category);

	const listOfCategories = category?.length ? category.split(",") : [];

	const wantedCategoryId = await Promise.all(
		listOfCategories.map((categoryName) =>
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
			like(productModel.searchText, `%${keyword?.toLowerCase().trim() || ""}%`),
		),
		columns: {
			name: true,
			price: true,
			mainImage: true,
			rating: true,
			sold: true,
			slug: true,
			searchText: true,
		},
		limit: 10,
		offset: (Number(pageNumber || 1) - 1) * 10,
		orderBy: (productModel) => desc(productModel.sold),
	});
	const categories = await db.query.categoryModel.findMany({
		columns: {
			name: true,
		},
	});
	return {
		products,
		selectedCategories: listOfCategories,
		categories: categories.map((cat) => cat.name),
		user,
	};
};
