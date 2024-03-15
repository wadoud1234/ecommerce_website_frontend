<script lang="ts">
	import { HeartIcon } from '$lib/icons';
	import { CldImage } from 'svelte-cloudinary';
	import StarRatingBlock from './StarRatingBlock.svelte';
	import { Heart } from 'lucide-svelte';
	import type { Product } from '$lib/types';
	import Button from '../ui/button/button.svelte';
	import { openImageModal } from '$lib/stores/ImageModalStore';
	type ShowProduct = {
		name: string;
		price: number;
		picture: string;
		discount?: number;
		rating: number;
		sold: number;
		slug:string
	}
	export let details:ShowProduct;
	const formatProductName = (name: string) => {
		const value = name.slice(0, 20);
		return name.length > 20 ? value + '..' : value;
	};
	
</script>

<div class="flex flex-col gap-1 h-fit lg:max-w-56 overflow-x-hidden border border-zinc-400 rounded-xl">
	<div class="relative h-56 bg-gray-200 dark:bg-zinc-900 flex items-center justify-center rounded-t-xl">
		<!-- <enhanced:img src="./path/to/your/image.jpg" alt="An alt text" /> -->
		<Button 
			on:click={() => openImageModal(details.picture,details.name)} 
			class="w-fit h-fit bg-inherit hover:bg-inherit rounded-t-xl"
		>
			<CldImage
			src={details.picture}
			alt="product"
			class="w-[80%] h-44 sm:p-4 hover:scale-110 transition-all duration-200 object-contain object-center rounded-md"
			loading="lazy"
			/>
		</Button>
		<button
			type="button"
			class="absolute top-3 right-3 rounded-full bg-white dark:bg-zinc-600 p-1.5 w-9 h-9 hover:scale-110 transition-all duration-200"
		>
			<Heart class="hover:scale-110" />
		</button>
	</div>

	<div class="flex flex-col gap-1.5 p-2 overflow-x-hidden w-full rounded-b-xl">
		<a
			href={`/products/${details.slug}`}
			data-sveltekit-preload-data="hover"
			class="poppins-medium w-56 cursor-pointer">{formatProductName(details.name)}</a
		>
		<p>
			{#if details?.discount}
				<span class="text-red-600 dark:text-red-500 font-medium">${details?.discount}</span>
			{/if}
			<span class={`${details?.discount && 'line-through text-zinc-600 dark:text-zinc-400'}`}
				>${details?.price}</span
			>
		</p>
		<p class="flex items-center gap-1">
			<StarRatingBlock score={details?.rating} starSize={20} />
			<span class="text-zinc-600 dark:text-zinc-400 poppins-medium">({details?.sold})</span>
		</p>
	</div>
</div>
