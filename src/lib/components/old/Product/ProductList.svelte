<script lang="ts">
	import { ArrowLeftOutline, ArrowRightOutline } from 'flowbite-svelte-icons';
	import Container from '../Container.svelte';
	import ProductCard from './ProductCard.svelte';
	import ProductsSlide from './ProductsSlide.svelte';
	import { products } from '$lib/data';
	export let title: string;

	// const products = [
	// 	{ name: 'Pc Gamer', price: 100, picture: '/products/cap-1.jpeg', likes: 100, id: 0 },
	// 	{ name: 'Headset For Gamers', price: 200, picture: '/products/jean-1.jpeg', likes: 200, id: 1 },
	// 	{ name: 'Pc I5 professionel', price: 300, picture: '/products/S24-1.jpeg', likes: 300, id: 2 },
	// 	{ name: 'Gaming Headset', price: 400, picture: '/products/clock-1.jpeg', likes: 400, id: 3 },
	// 	{ name: 'Pc Gamer', price: 100, picture: '/products/veste-1.jpeg', likes: 100, id: 4 },
	// 	{ name: 'Pc Gamer', price: 100, picture: '/products/cap-2.jpeg', likes: 100, id: 0 },
	// 	{ name: 'Headset For Gamers', price: 200, picture: '/products/jean-2.jpeg', likes: 200, id: 1 },
	// 	{ name: 'Pc I5 professionel', price: 300, picture: '/products/S24-2.jpeg', likes: 300, id: 2 },
	// 	{ name: 'Gaming Headset', price: 400, picture: '/products/clock-2.jpeg', likes: 400, id: 3 },
	// 	{ name: 'Pc Gamer', price: 100, picture: '/products/veste-2.jpeg', likes: 100, id: 4 },
	// 	{ name: 'Pc Gamer', price: 100, picture: '/products/cap-3.jpeg', likes: 100, id: 0 },
	// 	{ name: 'Headset For Gamers', price: 200, picture: '/products/jean-3.jpeg', likes: 200, id: 1 },
	// 	{ name: 'Pc I5 professionel', price: 300, picture: '/products/S24-3.jpeg', likes: 300, id: 2 },
	// 	{ name: 'Gaming Headset', price: 400, picture: '/products/clock-3.jpeg', likes: 400, id: 3 },
	// 	{ name: 'Pc Gamer', price: 100, picture: '/products/veste-3.jpeg', likes: 100, id: 4 }
	// ];

	const chunkSize = 5;
	let chunkNumber: number = 0;
	function goNext() {
		if (chunkNumber === 3) {
			chunkNumber = 0;
		} else {
			chunkNumber = chunkNumber + 1;
		}
	}
	function goBack() {
		if (chunkNumber === 0) {
			chunkNumber = 3;
		} else {
			chunkNumber = chunkNumber - 1;
		}
	}
	// let productsToShow = [...products.slice(chunkNumber, chunkNumber + chunkSize)];
</script>

<div class="flex flex-col gap-6 items-center p-4">
	<Container>
		<div class="gap-6 flex flex-col items-center justify-center w-full">
			<div class="flex flex-row justify-between w-full">
				<h3 class="text-3xl font-semibold text-start text-black/80 dark:text-white/80">{title}</h3>
				<div class="flex flex-row items-center justify-end gap-2">
					<ArrowLeftOutline
						class="border-1 p-1 border-black border hover:text-black/40 rounded-full cursor-pointer"
						size="xl"
						on:click={goBack}
					/>
					<!-- <p class="text-xl mb-1 font-semibold mx-1">{chunkNumber}</p> -->
					<ArrowRightOutline
						class="border-1 rounded-full border-black hover:text-black/40 border-1 border p-1 cursor-pointer"
						size="xl"
						on:click={goNext}
					/>
				</div>
			</div>
			<div>
				<ProductsSlide hidden={chunkNumber !== 0} products={[...products.slice(0, chunkSize)]} />
				<ProductsSlide
					hidden={chunkNumber !== 1}
					products={[...products.slice(1, 1 + chunkSize)]}
				/>
				<ProductsSlide
					hidden={chunkNumber !== 2}
					products={[...products.slice(2, 2 + chunkSize)]}
				/>
				<ProductsSlide
					hidden={chunkNumber !== 3}
					products={[...products.slice(3, 3 + chunkSize)]}
				/>
			</div>
		</div>
	</Container>
</div>
