import type { Actions, PageServerLoad } from "./$types";
import { setMessage, superValidate } from "sveltekit-superforms";
import { loginSchema } from "./LoginSchema";
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { verifyPassword } from "$lib/helpers/password";
import prisma from "$lib/server/prisma";
import { Provider } from "$lib/types";
export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, "/");
	}
	const result = await superValidate(zod(loginSchema));

	return {
		form: result,
	};
};
export const prerender = false;
export const actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return setMessage(form, "Invalid credentials", { status: 400 });
		}
		console.log({ form });

		const { email, password } = form.data;
		const existingUser = await prisma.user.findUnique({ where: { email } });
		console.log({ existingUser });

		if (!existingUser || !existingUser.password) {
			return setMessage(form, "Invalid credentials , No USER", { status: 400 });
		}

		const provider = existingUser.provider;
		if (provider !== Provider.EMAIL) {
			return setMessage(
				form,
				"Invalid credentials , try with other providers",
				{ status: 400 },
			);
		}

		const validPassword = await verifyPassword(existingUser.password, password);
		console.log({ validPassword });

		if (!validPassword) {
			return setMessage(form, "Invalid Credentials", { status: 400 });
		}
		const session = await auth.createSession(existingUser?.id, {});
		const sessionCookie = auth.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});
		const { id, name, description, isAdmin, avatar, emailVerified } =
			existingUser;
		event.locals.session = session;
		event.locals.user = {
			id,
			name,
			email,
			description,
			isAdmin,
			avatar,
			emailVerified,
		};
		throw redirect(301, "/home?refresh=true");
	},
} satisfies Actions;
