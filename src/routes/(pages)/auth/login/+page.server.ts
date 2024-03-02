
import type { Actions, PageServerLoad } from "./$types";
import { setError, setMessage, superValidate } from "sveltekit-superforms";
import { loginSchema } from "./LoginSchema";
import { zod } from "sveltekit-superforms/adapters";
import { fail, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/auth";
import { PrismaClient, Provider } from "@prisma/client";
import { verifyPassword } from "$lib/helpers/password";
import prisma from "$lib/server/prisma";

export const load: PageServerLoad = async ({ locals }) => {

    if (locals.user) {
        throw redirect(302, '/')
    }
    const result = await superValidate(zod(loginSchema))

    return {
        form: result
    };
};
export const prerender = false
export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(loginSchema));

        if (!form.valid) {
            console.log("NotValidForm");
            return setMessage(form, "Invalid credentials", { status: 400 });
        }
        const { email, password } = form.data

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (!existingUser || !existingUser.password) {
            console.log("UserNotFound");
            return setMessage(form, "Invalid credentials , No USER", { status: 400 });
        }
        const provider = existingUser.provider;
        if (provider !== Provider.EMAIL) {
            console.log("NotValidProvider");
            return setMessage(form, "Invalid credentials , try with other providers", { status: 400 });
        }

        const validPassword = await verifyPassword(existingUser.password, password)
        if (!validPassword) {
            return setMessage(form, "Invalid Credentials", { status: 400 });
        }

        const session = await auth.createSession(existingUser.id, {});
        const sessionCookie = auth.createSessionCookie(session.id);
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        return redirect(302, "/home");

    },
} satisfies Actions;