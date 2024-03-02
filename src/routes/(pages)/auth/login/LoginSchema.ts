import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().
        email({ message: "Invalid email format" }).
        min(8, "Email must be at least 8 characters long"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter"
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter"
        })
        .regex(/\d/, {
            message: "Password must contain at least one number"
        }).regex(/[!@#$%^&*(),.?":{}|<>']/, {
            message: "Password must contain at least one special character"
        })

});

export type loginSchemaType = typeof loginSchema


