<!-- <script lang="ts">
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
	import AddMainProductImage from "$lib/components/new/Product/AddMainProductImage.svelte";

    export let data: SuperValidated<Infer<typeof AddProductSchema>>;

    const form = superForm(data, {
        validators: zodClient(AddProductSchema),
        scrollToError: 'smooth',
        dataType:"json"
        
        
    });
    let productImages :string[] =["ecommerce_products/mrc1hyomez4fdsw3a1rc","ecommerce_products/mrc1hyomez4fdsw3a1rc","ecommerce_products/mrc1hyomez4fdsw3a1rc","ecommerce_products/mrc1hyomez4fdsw3a1rc"] || new Array<string>()

    const { form: formData,message,enhance,errors,allErrors} = form;
    $:console.log({$allErrors,$errors});
    
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
    $:console.log({productImages});
    
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
-->
<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import Button from '$lib/components/ui/button/button.svelte';
	const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { PageServerData } from './$types';
	import { AddProductSchemaFront, isBlob, isString } from './AddProductZodSchema';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	let productImages: string[] = new Array<string>();
	let productEnteredData = {
		name: '',
		description: '',
		price: 0,
		quantity: 0,
		category: '',
		images: new Array<File>()
	};
	let errors: any;
	const onSubmit = async (e: Event) => {
		console.log({ images: productEnteredData.images });
		const results = AddProductSchemaFront.safeParse(productEnteredData);
		console.log({ results });

		if (results.success) {
			const formdata = new FormData();
			formdata.append('name', results.data.name);
			formdata.append('description', results.data.description);
			formdata.append('price', results.data.price.toString());
			formdata.append('quantity', results.data.quantity.toString());
			formdata.append('category', results.data.category);
			results.data.images.forEach((image, i) => {
				if (image && (isBlob(image) || isString(image))) {
					formdata.append(`image${i}`, image);
				}
			});
			const response = await fetch('/account/add-product', {
				method: 'POST',
				body: formdata
			});
			if (response.ok) {
				const responseData = await response.json();
				toast.success('Product added successfully');
				const { productSlug } = responseData;
				goto(`/products/${productSlug}`, {
					replaceState: true,
					invalidateAll: true
				});
			} else {
				toast('Something wrong happend , Refreshing ...');
				window.location.reload();
			}
			console.log({ response });
		}
	};
	export let data: PageServerData;
	const { categories } = data;

	let previewImages: string[] = new Array<string>();
	$: console.log({ previewImages });
	const onUpload = (e: Event, i: number) => {
		const target = e?.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file) {
			productEnteredData.images[i] = file;
		}

		previewImages[i] = URL.createObjectURL(file as Blob);
	};
</script>

<svelte:head>
	<title>Add Product</title>
</svelte:head>
<div
	class="flex flex-col items-start justify-start w-full h-full max-w-full max-h-full min-w-full min-h-full gap-4"
>
	<h1 class="text-3xl font-medium">Add Product</h1>

	<form
		on:submit={onSubmit}
		class="flex flex-row items-start justify-start w-full min-h-full gap-10"
	>
		<!--LEFT -->
		<div
			class="lg:max-w-[50%] flex flex-col items-start justify-between flex-1 h-full min-h-full gap-4"
		>
			<div class="flex flex-col w-full gap-1">
				<Label class="text-base">Name</Label>
				<Input type="text" bind:value={productEnteredData.name} />
			</div>

			<div class="flex flex-col w-full gap-1">
				<Label class="text-base">Description</Label>
				<Textarea class="resize-none" bind:value={productEnteredData.description} />
			</div>

			<div class="flex flex-col w-full gap-1">
				<Label class="text-base">Price</Label>
				<Input
					type="number"
					step={0.01}
					on:change={(priceValue) => {
						productEnteredData.price = Number(priceValue?.target?.value) || 1;
					}}
					bind:value={productEnteredData.price}
				/>
			</div>

			<div class="flex flex-col w-full gap-1">
				<Label class="text-base">Quantity</Label>
				<Input
					type="number"
					on:change={(priceValue) => {
						productEnteredData.quantity = Number(priceValue?.target?.value) || 1;
					}}
					bind:value={productEnteredData.quantity}
				/>
			</div>
			<div class="flex flex-col items-start w-full gap-4">
				<div class="flex flex-col w-full gap-1">
					<Label class="text-base">Select Category</Label>
					<Select.Root
						name="category"
						onSelectedChange={(e) => {
							productEnteredData.category = String(e?.value) || '';
						}}
					>
						<Select.Trigger value={productEnteredData.category}>
							<Select.Value placeholder={productEnteredData.category || 'Category'} />
						</Select.Trigger>
						<Select.Content>
							{#each categories as { name, slug }}
								<Select.Item value={slug} placeholder={name} />
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
				<div class="flex flex-col w-full gap-1">
					<Label class="text-base">Or Create One</Label>
					<Input placeholder="Category Name" type="text" />
				</div>
			</div>

			<!-- {#if $message}  
                <p>{$message}</p>
            {/if} -->

			<!-- Product Name -->
			<!-- <Form.Field {form} name="name" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Name</Form.Label>
					<Input
						min="8"
						max="255"
						required
						class="border bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						type="text"
						bind:value={$formData.name}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field>

			<Form.Field {form} name="description" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Description</Form.Label>
					<Textarea
						rows={5}
						class="border resize-none bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						bind:value={$formData.description}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field>

			<Form.Field {form} name="price" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Price</Form.Label>
					<Input
						min="0"
						step="0.01"
						required
						class="border bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						type="number"
						on:input={handlePriceInput}
						bind:value={$formData.price}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field>

			<Form.Field {form} name="quantity" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Quantity</Form.Label>
					<Input
						min="1"
						required
						class="border bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						type="number"
						on:input={handleQuantityInput}
						bind:value={$formData.quantity}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field> -->

			<!-- Product Category -->
			<!-- <Form.Field {form} name="category" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Category</Form.Label>
					<Select.Root
						required
						selected={selectedCategory}
						onSelectedChange={(v) => {
							v && ($formData.category = v.value);
						}}
					>
						<Select.Trigger
							{...attrs}
							class="border bg-inherit hover:bg-zinc-200 border-zinc-300 dark:hover:bg-zinc-800 dark:border-zinc-800"
						>
							<Select.Value placeholder="Select a category" />
						</Select.Trigger>
						<Select.Content class="bg-inherit border-zinc-800 peer-hover:bg-zinc-800">
							{#each CategoriesData as { name }}
								<Select.Item value={name} label={name} class="group-hover:bg-zinc-900 bg-inherit" />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.category} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field> -->
			<!-- </div> -->

			<label for="images" hidden>Images</label>
			<input name="images" id="images" type="hidden" hidden bind:value={productImages} />
			<Button
				aria-label="Add product"
				type="submit"
				class="border bg-inherit text-inherit border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
				>Add</Button
			>
		</div>
		<!-- RIGHT -->
		<div class="md:m-0 md:max-w-[50%] w-full h-full flex flex-col min-h-full justify-between gap-4">
			<!-- {#if productImages && productImages.length===4}
                <div class="flex flex-wrap items-center justify-center w-full max-w-full min-w-full gap-4">
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
                <div class="flex flex-col items-center justify-start w-full gap-2">
                    {#if productImages.length<4}
                        <p>Remaining : {4-productImages.length}</p>
                        {:else}
                        <p>All images are uploaded</p>
                    {/if}
                    <Button class="gap-2 border rounded-md w-fit bg-zinc-200 dark:border-zinc-800 hover:bg-zinc-300 text-inherit border-zinc-300 dark:bg-zinc-800 dark:bg-inherit dark:hover:bg-zinc-800 dark:text-zinc-300">
                        <ImageUp/>
                        <CldUploadButton 
                        uploadPreset="ecommerce_products" 
                        class="rounded-md w-fit"
                        options={{maxFiles:4}}
                        {onUpload}    
                    >
                        Upload Images
                    </CldUploadButton>
                    </Button>
                    <CldUploadWidget uploadPreset='ecommerce_products' />
                </div>
            {/if} -->
			<!-- <div
				class="flex flex-col items-center justify-start w-full h-full max-w-full min-w-full gap-y-4 gap-x-10"
			> -->
			<div class="gap-1 flex flex-col">
				<Label class="text-base" for="image_1">Main Image</Label>
				<Input
					name="image_1"
					id="image_1"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:change={(e) => onUpload(e, 0)}
				/>
			</div>
			<div class="gap-1 flex flex-col">
				<Label class="text-base" for="image_2">Thumbnail Image 1</Label>
				<Input
					name="image_2"
					id="image_2"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:change={(e) => onUpload(e, 1)}
				/>
			</div>
			<div class="gap-1 flex flex-col">
				<Label class="text-base" for="image_3">Thumbnail Image 2</Label>
				<Input
					name="image_3"
					id="image_3"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:change={(e) => onUpload(e, 2)}
				/>
			</div>
			<div class="gap-1 flex flex-col">
				<Label class="text-base" for="image_4">Thumbnail Image 3</Label>
				<Input
					name="image_4"
					id="image_4"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:change={(e) => onUpload(e, 3)}
				/>
			</div>
			<img src="" alt="" />
			<!-- <AddMainProductImage
					uploadPreset="ecommerce_products"
					header="Main Pictures"
					bind:value={productImages[0]}
				/>
				<div class="flex flex-row items-center justify-center max-w-full min-w-full gap-4 h-fit">
					<AddProductImage
						uploadPreset="ecommerce_products"
						header="Picture 1"
						bind:value={productImages[1]}
					/>
					<AddProductImage
						uploadPreset="ecommerce_products"
						header="Picture 2"
						bind:value={productImages[2]}
					/>
					<AddProductImage
						uploadPreset="ecommerce_products"
						header="Picture 3"
						bind:value={productImages[3]}
					/>
				</div> -->
			<!-- </div> -->
		</div>
	</form>
	<!-- {#if hello}<img src={hello} alt="" />{/if} -->
	<!-- <AddProductImage uploadPreset="ecommerce_products" header="Picture 1"/> -->
	{#if previewImages && previewImages.length > 0}
		<h1 class="w-full text-center text-lg font-medium">Images Preview</h1>
		<div class="flex flex-row items-center justify-center gap-4 w-full flex-wrap">
			{#each previewImages as image}
				{#if image}
					<img
						src={image}
						alt="product"
						width="160"
						height="160"
						class="object-cover object-center h-40 w-40 max-w-40 max-h-40 rounded-xl"
					/>
				{:else}
					<div class="w-40 h-40 max-w-40 max-h-40 rounded-xl"></div>{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	/* .imageContainer{
        @apply w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px];
    } */

	/* .imageDisplay{
        @apply rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover;
    } */
</style>
