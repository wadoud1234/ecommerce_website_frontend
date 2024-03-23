import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import db from "$lib/server/db";
import { and, eq, not } from "drizzle-orm";
import {
	category,
	user as userModel,
	product as productModel,
} from "$lib/server/db/schema";

export const load: PageServerLoad = async ({ parent }) => {
	const { user, product: productFromParent, images } = await parent();
	if (!productFromParent) return redirect(304, "/");
	const seller = await db.query.user.findFirst({
		where: eq(userModel.id, productFromParent.userId),
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
	console.log({ seller });

	if (!seller || !seller.name) error(404, "Something wrong happened");
	const productCategory = await db.query.category.findFirst({
		where: eq(category.id, productFromParent.categoryId),
		columns: { name: true, id: true },
	});
	console.log({ productCategory });

	if (!productCategory || !productCategory.name) error(404, "Bad Category");
	const relatedProductsPromise = db.query.product.findMany({
		where: and(
			eq(userModel.id, productFromParent.userId),
			not(eq(productModel.id, productFromParent.id)),
		),
	});
	console.log("HEllo");

	const productsPromise = db.query.product.findMany({
		where: not(eq(productModel.id, productFromParent.id)),
	});

	// const { images, ...product } = productFromParent;
	console.log({
		user,
		productFromParent,
		images,
		seller,
		categoryName: productCategory.name,
	});
	return {
		productsPromise,
		relatedProductsPromise,
		seller,
		user,
		product: productFromParent,
		images: images.filter((image) => {
			if (image && typeof image === "string") {
				return image;
			}
		}),
		productCategory: productCategory.name,
	};
};
