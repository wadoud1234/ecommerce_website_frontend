import { z } from "zod";

export const AddProductSchemaFront = z
	.object({
		name: z
			.string()
			.min(8, { message: "Name should be at least 8 characters" }),
		description: z.string(),
		price: z.number().min(1, { message: "Price is required" }).nonnegative(),
		quantity: z
			.number()
			.min(1, { message: "Quantity is required" })
			.nonnegative(),
		category: z.string().min(1, { message: "Category is required" }),
		images: z.array(z.instanceof(File).optional()),
	})
	.refine((data) => data.images.length >= 1, {
		message: "Images are required",
	})
	.refine((data) => data.images.length <= 4, {
		message: "Maximum of 4 images allowed",
	});

export const AddProductSchemaBack = z
	.object({
		name: z
			.string()
			.min(8, { message: "Name should be at least 8 characters" }),
		description: z.string(),
		price: z.number().min(1, { message: "Price is required" }).nonnegative(),
		quantity: z
			.number()
			.min(1, { message: "Quantity is required" })
			.nonnegative(),
		category: z.string().min(1, { message: "Category is required" }),
		images: z.array(z.instanceof(File).optional()),
	})
	.refine((data) => data.images.length >= 1, {
		message: "Images are required",
	})
	.refine((data) => data.images.length <= 4, {
		message: "Maximum of 4 images allowed",
	});

export const isBlob = (data: unknown) => data instanceof Blob;
export const isString = (data: unknown) => typeof data === "string";
