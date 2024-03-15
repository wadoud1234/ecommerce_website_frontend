<script lang="ts">
	import { Search, X } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let searchKeywords = ""
	const handleSearch = () => {
		const url = new URL("/products",$page.url.origin)
		if(searchKeywords && searchKeywords.length>0) {
			url.searchParams.set("keyword",searchKeywords)
		}

		window.location.href = url.href
		// goto(url,{replaceState:true,invalidateAll:true})

	};
</script>

<form on:submit={handleSearch}
	class="flex flex-row items-center justify-center relative rounded-md border border-zinc-400 dark:border-zinc-700 gap-0.5 h-10 flex-1 max-w-[300px]"
>
	<input
		type="text"
		bind:value={searchKeywords}
		placeholder="Search ..."
		class="bg-inherit text-start font-sans text-sm outline-none p-2 w-full"
	/>
	{#if searchKeywords && searchKeywords.length>0}
		<Button 
			class="bg-inherit p-0 text-zinc-400 hover:bg-inherit hover:text-zinc-500 h-full" 
			on:click={()=>{searchKeywords=""}}
		>
			<X/>
		</Button>
	{/if}
	<Button
		type="submit" size='icon'
		class="flex justify-center items-center px-2 h-full border border-y-0 border-r-0 border-zinc-400 dark:border-zinc-800 bg-zinc-200 hover:bg-zinc-300 text-black dark:bg-zinc-700 dark:hover:hover:bg-zinc-600 dark:text-zinc-400 rounded-none rounded-r-md"
	>
		<Search size="24" />
</Button>
</form>
