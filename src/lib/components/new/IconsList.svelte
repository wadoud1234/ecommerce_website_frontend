<script lang="ts">
	import type { UserAuthData } from '$lib/stores/AuthStore';
	import { Heart, ShoppingCart, UserRound } from 'lucide-svelte';
	import AccountMenu from './AccountMenu/Menu.svelte';
	import type { User } from 'lucia';
	import ThemeToggleButton from './ThemeToggleButton.svelte';
	export let user: User;
</script>

<div class="hidden md:flex flex-row items-center justify-between gap-4 pr-2">
	<!-- <button type="button"><a href="/account/favourites"><Heart size="24" /></a></button>
	<button type="button"><a href="/cart"><ShoppingCart size="24" /></a></button> -->
	<ThemeToggleButton />

	<AccountMenu {user} />
</div>
