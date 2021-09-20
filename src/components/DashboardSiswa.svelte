<script>
  import { BASE_URL, BASE_API_URL, BASE_ADMIN_URL } from "../stores/index";
  import { authToken, dummyToken } from "../stores/auth";
  import Loader from "./Loader.svelte";
  let response;
  let filterResult = false;
  let token = "";
  let isLogin = false;
  let materi = [];
  let pengumuman = [];
  async function loadData() {
    const url = BASE_API_URL + "/schedule-class";

    // let params = {};

    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key])
    // );

    let headers = {
      Authorization: $authToken,
      Accept: "application/json",
    };

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.data.length > 0) {
          filterResult = res.data.filter(
            (mapel) => mapel.day == new Date().getDay()
          );
          console.log(filterResult);
        }

        // console.log(filterResult.length);
      });

    // console.log((new Date()).getDay());
  }

  async function loadMateri() {
    const url = BASE_API_URL + "/student/academy-theories?page%5Bsize%5D=5&";


    let headers = {
      Authorization: $authToken,
      Accept: "application/json",
    };

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((result) => {
        materi = result.data;
      });
  }

  async function loadPengumuman() {
    const url = BASE_API_URL + "/announcement/for-me?page%5Bsize%5D=5";

    // let params = {
    //   "page[size]": "5",
    // };
    // Object.keys(params).forEach((key) =>
    //   url.searchParams.append(key, params[key])
    // );

    let headers = {
      Authorization: $authToken,
      Accept: "application/json",
    };

    fetch(url, {
      method: "GET",
      headers,
    })
      .then((response) => response.json())
      .then((res) => {
        pengumuman = res.data;
      });
  }
  $: {
    if ($authToken != "" && $authToken != 0 && !isLogin) {
      loadData();
      loadMateri();
      loadPengumuman();
      isLogin = !isLogin;
    }
  }
</script>

<div class="min-h-screen">
  <!-- content -->
  <div class="flex flex-col md:flex-row">
    <div class="py-2 w-full">
      <div class="mt-5 w-full">
        <!-- jadwal pelajaran hari ini -->
        <div class="bg-white px-5 rounded-lg py-2 mt-5">
          <!-- header -->
          <div class="flex flex-row justify-between items-center px-0 md:px-5">
            <h1 class="font-bold px-5 py-2 text-base md:text-xl text-gray-700">
              Jadwal Hari Ini
            </h1>
            <a href={BASE_URL + "/jadwal"} class="hover:text-biru text-gray-500"
              >Lihat Semua</a
            >
          </div>
          <!-- /header -->
          <!-- content -->
          <div class="flex flex-col">
            {#if !filterResult}
              <Loader msg="Memuat data"/>
            {:else if filterResult && filterResult.length > 0}
              {#each filterResult as jadwalKelas}
                {#each jadwalKelas.schedule_subjects as subject}
                  <div
                    class="border-l-10 shadow-md border border-blue-100 py-2 px-4 mb-2 rounded-md"
                  >
                    <div
                      class="flex flex-col md:flex-row items-center justify-between px-4 py-2"
                    >
                      <div
                        class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base"
                      >
                        <div class="ml-4 w-40 md:w-60 text-center md:text-left">
                          {subject.academy_subject.name}
                        </div>
                      </div>
                      <div class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base">
                        <i class="bi bi-person-fill mr-2" />&nbsp;
                        <p>{subject.teacher.name}</p>
                      </div>
                      <div class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base">
                        <p>{subject.school_room.name}</p>
                      </div>
                      <div
                        class="ml-4 flex flex-row items-center text-gray-700 text-sm"
                      >
                        <div class="mx-2 hover:text-blue-400 cursor-pointer">
                          <i
                            class="bi bi-clock-fill mr-2"
                          />{subject.start_time} - {subject.end_time}
                        </div>
                      </div>
                    </div>
                  </div>
                {/each}
              {/each}
            {:else if filterResult.length == 0}
              <div class="w-full flex items-center justify-center">
                <h4>Tidak ada jadwal untuk hari ini.</h4>
              </div>
            {/if}
          </div>
          <!-- /content -->
        </div>
        <!-- /jadwal pelajaran hari ini -->
        <!-- materi -->
        <div class="bg-white px-5 rounded-lg py-2 mt-5">
          <!-- header -->
          <div class="flex flex-row justify-between items-center px-0 md:px-5">
            <div>
              <h1
                class="font-bold px-5 py-2 text-base md:text-xl text-gray-700"
              >
                Materi
                <span class="font-light text-sm"
                  >{materi.length > 0 ? "(" + materi.length + ")" : ""}</span
                >
              </h1>
            </div>
            <div
              class="text-sm text-gray-700 cursor-pointer hover:text-blue-400"
            >
              Selengkapnya
            </div>
          </div>
          <!-- /header -->
          <!-- content -->
          <!-- list materi -->
          <div class="flex flex-col">
            {#if materi.length > 0}
              {#each materi as m}
              <div class="border-l-10 shadow-md border border-blue-100 py-2 px-4 mb-2 rounded-md">
                <div
                  class="flex flex-col md:flex-row justify-between px-4 py-2"
                >
                  <div>
                    <div
                      class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base"
                    >
                      <i class="bi bi-file-earmark-post" />
                      <div class="ml-4">{m.title}</div>
                    </div>
                  </div>
                  <div class="flex md:flex-row flex-col text-gray-700 text-sm">
                    <div class="mx-2 hover:text-blue-400 cursor-pointer">
                      <i class="bi bi-person-fill md:mr-2" />Nama Guru
                    </div>
                    <div class="mx-2">
                      <i class="bi bi-calendar md:mr-2" />22-02-2021
                    </div>
                    <div class="mx-2">
                      <i class="bi bi-eye-fill md:mr-2" />32
                    </div>
                  </div>
                </div>
              </div>
              {/each}
            {:else}
              <div class="shadow-lg border-2 border-blue-100 py-2 px-4 mb-2">
                <p>Tidak ada materi untuk anda.</p>
              </div>
            {/if}
          </div>
          <!-- /list materi -->
          <!-- /content -->
        </div>
        <!-- /materi -->
        <!-- pengumuman untuk siswa -->
        <div class="bg-white px-5 rounded-lg py-2 mt-5">
          <!-- header -->
          <div class="flex flex-row justify-between items-center px-0 md:px-5">
            <div>
              <h1
                class="font-bold px-5 py-2 text-base md:text-xl text-gray-700"
              >
                Pengumuman
              </h1>
            </div>
            <div
              class="text-sm text-gray-700 cursor-pointer hover:text-blue-400"
            >
              Selengkapnya
            </div>
          </div>
          <!-- /header -->
          <!-- content -->
          <!-- list materi -->
          <div class="flex flex-col">
            {#each pengumuman as png}
              <div class="border-l-8 border-2 border-green-700 py-2 px-4 mb-2">
                <div
                  class="flex flex-col md:flex-row items-center justify-between px-4 py-2"
                >
                  <div
                    class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base"
                  >
                    <i class="bi bi-chat-square-text-fill" />
                    <div class="ml-4">{png.title}</div>
                  </div>
                  <div
                    class="ml-4 flex flex-row items-center text-gray-700 text-sm"
                  >
                    <div class="mx-2 hover:text-blue-400 cursor-pointer">
                      <i class="bi bi-person-fill mr-2" />Nama yang Posting
                    </div>
                    <div class="mx-2">
                      <i class="bi bi-calendar mr-2" />22-02-2021
                    </div>
                    <div class="mx-0.5 md:mx-1">
                      <i class="bi bi-eye-fill mr-0.5 md:mr-1" />34
                    </div>
                  </div>
                </div>
              </div>
            {/each}
          </div>
          <!-- /list materi -->
          <!-- /content -->
        </div>
        <!-- /pengumuman untuk siswa -->
      </div>
    </div>
  </div>
  <!-- /content -->
</div>
