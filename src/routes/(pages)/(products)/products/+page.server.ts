import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";
import type { Product } from "$lib/types";

function filterProductsFunction(priceFilter: string, products: Product[]) {
	let filterResults: typeof products;
	switch (priceFilter) {
		case "less than 100":
			filterResults = [...products.filter((product) => product.price <= 100)];
			break;
		case "100-300":
			filterResults = [
				...products.filter(
					(product) => product.price > 100 && product.price <= 300,
				),
			];
			break;
		case "300-600":
			filterResults = [
				...products.filter(
					(product) => product.price > 300 && product.price <= 600,
				),
			];
			break;
		case "600-1000":
			filterResults = [
				...products.filter(
					(product) => product.price > 600 && product.price <= 1000,
				),
			];
			break;
		case "over 1000":
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

	let categoryData: { id: string } | null = null;
	if (category) {
		categoryData = await prisma.category.findUnique({
			where: { slug: category },
			select: { id: true },
		});
	}
	let products: Product[];
	if (categoryData?.id) {
		products = await prisma.product.findMany({
			where: {
				OR: [
					{ name: { contains: keyword?.toLowerCase() || "" } },
					{ description: { contains: keyword || "" } },
				],
				AND: {
					categoryId: categoryData.id,
				},
			},
			take: limit ? parseInt(limit) : 10,
		});
	} else {
		products = await prisma.product.findMany({
			where: { searchText: { contains: keyword?.toLowerCase() || "" } },
			take: limit ? parseInt(limit) : 10,
		});
	}
	// "0-1000"|"1000-3000"|"3000-6000"|"6000-10000"|"over 10000"
	const filterResults: Product[] = filterProductsFunction(price, products);
	return {
		user,
		products: filterResults,
	};
};
