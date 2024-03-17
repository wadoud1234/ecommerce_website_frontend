import { fail, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/auth";
import prisma from "$lib/server/prisma";

export const GET: RequestHandler = async ({ cookies, locals }) => {
	if (!locals.session) fail(401);
	const session = locals.session;
	if (session) {
		auth.invalidateSession(session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});
		return redirect(302, "/auth/login");
	}
	return redirect(302, "/auth/login");
};
