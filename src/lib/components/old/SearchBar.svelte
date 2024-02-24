<script>
	import { SearchOutline } from 'flowbite-svelte-icons';
</script>

<form class="hidden sm:flex items-center justify-center md:w-36 lg:w-42">
	<input
		type="text"
		class="max-w-full bg-gray-300 dark:bg-gray-600 py-1.5 rounded-l-md pr-2 pl-3 placeholder:text-gray-700 dark:placeholder:text-gray-400 outline-none"
		placeholder="Search for products ..."
	/>
	<button type="submit" class="rounded-r-md bg-gray-400 dark:bg-gray-700 py-1.5 px-2 font-semibold">
		<SearchOutline class="w-6 h-6 dark:text-gray-400" />
	</button>
</form>
