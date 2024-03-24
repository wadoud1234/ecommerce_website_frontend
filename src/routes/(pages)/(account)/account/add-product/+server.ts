import { uploadImageUsingFormData } from "$lib/helpers/cloudinary-image-uploader.js";
import {
	generateProductSearchText,
	generateSlug,
} from "$lib/helpers/strings.js";
import db from "$lib/server/db/index.js";
import {
	category as categoryModel,
	productImages,
	productImages as productImagesModel,
	product as productModel,
} from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";
import { AddProductSchemaBack } from "./AddProductZodSchema.js";
import { getUserFromLocals } from "$lib/server/auth.js";
import { fail, redirect } from "@sveltejs/kit";

export async function POST({ request, locals }) {
	const user = getUserFromLocals(locals);
	if (!user)
		return new Response(null, {
			status: 401,
			headers: { location: "/auth/login" },
		});
	const formData = await request.formData();
	const data = Object.fromEntries(formData.entries());

	const validationResults = AddProductSchemaBack.safeParse({
		...data,
		price: Number(data.price),
		quantity: Number(data.quantity),
		images: [data.image0, data.image1, data.image2, data.image3],
	});

	if (validationResults.success) {
		try {
			console.log("success", validationResults.data);
			const { name, description, price, quantity, category, images } =
				validationResults.data;
			const mainImage = images.filter((image) => {
				if (image?.name && image?.size) return image;
			})[0] as File;
			console.log({ mainImage });

			const mainImageUrl = await uploadImageUsingFormData(
				mainImage,
				"ecommerce_products",
			)
				.then((data) => data.json())
				.then((data) => data.secure_url);

			console.log({ mainImageUrl });

			const thumbnails = images.filter((image) => image && image !== mainImage);
			console.log({ thumbnails });

			const thumbnailsUrl = await Promise.all(
				thumbnails.map(async (image) => {
					if (image?.name && image?.size) {
						return await uploadImageUsingFormData(image, "ecommerce_products")
							.then((data) => data.json())
							.then((data) => data.secure_url);
					}
				}),
			);
			console.log({ thumbnailsUrl });
			let isCategoryExist = await db.query.category.findFirst({
				where: eq(categoryModel.slug, generateSlug(category)),
				columns: { name: true, slug: true, id: true },
			});
			if (!isCategoryExist) {
				isCategoryExist = await db
					.insert(categoryModel)
					.values({
						name: category,
						slug: generateSlug(category),
					})
					.returning()
					.then((data) => data[0]);
			}
			const categoryId = isCategoryExist?.id;
			if (!categoryId) return new Response("Invalid category", { status: 400 });

			const newProduct = await db
				.insert(productModel)
				.values({
					name,
					slug: generateSlug(name),
					searchText: generateProductSearchText(name, description || ""),
					description,
					price,
					quantity,
					mainImage: mainImageUrl,
					categoryId,
					userId: user.id,
				})
				.returning({ id: productModel.id, slug: productModel.slug })
				.then((data) => data[0]);
			console.log({ newProduct });

			const newProductThumbnails = await db
				.insert(productImagesModel)
				.values({
					productId: newProduct.id,
					thumbnail1: thumbnailsUrl[0],
					thumbnail2: thumbnailsUrl[1],
					thumbnail3: thumbnailsUrl[2],
				})
				.returning({ id: productImagesModel.id })
				.then((data) => data[0]);
			console.log({ newProductThumbnails });
			return new Response(
				JSON.stringify({ status: "Created", productSlug: newProduct.slug }),
				{
					status: 201,
					statusText: "Created",
					headers: {
						location: `/products/${newProduct.slug}`,
					},
				},
			);
		} catch (e: unknown) {
			console.log({ errors: e });
			return new Response("Something went wrong", { status: 500 });
		}
	} else {
		// console.log("format", validationResults.error.format());
		console.log("formerrors", validationResults.error.formErrors.fieldErrors);
		// console.log("errors", validationResults.error.errors);
		// console.log("message", validationResults.error.message);

		return new Response(
			JSON.stringify(validationResults.error.formErrors.fieldErrors),
			{
				status: 400,
			},
		);
	}
}
