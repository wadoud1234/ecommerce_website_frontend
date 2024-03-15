import { setMessage, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { searchProductSchema } from "./searchProductSchema";
import { zod } from "sveltekit-superforms/adapters";
import prisma from "$lib/server/prisma";
import type { Product } from "$lib/types";
import type { Product as PrismaProduct } from "@prisma/client";
import type { Category } from "@prisma/client";

export const load: PageServerLoad = async ({ locals, parent, url }) => {
	const { user } = await parent();
	const { limit, keyword, price, batata, category } = Object.fromEntries(
		url.searchParams.entries(),
	);
	console.log({ keyword, price, batata, category });

	let categoryData: Category | null = null;
	if (category) {
		categoryData = await prisma.category.findUnique({
			where: { slug: category },
		});
	}
	let products: (Product & {
		images: { id: string; link: string; productId: string }[];
	})[];
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
			include: { images: true },
			take: limit ? parseInt(limit) : 10,
		});
	} else {
		products = await prisma.product.findMany({
			where: { searchText: { contains: keyword?.toLowerCase() || "" } },
			include: { images: true },
			take: limit ? parseInt(limit) : 10,
		});
	}
	const productsWithImage = products.map((product) => ({
		...product,
		picture: product.images[0].link || "",
	}));
	// "0-1000"|"1000-3000"|"3000-6000"|"6000-10000"|"over 10000"
	let filterResults: (Product & {
		images: {
			id: string;
			link: string;
			productId: string;
		}[];
	})[];
	switch (price) {
		case "0-100":
			filterResults = productsWithImage.filter(
				(product) => product.price <= 100,
			);
			break;
		case "100-300":
			filterResults = productsWithImage.filter(
				(product) => product.price > 100 && product.price <= 300,
			);
			break;
		case "300-600":
			filterResults = productsWithImage.filter(
				(product) => product.price > 300 && product.price <= 600,
			);
			break;
		case "600-1000":
			filterResults = productsWithImage.filter(
				(product) => product.price > 600 && product.price <= 1000,
			);
			break;
		case "over 1000":
			filterResults = productsWithImage.filter(
				(product) => product.price > 1000,
			);
			break;
		default:
			filterResults = productsWithImage;
			break;
	}
	console.log({ filterResults });

	return {
		user,
		products: filterResults,
	};
};
export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(searchProductSchema));
		console.log(form);

		if (!form.valid) {
			return setMessage(form, "Invalid credentials", { status: 400 });
		}
	},
} satisfies Actions;
