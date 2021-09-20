<script>
    export let placeholder = "Nama";
    export let classes;
    export let type = "text";
    export let value = "";
    export let isRequired = false;

    const handleInput = (e) => {
        value = type.match(/^(number|range)$/)
            ? +e.target.value
            : e.target.value;
    };
</script>

<div>
    <label for="id" class="text-gray-500">{placeholder}</label>
    <input {type} {value} class="bg-gray-200 border-none rounded-md w-full p-3 {classes}" {placeholder} on:input={handleInput} required={isRequired}/>
</div>


