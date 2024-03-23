import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ parent, locals }) => {
	const { user } = await parent();
	return {
		user,
	};
};
