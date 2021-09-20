<script>
  import { fade } from "svelte/transition";
  import { userData, authToken, logout } from "../stores/auth";
  import { currentPPDB, school, BASE_ADMIN_URL, BASE_URL } from "../stores/index";
  import { clickOutside } from "../functions.js";
  
  // console.log($authToken == null);
  let show = false;
  let isLoading = false;
  // let isPPDBActive = 0;
  export let listMenu = [];
  
  function toggleDropdown() {
    show = !show;
  }

  let full = true;

  let isOpen = [];
  listMenu.forEach(() => {
    isOpen.push(false);
  });
  function toggleAllOpenMenu(activeIndex = null) {
    listMenu.forEach(() => {
      isOpen.forEach((value, index) => {
        if (index !== activeIndex) {
          isOpen[index] = false;
        }
      });
    });
  }
  let navbarHidden = false;
</script>

<div
  class="shadow-md relative top-0 w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 py-2 z-20 w-screen"
  >
  <div
    class="w-screen md:flex hidden justify-end items-center md:px-6 lg:px-12"
  >
    
      {#if $authToken != null && $userData != null && ($authToken != "" && $userData != "")}
        <div class="relative inline-block md:ml-5 md:mt-0 w-full md:w-auto">
          <div>
            <button
              type="button"
              class="inline-flex text-gray-500 justify-end items-center w-full rounded-md px-4 py-1 hover:bg-blue-500"
              id="options-menu"
              aria-haspopup="true"
              aria-expanded="true"
              on:click={toggleDropdown}
            >
              <p
                class="hover:text-white cursor-pointer text-sm font-light md:block hidden"
              >
                {$userData.name}
              </p>
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                /></svg
              >
            </button>

            {#if show}
              <div
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                  class="bg-white"
                >
                  <a
                    href="{BASE_URL + '/dashboard/index'}"
                    class="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:no-underline"
                    role="menuitem">Dashboard</a
                  >
                  <form
                    method="POST"
                    action="#"
                    on:submit|preventDefault={logout}
                  >
                    <button
                      type="submit"
                      class="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:text-white rounded-lg border-none hover:bg-merah"
                      role="menuitem"
                    >
                      {#if isLoading}
                        <img
                          src="./../images/loading.svg"
                          alt="Loading..."
                          class="w-5 h-5"
                        />
                      {:else}Sign out{/if}
                    </button>
                  </form>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {:else}
        <a
          class="hidden p-1 px-2 text-sm text-gray-500 font-semibold border-b hover:border hover:shadow-lg duration-200 lg:flex items-center space-x-2"
          href={BASE_URL + "/auth"}
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            /></svg
          >
          <span>Login</span>
        </a>
      {/if}
  </div>
  <div
    class="flex flex-col max-w-screen-xl px-4 mx-auto lg:items-center bg-white lg:justify-between lg:flex-row md:px-6 lg:px-0"
  >
    <div class="px-4 py-2 flex flex-row items-center justify-between">
      <div class="w-full flex flex-row items-center">
        <img
          src={BASE_ADMIN_URL + "/static/logo.png"}
          alt="logo-sekolah"
          onerror="this.remove()"
          class="h-10 max-w-xs"
        />
        <!-- <a
          href="#"
          class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
        >
          {$school != null ? $school.school_name : ""}</a
        > -->
      </div>
      <div class="flex items-center space-x-3">

        {#if $authToken != null && $userData != null}
          <div
            class="relative md:hidden inline-block md:ml-5 md:mt-0 w-full md:w-auto"
          >
            <div>
              <button
                type="button"
                class="inline-flex text-gray-500 justify-end items-center w-full rounded-md px-4 py-1 hover:bg-blue-500"
                id="options-menu"
                aria-haspopup="true"
                aria-expanded="true"
                on:click={toggleDropdown}
              >
                <p
                  class="hover:text-white cursor-pointer text-sm font-light md:block hidden"
                >
                  {$userData.name}
                </p>
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  /></svg
                >
              </button>

              {#if show}
                <div
                  class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href={BASE_URL + "/dashboard/index"}
                      class="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:no-underline"
                      role="menuitem">Dashboard</a
                    >
                    <form
                      method="POST"
                      action="#"
                      on:submit|preventDefault={logout}
                    >
                      <button
                        type="submit"
                        class="block w-full text-left px-4 py-2 text-sm text-gray-700  hover:text-white rounded-lg border-none hover:bg-merah"
                        role="menuitem"
                      >
                        {#if isLoading}
                          <img
                            src="./../images/loading.svg"
                            alt="Loading..."
                            class="w-5 h-5"
                          />
                        {:else}Sign out{/if}
                      </button>
                    </form>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        {:else}
          <a
            class="flex p-1 px-2 text-sm text-gray-500 font-semibold border-b hover:border hover:shadow-lg duration-200 lg:hidden items-center space-x-2"
            href={BASE_URL + "/auth/login"}
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              /></svg
            >
            <span>Login</span>
          </a>
        {/if}
        <button
          on:click={() => (navbarHidden = !navbarHidden)}
          class="lg:hidden rounded-lg focus:outline-none focus:shadow-outline border p-2"
        >
          <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
            {#if navbarHidden}
              <path
                x-show="open"
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            {:else}
              <path
                x-show="!open"
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clip-rule="evenodd"
              />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <nav
      class:flex={navbarHidden}
      class:hidden={!navbarHidden}
      class="flex-col flex-grow pb-4 md:pb-0 hidden lg:flex lg:justify-end lg:flex-row"
    >
      <a
        class="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline"
        href="/"><i class="bi bi-house-door-fill mr-2" />Home</a
      >
      {#if listMenu.length > 0}
        {#each listMenu as menu, index}
          {#if typeof menu.submenu != "undefined"}
            <!-- dropdown menu -->
            <div class="relative">
              <button
                on:click={() => {
                  isOpen[index] = !isOpen[index];
                  toggleAllOpenMenu(index);
                }}
                class="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm font-semibold text-left bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:focus:bg-gray-600 dark-mode:hover:bg-gray-600 md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline "
              >
                <span>{menu.text_link}</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  class:rotate-180={isOpen[index] == true}
                  class="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              {#if isOpen[index]}
                <div
                  use:clickOutside
                  on:click_outside={() => {
                    isOpen[index] = false;
                  }}
                  transition:fade={{ duration: 200 }}
                  class="z-50 absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48"
                >
                  <div
                    class="px-2 py-2 bg-white rounded-md shadow dark-mode:bg-gray-800"
                  >
                    {#if typeof menu.submenu != "undefined"}
                      {#each menu.submenu as men}
                        <a
                          class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline text-gray-700"
                          href={men.path}>{men.text}</a
                        >
                      {/each}
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
            <!-- /dropdown menu -->
          {:else}
            <a
              class="block px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline text-gray-700"
              href={menu.path}>{menu.text_link}</a
            >
          {/if}
        {/each}
      {/if}
      {#if $currentPPDB != null && typeof $currentPPDB.id != "undefined"}
        <a
          class="flex items-center justify-center px-4 py-2 text-md pb-1 text-white border-2 border-blue-900 text-blue-600 font-semibold bg-transparent rounded-md dark-mode:bg-transparent dark-mode:hover:bg-blue-600 dark-mode:focus:bg-blue-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-green-200 md:mt-0 md:ml-4 hover:text-blue-900 focus:text-blue-900 hover:bg-green-200 focus:bg-green-200 focus:outline-none focus:shadow-outline"
          href={BASE_URL + "/ppdb"}
        >
          <span>PPDB</span>
        </a>
      {:else if $currentPPDB == null || $currentPPDB == 0}
        <a class="">&nbsp;</a>
      {/if}
    </nav>
  </div>
</div>
