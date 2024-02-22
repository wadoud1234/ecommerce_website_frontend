<script lang="ts">
	import {
		AndroidLogo,
		AppleLogo,
		ChromeLogo,
		FirefoxLogo,
		GithubLogo,
		ReactLogo,
		SafariLogo,
		SvelteLogo
	} from '$lib/icons';
	import CategoryIcon from './CategoryIcon.svelte';
	let categories = [
		{ name: 'Cars', icon: SvelteLogo },
		{ name: 'Something', icon: ReactLogo },
		{ name: 'Buisness', icon: SafariLogo },
		{ name: 'Cars', icon: AppleLogo },
		{ name: 'Something', icon: ChromeLogo },
		{ name: 'Buisness', icon: FirefoxLogo },
		{ name: 'Cars', icon: AndroidLogo },
		{ name: 'Something', icon: SvelteLogo },
		{ name: 'Buisness', icon: ChromeLogo },
		{ name: 'Cars', icon: SafariLogo },
		{ name: 'Something', icon: GithubLogo },
		{ name: 'Buisness', icon: SvelteLogo },
		{ name: 'Cars', icon: ReactLogo },
		{ name: 'Something', icon: ChromeLogo },
		{ name: 'Buisness', icon: FirefoxLogo },
		{ name: 'Cars', icon: GithubLogo },
		{ name: 'Something', icon: AppleLogo },
		{ name: 'Buisness', icon: AndroidLogo },
		{ name: 'Cars', icon: SvelteLogo },
		{ name: 'Something', icon: ChromeLogo },
		{ name: 'Buisness', icon: ReactLogo },
		{ name: 'Cars', icon: SvelteLogo },
		{ name: 'Something', icon: ReactLogo },
		{ name: 'Buisness', icon: AndroidLogo },
		{ name: 'Cars', icon: AppleLogo },
		{ name: 'Something', icon: SafariLogo },
		{ name: 'Buisness', icon: SvelteLogo }
	];
	const cat = [...categories.slice(0, 16)];
</script>

<div class="py-4 flex flex-col items-center justify-center">
	<div class="flex flex-col max-w-5/6 gap-6">
		<h3 class="text-start text-3xl font-semibold font-sans dark:text-white/80 text-black/80">
			Shop By Categories
		</h3>
		<div class="grid grid-rows-2 grid-cols-8 gap-6 overflow-hidden">
			{#each cat as category}
				<CategoryIcon categoryName={category.name} categoryIconSrc={category.icon} />
			{/each}
		</div>
	</div>
</div>
