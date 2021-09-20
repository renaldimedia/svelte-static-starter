<script>
    export let placeholder = "Nama";
    export let value;
</script>
<div>
    <label for={placeholder} class="text-gray-500 block">{placeholder}</label>
    <input type="date" {placeholder} id={placeholder} bind:value class="w-full border-none rounded-md bg-gray-200 p-3" required/>
</div>
