<script lang="ts">
	import { page } from '$app/stores';
	import { firstLetterUpperCase } from '$lib/helpers/strings';
	export let productName: string | null = null;
	let pathname: string;
	$: pathname = $page.url.pathname;
	let slugs: string[];
	$: slugs = pathname.split('/');
	$: slugs.shift();
	$: {
		if (productName) {
			slugs.pop();
		}
	}
</script>

<div
	class="flex w-full flex-col flex-start sm:flex-row flex-nowrap sm:items-center gap-1 max-w-full"
>
	{#each slugs as slug, i}
		<a
			href={`/${slugs.filter((_, k) => k <= i).join('/')}`}
			class="text-sm poppins-regular underline underline-offset-4"
		>
			{firstLetterUpperCase(slug)}
		</a>

		{#if i < slugs.length - 1 && !productName}<span class="text-[12px] mt-1">/</span>{/if}
	{/each}
	{#if productName}
		<!-- <div class="w-full flex flex-row items-center flex-wrap"> -->
		<span class="text-sm poppins-regular w-full flex flex-row items-center">/ {productName}</span>
		<!-- </div> -->
	{/if}
	<!-- <ChevronRight size="16" /> -->
</div>
