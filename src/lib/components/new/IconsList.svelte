<script>
	import { Heart, ShoppingCart, UserRound } from 'lucide-svelte';
</script>

<div class="hidden lg:flex flex-row items-center justify-between gap-4">
	<button type="button"><a href="/account/favourites"><Heart size="24" /></a></button>
	<button type="button"><a href="/cart"><ShoppingCart size="24" /></a></button>
	<button type="button"><a href="/account"><UserRound size="24" /></a></button>
</div>
