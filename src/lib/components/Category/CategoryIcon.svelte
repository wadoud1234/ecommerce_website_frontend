<script lang="ts">
	import { MarketIcon } from '$lib/icons';

	let { categoryName, categoryIconSrc } = $props();
</script>

<div class="flex flex-col text-center items-center">
	<div class="bg-white rounded-full border-[0.25px] border-gray-300 h-24 w-24">
		<img
			src={'/category' + categoryIconSrc}
			alt="icon"
			class="w-full h-full object-cover object-center p-3"
		/>
	</div>
	<p class="text-center font-sans font-semibold">{categoryName}</p>
</div>
