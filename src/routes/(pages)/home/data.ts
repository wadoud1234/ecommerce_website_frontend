import { Fifth, Sixth, Third, First, Second, Fourth, MobileIcon, ComputerIcon, CameraIcon, SmartwatchIcon, HeadphoneIcon, White_MobileIcon } from "$lib/icons";
import { Gamepad, Headset, Smartphone, type Icon as IconType, Laptop2, Headphones, Camera, Gamepad2 } from "lucide-svelte";
import type { ComponentType } from "svelte";

export const products: {
    id: number;
    name: string;
    price: number;
    picture: string;
    discount: number;
    rating: number;
    sold: number;
}[] = [
        {
            id: 1,
            name: 'Wireless Bluetooth Headphones',
            price: 59.99,
            picture: First,
            discount: 15,
            rating: 4.3,
            sold: 200
        },
        {
            id: 1,
            name: 'Smartphone Case',
            price: 9.99,
            picture: Second,
            discount: 5,
            rating: 4.5,
            sold: 100
        },
        {
            id: 1,
            name: 'Wireless Mouse',
            price: 19.99,
            picture: Third,
            discount: 10,
            rating: 4.7,
            sold: 150
        },
        {
            id: 1,
            name: 'Bluetooth Speaker',
            price: 39.99,
            picture: Fourth,
            discount: 0,
            rating: 4.2,
            sold: 300
        },
        {
            id: 1,
            name: 'Smartwatch',
            price: 149.99,
            picture: Fifth,
            discount: 20,
            rating: 4.8,
            sold: 500
        },
        {
            id: 1,
            name: 'Wireless Keyboard',
            price: 29.99,
            picture: Sixth,
            discount: 5,
            rating: 4.6,
            sold: 250
        },
        {
            id: 1,
            name: 'Portable Charger',
            price: 49.99,
            picture: Second,
            discount: 10,
            rating: 4.4,
            sold: 400
        },
        {
            id: 1,
            name: 'Fitness Tracker',
            price: 79.99,
            picture: Third,
            discount: 15,
            rating: 4.9,
            sold: 350
        },
        {
            id: 1,
            name: 'Laptop Sleeve',
            price: 14.99,
            picture: Second,
            discount: 0,
            rating: 4.1,
            sold: 50
        },
        {
            id: 1,
            name: 'USB-C Cable',
            price: 9.99,
            picture: Third,
            discount: 5,
            rating: 4.3,
            sold: 200
        },
        {
            id: 1,
            name: 'Gaming Mousepad',
            price: 24.99,
            picture: First,
            discount: 0,
            rating: 4.6,
            sold: 100
        },
        {
            id: 1,
            name: 'Wireless Headset',
            price: 79.99,
            picture: Second,
            discount: 10,
            rating: 4.8,
            sold: 300
        },
        {
            id: 1,
            name: 'External Hard Drive',
            price: 99.99,
            picture: Fourth,
            discount: 15,
            rating: 4.7,
            sold: 400
        },
        {
            id: 1,
            name: 'Bluetooth Earbuds',
            price: 39.99,
            picture: Sixth,
            discount: 0,
            rating: 4.4,
            sold: 150
        },
        {
            id: 1,
            name: 'Wireless Router',
            price: 69.99,
            picture: Third,
            discount: 5,
            rating: 4.5,
            sold: 250
        },
        {
            id: 1,
            name: 'Smart Plug',
            price: 19.99,
            picture: Fifth,
            discount: 10,
            rating: 4.2,
            sold: 200
        }
    ];


export const categories: { name: string, Icon: ComponentType<IconType> }[] = [
    {
        name: 'Phones',
        Icon: Smartphone
    },
    {
        name: 'Computers',
        Icon: Laptop2
    },
    {
        name: 'Camera',
        Icon: Camera
    },
    {
        name: 'Headphones',
        Icon: Headphones
    },
    {
        name: 'Gaming',
        Icon: Gamepad2
    },
    {
        name: 'Phones',
        Icon: Smartphone
    },
    {
        name: 'Computers',
        Icon: Laptop2
    },
    {
        name: 'Camera',
        Icon: Camera
    },
    {
        name: 'Headphones',
        Icon: Headphones
    },
    {
        name: 'Gaming',
        Icon: Gamepad2
    },
]