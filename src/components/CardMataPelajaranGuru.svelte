<script>
    export let data;
</script>
<div class="bg-white px-10 rounded-lg py-2 mt-5">
    <!-- header kelas -->
    <div
        class="flex flex-col md:flex-row justify-between items-center">
        <div class="text-sm md:text-lg text-gray-700 font-semibold">
            <i class="bi bi-journal-album" />
            Mata Pelajaran Yang Diampuh
        </div>
    </div>
    <!-- /header kelas -->
    <!-- /kelas -->
    <!-- list kelas -->
    <div class="flex flex-col mt-3">
        {#if data}
            {#each data as mapel}
                <div class="flex items-center justify-left">
                    <div class="w-3 h-3 bg-blue-400 rounded-full" />
                    <div class="mx-1" />
                    <div
                        class="font-light text-gray-700 text-sm py-1 border-b-2 border-transparent hover:border-blue-400 cursor-pointer">
                        {mapel.name}
                    </div>
                </div>
            {/each}
        {:else}
            Loading...
        {/if}
    </div>
    <!-- /list kelas -->
</div>