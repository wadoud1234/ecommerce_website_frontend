<script lang="ts">
	import {
		AndroidLogo,
		AppleLogo,
		DiscountIcon,
		ClothesIcon,
		GithubLogo,
		ElectronicIcon,
		GamesIcon,
		LaptopIcon,
		BooksIcon,
		SportIcon,
		HousesIcon,
		AnimalsIcon
	} from '$lib/icons';
	import CategoryIcon from './CategoryIcon.svelte';
	let categories = [
		{ name: 'Discounts', icon: DiscountIcon },
		{ name: 'PC', icon: LaptopIcon },
		{ name: 'Games', icon: GamesIcon },
		{ name: 'Apple', icon: AppleLogo },
		{ name: 'Android', icon: AndroidLogo },
		{ name: 'Electronics', icon: ElectronicIcon },

		{ name: 'Clothes', icon: ClothesIcon },
		{ name: 'Reading', icon: BooksIcon },
		{ name: 'Sport', icon: SportIcon },
		{ name: 'Houses', icon: HousesIcon },
		{ name: 'Animals', icon: AnimalsIcon },
		{ name: 'Buisness', icon: LaptopIcon },
		{ name: 'Cars', icon: ElectronicIcon },
		{ name: 'Something', icon: DiscountIcon },
		{ name: 'Buisness', icon: ClothesIcon },
		{ name: 'Cars', icon: GithubLogo },
		{ name: 'Something', icon: AppleLogo },
		{ name: 'Buisness', icon: AndroidLogo },
		{ name: 'Cars', icon: LaptopIcon },
		{ name: 'Something', icon: DiscountIcon },
		{ name: 'Buisness', icon: ElectronicIcon },
		{ name: 'Cars', icon: LaptopIcon },
		{ name: 'Something', icon: ElectronicIcon },
		{ name: 'Buisness', icon: AndroidLogo },
		{ name: 'Cars', icon: AppleLogo },
		{ name: 'Something', icon: GamesIcon },
		{ name: 'Buisness', icon: LaptopIcon }
	];
	const cat = [...categories.slice(0, 16)];
</script>

<div class="py-4 flex flex-col items-center justify-center">
	<div class="flex flex-col items-center md:items-start max-w-5/6 gap-6">
		<h3
			class="text-center md:text-start text-3xl font-semibold font-sans dark:text-white/80 text-black/80"
		>
			Shop By Categories
		</h3>
		<div
			class="grid grid-rows-2 grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 md:gap-6 overflow-hidden"
		>
			{#each cat as category}
				<CategoryIcon categoryName={category.name} categoryIconSrc={category.icon} />
			{/each}
		</div>
	</div>
</div>
