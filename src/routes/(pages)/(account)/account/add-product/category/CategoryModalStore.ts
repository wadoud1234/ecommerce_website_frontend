import { writable } from "svelte/store";

const CategoryModalStore = writable(false);

export const openCreateCategoryModal = () => CategoryModalStore.set(true);
export const closeCreateCategoryModal = () => CategoryModalStore.set(false);

export default CategoryModalStore;
