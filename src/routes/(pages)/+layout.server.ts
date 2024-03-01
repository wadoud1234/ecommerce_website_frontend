import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    // if (!event.locals.user) redirect(300, "/auth/login")
    return {
        user: event.locals.user ?? null
    };
}