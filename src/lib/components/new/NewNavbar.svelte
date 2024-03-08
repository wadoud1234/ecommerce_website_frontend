<script lang="ts">
	import type { User } from 'lucia';
	import IconsList from './IconsList.svelte';
	import NewContainer from './NewContainer.svelte';
	import NewLogo from './NewLogo.svelte';
	import NewMobileMenu from './NewMobileMenu.svelte';
	import ThemeToggleButton from './ThemeToggleButton.svelte';
	import LinksList from './LinksList.svelte';
	import NewSearchBar from './NewSearchBar.svelte';
	export let user: User | null;
	export let announcement: { title: string; link: string } = { title: '', link: '' };
</script>

<div
	class="w-full h-fit flex flex-col relative border-b-zinc-200 dark:border-b-zinc-700 border border-x-0 border-t-0"
>
	{#if announcement.title && announcement.link}
		<div class="Navbar bg-black text-white text-center font-sans py-2">
			{announcement.title} .
			<a href={announcement.link} class="underline underline-offset-1">shop now!</a>
		</div>
	{/if}
	<NewContainer>
		<div class="flex flex-row items-center justify-between w-full pb-2.5 pt-5 gap-4 h-full">
			<NewLogo />
			<LinksList {user} />
			<div class="flex md:hidden">
				<NewSearchBar/>
			</div>
			<div class="flex md:hidden gap-4">
				<ThemeToggleButton />
				<NewMobileMenu {user} />
		</div>
		<IconsList {user} />
		</div>
	</NewContainer>
</div>
