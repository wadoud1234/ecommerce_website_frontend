import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";
import { and, eq, not } from "drizzle-orm";
import { categoryModel, userModel, productModel } from "$lib/server/db/schema";
import { getUserFromLocals } from "$lib/server/auth";

export const load: PageServerLoad = async ({ parent, params, locals }) => {
	// const { user, product: productFromParent, images } = await parent();
	const user = getUserFromLocals(locals);
	const productSlug = params.slug;
	const product = await db.query.productModel.findFirst({
		where: eq(productModel.slug, productSlug),
		with: {
			images: true,
		},
	});
	if (!product || !product?.slug) {
		return redirect(302, "/");
	}
	const { images, ...productData } = product;

	const imagesData = [
		product?.mainImage,
		images?.picture1,
		images?.picture2,
		images?.picture3,
	];
	const seller = await db.query.userModel.findFirst({
		where: eq(userModel.id, product.userId),
		columns: {
			id: true,
			name: true,
			avatar: true,
			email: true,
			isAdmin: true,
			description: true,
			emailVerified: true,
		},
	});

	if (!seller || !seller.name) error(404, "Something wrong happened");
	const productCategory = await db.query.categoryModel.findFirst({
		where: eq(categoryModel.id, product.categoryId),
		columns: { name: true, id: true },
	});

	if (!productCategory || !productCategory.name) error(404, "Bad Category");
	const relatedProductsPromise = db.query.productModel.findMany({
		where: and(
			eq(productModel.categoryId, productCategory.id),
			not(eq(productModel.id, product.id)),
		),
	});
	// const relatedProductsPromise = await db
	// 	.select()
	// 	.from(productModel)
	// 	.where(eq(productModel.userId, seller.id));

	const productsPromise = db.query.productModel.findMany({
		where: not(eq(productModel.id, product.id)),
	});

	// const { images, ...product } = productFromParent;

	return {
		productsPromise,
		relatedProductsPromise,
		seller,
		user,
		product: product,
		images: imagesData.filter((image) => {
			if (image && typeof image === "string") {
				return image;
			}
		}),
		productCategory: productCategory.name,
	};
};
