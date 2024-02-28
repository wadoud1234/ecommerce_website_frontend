<script lang="ts">
	import { page } from '$app/stores';
	import NewContainer from '$lib/components/new/NewContainer.svelte';

	let id = $page.params.id;
</script>

<div class="min-h-screen h-full">
	<NewContainer>Hello World</NewContainer>
</div>
