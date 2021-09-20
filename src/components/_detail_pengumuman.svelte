<script>
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";
    import { userData } from "../stores/auth";
    import Loader from "./Loader.svelte";
    export let pengumuman;

    let loaded = false;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("toggleDetailPage");
    }

    $:{
        if(!loaded && typeof $userData.name != 'undefined'){
            loaded = true;
        }
    }


</script>
{#if !loaded}
<Loader classes="w-screen h-screen" />
{/if}
{#if loaded}
<Button on:click={handleClick} classes="bg-biru">Kembali</Button>
<div class="flex items-center">
    <h1 class="sm:text-xl font-semibold w-full text-center">
        {pengumuman.title}
    </h1>
</div>
<div class="my-8 text-gray-700">
    <p class="text-justify leading-normal">
        {@html pengumuman.content}
    </p>
</div>
<div class="footer flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0 border-t pt-2">
    {#if pengumuman.for_users.length > 0}
    <div>
        <p class="text-gray-400">Pengumuman Untuk {#each pengumuman.for_users as user}
            {user.name},
        {/each}</p>
    </div>
    {/if}
    {#if pengumuman.for_academy_classes.length > 0}
    <div>
        <p class="text-gray-400">Pengumuman Untuk {#each pengumuman.for_academy_classes as kelas}
            {kelas.name},
        {/each}</p>
    </div>
    {/if}
    <div>
        <p class="text-gray-400">Start Date</p>
        <p class="text-gray-400">{new Date(pengumuman.start_date).toDateString()}</p>
    </div>
    <div>
        <p class="text-gray-400">End Date</p>
        <p class="text-gray-400">{new Date(pengumuman.end_date).toDateString()}</p>
    </div>
    <div>
        <p class="text-gray-400">Dibuat oleh</p>
        {#if $userData.roles[0].name == 'teacher'}
            <p class="text-gray-400">{$userData.name}</p>
        {:else}
            <p class="text-gray-400">{pengumuman.teacher.name}</p>
        {/if}
    </div>
</div>
{/if}
