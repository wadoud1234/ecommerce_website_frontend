<script lang="ts">
	import { HeartIcon } from '$lib/icons';
	import StarRating from './StarRating.svelte';

	type Product = {
		id: number;
		name: string;
		price: number;
		rating: number;
		picture: string;
		discount?: number;
		sold: number;
	};
	export let details: Product;
	const formatProductName = (name: string) => {
		const value = name.slice(0, 23);
		return name.length > 23 ? value + '..' : value;
	};
</script>

<div class="flex flex-col gap-1 lg:max-w-56 overflow-x-hidden">
	<div class="relative h-56 bg-gray-200 flex items-center justify-center">
		<!-- <enhanced:img src="./path/to/your/image.jpg" alt="An alt text" /> -->
		<enhanced:img src={details.picture} alt="product" class="w-[90%] h-[90%] p-8 hover:p-4" />
		<button type="button" class="absolute top-3 right-3 rounded-full bg-white p-1.5 w-9 hover:p-1">
			<enhanced:img src={HeartIcon} alt="like" />
		</button>
	</div>

	<div class="flex flex-col gap-1.5 p-2 overflow-x-hidden w-full">
		<a
			href={`/products/${details.id}`}
			data-sveltekit-noscroll
			data-sveltekit-preload-data
			class="poppins-medium w-56">{formatProductName(details.name)}</a
		>
		<p>
			{#if details.discount}
				<span class="text-red-600 font-medium">${details.discount}</span>
			{/if}
			<span class={`${details.discount && 'line-through text-zinc-600'}`}>${details.price}</span>
		</p>
		<p class="flex items-center gap-1">
			<StarRating rating={details.rating} /><span class="text-zinc-600 poppins-medium"
				>({details.sold})</span
			>
		</p>
	</div>
</div>
