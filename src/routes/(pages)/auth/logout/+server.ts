import { fail, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/auth";
import prisma from "$lib/server/prisma";

export const GET: RequestHandler = async (event) => {
	if (!event.locals.session) fail(401);
	const session = event.locals.session;
	if (session) {
		auth.invalidateSession(session.id);
		const sessionCookie = auth.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes,
		});
		throw redirect(302, "/auth/login");
	}
	throw redirect(302, "/auth/login");
};
