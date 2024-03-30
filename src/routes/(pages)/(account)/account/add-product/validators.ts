import { ZodType, z } from "zod";

export type AddProductErrorType = {
	name: string[];
	description: string[];
	price: string[];
	quantity: string[];
	category: string[];
	images: string[];
};

export const nameSchema = z
	.string()
	.min(8, { message: "Name must be at least 8 characters" })
	.max(255, { message: "Name must be less than 255 characters" });
export const descriptionSchema = z.string();
export const priceSchema = z
	.number()
	.min(1, { message: "Price is required" })
	.nonnegative();

export const quantitySchema = z
	.number()
	.min(1, { message: "Quantity is required" })
	.nonnegative();
export const categorySchema = z
	.string()
	.min(1, { message: "Category is required" })
	.refine((category) => category !== "Select a category...", {
		message: "Category is required",
	});
export const imagesSchema = z
	.array(z.instanceof(File).optional())
	.refine((data) => data.length >= 1, {
		message: "Images are required",
	})
	.refine((data) => data.length <= 4, {
		message: "Maximum of 4 images allowed",
	});

export const inputValidator = (
	value: unknown,
	errors: AddProductErrorType,
	inputName: keyof AddProductErrorType,
	schema: ZodType,
) => {
	errors[inputName] = [];

	const parseResults = schema.safeParse(value);
	if (!parseResults.success) {
		errors[inputName] = [...(parseResults.error.formErrors.formErrors || [])];
	}

	return [...errors[inputName]];
};
// export const validateName = (e: Event, errors: AddProductErrorType) => {
// 	const target = e.target as HTMLInputElement;

// 	if (target?.value) {
// 		errors.name = [];

// 		const parseResults = z
// 			.string()
// 			.min(10, { message: "Name must be at least 10 characters" })
// 			.safeParse(target.value);

// 		if (!parseResults.success) {
// 			errors.name = [...(parseResults.error.formErrors.formErrors || [])];

// 			console.log({ nameErrors: errors.name });
// 		}
// 	}
// 	return [...errors.name];
// };
