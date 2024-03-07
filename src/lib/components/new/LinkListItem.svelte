<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let link: string;
	let active: boolean = false;
	let pathname: string;
	$: {
		pathname = $page.url.pathname;
		active = pathname === link;
	}
</script>

<li>
	<a href={link} class={`text-lg font-sans ${active ? 'active' : ''}`}>{title}</a>
</li>

<style>
	/* .non-active {
		@apply no-underline;
	} */
	.active {
		@apply underline underline-offset-4;
	}
</style>
