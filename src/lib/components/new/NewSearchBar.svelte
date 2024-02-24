<script lang="ts">
	import { SearchOutline } from 'flowbite-svelte-icons';
	import { Search } from 'lucide-svelte';

	let value = '';
</script>

<form
	action=""
	class="flex flex-row items-center justify-center relative rounded-md border border-gray-200 gap-0.5 h-10 flex-1"
>
	<label for="search-keywords" hidden>Search</label>
	<input
		type="text"
		id="search-keywords"
		name="search-keywords"
		bind:value
		placeholder="What are you looking for ?"
		class="bg-inherit text-start font-sans text-sm outline-1 p-2 w-full"
	/>
	<button class="flex justify-center items-center px-2 h-full bg-gray-200">
		<Search size="24" />
	</button>
</form>
