import { z } from "zod";

export const RegisterSchema = z
	.object({
		name: z.string().min(8, "Name must be at least 8 characters long"),

		email: z
			.string()
			.email({ message: "Invalid email format" })
			.min(8, "Email must be at least 8 characters long"),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters long")
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/\d/, {
				message: "Password must contain at least one number",
			})
			.regex(/[!@#$%^&*(),.?":{}|<>']/, {
				message: "Password must contain at least one special character",
			}),

		confirm_password: z
			.string()
			.min(8, "Confirm Password must be at least 8 characters long")
			.regex(/[A-Z]/, {
				message: "Confirm Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Confirm Password must contain at least one lowercase letter",
			})
			.regex(/\d/, {
				message: "Confirm Password must contain at least one number",
			})
			.regex(/[!@#$%^&*(),.?":{}|<>']/, {
				message: "Confirm Password must contain at least one special character",
			}),
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords do not match",
		path: ["confirm_password"],
	});

export type RegisterSchemaType = typeof RegisterSchema;
