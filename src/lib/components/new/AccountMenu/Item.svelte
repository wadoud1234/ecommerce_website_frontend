<script lang="ts">
	export let title: string;
	import { SvelteComponent, type ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	export let Icon: ComponentType<IconType>;
	export let size = 24;
	export let link;
</script>

<a
	href={link}
	class="hover:bg-black/5 dark:hover:bg-white/5 w-full flex flex-row items-center justify-start gap-4 pl-4 pr-16 py-1.5"
>
	<svelte:component this={Icon} {size} />
	<span>{title}</span>
</a>
