<script lang="ts">
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils.js';
	import { tick } from 'svelte';
	export let handleCategoryErrorRemove: () => void;
	export let selectedCategory: string;
	$: selectedCategory = selectedValue;
	export let categories: { name: string; slug: string }[];
	let open = false;
	let value = '';
	const onSelect = (currentValue: string, ids: { trigger: string; content: string }) => {
		value = currentValue;
		if (value && value !== 'Select a category...') {
			handleCategoryErrorRemove();
		}
		closeAndFocusTrigger(ids.trigger);
	};
	$: selectedValue = categories?.find((f) => f.name === value)?.slug ?? 'Select a category...';

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search category..." />
			<Command.Empty>No category found.</Command.Empty>
			<Command.Group class="h-[200px] overflow-y-scroll scroll-m-1">
				{#each categories as category}
					<Command.Item value={category?.name} onSelect={(e) => onSelect(e, ids)}>
						<Check class={cn('mr-2 h-4 w-4', value !== category?.name && 'text-transparent')} />
						{category.slug}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
