import type { Actions } from "./$types";
import { setMessage, superValidate } from "sveltekit-superforms";
import { loginSchema } from "./LoginSchema";
import { zod } from "sveltekit-superforms/adapters";
import { redirect } from "@sveltejs/kit";
import { auth, getUserFromLocals } from "$lib/server/auth";
import { verifyPassword } from "$lib/helpers/password";
import { Provider } from "$lib/types";
import db from "$lib/server/db";
import { userModel } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
export const load = async ({ locals }) => {
	const user = getUserFromLocals(locals);
	if (user?.id) return redirect(302, "/account/profile");

	const result = await superValidate(zod(loginSchema));

	return {
		form: result,
	};
};
export const actions = {
	default: async (event) => {
		console.time("Start Handling");
		const form = await superValidate(event, zod(loginSchema));

		if (!form.valid) {
			return setMessage(form, "Invalid credentials", { status: 400 });
		}

		const { email, password } = form.data;
		console.log({ email, password });

		console.time("Start fetching data from db");
		const existingUser = await db.query.userModel.findFirst({
			where: eq(userModel.email, email),
			columns: {
				id: true,
				name: true,
				email: true,
				provider: true,
				providerId: true,
				password: true,
				avatar: true,
				description: true,
				isAdmin: true,
				emailVerified: true,
			},
		});
		console.timeEnd("Start fetching data from db");
		console.log({ existingUser });
		if (!existingUser || !existingUser.password) {
			return setMessage(form, "Invalid credentials , No USER", { status: 400 });
		}

		if (existingUser?.provider !== "email") {
			return setMessage(
				form,
				"Invalid credentials , try with other providers",
				{ status: 400 },
			);
		}

		const validPassword = await verifyPassword(existingUser.password, password);

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
			description: description || "",
			isAdmin: !!isAdmin,
			avatar: avatar || "",
			emailVerified: emailVerified || false,
		};

		console.timeEnd("Start Handling");
		return redirect(301, "/account/profile");
	},
} satisfies Actions;
