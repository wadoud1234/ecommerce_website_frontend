<script lang="ts">
	import ImageDialog from '$lib/components/new/ImageDialog.svelte';
	import './../app.css';
	import imageModalStore from '$lib/stores/ImageModalStore';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-french-toast';
	import { partytownSnippet } from '@builder.io/partytown/integration';
	import type { LayoutData } from './$types';
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';

	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	export let data: LayoutData;
</script>

<svelte:head>
	<script>
		// Forward the necessary functions to the web worker layer
		partytown = {
			forward: ['dataLayer.push']
		};
	</script>
	{@html '<script>' + partytownSnippet() + '</script>'}
</svelte:head>

<ModeWatcher defaultMode="dark" />
{#if $imageModalStore && $imageModalStore.show && $imageModalStore.src && $imageModalStore.alt}
	<ImageDialog src={$imageModalStore?.src || ''} alt={$imageModalStore?.alt || ''} />
{/if}
<QueryClientProvider client={data.queryClient}>
	<slot />
</QueryClientProvider>
<Toaster />
