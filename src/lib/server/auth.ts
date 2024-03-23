import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { session, user } from "./db/schema";
import db from "./db";
import { redirect } from "@sveltejs/kit";
import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { GitHub } from "arctic";
const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export function getUserFromLocals(locals: App.Locals) {
	const user = locals.user;
	return user;
}

export function getUserFromLocalsOrRedirect(locals: App.Locals) {
	const user = getUserFromLocals(locals);

	if (!user || !user.id) {
		redirect(303, "/auth/login");
	}
	return user;
}

export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: !dev,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			id: attributes.id,
			name: attributes.name,
			email: attributes.email,
			emailVerified: attributes.emailVerified,
			description: attributes.description,
			isAdmin: false,
			avatar: attributes.avatar,
		};
	},
});

import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "$env/static/private";

export const github = new GitHub(
	GITHUB_CLIENT_ID as string,
	GITHUB_CLIENT_SECRET as string,
);
export type Auth = typeof auth;

// export type Auth = typeof auth;
declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: {
			id: string;
			email: string;
			password: string;
			emailVerified: boolean;
			isAdmin: boolean;
			description: string;
			name: string;
			avatar: string;
		};
	}
}

export default adapter;
