<script lang="ts">
	export let categoryName: string;
	export let categoryIconSrc: string;
</script>

<div class="flex flex-col text-center items-center cursor-pointer">
	<div
		class="bg-white dark:bg-slate-500 rounded-full border-[0.25px] border-gray-300 h-16 w-16 md:h-24 md:w-24"
	>
		<img
			src={categoryIconSrc}
			alt="category"
			class="w-full h-full object-cover object-center p-3 hover:p-2 transition-all duration-300"
		/>
	</div>
	<p class="text-center font-sans font-semibold">{categoryName}</p>
</div>
