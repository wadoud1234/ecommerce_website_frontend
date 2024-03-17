<script lang="ts">
	import AccountMenu from './AccountMenu/Menu.svelte';
	import type { User } from 'lucia';
	import ThemeToggleButton from './ThemeToggleButton.svelte';
	import NewSearchBar from './NewSearchBar.svelte';
	export let user: User | null;
</script>

<div class="flex-row items-center justify-between hidden gap-4 pr-2 md:flex">
	<NewSearchBar />
	<ThemeToggleButton />
	<AccountMenu {user} />
</div>
