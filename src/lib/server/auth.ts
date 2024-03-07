import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import prisma from "$lib/server/prisma";
import { GitHub } from "arctic";
import type { User } from "@prisma/client";
import { redirect } from "@sveltejs/kit";

const adapter = new PrismaAdapter(prisma.session, prisma.user);
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

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID as string,
	process.env.GITHUB_CLIENT_SECRET as string,
);
export type Auth = typeof auth;
declare module "lucia" {
	interface Register {
		Lucia: typeof auth;
		DatabaseUserAttributes: User;
	}
}
export function ensureAdmin(locals: App.Locals) {
	if (!locals.user || !locals.session) {
		redirect(303, "/auth/login");
	}

	// @ts-ignore
	if (!locals?.user?.isAdmin) {
		redirect(303, "/");
	}
}
// import { DrizzleMySQLAdapter } from "@lucia-auth/adapter-drizzle";

// import { dev } from "$app/environment";
// import { Lucia } from "lucia";
// import {db} from "./db/db";
// import { redirect } from "@sveltejs/kit";
// import { session,user } from "./db/schema";

// const adapter = new DrizzleMySQLAdapter(db, session, user);

// export const auth = new Lucia(adapter, {
// 		sessionCookie: {
// 			attributes: {
// 				secure: !dev,
// 			},
// 		},
// 		getUserAttributes: (attributes) => {
// 			return {
// 				id: attributes.id,
// 				name: attributes.name,
// 				email: attributes.email,
// 				emailVerified: attributes.emailVerified,
// 				description: attributes.description,
// 				isAdmin: attributes.isAdmin,
// 				avatar: attributes.avatar,
// 			};
// 		},
// 	});
// declare module 'lucia' {
// 	interface Register {
// 		Auth: typeof auth;
// 		DatabaseUserAttributes: {
// 			firstName: string;
// 			lastName: string;
// 			isAdmin: boolean;
// 			email: string;
// 			stripeCustomerId: string | null;
// 		};
// 	}
// }
