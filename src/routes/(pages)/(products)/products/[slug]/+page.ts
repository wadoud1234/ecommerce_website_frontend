import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ parent }) => {
	const { user, product, images } = await parent();
	// const images = product?.images || [];
	console.log({ PAGE: images });

	return { user, product, images };
};
