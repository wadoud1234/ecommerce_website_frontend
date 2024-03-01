import { redirect } from "@sveltejs/kit";

export const load = ({ locals }) => {
    if (locals.user) redirect(300, "/")
    return {};
}