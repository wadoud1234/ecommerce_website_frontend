<script lang="ts">
	import LinkAddress from '$lib/components/new/LinkAddress.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import type { User } from 'lucia';
	import type { Product } from '$lib/types';
	import type { PageData } from './$types';
	export let data:PageData;
	let user:User|null
	let product:any
	$:{({user} = data)}
</script>

<div class=" min-w-screen min-h-full h-full flex flex-col items-start justify-start py-12">
	<NewContainer>
		<slot/>
	</NewContainer>
</div>
