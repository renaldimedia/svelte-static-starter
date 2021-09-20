<script>
  import { tokenNow, loadToken, loginAs, userData, authToken } from "../stores/auth";
  import { BASE_API_URL, BASE_URL, pageLoader } from "../stores/index";
  import MainLayout from "./MainLayout.svelte";

  import Menu from "./Menu.svelte";
  let isLoading = false;

  const pathpanel = {
    dashboard: '/dashboard/index',
    profile: '/profile/index',
    tugas: '/tugas/index',
    materi: '/materi/index',
    jadwal: '/jadwal/index',
    pengumuman: '/pengumuman/index',
    forum: '/forum/index',
    perpustakaan: '/perpustakaan/index',
    pembayaran: '/pembayaran/index',
    absensi: '/absensi/index',
    auth: '/choice/index',
    logoout: '/auth/logout'
  }

  const menus = function () {
    let res = [
      {
        show: 1,
        path: BASE_URL + pathpanel.dashboard,
        pathname: "/dashboard/index",
        text_link: "Dashboard",
        icon: "bi-speedometer2",
      },
      {
        show: 1,
        path: BASE_URL + pathpanel.profile,
        pathname: "/dashboard/user",
        text_link: "Profile",
        icon: "bi-person-circle",
      },
      {
        show: 1,
        path: BASE_URL + pathpanel.absensi,
        pathname: "/dashboard/user",
        text_link: "Absensi",
        icon: "bi-person-circle",
      },
      {
        show: 1,
        path: BASE_URL + pathpanel.tugas,
        pathname: pathpanel.tugas,
        text_link: "Tugas",
        icon: "bi-list-task",
      },
      {
        show: 1,
        path: BASE_URL + pathpanel.materi,
        pathname: pathpanel.materi,
        text_link: "Materi",
        icon: "bi-book-half",
      },
      {
        show: 1,
        path: BASE_URL + pathpanel.jadwal,
        pathname: pathpanel.jadwal,
        text_link: "Jadwal",
        icon: "bi-journal-bookmark-fill",
      },
      {
        show: 1,
        path: BASE_URL + pathpanel.forum,
        pathname: pathpanel.forum,
        text_link: "Forum",
        icon: "bi-people-fill",
      },
    ];
    // for (let i = 0; i < $layout.children.length; i++) {
    //   let x = {
    //     show: 1,
    //     path: $layout.children[i].path,
    //     text_link: $layout.children[i].title.toUpperCase(),
    //     icon: "bi-chat-left-text-fill",
    //     absolute_path: "__BASE_URL/" + $layout.children[i].path,
    //   };
    //   res.push(x);
    // }
    return res;
  };

  let showProfileDropdown = false;

  function toggleProfileDropdown() {
    showProfileDropdown = !showProfileDropdown;
  }

  function logout() {
    const url = new URL("/auth/logout", BASE_API_URL);
    isLoading = true;
    let headers = {
      Authorization: $authToken,
      Accept: "application/json",
    };

    fetch(url, {
      method: "DELETE",
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message == "Token dihapus!") {
          authToken.set(false);
          authStore.clear();
          $userData = "";
          isLoading = false;
          window.location.href = new URL(BASE_URL + pathpanel.auth);
        }
      });
  }

  function isactivepage() {
    const currentUrl = new URL(location.pathname);
    menus.forEach((menu) => {
      if (typeof menu.submenu != "undefined" && menu.submenu.length > 0) {
        let sub = menu.submenu;
        sub.forEach((s) => {
          if (currentUrl == s.path) {
            return true;
          }
        });
      } else {
        if (currentUrl == menu.path) {
          return true;
        }
      }
    });
    // console.log(location.pathname);
    return false;
  }
</script>

<MainLayout>
  {#await tokenNow}
    {pageLoader.set(true)}
  {:then value}
  {pageLoader.set(false) || ""}
    {#if value == null}
      {(window.location.href = new URL("/auth/index", BASE_URL))}
    {:else}
      <!-- component -->
      <div class="flex flex-col md:flex-row md:min-h-screen w-full">
        <!-- Drawer -->
        <Menu listMenu={menus()} />
        <!-- End Drawer -->
        <div class="px-5 py-2 w-full">
          {#if $userData && $userData != null}
            <div class="rounded-lg py-2">
              <!-- profile menu -->
              <div
                class="w-full bg-gray-800 text-white rounded-lg px-10 py-4 flex flex-col md:flex-row items-center justify-end space-y-2"
              >
                <!-- <div class="font-light">
                <i class="bi bi-calendar-fill mr-2" />Tahun/Semester: 2021/1
              </div> -->
                <div class="flex flex-row space-x-4 items-center">
                  <div class="font-light">Halo, {$userData.name}!</div>
                  <div class="flex flex-col items-center">
                    <img
                      src={$userData.profile_photo_url}
                      class="rounded-full h-10 border-2 border-transparent hover:border-gray-100 cursor-pointer"
                      id="button-profile"
                      on:click={toggleProfileDropdown}
                    />
                    {#if showProfileDropdown}
                      <div
                        id="menu-profile"
                        class="bg-white p-5 text-gray-800 absolute mt-12 shadow-2xl rounded-lg flex flex-col text-sm space-y-4"
                      >
                        <a
                          href={(window.location.href = new URL(
                            "/user/profile",
                            BASE_URL
                          ))}
                          class="border-b-2 border-transparent hover:border-blue-400 cursor-pointer"
                          >Profil</a
                        >
                        <button
                          on:click={logout}
                          class="border-b-2 border-transparent hover:border-red-400 cursor-pointer"
                          >{#if isLoading}
                            <img
                              src={new URL(
                                "/assets/static/images/loading.svg",
                                BASE_URL
                              )}
                              alt="Loading..."
                              class="w-5 h-5"
                            />
                          {:else}
                            Keluar
                          {/if}</button
                        >
                      </div>
                    {/if}
                  </div>
                </div>
              </div>
              <!-- /profile menu -->
            </div>
          {/if}
          <slot />
        </div>
      </div>
    {/if}
  {/await}
</MainLayout>
