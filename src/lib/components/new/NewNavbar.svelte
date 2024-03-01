<script lang="ts">
	import type { User } from 'lucia';
	import IconsList from './IconsList.svelte';
	import NewContainer from './NewContainer.svelte';
	import NewLogo from './NewLogo.svelte';
	import NewMobileMenu from './NewMobileMenu.svelte';
	import NewSearchBar from './NewSearchBar.svelte';
	import ThemeToggleButton from './ThemeToggleButton.svelte';
	export let user: User;
	export let announcement: { title: string; link: string } = { title: '', link: '' };
</script>

<div
	class="w-full h-fit flex flex-col relative border-b-gray-200 dark:border-b-zinc-800 border border-x-0 border-t-0"
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
			<!-- <LinksList /> -->

			<NewSearchBar />
			<div class="flex md:hidden">
				<ThemeToggleButton />
			</div>
			<IconsList {user} />
			<NewMobileMenu {user} />
		</div>
	</NewContainer>
</div>
