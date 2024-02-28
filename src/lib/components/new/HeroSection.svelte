<script>
	import { HeroSectionImage } from '$lib/icons';
	import { Apple, MoveRight } from 'lucide-svelte';
</script>

<div class="Slider md:pl-6 pt-6 w-full h-full">
	<div
		class="bg-black h-full min-w-full w-full flex-1 flex flex-col lg:flex-row justify-between p-4"
	>
		<div
			class="flex flex-col justify-center text-white md:gap-4 lg:gap-6 pl-6 lg:flex-1 items-center lg:items-start"
		>
			<p class="flex items-center gap-3 text-sm font-sans">
				<Apple size="30" /> iphone 14 Series
			</p>
			<h3 class="text-3xl lg:text-4xl font-sans font-semibold">
				Up to 10% <br class="lg:block mb-5 hidden" />off Voucher
			</h3>
			<button
				class="underline underline-offset-1 flex gap-2 text-lg items-center rounded-md w-fit px-3 py-2"
				>Shop Now<MoveRight size="24" /></button
			>
		</div>
		<div class="flex flex-col items-center justify-center lg:flex-1">
			<img
				src={HeroSectionImage}
				alt="hero"
				class="z-10 md:w-[300px] lg:w-:[500px]"
				loading="lazy"
			/>
		</div>
	</div>
</div>
