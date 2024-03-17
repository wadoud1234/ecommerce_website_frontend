import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types.js";
import { hashPassword } from "$lib/helpers/password.js";
import { setMessage, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { RegisterSchema } from "./RegisterSchema.js";
import prisma from "$lib/server/prisma.js";
import {
	generateProductSearchText,
	generateSlug,
} from "$lib/helpers/strings.js";
import { getUserFromLocals } from "$lib/server/auth.js";

export const load = async ({ locals }) => {
	const user = getUserFromLocals(locals);
	if (user?.id) return redirect(302, "/");
	const result = await superValidate(zod(RegisterSchema));
	return {
		form: result,
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(RegisterSchema));

		if (!form.valid) {
			return setMessage(form, "Invalid credentials", { status: 400 });
		}

		const { name, email, password, confirm_password } = form.data;

		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			return setMessage(
				form,
				"Invalid credentials , try register with other providers",
				{ status: 400 },
			);
		}

		if (password !== confirm_password) {
			return setMessage(form, "Password and Confirm Password do not match", {
				status: 400,
			});
		}
		const hashedPassword = await hashPassword(password);
		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				emailVerified: false,
				slug: generateSlug(name),
				searchText: generateProductSearchText(name, ""),
				password: hashedPassword,
			},
		});
		return redirect(301, "/auth/login");
	},
} satisfies Actions;
