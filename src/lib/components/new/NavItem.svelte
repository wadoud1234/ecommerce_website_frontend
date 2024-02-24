<script lang="ts">
	export let title: string;
</script>

<div
	class="flex items-center justify-between text-lg lg:text-base md:py-2 lg:py-1.5 pr-3 hover:opacity-70 cursor-pointer"
>
	<p>{title}</p>
	<slot />
</div>
