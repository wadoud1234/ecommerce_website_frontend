<script lang="ts">
	import { SearchOutline } from 'flowbite-svelte-icons';

	let value = '';
</script>

<form
	action=""
	class="flex flex-row items-center justify-center w-fit relative rounded-md border border-gray-200 gap-[2px] h-10"
>
	<label for="search-keywords" hidden>Search</label>
	<input
		type="text"
		id="search-keywords"
		name="search-keywords"
		bind:value
		placeholder="What are you looking for ?"
		class="flex-1 bg-inherit text-start font-sans text-sm outline-1 p-2"
	/>
	<button class="flex justify-center items-center w-10 h-full bg-slate-200"
		><SearchOutline size="lg" class=" " />
	</button>
</form>
