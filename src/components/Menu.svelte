<script>
  import { loginAs } from "../stores/auth";
  import { school, BASE_URL, BASE_ADMIN_URL } from "../stores/index";

  let showDrawer = false;
  export let listMenu = [];
  let loaded = false;

  function toggleDrawer() {
    showDrawer = !showDrawer;
  }
</script>

<div
  class="flex flex-col w-full border-r-2 border-gray-100 md:w-64 text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 flex-shrink-0 z-50"
>
  <div
    class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between"
  >
    <a
      href="{BASE_URL}"
      class="text-sm font-semibold tracking-wide text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline flex flex-row items-center"
    >
      <img
        src={BASE_ADMIN_URL + "/static/logo.png"}
        alt="logo-sekolah"
        class="h-10"
      />
      <div class="mx-2" />
      <!-- {$school.school_name} -->
    </a>
    <button
      class="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
      id="hamburger-button"
      on:click={toggleDrawer}
    >
      <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
        <path
          x-show="!open"
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
  <nav class="px-0 md:px-4 pb-0 md:pb-0">
    <div
      class="absolute md:static w-full transition delay-300 duration-300 ease-in-out transform md:transform-none"
      class:translate-x-full={!showDrawer}
    >
      <div id="drawer" class="min-h-screen bg-white">
        {#each listMenu as menu}
          {#if menu.show == 1}
          <a
            class:bg-gray-200={menu.pathname == window.location.pathname}
            class="block px-4 py-2 mt-2 text-sm font-semibold text-gray-900 rounded-lg dark-mode:bg-gray-700 dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            href={menu.path}
            on:click={toggleDrawer}
            ><i class="bi {menu.icon} mr-2" />{menu.text_link}</a
          >
          {/if}
        {/each}
      </div>
    </div>
  </nav>
</div>
