<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { fromProductType2ProductToShow, type Product } from '$lib/types';
	import NewProductCard from './NewProductCard.svelte';
	export let products: Product[];
	$:showProducts = [...products.map(product=>fromProductType2ProductToShow(product))]
	export let classNames:string=""
	export let itemsClassName =
		'basis-[1] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6';
</script>

<Carousel.Root id="carousel" class="w-full h-fit {classNames}" opts={{ align: 'start' }} orientation="horizontal">
	<Carousel.Content class="w-full transition-none duration-0">
		{#each showProducts as { name, price,mainImage, discount, rating,slug, sold }}
			<Carousel.Item class={itemsClassName}>
				<NewProductCard
					productToShow={{
						name,
						price,
						mainImage,
						discount,
						rating,
						sold,
						slug
					}}
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="text-white bg-black" />
	<Carousel.Next class="text-white bg-black" />
</Carousel.Root>
