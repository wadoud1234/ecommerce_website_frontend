<script lang="ts">
    import * as Form from "$lib/components/ui/form"
    import Input from "$lib/components/ui/input/input.svelte"
    import Button from "$lib/components/ui/button/button.svelte";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import AddProductSchema from "./AddProductSchema";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    export let data: SuperValidated<Infer<typeof AddProductSchema>>;

    const form = superForm(data, {
        validators: zodClient(AddProductSchema),
        scrollToError: 'smooth',
        dataType:"json"
    });
    let productImages :string[] = new Array<string>()
    const { form: formData, enhance, message } = form;
    const handlePriceInput = (e:Event)=>{
        const target = e?.target as HTMLInputElement
        if(target?.value){
            $formData.price = +target.value 
        }
    }
    const handleQuantityInput = (e:Event)=>{
        const target = e?.target as HTMLInputElement
        if(target?.value){
            $formData.quantity = +target.value 
        }
    }
    import {CldUploadButton , CldUploadWidget , CldImage} from "svelte-cloudinary"
	import type { onUploadImageResponse } from "$lib/types";
    const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';

    const onUpload = (e:onUploadImageResponse)=>{
        productImages[productImages.length<0?0:productImages.length] = e.info.public_id 
    }
</script>
<div class="h-full min-h-full max-h-full min-w-full max-w-full w-full flex flex-col items-start justify-start gap-4">
    <h1 class="text-3xl font-medium ">Add Product</h1>

    <form method="post" class="flex flex-row items-start justify-start h-full w-full gap-10">
        <!-- LEFT -->
        <div class="flex flex-col items-start justify-start flex-1 h-full gap-2">
            {#if $message}  
                <p>{$message}</p>
            {/if}
            <Form.Field {form} name="name" class="w-full">
                <Form.Control let:attrs>
                    <Form.Label class={labelClasses}>Name</Form.Label>
                    <Input
                        min="8"
                        max="255"
                        required
                        class="bg-inherit border-inherit"
                        {...attrs}
                        type="text"
                        bind:value={$formData.name}
                    />
                </Form.Control>
                <!-- <Form.Description>This is your public display name.</Form.Description> -->
                <Form.FieldErrors class={errorClasses} />
            </Form.Field>
            <Form.Field {form} name="description" class="w-full">
                <Form.Control let:attrs>
                    <Form.Label class={labelClasses}>Description</Form.Label>
                    <Textarea
                        rows={5}
                        class="bg-inherit border-inherit resize-none"
                        {...attrs}
                        bind:value={$formData.description}
                    />
                </Form.Control>
                <!-- <Form.Description>This is your public display name.</Form.Description> -->
                <Form.FieldErrors class={errorClasses} />
            </Form.Field>
            <Form.Field {form} name="price" class="w-full">
                <Form.Control let:attrs>
                    <Form.Label class={labelClasses}>Price</Form.Label>
                    <Input
                        min="0"
                        required
                        class="bg-inherit border-inherit"
                        {...attrs}
                        type="number"
                        on:input={handlePriceInput}
                        bind:value={$formData.price}
                    />
                </Form.Control>
                <!-- <Form.Description>This is your public display name.</Form.Description> -->
                <Form.FieldErrors class={errorClasses} />
            </Form.Field>
            <Form.Field {form} name="quantity" class="w-full">
                <Form.Control let:attrs>
                    <Form.Label class={labelClasses}>Quantity</Form.Label>
                    <Input
                        min="1"
                        required
                        class="bg-inherit border-inherit"
                        {...attrs}
                        type="number"
                        on:input={handleQuantityInput}
                        bind:value={$formData.quantity}
                    />
                </Form.Control>
                <!-- <Form.Description>This is your public display name.</Form.Description> -->
                <Form.FieldErrors class={errorClasses}/>
            </Form.Field>
            <label for="images" hidden>Images</label>
            <input type="hidden" name="images"hidden value={productImages}>
            <Button type="submit">Add</Button>
        </div>
        <!-- RIGHT -->
        <div class="mt-4 max-w-[320px] w-full" >
            {#if productImages && productImages.length===5}
                <div class="grid grid-cols-2 gap-4 max-w-full">
                    <div class="w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] bg-green-700">
                        <CldImage class="rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover" src={productImages[0]}/>
                    </div>
                    <div class="w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] bg-green-700">
                        <CldImage class="rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover" src={productImages[1]}/>
                    </div>
                    <div class="w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] bg-green-700">
                        <CldImage class="rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover " src={productImages[2]}/>
                    </div>
                    <div class="w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] bg-green-700">
                        <CldImage class="rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover " src={productImages[3]}/>
                        </div>
                    <div class="w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] bg-green-700">
                        <CldImage class="rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover " src={productImages[4]}/>
                    </div>
                </div>
            {:else}
                <div class="flex flex-col gap-2 w-full justify-start items-center">
                    <CldUploadButton 
                        uploadPreset="ecommerce_products" 
                        class="w-fit"
                        options={{maxFiles:5}}
                        {onUpload}    
                    >
                        Upload Images
                    </CldUploadButton>
                    <CldUploadWidget uploadPreset='ecommerce_products' />
                </div>
            {/if}
        </div>
    </form>
</div>