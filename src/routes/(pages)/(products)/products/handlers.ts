import { generateSlug } from "$lib/helpers/strings";
import type { ProductToShow } from "$lib/types";
import { createQuery, useQueryClient } from "@tanstack/svelte-query";
import axios from "axios";
import toast from "svelte-french-toast";
import filtersStore from "./filtersStore";

export function handlePriceFilterInput(e: Event) {
	const target = e?.target as HTMLInputElement;
	const value = target.value || 0;
	return Number(value);
}
export function handleAddCategory(str: string, selectedCategories: string[]) {
	if (selectedCategories.includes(str)) return [...selectedCategories];

	const cats = [...selectedCategories, generateSlug(str)];
	return [...cats];
}

export function handleRemoveCategory(
	str: string,
	selectedCategories: string[],
) {
	const cats = selectedCategories.filter((cat) => cat !== generateSlug(str));
	return [...cats];
}

export function validatePriceFilter(
	maxPrice: number,
	minPrice: number,
): boolean {
	if (maxPrice < minPrice) {
		toast.error("Max price must be greater than min price");
		return true;
	}
	return false;
}
export async function handlePriceFilterReset() {
	const client = useQueryClient();
	filtersStore.update((store) => ({
		...store,
		minPrice: 0,
		maxPrice: 0,
	}));
	await client.invalidateQueries({
		queryKey: ["products"],
		refetchType: "all",
	});
}
export function GetProductsQuery(baseUrl: string, products: ProductToShow[]) {
	let selectedCategories: string[];
	let minPrice: number;
	let maxPrice: number;
	let pageNumber: number;
	filtersStore.subscribe((store) => {
		({ selectedCategories, minPrice, maxPrice, pageNumber } = store);
	});
	return createQuery({
		queryKey: ["products"],
		initialData: products?.length > 0 ? products : [],
		staleTime: 10 * 1000,
		queryFn: async () => {
			const url = new URLSearchParams("");
			url.append("page", String(pageNumber));
			url.append("minPrice", String(minPrice ? minPrice : 0));
			url.append(
				"maxPrice",
				String(maxPrice === 0 ? Number.MAX_SAFE_INTEGER : maxPrice),
			);
			if (selectedCategories?.length > 0) {
				url.append("categories", String(selectedCategories?.join(",")));
			}
			const newUrl2 = new URLSearchParams("/products");
			newUrl2.append("page", String(pageNumber));
			console.log("urlString", `/products?${url.toString()}`);

			const response = await axios.get(`/products?${url.toString().trim()}`);
			const data = await response.data;
			console.log({ data });

			return data;
		},
	});
}
