<script lang="ts">
	export let link: string;
	export let text: string;
</script>

<a
	href={link}
	class="hover:text-zinc-600 dark:hover:text-zinc-600 w-full py-2 text-lg poppins-regular text-center border-b-gray-300 dark:border-b-zinc-900 border-t-0 border-x-0 border"
>
	{text}
</a>
