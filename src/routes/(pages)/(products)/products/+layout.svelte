<script lang="ts">
	import NewContainer from '$lib/components/new/NewContainer.svelte';
</script>

<svelte:head>
	<title>Products</title>
</svelte:head>

<div class="flex flex-col items-start justify-start h-full min-h-full py-12 min-w-screen">
	<NewContainer>
		<slot/>
	</NewContainer>
</div>
