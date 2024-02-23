<script lang="ts">
	import { page } from '$app/stores';
	import LinkListItem from './LinkListItem.svelte';
	let pathname: string;
	$: pathname = $page.url.pathname;
	$: console.log(pathname);

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
		},
		{
			title: 'Register',
			link: '/auth/register'
		}
	];
</script>

<ul class="ml-8 flex flex-row items-center gap-5 flex-1 justify-center">
	{#each listItems as { title, link }}
		<LinkListItem {title} {link} active={pathname === link} />
	{/each}
</ul>
