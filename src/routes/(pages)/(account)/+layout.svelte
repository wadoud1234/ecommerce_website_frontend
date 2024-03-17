<script lang="ts">
	import LinkAddress from '$lib/components/new/LinkAddress.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import type { LayoutServerData } from './$types';
	export let data:LayoutServerData;
</script>

<div class="flex flex-col items-start justify-start h-full min-h-full py-12 min-w-screen">
	<NewContainer>
		<div class="flex flex-col items-start justify-start w-full h-full gap-10 dark:bg-inherit">
			<div class="flex flex-row items-center justify-between w-full">
				<LinkAddress productName={null}/>
				<p class="flex flex-row items-center justify-end gap-1 text-sm w-fit">
					Welcome! <span class="font-medium text-red-600 dark:text-red-500 poppins-regular">{data?.user?.name}</span>
				</p>
			</div>
			<slot />
		</div>
	</NewContainer>
</div>
