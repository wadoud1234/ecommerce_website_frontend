import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getUserFromLocals } from "$lib/server/auth";
import db from "$lib/server/db";
import { eq } from "drizzle-orm";
import { product as productModel } from "$lib/server/db/schema";
export const load: LayoutServerLoad = async ({ locals, params }) => {
	console.time("Start");
	const user = getUserFromLocals(locals);
	const productSlug = params.slug;
	console.log({ productSlug });
	const product = await db.query.product.findFirst({
		where: eq(productModel.slug, productSlug),
		with: {
			images: true,
		},
	});
	console.log({ layoutProduct: product });
	// const product = await prisma.product.findUnique({
	// where: { slug: productSlug },
	// });

	if (!product || !product?.slug) {
		return redirect(302, "/");
	}
	const { images, ...productData } = product;
	console.log({ images, productData });
	// const secondaryImages = await db.query.productImages.findFirst({
	// where: eq(productImages.productId, product.id),
	// });
	// const secondaryImages = await prisma.productImage.findMany({
	// where: { productId: product.id },
	// select: { link: true },
	// });

	const imagesData = [
		product?.mainImage,
		images?.thumbnail1,
		images?.thumbnail2,
		images?.thumbnail3,
	];
	console.log("Finished");
	console.timeEnd("Start");
	return { user, product: productData, images: imagesData };
};
