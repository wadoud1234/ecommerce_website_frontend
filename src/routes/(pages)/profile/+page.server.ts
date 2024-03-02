import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {
    if (!locals.user) redirect(300, "/auth/login")
    const { id, name, email, avatar } = locals.user
    return {
        user: { id, name, email, avatar }
    };
}