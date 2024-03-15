<script lang="ts">
	import LinkAddress from '$lib/components/new/LinkAddress.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import type { User } from 'lucia';
	import type { LayoutServerData } from './$types';
	export let data:LayoutServerData;
	let user:User
	$:user = data?.user
</script>

<div class=" min-w-screen min-h-full h-full flex flex-col items-start justify-start py-12">
	<NewContainer>
		<div class="h-full w-full flex flex-col justify-start items-start gap-10 dark:bg-inherit">
			<div class="w-full flex flex-row justify-between items-center">
				<LinkAddress productName={null}/>
				<p class="text-sm">
					Welcome! <span class="text-red-600 dark:text-red-500 poppins-regular font-medium">{user.name}</span>
				</p>
			</div>
			<slot />
		</div>
	</NewContainer>
</div>
