import { generateSlug } from "$lib/helpers/strings";
import { Categories, CategoriesData, listOfCategories } from "$lib/types";
import { z } from "zod";

const categories = [
	"electronics",
	"computers",
	"phones",
	"tablets",
	"headphones",
	"camera",
	"gaming",
] as const;
export const searchProductSchema = z.object({
	category: z.enum(categories).optional(),
	price: z.number().min(0, { message: "Price must be positive" }).optional(),
	rating: z
		.number()
		.min(0, { message: "Rating must be more than 0" })
		.max(5, { message: "Rating must be less than 5" })
		.optional(),
	keyword: z.string().optional(),
});
