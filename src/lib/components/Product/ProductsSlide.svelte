<script lang="ts">
	import ProductCard from './ProductCard.svelte';

	type Products = {
		name: string;
		price: number;
		picture: string;
		likes: number;
		id: number;
		rating: number;
		discount: number;
		sold: number;
	}[];
	export let products: Products;
	export let hidden: boolean;
	$: console.log(hidden);
</script>

<div
	class={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-center justify-center min-w-full ${hidden && 'hidden'}`}
>
	{#each products as { name, price, picture, likes, id, rating, discount, sold }}
		<ProductCard {name} {price} {picture} {likes} {id} {rating} {discount} {sold} />
	{/each}
</div>
