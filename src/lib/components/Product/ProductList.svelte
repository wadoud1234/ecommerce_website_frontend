<script lang="ts">
	import ProductCard from './ProductCard.svelte';
	const { title, cols = 6, rows } = $props();
	import Carousel from 'svelte-carousel';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// import 'svelte-carousel/dist/style.css';
	let carousel;
	const productChunks = [];
	const chunkSize = 5;
	const products = [
		{ name: 'Pc Gamer', price: 100, picture: '/pc_gamer_1.jpg', likes: 100, id: 0 },
		{ name: 'Headset For Gamers', price: 200, picture: '/headset_1.jpg', likes: 200, id: 1 },
		{ name: 'Pc I5 professionel', price: 300, picture: '/pc_gamer_1.jpg', likes: 300, id: 2 },
		{ name: 'Gaming Headset', price: 400, picture: '/headset_1.jpg', likes: 400, id: 3 },
		{ name: 'Pc Gamer', price: 100, picture: '/pc_gamer_1.jpg', likes: 100, id: 4 },
		{ name: 'Pc Etude ', price: 200, picture: '/pc_gamer_1.jpg', likes: 200, id: 5 },
		{ name: 'Product 3', price: 300, picture: '/pc_gamer_1.jpg', likes: 300, id: 6 },
		{ name: 'Product 4', price: 400, picture: '/headset_1.jpg', likes: 400, id: 7 },
		{ name: 'Product 1', price: 100, picture: '/pc_gamer_1.jpg', likes: 100, id: 8 },
		{ name: 'Product 2', price: 200, picture: '/pc_gamer_1.jpg', likes: 200, id: 9 },
		{ name: 'Product 3', price: 300, picture: '/headset_1.jpg', likes: 300, id: 10 },
		{ name: 'Product 4', price: 400, picture: '/pc_gamer_1.jpg', likes: 400, id: 11 }
	];
	const productsToShow = $derived(products.slice(0, 6));
	function chunkProducts() {
		for (let i = 0; i < products.length; i += chunkSize) {
			productChunks.push(products.slice(i, i + chunkSize));
		}
	}
	const handleNextClick = () => {
		carousel.goToNext();
	};
</script>

<div class="flex flex-col gap-6 w-full items-center p-4">
	<h3 class="text-3xl font-semibold text-center">{title}</h3>
	<div
		class={`grid ${'grid-cols-' + (cols - 4)} sm:${'grid-cols-' + (cols - 3)} md:${'grid-cols-' + (cols - 2)} lg:${'grid-cols-' + cols} xl:${'grid-cols-' + (cols + 1)} gap-2 lg:gap-4 overflow-hidden`}
	>
		{#each productsToShow as { name, price, picture, likes, id }}
			<ProductCard {name} {price} {picture} {likes} {id} />
		{/each}
	</div>
	{#if browser}
		<Carousel perPage={5} bind:this={carousel}>
			<div>1</div>
			<div>2</div>
			<div>3</div>
		</Carousel>
	{/if}

	<button on:click={handleNextClick}>Next</button>
</div>
