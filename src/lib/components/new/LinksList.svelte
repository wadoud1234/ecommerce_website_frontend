<script lang="ts">
	import { page } from '$app/stores';
	import LinkListItem from './LinkListItem.svelte';
	let pathname: string;
	$: pathname = $page.url.pathname;

	const listItems: { title: string; link: string }[] = [
		{
			title: 'Home',
			link: '/home'
		},
		{
			title: 'Contact',
			link: '/contact'
		},
		{
			title: 'About',
			link: '/about'
		}
	];
</script>

<div class="hidden md:flex flex-row items-center flex-1 justify-center">
	<ul class="flex flex-row items-center justify-around flex-1 gap-4 md:max-w-64">
		{#each listItems as { title, link }}
			<LinkListItem {title} {link} active={pathname === link} />
		{/each}
	</ul>
</div>
