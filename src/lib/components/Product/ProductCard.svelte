<script lang="ts">
	const { name, price, likes, picture,id } = $props();
	import {HeartOutline} from "flowbite-svelte-icons"
</script>

<a href={`/products/${id}`} class="flex flex-col rounded-md  relative border-[0.25px] border-gray-300 shadow-sm">
	<img src={picture} alt="" class="rounded-t-md h-52"/>
	<div class="flex flex-col gap-1 pl-2 py-2 bg-red-400 rounded-b-md">
		<p class="font-semibold text-1xl font-sans">{price}</p>
		<p class="text-2x font-semibold">{name}</p>
	</div>	
	<div class="absolute top-2 right-2">
		<HeartOutline 
			size="xl" 
			class=" relative bg-gray-200 p-[6px] cursor-pointer rounded-full" 
		/>
		<span class="rounded-full p-[2px] text-[12px] absolute -top-2 right-5 bg-red-400 text-white">
			{likes}
		</span>

	</div>
</a>
