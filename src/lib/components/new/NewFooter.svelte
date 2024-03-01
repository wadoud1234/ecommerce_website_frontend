<script>
	import { AtSign, HeartIcon, SendHorizontal } from 'lucide-svelte';
	import Separator from './Separator.svelte';
	import NewContainer from './NewContainer.svelte';
	const year = new Date().getFullYear();
	export let loggedIn = false;
</script>

<footer
	class="bg-black text-white border border-b-0 border-x-0 border-t-gray-200 dark:border-t-zinc-800 flex flex-col items-center justify-center w-full mt-8"
>
	<NewContainer>
		<div class="flex flex-row items-center justify-center w-full py-10">
			<div
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full gap-6 text-base items-start"
			>
				<!-- DIV 1 -->
				<div class="flex col-span-1 lg:col-span-2 flex-col gap-2 w-fit sm:mx-0">
					<h3 class="text-2xl font-semibold header">Exclusive</h3>
					<p class="text-base element">Subscribe to get informed about new products</p>
					<p>And Get Huge Discounts</p>
					<form
						action=""
						class="flex gap-1 w-fit items-center border-white border border-1 text-white"
					>
						<label for="email" hidden>Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Your Email"
							class="bg-inherit w-full max-w-[340px] p-2 px-4 placeholder:text-sm"
						/>
						<button type="submit" class="p-2 bg-gray-800"><SendHorizontal /></button>
					</form>
				</div>

				<!-- DIV2 -->
				<div class="flex flex-col gap-2 w-fit">
					<h3 class="text-2xl font-semibold">Support</h3>

					<ul class="flex flex-col gap-2">
						<li>Ain Temouchent</li>
						<li>support@email.com</li>
						<li>+213 00 000 000</li>
					</ul>
				</div>

				<!-- DIV3 -->
				<div class="flex flex-col gap-2 w-fit">
					<h3 class="text-2xl font-semibold">Account</h3>
					<ul class="flex flex-col gap-2">
						{#if loggedIn}
							<li><a href="/account">My Account</a></li>
						{:else}
							<li><a href="/auth/register">Register</a></li>
						{/if}
						<li><a href="/cart">cart</a></li>
						<li><a href="/orders">Orders</a></li>
						<li><a href="/products">Products</a></li>
					</ul>
				</div>

				<!-- DIV4 -->
				<div class="flex flex-col gap-2 w-fit">
					<h3 class="text-2xl font-semibold">Quick Links</h3>
					<ul class="flex flex-col gap-2">
						<li><a href="/">Home Page</a></li>
						<li><a href="/about">About</a></li>
						<li><a href="/contact">Contact</a></li>
					</ul>
				</div>
			</div>
		</div>
		<Separator classNames="border-white/40" padding="p-0" />
		<p class="text-center text-white/40 py-4">Copyright SHOP {year}. All right reserved</p>
	</NewContainer>
</footer>

<style>
	h3 {
		@apply text-white/80;
	}
	* {
		@apply text-white/40 dark:text-zinc-400 dark:hover:text-zinc-300 hover:text-white/60;
	}
</style>
