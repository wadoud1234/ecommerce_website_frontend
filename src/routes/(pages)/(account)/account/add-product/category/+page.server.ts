import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request }) => {
		console.log(await request.json());
	},
};
