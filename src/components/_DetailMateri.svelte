<script>
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";
    import { loginAs, userData } from "../stores/auth";
    import { BASE_API_URL } from "../stores/index";
    export let materi;

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("toggleDetailPage");
    }
</script>

<Button on:click={handleClick} classes="bg-biru">Kembali</Button>
<div class="flex items-center">
    <h1 class="sm:text-xl font-semibold w-full text-center">
        {materi.title}
    </h1>
</div>
<div class="materi-footer flex items-center justify-between border-t pt-2">
    <div>
        <p class="text-gray-400">Mata Pelajaran</p>
        <p class="text-gray-400">{materi.academy_subject ? materi.academy_subject.name : ''}</p>
    </div>
    <div>
        <p class="text-gray-400">Tanggal dibuat</p>
        <p class="text-gray-400">{new Date(materi.publish_at).toDateString()}</p>
    </div>
    <div>
        <p class="text-gray-400">Dibuat oleh</p>
        {#if $loginAs == 'teacher'}
            <p class="text-gray-400">{$userData.name}</p>
        {:else}
            <p class="text-gray-400">{materi.teacher.name}</p>
        {/if}
    </div>
    {#if $loginAs == 'teacher'}
    <div>
        <p class="text-gray-400">Status</p>
        <p class="text-gray-400">{materi.publish == 1 ? 'Sudah Di Publish' : 'Belum Di Publish'}</p>
    </div>
    {/if}
</div>
<div class="my-8 text-gray-700">
    <div class="materi w-full rounded-xl my-5">
        {#if materi.file !== null}
            <div class="bg-gray-200 p-2 max-w-full rounded">
                <a href={BASE_API_URL + '/storage/' + materi.file} target="_blank" class="underline hover:text-blue-600 cursor-pointer">{materi.file}</a>
            </div>
        {/if}
    </div>
    <p class="text-justify leading-normal">
        {@html materi.content}
    </p>
</div>

