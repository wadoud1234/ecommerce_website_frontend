import type { PageServerLoad } from "./$types";
import type { Product, ProductToShow } from "$lib/types";
import db from "$lib/server/db";
import { eq, like } from "drizzle-orm";
import {
	category as categoryModel,
	product as productModel,
} from "$lib/server/db/schema";
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
	const { limit, keyword, price, category } = Object.fromEntries(
		url.searchParams.entries(),
	);
	console.log({ CATA: category });
	let categoryId: string | null = null;
	if (category) {
		categoryId = await db.query.category
			.findFirst({
				where: eq(categoryModel.slug, generateSlug(category)),
				columns: { id: true },
			})
			.then((data) => data?.id);
		console.log({ categoryId });
	}

	let products: ProductToShow[];
	if (categoryId) {
		console.log("ID", categoryId);

		products = await db.query.product.findMany({
			where: eq(productModel.categoryId, categoryId),
			columns: {
				name: true,
				price: true,
				mainImage: true,
				rating: true,
				sold: true,
				slug: true,
			},
			limit: 10,
		});
		console.log({ Cat: products });
	} else {
		products = await db.query.product.findMany({
			where: like(
				productModel.searchText,
				`%${keyword?.toLowerCase().trim() || ""}%`,
			),
			columns: {
				name: true,
				price: true,
				mainImage: true,
				rating: true,
				sold: true,
				slug: true,
			},
			limit: 10,
		});
	}
	// "0-1000"|"1000-3000"|"3000-6000"|"6000-10000"|"over 10000"
	const filterResults: ProductToShow[] = filterProductsFunction(
		price,
		products,
	);
	console.log({ filterResults });
	const categories = await db.query.category.findMany({
		columns: {
			name: true,
		},
	});
	return {
		categories,
		user,
		products: filterResults,
	};
};
