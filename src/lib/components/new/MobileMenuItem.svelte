<script lang="ts">
	import Separator from './Separator.svelte';
	export let link: string;
	export let text: string;
</script>

<a
	href={link}
	class="hover:text-black/80 w-full py-2 text-lg poppins-regular text-center border-b-gray-300 border-t-0 border-x-0 border"
>
	{text}
</a>
