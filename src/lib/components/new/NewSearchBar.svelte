<script lang="ts">
	import { Search } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';

	let value = '';
</script>

<form
	action=""
	class="flex flex-row items-center justify-center relative rounded-md border border-zinc-400 dark:border-zinc-700 gap-0.5 h-10 flex-1 max-w-[300px]"
>
	<label for="search-keywords" hidden>Search</label>
	<input
		type="text"
		name="search-keywords"
		bind:value
		placeholder="Search ..."
		class="bg-inherit text-start font-sans text-sm outline-none p-2 w-full"
	/>
	<Button
		type="submit" size='icon'
		class="flex justify-center items-center px-2 h-full border border-y-0 border-r-0 border-zinc-400 dark:border-zinc-800 bg-zinc-200 hover:bg-zinc-300 text-black dark:bg-zinc-700 dark:hover:hover:bg-zinc-600 dark:text-zinc-400 rounded-none rounded-r-md"
	>
		<Search size="24" />
</Button>
</form>
