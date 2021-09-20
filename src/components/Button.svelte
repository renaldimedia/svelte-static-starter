<script>
    export let classes;
    export let buttonType = 'submit';
</script>

<button type={buttonType} class="btn {classes} hover:bg-blue-400" on:click><slot></slot></button>

<style type="text/postcss" lang="postcss">
    .btn {
        @apply flex items-center justify-center rounded-lg shadow-md uppercase cursor-pointer border-0 text-white px-3 py-2;
    }
</style>
