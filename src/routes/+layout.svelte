<script lang="ts">
	import ImageDialog from '$lib/components/new/ImageDialog.svelte';
	import './../app.css';
	import imageModalStore from "$lib/stores/ImageModalStore"
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from "svelte-french-toast"
</script>

<ModeWatcher defaultMode="dark" />
{#if $imageModalStore && $imageModalStore.show && $imageModalStore.src && $imageModalStore.alt}
	<ImageDialog src={$imageModalStore?.src || ""} alt={$imageModalStore?.alt || ""}/>
{/if}
<slot />
<Toaster/>