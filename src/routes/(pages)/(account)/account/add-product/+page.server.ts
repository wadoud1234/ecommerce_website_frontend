import db from "$lib/server/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const categories = await db.query.category.findMany({
		columns: { name: true, slug: true },
	});
	return {
		categories,
	};
};

// export const actions = {
// 	default: async (event) => {
// 		const user = getUserFromLocalsOrRedirect(event.locals);
// 		const form = await superValidate(event, zod(AddProductSchema));
// 		console.log(form.data);

// 		if (!form.valid) {
// 			return setMessage(form, "Bad Inputs", { status: 400 });
// 		}
// 		console.log(form.data);

// 		const { name, description, price, quantity, images } = form.data;
// 		console.log({ name, description, price, quantity, images });
// 		const userId = user.id;
// 		let category = await db.query.category.findFirst({
// 			where: eq(categoryModel.slug, generateSlug(form.data.category)),
// 			columns: { id: true, name: true },
// 		});
// 		console.log({ category });
// 		// let category = await prisma.category.findUnique({
// 		// where: { slug: generateSlug(form.data.category) },
// 		// });

// 		if (!category || !category.name) {
// 			category = await db
// 				.insert(categoryModel)
// 				.values({
// 					name: form.data.category,
// 					slug: generateSlug(form.data.category),
// 				})
// 				.returning()
// 				.then((data) => data[0]);
// 			// category = await prisma.category.create({
// 			// 	data: {
// 			// 		name: form.data.category,
// 			// 		slug: generateSlug(form.data.category),
// 			// 	},
// 			// });
// 		}
// 		console.log({ category });
// 		const uploadedImages = images[0].split(",");
// 		const product = await db
// 			.insert(productModel)
// 			.values({
// 				name,
// 				slug: generateSlug(name),
// 				searchText: generateProductSearchText(name, description || ""),
// 				description,
// 				price: Number(price),
// 				quantity: Number(quantity),
// 				rating: 0,
// 				sold: 0,
// 				userId,
// 				mainImage: uploadedImages[0],
// 				categoryId: category?.id || "",
// 			})
// 			.returning()
// 			.then((data) => data[0]);
// 		console.log({ product });
// 		// const product = await prisma.product.create({
// 		// 	data: {
// 		// 		categoryId: category.id,
// 		// 		name,
// 		// 		slug: generateSlug(name),
// 		// 		searchText: generateProductSearchText(name, description || ""),
// 		// 		description,
// 		// 		price,
// 		// 		quantity,
// 		// 		userId,
// 		// 		mainImage: uploadedImages[0],
// 		// 	},
// 		// });

// 		const savedImages = uploadedImages.slice(1, 4);
// 		console.log({ savedImages });

// 		const something = await db
// 			.insert(productImages)
// 			.values({
// 				thumbnail1: savedImages[0],
// 				thumbnail2: savedImages[1],
// 				thumbnail3: savedImages[2],
// 				productId: product.id,
// 			})
// 			.returning();
// 		console.log({ something });
// 		// const something = await prisma.productImage.createMany({
// 		// data: savedImages,
// 		// });

// 		return redirect(302, `/products/${product.slug}`);
// 	},
// } satisfies Actions;
