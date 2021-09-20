<script>
  import { createEventDispatcher } from "svelte";
  // import { baseApiUrl } from "../network";
  import { BASE_API_URL } from "../stores/index";
  import { userData, authToken } from "../stores/auth";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

  const afterAction = (tipe, msg) => {
    addNotification({
      position: "top-right",
      heading: msg,
      type: tipe,
      description: "",
    });
  };

  import ReplayComment from "./ReplayComment.svelte";

  export let data;
  export let id;
  export let bgColor;

  const dispatch = createEventDispatcher();

  let showReplay = false;

  export const dateFormater = (date) => {
    let d = new Date(date);

    return d.toDateString() + " - " + d.toLocaleTimeString();
  };

  function saveReplayComment(event) {
    const url = new URL(BASE_API_URL + "/forum/comment");

    let headers = {
      Authorization: $authToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let body = {
      id: id,
      parent_id: data.parent_id !== null ? data.parent_id : data.id,
      body: event.detail.comment_body,
    };

    console.log(body);
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        dispatch("replaySaved");
        showReplay = false;
        event.detail.comment_body = "";
      }
    });
  }

  function deleteComment() {
    const sure = confirm("Apakah anda yakin ingin menghapus comment ini?");
    const url = new URL(BASE_API_URL + "/comment");

    let headers = {
      Authorization: $authToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let body = {
      id: data.id,
    };

    if (sure) {
      fetch(url, {
        method: "DELETE",
        headers,
        body: JSON.stringify(body),
      }).then((response) => {
        if (response.ok) {
          afterAction("success", "Berhasil menghapus komentar!");
          dispatch("deleted");
        } else {
          afterAction("error", "Gagal menghapus komentar!");
        }
      });
    }
  }
</script>

<div
  class="flex flex-col mt-4 rounded-lg border w-full pt-3 {bgColor} {bgColor ==
  'bg-white'
    ? ''
    : 'text-white'}"
>
  <div class="px-5 flex flex-row items-center">
    <div class="w-14 bg-gray-400 rounded-full">
      <img
        src={data.owner.profile_photo_url}
        alt="Photo Profile"
        class="rounded-full"
      />
    </div>
    <div class="flex items-center justify-between flex-1">
      {#if typeof data.owner != "undefined"}
        <div class="mx-4 font-bold text-lg">
          {data.owner.name}
        </div>
        {#if data.parent_id === null && data.owner.name == $userData.name}
          <div class="mx-4 font-bold text-lg">
            <i class="fas fa-trash-alt text-red-500" on:click={deleteComment} />
          </div>
        {/if}
      {/if}
    </div>
  </div>
  <div class="pl-20 text-sm">
    {data.body}
  </div>
  <div class="flex space-x-1 mb-2 ml-20 text-sm text-blue-300 items-center">
    <!-- <button on:click={() => (showReplay = true)}>Balas</button> -->
    <div class="bg-blue-300 w-1.5 h-1.5 rounded-full" />
    <p>
      {dateFormater(data.created_at)}
    </p>
  </div>
  {#if showReplay}
    <div>
      <ReplayComment
        on:close={() => (showReplay = false)}
        on:replay={saveReplayComment}
      />
    </div>
  {/if}
</div>
