import type { PageServerLoad } from "./$types";
import prisma from "$lib/server/prisma";
import { getUserFromLocals } from "$lib/server/auth";
import type { Product } from "$lib/types";

export const load: PageServerLoad = async ({ locals, url }) => {
	const user = getUserFromLocals(locals);

	const productsPromise = prisma.product.findMany();

	const category = url.searchParams.get("category");
	let categoryProductsPromise: Promise<Product[]> | null = null;

	if (category && category.length > 0) {
		const categoryInfo = await prisma.category.findFirst({
			where: { slug: category },
			select: { id: true },
		});
		categoryProductsPromise = prisma.product.findMany({
			where: { categoryId: categoryInfo?.id },
		});
	}

	return {
		user,
		productsPromise,
		categoryProductsPromise,
	};
};
