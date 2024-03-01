<script lang="ts">
	import { Search } from 'lucide-svelte';

	let value = '';
</script>

<form
	action=""
	class="flex flex-row items-center justify-center relative rounded-md border border-zinc-200 dark:border-zinc-900 gap-0.5 h-10 flex-1 max-w-[500px]"
>
	<label for="search-keywords" hidden>Search</label>
	<input
		type="text"
		id="search-keywords"
		name="search-keywords"
		bind:value
		placeholder="Search ..."
		class="bg-inherit text-start font-sans text-sm outline-1 p-2 w-full"
	/>
	<button
		type="submit"
		class="flex justify-center items-center px-2 h-full bg-gray-200 dark:bg-gray-700"
	>
		<Search size="24" />
	</button>
</form>
