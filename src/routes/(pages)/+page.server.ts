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
	// const category = url.searchParams.get("category");
	// let categoryProductsPromise: Promise<Product[]> | null = null;

	// if (category && category.length > 0) {
	// 	const categoryInfo = await prisma.category.findFirst({
	// 		where: { slug: category },
	// 		select: { id: true },
	// 	});
	// 	// categoryProductsPromise = prisma.product.findMany({
	// 	// 	where: { categoryId: categoryInfo?.id },
	// 	// });
	// }
	return {
		productsPromise,
		categoryProductsPromise: [],
		user,
	};
};
