<script lang="ts">
    import * as Table from "$lib/components/ui/table";
	import type { CartItemProduct } from "$lib/types";
	import { CldImage } from "svelte-cloudinary";
    export let cartItemProduct:CartItemProduct
</script>

<Table.Root>
    <Table.Header>
      <Table.Row class="border border-zinc-200">
        <Table.Head class="text-left">Product</Table.Head>
        <Table.Head class="text-center">Price</Table.Head>
        <Table.Head class="text-center">Quantity</Table.Head>
        <Table.Head class="text-right">Subtotal</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell class="flex flex-row items-center justify-start gap-4 font-medium">
            <CldImage src={cartItemProduct.mainImage} alt="product image" width="60" height="60"/>
            {cartItemProduct.name}
        </Table.Cell>
                <Table.Cell class="text-center">{cartItemProduct.price}</Table.Cell>
        <Table.Cell class="text-center">{cartItemProduct.quantity}</Table.Cell>
        <Table.Cell class="text-right">{cartItemProduct.quantity*cartItemProduct.price}</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell class="flex flex-row items-center justify-start gap-4 font-medium">
            <CldImage src={"ecommerce_products/pv1zp5hzww0lb2yayrid"} alt="product image" width="60" height="60"/>
            {cartItemProduct.name}
        </Table.Cell>
        <Table.Cell class="text-center">{cartItemProduct.price}</Table.Cell>
        <Table.Cell class="text-center">{cartItemProduct.quantity}</Table.Cell>
        <Table.Cell class="text-right">{cartItemProduct.quantity*cartItemProduct.price}</Table.Cell>
      </Table.Row><Table.Row>
<Table.Cell class="flex flex-row items-center justify-start gap-4 font-medium">
            <CldImage src={cartItemProduct.mainImage} alt="product image" width="60" height="60"/>
            {cartItemProduct.name}
        </Table.Cell>
                <Table.Cell class="text-center">{cartItemProduct.price}</Table.Cell>
        <Table.Cell class="text-center">{cartItemProduct.quantity}</Table.Cell>
        <Table.Cell class="text-right">{cartItemProduct.quantity*cartItemProduct.price}</Table.Cell>
      </Table.Row><Table.Row>
<Table.Cell class="flex flex-row items-center justify-start gap-4 font-medium">
            <CldImage src={cartItemProduct.mainImage} alt="product image" width="60" height="60"/>
            {cartItemProduct.name}
        </Table.Cell>
                <Table.Cell class="text-center">{cartItemProduct.price}</Table.Cell>
        <Table.Cell class="text-center">{cartItemProduct.quantity}</Table.Cell>
        <Table.Cell class="text-right">{cartItemProduct.quantity*cartItemProduct.price}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table.Root>