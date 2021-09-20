<script>
    import Select from "svelte-select";
    import { clickOutside } from "../functions.js";

    export let items;
    export let placeholder;
    export let src = "./../images/Dropdown icon.svg";
    export let classes;
    export let value;
    export let isMulti = false;
    let arrowState = false;

    function handleSelect(event) {
        value = event.detail
        // arrowState = false
    }
</script>

<div>

    <label for="#" class="text-gray-500">{placeholder}</label>
    <div class="theme flex items-center z-0 {classes} relative">
        <div class="flex-grow" use:clickOutside
        on:click_outside={() => {
          arrowState = false
        }} on:click={() => arrowState = !arrowState}>
            <Select {items} {isMulti}  on:select={handleSelect} {placeholder} selectedValue={value ? value : null} showIndicator={false}/>
        </div>
        {#if !value}
        <div class="absolute right-0 pr-2">
            <svg class="w-6 h-6 transform duration-100" class:rotate-180={arrowState == true} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
        {/if}
    </div>
    
</div>
<style>
    .theme {
        --background: #d7e0da;
        --borderFocusColor: var(--color-blue);
        --borderRadius: 8px;
        --border: 0px;
    }
</style>
