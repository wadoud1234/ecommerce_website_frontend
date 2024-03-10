<script lang="ts">
	import { page } from '$app/stores';
	import { firstLetterUpperCase } from '$lib/helpers/strings';
	export let productName:string|null=null
	let pathname: string;
	$: pathname = $page.url.pathname;
	let slugs: string[];
	$: slugs = pathname.split('/');
	$: slugs.shift();
	$: {
		if(productName) {
			slugs.pop()
		}
	}
</script>

<div class="flex flex-row items-center gap-1">
	{#each slugs as slug, i}
		<a
			href={`/${slugs.filter((_, k) => k <= i).join('/')}`}
			class="text-sm poppins-regular underline underline-offset-4">{firstLetterUpperCase(slug)}</a
		>
		{#if i < slugs.length - 1}<span class="text-[12px] mt-1">/</span>{/if}
		{#if productName}/<span>{productName}</span>{/if}
	{/each}
	<!-- <ChevronRight size="16" /> -->
</div>
