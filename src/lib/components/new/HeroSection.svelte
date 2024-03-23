<script lang="ts">
	// import { HeroSectionImage } from '$lib/icons';
	import { Apple, MoveRight } from 'lucide-svelte';
	// ts-ignore
	import Image from '$lib/wadoud/hero_section.png?enhanced';
</script>

<div class="w-full h-full pt-6 Slider md:pl-6">
	<div
		class="flex flex-col justify-between flex-1 w-full h-full min-w-full p-4 bg-black lg:flex-row"
	>
		<div
			class="flex flex-col items-center justify-center pl-6 text-white md:gap-4 lg:gap-6 lg:flex-1 lg:items-start"
		>
			<p class="flex items-center gap-3 font-sans text-sm">
				<Apple size="30" /> iphone 14 Series
			</p>
			<h3 class="font-sans text-2xl font-semibold lg:text-4xl">
				Up to 10% <br class="hidden mb-5 lg:block" />off Voucher
			</h3>
			<button aria-label="Shop Now"
				type="button"
				class="flex items-center gap-2 px-3 py-2 text-lg underline rounded-md underline-offset-1 w-fit"
				>
				Shop Now<MoveRight size="24" />
				</button
			>
		</div>
		<div class="flex flex-col items-center justify-center lg:flex-1">
			<img 
				src={Image} 
				alt="hero" 
				class="z-10 md:w-[300px] lg:w-:[500px]"
				loading="lazy"
			/>
		</div>
	</div>
</div>
