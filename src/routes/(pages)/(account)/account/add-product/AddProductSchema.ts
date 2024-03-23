import { Categories, CategoriesData, listOfCategories } from "$lib/types";
import { z } from "zod";

const AddProductSchema = z.object({
	name: z
		.string()
		.min(8, {
			message: "Product name must be at least 8 characters",
		})
		.max(255, {
			message: "Product name must be less than 255 characters",
		})
		.regex(/^[A-Za-z0-9 _-]+$/, {
			message:
				"Product name must contain only letters, numbers, spaces, underscores, and dashes",
		}),

	description: z.string(),
	price: z
		.number()
		.positive({
			message: "Product price must be a positive number",
		})
		.min(0, {
			message: "Product price must be a positive number",
		}),
	quantity: z
		.number()
		.positive({
			message: "Product quantity must be a positive number",
		})
		.min(1, {
			message: "Product quantity must be a positive number",
		}),
	images: z.array(z.string().startsWith("ecommerce_products")),
	category: z.nativeEnum(Categories, {
		invalid_type_error: "Invalid category",
	}),
});

export default AddProductSchema;
