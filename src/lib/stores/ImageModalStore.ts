import { writable } from "svelte/store";
type ImageModalStoreType = {
	show: boolean;
	src: string;
	alt: string;
};
const ImageModalStore = writable<ImageModalStoreType>({
	show: false,
	src: "",
	alt: "",
});

export const openImageModal = (src: string, alt: string) => {
	ImageModalStore.set({ show: true, src: src ?? "", alt: alt ?? "" });
};

export const closeImageModal = () => {
	ImageModalStore.set({ show: false, src: "", alt: "" });
};

export default ImageModalStore;
