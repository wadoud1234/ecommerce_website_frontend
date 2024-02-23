<script lang="ts">
	import IconsList from './IconsList.svelte';
	import LinksList from './LinksList.svelte';
	import NewContainer from './NewContainer.svelte';
	import NewLogo from './NewLogo.svelte';
	import NewSearchBar from './NewSearchBar.svelte';

	export let announcement: { title: string; link: string } = { title: '', link: '' };
</script>

<div class="w-full flex flex-col">
	{#if announcement.title && announcement.link}
		<div class="Navbar bg-black text-white text-center font-sans py-2">
			{announcement.title} .
			<a href={announcement.link} class="underline underline-offset-1">shop now!</a>
		</div>
	{/if}
	<NewContainer>
		<div class="flex flex-row items-center w-full pb-2.5 pt-5 h-full">
			<NewLogo />
			<LinksList />
			<div class="flex flex-row items-center gap-5 justify-end">
				<NewSearchBar />
				<IconsList />
			</div>
		</div>
	</NewContainer>
</div>
