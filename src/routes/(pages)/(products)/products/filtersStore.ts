import { writable } from "svelte/store";

const filtersStore = writable({
	minPrice: 0,
	maxPrice: 0,
	selectedCategories: new Array<string>(),
	pageNumber: 1,
});
export default filtersStore;
