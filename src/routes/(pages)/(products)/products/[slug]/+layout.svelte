<script lang="ts">
	import type { LayoutServerData } from './$types';
	export let data:LayoutServerData;
</script>

<svelte:head><title>{data?.product?.name}</title></svelte:head>
<!-- <div class="flex flex-col items-start justify-start h-full min-h-full py-12 min-w-screen">
	<NewContainer>
		<div class="flex flex-col items-start justify-start w-full h-full gap-10 dark:bg-inherit">
			<slot />
		</div>
	</NewContainer>
</div> -->
<slot/>