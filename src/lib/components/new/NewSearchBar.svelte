<script lang="ts">
	import { Search, X } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { generateState } from 'arctic';
	import { generateSlug } from '$lib/helpers/strings';

	let searchKeywords = '';
	const handleSearch = async () => {
		const isProductsPathname = $page.url.pathname === '/products';

		const url = new URL(isProductsPathname ? $page.url : '/products');

		if (searchKeywords?.length > 0) {
			url.searchParams.set('keyword', searchKeywords.toLowerCase());
		}
		console.log($page.url.toString());
		const stringUrl = url?.toString();
		window.location.href = stringUrl;
	};
</script>

<form
	on:submit={handleSearch}
	class="flex flex-row items-center justify-center relative rounded-md border border-zinc-300 dark:border-zinc-800 gap-0.5 h-10 flex-1 max-w-[300px]"
>
	<input
		type="text"
		bind:value={searchKeywords}
		on:input={() => {
			console.log({ searchKeywords });
		}}
		placeholder="Search ..."
		class="w-full p-2 font-sans text-sm outline-none bg-inherit text-start"
	/>
	{#if searchKeywords && searchKeywords.length > 0}
		<Button
			type="reset"
			aria-label="Clear search"
			class="h-full p-0 bg-inherit text-zinc-400 hover:bg-inherit hover:text-zinc-500"
			on:click={() => {
				searchKeywords = '';
			}}
		>
			<X />
		</Button>
	{/if}
	<Button
		aria-label="Search"
		type="submit"
		size="icon"
		class="flex items-center justify-center h-full px-2 text-black border border-r-0 rounded-none border-y-0 border-zinc-300 dark:border-zinc-800 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:hover:bg-zinc-600 dark:text-zinc-400 rounded-r-md"
	>
		<Search size="24" />
	</Button>
</form>
