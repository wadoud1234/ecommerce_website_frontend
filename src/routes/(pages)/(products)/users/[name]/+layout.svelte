<script lang="ts">
	import LinkAddress from '$lib/components/new/LinkAddress.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import type { User } from 'lucia';
	export let data:any;
	let user:User,visitedUser:User
	$:{({actualUser:user,visitedUser} = data)}
	
</script>

<div class=" min-w-screen min-h-full h-full flex flex-col items-start justify-start py-12">
	<NewContainer>
		<div class="h-full w-full flex flex-col justify-start items-start gap-10 dark:bg-inherit">
			<div class="w-full h-full flex flex-wrap flex-row md:flex-nowrap justify-between items-center">
				<LinkAddress productName={visitedUser.name}/>
				{#if user && user.name}
				<p class="text-sm w-full text-right">
					Welcome! <span class="text-red-600 dark:text-red-500 poppins-regular font-medium">{user.name}</span>
				</p>
				{/if}
			</div>
			<slot />
		</div>
	</NewContainer>
</div>
