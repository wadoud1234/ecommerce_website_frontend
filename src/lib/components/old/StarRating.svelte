<script lang="ts">
	export let rating = 4.95;
	import { Rating } from 'flowbite-svelte';
</script>

<Rating {rating} id="rating">
	<span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
	<a
		href="/"
		class="dark:text-black text-sm font-medium text-gray-900 underline hover:no-underline"
	>
		73 reviews
	</a>
</Rating>
