import {
	Smartphone,
	type Icon as IconType,
	Laptop2,
	Headphones,
	Camera,
	Gamepad2,
	BadgeAlert,
} from "lucide-svelte";
import type { ComponentType } from "svelte";

export const categories: { name: string; Icon: ComponentType<IconType> }[] = [
	{
		name: "Phones",
		Icon: Smartphone,
	},
	{
		name: "Computers",
		Icon: Laptop2,
	},
	{
		name: "Camera",
		Icon: Camera,
	},
	{
		name: "Headphones",
		Icon: Headphones,
	},
	{
		name: "Gaming",
		Icon: Gamepad2,
	},
	{
		name: "Test",
		Icon: BadgeAlert,
	},
];

// export type ProductsDataType = typeof products;
