<script>
	import CartDataTable from "$lib/components/new/Cart/CartDataTable.svelte";
	// export let data:PageData;
	const cartItemProduct = {id:"test",name:"test",price:10,quantity:1,mainImage:"ecommerce_products/gkgjobvf6ijmbmhmpo2j"}
</script>
<div class="flex flex-col items-start justify-start w-full h-full min-w-screen">
	<CartDataTable cartItemProduct={cartItemProduct}/>
</div>
