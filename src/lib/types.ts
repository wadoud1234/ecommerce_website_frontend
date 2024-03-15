import { generateSlug } from "./helpers/strings";

export enum Provider {
	GITHUB = "GITHUB",
	EMAIL = "EMAIL",
}

export enum LinkProviders {
	GOOGLE = "GOOGLE",
	FACEBOOK = "FACEBOOK",
	INSTAGRAM = "INSTAGRAM",
	WHATS_UP = "WHATS_UP",
	APPLE = "APPLE",
	ALI_BABA = "ALI_BABA",
	ALI_EXPRESS = "ALI_EXPRESS",
	TWITTER = "TWITTER",
	GITHUB = "GITHUB",
	PERSONAL = "PERSONAL",
}

export type Product = {
	id: string;
	name: string;
	price: number;
	likes: number;
	slug: string;
	description: string;
	rating: number;
	quantity: number;
	sold: number;
	picture?: string;
	discount?: number;
};
export class ProductInit {
	id: string;
	name: string;
	price: number;
	likes: number;
	description: string;
	rating: number;
	quantity: number;
	sold: number;
	constructor() {
		this.id = "";
		this.name = "";
		this.price = 0;
		this.likes = 0;
		this.description = "";
		this.rating = 0;
		this.quantity = 0;
		this.sold = 0;
	}
	get() {
		return this;
	}
}

export type onUploadImageResponse = {
	event: string;
	info: {
		access_mode: string;
		asset_id: string;
		batchId: string;
		bytes: number;
		createdAt: string;
		etag: string;
		folder: string;
		format: string;
		height: number;
		id: string;
		original_name: string;
		path: string;
		placeholder: boolean;
		public_id: string;
		resource_type: string;
		secure_url: string;
		signature: string;
		tags: string[];
		type: string;
		thumbnail_url: string;
		url: string;
		version: number;
		version_id: string;
		width: number;
	};
};
export type UserLink = {
	id: string;
	link: string;
	provider: LinkProviders;
};

export enum Categories {
	Electronics = "Electronics",
	Computers = "Computers",
	Phones = "Phones",
	Tablets = "Tablets",
	Headphones = "Headphones",
	Camera = "Camera",
	Gaming = "Gaming",
}
export const listOfCategories = [
	"electronics",
	"computers",
	"phones",
	"tablets",
	"headphones",
	"camera",
	"gaming",
	"test",
];
export const CategoriesData = [
	{
		name: Categories.Electronics,
		slug: generateSlug(Categories.Electronics),
	},
	{
		name: Categories.Computers,
		slug: generateSlug(Categories.Computers),
	},
	{
		name: Categories.Phones,
		slug: generateSlug(Categories.Phones),
	},
	{
		name: Categories.Tablets,
		slug: generateSlug(Categories.Tablets),
	},
	{
		name: Categories.Headphones,
		slug: generateSlug(Categories.Headphones),
	},
	{
		name: Categories.Camera,
		slug: generateSlug(Categories.Camera),
	},
	{
		name: Categories.Gaming,
		slug: generateSlug(Categories.Gaming),
	},
];
