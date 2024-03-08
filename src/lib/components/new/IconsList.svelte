<script lang="ts">
	import type { UserAuthData } from '$lib/stores/AuthStore';
	import { Heart, ShoppingCart, UserRound } from 'lucide-svelte';
	import AccountMenu from './AccountMenu/Menu.svelte';
	import type { User } from 'lucia';
	import ThemeToggleButton from './ThemeToggleButton.svelte';
	import NewSearchBar from './NewSearchBar.svelte';
	export let user: User | null;
</script>

<div class="hidden md:flex flex-row items-center justify-between gap-4 pr-2">
	<NewSearchBar />
	<ThemeToggleButton />
	<AccountMenu {user} />
</div>
