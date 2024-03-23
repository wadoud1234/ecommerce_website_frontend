import { v2 as cloudinary } from "cloudinary";
import {
	CLOUDINARY_CLOUD_NAME,
	CLOUDINARY_API_KEY,
	CLOUDINARY_API_SECRET,
} from "$env/static/private";

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
});

export async function uploadImage(
	file: string,
	upload_preset: "ecommerce_products" | "user_avatars",
) {
	return cloudinary.uploader.upload(file, {
		upload_preset,
	});
}

export async function uploadImageUsingFormData(
	file: File,
	upload_preset: "ecommerce_products" | "user_avatars",
) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("upload_preset", upload_preset);
	const response = await fetch(
		`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
		{ method: "POST", body: formData },
	);
	return response;
}
