<script lang="ts">
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import NewProductCard from './NewProductCard.svelte';
	export let products: {
		id: number;
		name: string;
		price: number;
		picture: string;
		discount: number;
		rating: number;
		sold: number;
	}[];

	export let itemsClassName =
		'w-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6';
</script>

<Carousel.Root id="carousel" class="w-full" opts={{ align: 'start' }} orientation="horizontal">
	<Carousel.Content class="transition-none duration-0 w-full">
		{#each [...products.slice(0, 12)] as { id, name, price, picture, discount, rating, sold }}
			<Carousel.Item class={itemsClassName}>
				<NewProductCard
					details={{
						id,
						name,
						price,
						picture,
						discount,
						rating,
						sold
					}}
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="bg-black text-white" />
	<Carousel.Next class="bg-black text-white" />
</Carousel.Root>
