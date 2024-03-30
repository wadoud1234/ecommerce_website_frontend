<script lang="ts">
	import { CldImage } from 'svelte-cloudinary';
	import StarRatingBlock from './StarRatingBlock.svelte';
	import { Heart } from 'lucide-svelte';
	import type { ProductToShow } from '$lib/types';
	import Button from '../ui/button/button.svelte';
	import { openImageModal } from '$lib/stores/ImageModalStore';
	export let productToShow: ProductToShow;
	// const formatProductName = (name: string) => {
	// 	const value = name.slice(0, 20);
	// 	return name.length > 20 ? value + '..' : value;
	// };
</script>

<div
	class="flex flex-col gap-1 overflow-x-hidden border h-full max-h-[353px] lg:max-w-56 border-zinc-300 rounded-xl"
>
	<!-- bg-gray-200 dark:bg-zinc-900 -->
	<div class="relative flex items-center justify-center w-full h-56 max-h-56 rounded-t-xl">
		<!-- <enhanced:img src="./path/to/your/image.jpg" alt="An alt text" /> -->
		<Button
			href={`/products/${productToShow.slug}`}
			aria-label="View Product"
			data-sveltekit-preload-data="hover"
			class=" p-0 w-full h-full bg-inherit hover:bg-inherit rounded-t-xl"
		>
			<CldImage
				src={productToShow.mainImage}
				alt="product"
				class="object-contain object-center min-h-full max-h-full transition-all duration-200 hover:opacity-80 bg-inherit rounded-t-lg"
				loading="lazy"
			/>
		</Button>
		<button
			aria-label="Add to wishlist"
			type="button"
			class="absolute top-3 right-3 rounded-full bg-white hover:bg-zinc-200 dark:bg-zinc-700 p-1.5 w-9 h-9 dark:hover:bg-zinc-700 hover:text-inherit/60 transition-all duration-200"
		>
			<Heart class="" />
		</button>
	</div>

	<div
		class="flex flex-col items-start justify-between overflow-y-hidden gap-1.5 p-2 overflow-x-hidden w-full rounded-b-xl"
	>
		<a
			href={`/products/${productToShow.slug}`}
			data-sveltekit-preload-data="hover"
			class="w-56 h-[48px] cursor-pointer font-medium flex flex-wrap flex-row"
		>
			{productToShow?.name?.trim().length ? productToShow.name : 'Product Name'}
		</a>
		<p>
			{#if productToShow?.discount}
				<span class="font-medium text-red-600 dark:text-red-500">${productToShow?.discount}</span>
			{/if}
			<span class={`${productToShow?.discount && 'line-through text-zinc-600 dark:text-zinc-400'}`}
				>${productToShow?.price}</span
			>
		</p>
		<p class="flex items-center gap-3">
			<StarRatingBlock score={productToShow?.rating} starSize={16} />
			<span class="text-zinc-600 dark:text-zinc-400 poppins-medium">({productToShow?.sold})</span>
		</p>
	</div>
</div>
