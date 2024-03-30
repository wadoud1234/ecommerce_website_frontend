import { string } from "zod";

const createCategorySchema = string()
	.min(5, {
		message: "category name should be at least 5 characters long",
	})
	.max(50, {
		message: "category name should be at most 50 characters long",
	});
export default createCategorySchema;
