import slugify from "slugify";
import { createId, init, isCuid } from "@paralleldrive/cuid2";

export const firstLetterUpperCase = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateSlug = (str: string) => {
	return slugify(str, { lower: true, trim: true });
};

export const verifySlug = (slug: string, newStr: string) => {
	const newSlug = generateSlug(newStr);
	return slug === newSlug;
};
// export const generateQueryString = (params: { [key: string]: string }) => {
// 	new URLSearchParams
// };

export const generateProductSearchText = (
	name: string,
	description: string,
) => {
	return `${generateSlug(name)}-${generateSlug(description)}`;
};
