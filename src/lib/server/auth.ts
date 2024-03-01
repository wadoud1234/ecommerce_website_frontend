import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma"
import { dev } from "$app/environment";
import prisma from "$lib/server/prisma"
import { GitHub } from "arctic";
import type { User } from "@prisma/client";

const adapter = new PrismaAdapter(prisma.session, prisma.user)
export const auth = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev
        }
    }, getUserAttributes: (attributes) => {
        return {
            id: attributes.id,
            name: attributes.name,
            email: attributes.email,
            password: attributes.password,
            emailVerified: attributes.emailVerified,
            isAdmin: false,
            avatar: attributes.avatar
        }
    },
})

export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID as string,
    process.env.GITHUB_CLIENT_SECRET as string
)
export type Auth = typeof auth
declare module "lucia" {
    interface Register {
        Lucia: typeof auth;
        DatabaseUserAttributes: User;
    }
}
