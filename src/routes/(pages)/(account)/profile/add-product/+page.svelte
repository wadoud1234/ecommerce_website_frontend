<script lang="ts">
    import * as Form from "$lib/components/ui/form"
    import Input from "$lib/components/ui/input/input.svelte"
    import Button from "$lib/components/ui/button/button.svelte";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import AddProductSchema from "./AddProductSchema";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import {CldUploadButton , CldUploadWidget , CldImage} from "svelte-cloudinary"
	import { CategoriesData, type onUploadImageResponse } from "$lib/types";
	import { ImageUp } from "lucide-svelte";
    import * as Select from "$lib/components/ui/select";
	import AddProductImage from "$lib/components/new/Product/AddProductImage.svelte";
	import toast from "svelte-french-toast";
	import { invalidateAll, replaceState } from "$app/navigation";
	import { page } from "$app/stores";

    export let data: SuperValidated<Infer<typeof AddProductSchema>>;

    const form = superForm(data, {
        validators: zodClient(AddProductSchema),
        scrollToError: 'smooth',
        dataType:"json"
        
        
    });
    let productImages :string[] =new Array<string>()

    const { form: formData,message} = form;
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
    
    const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';
    const onUpload = (results:onUploadImageResponse)=>{
        productImages[productImages.length<0?0:productImages.length] = results.info.public_id 
    }
    $: selectedCategory = $formData.category ? {
        label: $formData.category,
        value: $formData.category
    }: undefined;
</script>

<svelte:head>
    <title>Add Product</title>
</svelte:head>
<div class="h-full min-h-full max-h-full min-w-full max-w-full w-full flex flex-col items-start justify-start gap-4">
    <h1 class="text-3xl font-medium ">Add Product</h1>

    <form  method="POST" class="flex flex-row items-start justify-start h-full w-full gap-10">
        <!-- LEFT -->
        <div class="lg:max-w-[50%] flex flex-col items-start justify-start flex-1 h-full gap-2">
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
                        class="bg-inherit border border-zinc-400 dark:border-zinc-800 border-inherit"
                        {...attrs}
                        type="text"
                        bind:value={$formData.name}
                    />
                </Form.Control>
                <!-- <Form.Description>This is your public display name.</Form.Description> -->
                <Form.FieldErrors class={errorClasses}/>
            </Form.Field>
            <Form.Field {form} name="description" class="w-full">
                <Form.Control let:attrs>
                    <Form.Label class={labelClasses}>Description</Form.Label>
                    <Textarea
                        rows={5}
                        class="bg-inherit border border-zinc-400 dark:border-zinc-800 border-inherit resize-none"
                        {...attrs}
                        bind:value={$formData.description}
                    />
                </Form.Control>
                <!-- <Form.Description>This is your public display name.</Form.Description> -->
                <Form.FieldErrors class={errorClasses} />
            </Form.Field>
            <div class="flex flex-row items-center justify-start w-full gap-4">
                <Form.Field {form} name="price" class="w-full">
                    <Form.Control let:attrs>
                        <Form.Label class={labelClasses}>Price</Form.Label>
                        <Input
                            min="0"
                            required
                            class="bg-inherit border border-zinc-400 dark:border-zinc-800 border-inherit"
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
                            class="bg-inherit border border-zinc-400 dark:border-zinc-800 border-inherit"
                            {...attrs}
                            type="number"
                            on:input={handleQuantityInput}
                            bind:value={$formData.quantity}
                        />
                    </Form.Control>
                    <!-- <Form.Description>This is your public display name.</Form.Description> -->
                    <Form.FieldErrors class={errorClasses}/>
                </Form.Field>
                <Form.Field {form} name="category" class="w-full">
                    <Form.Control let:attrs>
                        <Form.Label class={labelClasses}>Category</Form.Label>
                        <Select.Root
                            selected={selectedCategory}
                            onSelectedChange={(v) => {
                              v && ($formData.category = v.value);
                            }}
                            >
                            <Select.Trigger {...attrs} class="bg-inherit hover:bg-zinc-800 border-zinc-800">
                              <Select.Value placeholder="Select a verified email to display" />
                            </Select.Trigger>
                            <Select.Content class="bg-inherit border-zinc-800 peer-hover:bg-zinc-800">
                                {#each CategoriesData as {name}}
                                  <Select.Item value={name} label={name} class="group-hover:bg-zinc-900 bg-inherit"/>
                                {/each}
                            </Select.Content>
                          </Select.Root>
                          <input hidden bind:value={$formData.category} name={attrs.name} />
                    </Form.Control>
                    <Form.FieldErrors class={errorClasses}/>
                </Form.Field>            
            </div>
            
            <label for="images" hidden>Images</label>
            <input name="images" type="hidden" hidden value={productImages}>
            <Button type="submit">Add</Button>
        </div>
        <!-- RIGHT -->
        <div class="mt-4 md:m-0 md:max-w-[50%] w-full flex items-start justify-center" >
            <!-- {#if productImages && productImages.length===4}
                <div class="flex w-full min-w-full flex-wrap gap-4 max-w-full items-center justify-center">
                    <div class="imageContainer">
                        <CldImage class="imageDisplay" src={productImages[0]}/>
                    </div>
                    <div class="imageContainer">
                        <CldImage class="imageDisplay" src={productImages[1]}/>
                    </div>
                    <div class="imageContainer">
                        <CldImage class="imageDisplay " src={productImages[2]}/>
                    </div>
                    <div class="imageContainer">
                        <CldImage class="imageDisplay " src={productImages[3]}/>
                    </div>
                </div>
            {:else}
                <div class="flex flex-col gap-2 w-full justify-start items-center">
                    {#if productImages.length<4}
                        <p>Remaining : {4-productImages.length}</p>
                        {:else}
                        <p>All images are uploaded</p>
                    {/if}
                    <Button class="w-fit bg-zinc-200 dark:border-zinc-800 hover:bg-zinc-300 text-inherit border border-zinc-400 gap-2 dark:bg-zinc-800 dark:bg-inherit dark:hover:bg-zinc-800 dark:text-zinc-300 rounded-md">
                        <ImageUp/>
                        <CldUploadButton 
                        uploadPreset="ecommerce_products" 
                        class="w-fit rounded-md"
                        options={{maxFiles:4}}
                        {onUpload}    
                    >
                        Upload Images
                    </CldUploadButton>
                    </Button>
                    <CldUploadWidget uploadPreset='ecommerce_products' />
                </div>
            {/if} -->
            <div class="grid grid-cols-2 gap-y-4 gap-x-10 w-fit">
                <AddProductImage 
                uploadPreset="ecommerce_products" 
                header="Picture 1" 
                bind:value={productImages[0]}
            />
            <AddProductImage 
                uploadPreset="ecommerce_products" 
                header="Picture 2" 
                bind:value={productImages[1]}
            />
            <AddProductImage 
                uploadPreset="ecommerce_products" 
                header="Picture 3" 
                bind:value={productImages[2]}
            />
            <AddProductImage 
                uploadPreset="ecommerce_products" 
                header="Picture 4" 
                bind:value={productImages[3]}
            />
            </div>
            
        </div>
    </form>
    <!-- <AddProductImage uploadPreset="ecommerce_products" header="Picture 1"/> -->
</div>

<style>
    /* .imageContainer{
        @apply w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px];
    } */
    
    /* .imageDisplay{
        @apply rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover;
    } */
</style>