<script lang="ts">
	import LinkAddress from '$lib/components/new/LinkAddress.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import type { User } from 'lucia';
	export let data:any;
	let user:User,visitedUser:User
	$:{({actualUser:user,visitedUser} = data)}
	
</script>
<svelte:head>
	<title>{visitedUser.name}</title>
</svelte:head>
<div class="flex flex-col items-start justify-start h-full min-h-full py-12 min-w-screen">
	<NewContainer>
		<div class="flex flex-col items-start justify-start w-full h-full gap-10 dark:bg-inherit">
			<div class="flex flex-row flex-wrap items-center justify-between w-full h-full md:flex-nowrap">
				<LinkAddress productName={visitedUser.name}/>
				{#if user && user?.name}
				<p class="w-full text-sm text-right">
					Welcome! <span class="font-medium text-red-600 dark:text-red-500 poppins-regular">{user?.name}</span>
				</p>
				{/if}
			</div>
			<slot />
		</div>
	</NewContainer>
</div>
