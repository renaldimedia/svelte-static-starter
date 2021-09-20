<script>
  export let open = false;
  export let title = "";
  export let logo = "http://platform.neosantara.co.id/gambar/logo.png";

  function toggleDrawer() {
    open = !open;
  }
</script>

<div class="drawer side left" class:close={!open} class:open>
  <div class="drawer-header">
    <div class="flex-1">
      {#if logo && logo != ""}
        <img src={logo} alt="Logo Toko" class="h-8" />
      {/if}
      {#if title && title != ""}
        <p class="text-xl">{title}</p>
      {/if}
    </div>
    <button class="flex items-center justify-center" on:click={toggleDrawer}>
      <svg
        class="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M6 18L18 6M6 6l12 12"
        /></svg
      >
    </button>
  </div>
</div>

<style type="text/postcss">
  .drawer {
    @apply transform fixed z-50 bg-white duration-500;
  }
  .drawer.side {
    @apply h-screen w-full top-0;
  }
  @screen md {
    .drawer.side {
      @apply w-4/12;
    }
  }
  .drawer.left {
    @apply left-0;
  }
  .close.left {
    @apply -translate-x-full;
  }
  .open.side {
    @apply translate-x-0;
  }
  .drawer-header {
    @apply h-auto shadow-sm px-4 py-2 flex;
  }
</style>
