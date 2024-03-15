<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import type { Product } from '$lib/types';
	import NewProductCard from './NewProductCard.svelte';
	export let products: Product[];
	export let classNames:string=""
	export let itemsClassName =
		'basis-[1] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6';
</script>

<Carousel.Root id="carousel" class="w-full h-fit {classNames}" opts={{ align: 'start' }} orientation="horizontal">
	<Carousel.Content class="transition-none duration-0 w-full">
		{#each [...products.slice(0, 12)] as { name, price, picture, discount, rating,slug, sold }}
			<Carousel.Item class={itemsClassName}>
				<NewProductCard
					details={{
						name,
						price,
						picture:picture||"",
						discount,
						rating,
						sold,
						slug
					}}
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="bg-black text-white" />
	<Carousel.Next class="bg-black text-white" />
</Carousel.Root>
