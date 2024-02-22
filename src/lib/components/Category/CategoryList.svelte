<script lang="ts">
	import CategoryIcon from './CategoryIcon.svelte';

	const categories = $state([
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' },
		{ name: 'Cars', icon: '/car-icon.svg' },
		{ name: 'Something', icon: '/car-icon.svg' },
		{ name: 'Buisness', icon: '/house-icon.svg' }
	]);
	const cat = $derived(categories.slice(0, 16));
</script>

<div class="py-4 flex flex-col gap-6">
	<h3 class="text-center text-3xl font-semibold">Categories</h3>
	<div class="grid grid-rows-2 grid-cols-8 gap-4 overflow-hidden">
		{#each cat as category}
			<CategoryIcon 
                categoryName={category.name} 
                categoryIconSrc={category.icon}
            />
		{/each}
	</div>
</div>
