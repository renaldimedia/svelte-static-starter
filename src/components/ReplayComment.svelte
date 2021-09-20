<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    function close() {
        dispatch("close");
    }
    let comment_body = "";
    let isLoading = false;
    function replayComment() {
        isLoading = true;
        dispatch("replay", {
            comment_body: comment_body,
        });

        setTimeout(() => {
            isLoading = false;
        }, 2000);

    }
</script>

<div class="bg-white rounded-b-md border p-5 flex space-x-2">
    <div class="avatar inline-block">
        <img
            src="https://api.edmodo.com/users/204070255/avatar?t=1615972601&amp;type=small&amp;u=bwrut6k144ccpbgrp78ncjid5"
            class="w-10 rounded-full"
            alt="Mutakin -"
        />
    </div>
    <div class="flex-1">
        <div class="reply-editor">
            <form on:submit|preventDefault={replayComment}>
                <textarea
                    bind:value={comment_body}
                    class="p-3 w-full text-black"
                    rows="1"
                    placeholder="Write a comment..."
                />
                <div class="flex items-center justify-end">
                    <div class="flex items-center space-x-2">
                        <button
                            type="button"
                            class="text-blue-800 hover:text-blue-500"
                            on:click={close}><span>Batal</span></button
                        >
                        <button
                            disabled={comment_body == "" ? true : false}
                            class="{comment_body == ''
                                ? 'bg-gray-200 text-gray-400'
                                : 'bg-biru text-white border-none hover:bg-blue-400'} px-4 py-2 rounded-lg"
                            >{#if isLoading}
                                <img src="./../images/loading.svg" alt="Loading..." class="w-5 h-5">
                            {:else}
                                Kirim
                            {/if}</button
                        >
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div />
    <div />
</div>
