import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types.js";
import { auth } from "$lib/server/auth.js";
import { hashPassword, verifyPassword } from "$lib/helpers/password.js";
import { PrismaClient, type User } from "@prisma/client";
import { setMessage, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { RegisterSchema } from "./RegisterSchema.js";
import prisma from "$lib/server/prisma.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
export const load = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, "/");
	}
	const result = await superValidate(zod(RegisterSchema));
	return {
		form: result,
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(RegisterSchema));
		console.log({ form });
		if (!form.valid) {
			return setMessage(form, "Invalid credentials", { status: 400 });
		}
		const { name, email, password, confirm_password } = form.data;
		console.log({ name, email, password, confirm_password });

		const existingUser = await prisma.user.findUnique({ where: { email } });
		console.log({ existingUser });

		if (existingUser) {
			return setMessage(
				form,
				"Invalid credentials , try register with other providers",
				{ status: 400 },
			);
		}
		if (!existingUser) {
			if (password !== confirm_password) {
				return setMessage(form, "Password and Confirm Password do not match", {
					status: 400,
				});
			}
			const hashedPassword = await hashPassword(password);
			let newUser: User;
			try {
				newUser = await prisma.user.create({
					data: {
						name,
						email,
						password: hashedPassword,
						avatarChangedAt: new Date(),
					},
				});
				console.log({ newUser });
			} catch (err: any) {
				if (err instanceof PrismaClientKnownRequestError) {
					return setMessage(form, "Invalid credentials", { status: 400 });
				}
				const { message, name, code, meta } = err;
				console.log({ message, name, code, meta });

				return setMessage(form, "Invalid credentials", { status: 400 });
			}

			redirect(301, "/auth/login");
		}
	},
} satisfies Actions;
