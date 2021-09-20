<script>
  import PublicTemplate from "./components/PublicTemplate.svelte";
  import {
    school,
    BASE_API_URL,
    BASE_ADMIN_URL,
    BASE_URL,
  } from "./stores/index";
  import { getData } from "./network.js";
  import Carousel from "@beyonk/svelte-carousel";
  import Loader from "./components/Loader.svelte";
  import { onMount } from "svelte";

  let articles = [];
  let imgs = [];
  let glLoading = false;
  let mapels = [];
  let teachers = [];

  let sw = 0;

  function loadArticle(link = "") {
    let f = new FormData();
    f.append("page[size]", 5);
    f.append("sort", "id");
    if (link == "") {
      link = BASE_API_URL + "/articles";
    }
    getData("GET", link, f).then((result) => {
      articles = result.data;
      console.log(articles);
    });
  }

  function loadGuru(url = BASE_API_URL + "/teachers") {
    getData("GET", url, { include: "academy-subjects" }).then((result) => {
      teachers = result.data;
    });
  }

  function loadMapels(link = "") {
    let f = new FormData();
    if (link == "") {
      link = BASE_API_URL + "/subjects";
    }
    getData("GET", link, f).then((result) => {
      mapels = result.data;
    });
  }

  function loadGallery(link = "") {
    glLoading = true;
    let f = new FormData();
    f.append("page[size]", 5);
    f.append("sort", "id");
    if (link == "") {
      link = BASE_API_URL + "/galeries";
    }
    getData("GET", link, f).then((result) => {
      imgs = result.data;
      glLoading = false;
    });
  }

  loadGallery();
  loadArticle();
  loadMapels();
  loadGuru();

  onMount(() => {
    sw = screen.width;
  });
</script>

<svelte:head>
  <script
    src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
    defer>
  </script>
</svelte:head>

<PublicTemplate>
  <div class="wrapper min-h-screen">
    <!-- image slider -->
    {#if glLoading}
      <div class="h-screen">
        <Loader />
      </div>
    {/if}
    <div class="content">
      {#if imgs.length > 0}
        <div
          class="md:max-h-52 max-h-screen overflow-y-hidden bg-white"
          id="sliderHero"
        >
          <Carousel perPage={1} autoplay={4000}>
            {#each imgs as img, idx}
              <div
                class="max-h-full slide-content w-full h-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0"
              >
                <img
                  src={BASE_ADMIN_URL + "/uploads/" + img.image}
                  class="max-h-full object-cover object-center"
                />
              </div>
            {/each}
          </Carousel>
        </div>
      {:else}
        <div
          class="md:max-h-52 max-h-screen overflow-y-hidden bg-white"
          id="sliderHero"
        >
          <div class="flex flex-col items-center object-cover object-center">
            <div
              class="max-h-full slide-content w-full h-full flex items-center justify-center text-white text-4xl font-bold flex-shrink-0"
            >
              <img
                src={BASE_ADMIN_URL + "/static/logo.png"}
                class="max-h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      {/if}
      <!-- /image slider -->
      <section class="text-gray-600 body-font bg-blue-500">
        <div class="container px-5 lg:py-24 md:py-10 py-5 mx-auto">
          <div class="flex flex-wrap -m-4 justify-around text-center">
            <div class="p-4 md:w-1/4 sm:w-1/3 w-full">
              <h2
                class="title-font font-medium sm:text-4xl text-3xl text-white"
              >
                +1.800
              </h2>
              <p class="leading-relaxed text-white">Siswa</p>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/3 w-full">
              <h2
                class="title-font font-medium sm:text-4xl text-3xl text-white"
              >
                +400
              </h2>
              <p class="leading-relaxed text-white">Staf dan Pengajar</p>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/3 w-full">
              <h2
                class="title-font font-medium sm:text-4xl text-3xl text-white"
              >
                +20
              </h2>
              <p class="leading-relaxed text-white">Ekstrakulikuler</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- kompetensi siswa -->
    <section class="text-gray-600 body-font bg-blue-200 md:px-18">
      <div class="px-5 md:px-20 py-10 mx-auto">
        <div class="flex flex-col text-center w-full mb-10">
          <h1
            class="sm:text-3xl text-2xl font-medium title-font mb-4 text-blue-900"
          >
            Kompetensi {$school.school_name}
          </h1>
        </div>
        <div
          class="grid grid-cols-2 -m-4 text-center mx-auto lg:px-36 md:px-24 sm:px-14 px-5"
        >
          <div class="p-4 pt-2 w-full max-h-lg">
            <img
              src="{BASE_ADMIN_URL + '/images/kur1.png'}"
              class="object-center object-cover md:max-h-full overflow-hidden rounded-lg"
              alt=""
            />
          </div>
          <div class="p-4 pt-2 w-full max-h-lg">
            <img
              src="{BASE_ADMIN_URL + '/images/kur2.png'}"
              class="object-center object-cover md:max-h-full overflow-hidden rounded-lg"
              alt=""
            />
          </div>
          <div class="p-4 pt-2 w-full max-h-lg">
            <img
              src="{BASE_ADMIN_URL + '/images/kur3.png'}"
              class="object-center object-cover md:max-h-full overflow-hidden rounded-lg"
              alt=""
            />
          </div>
          <div class="p-4 pt-2 w-full max-h-lg">
            <img
              src="{BASE_ADMIN_URL + '/images/kur4.png'}"
              class="object-center object-cover md:max-h-full overflow-hidden rounded-lg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
    <!-- /kometensi siswa -->
    {#if teachers.length > 0}
      <section class="text-gray-600 body-font bg-white">
        <div class="container px-5 md:px-24 lg:py-24 md:py-10 py-5 mx-auto">
          <div class="flex flex-col text-center w-full md:mb-20">
            <h1 class="text-2xl font-medium title-font mb-4 text-gray-900">
              Profile Guru & Staff SMA Multimedia Zein
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base" />
          </div>
          <div class="flex flex-wrap -m-4">
            <Carousel perPage={{ 1200: 4, 800: 3, 500: 2 }}>
              <span class="control" slot="left-control">
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
                    d="M15 19l-7-7 7-7"
                  /></svg
                >
              </span>
              {#each teachers as teacher}
                <div class="slide-content p-4">
                  <div
                    class="h-full flex flex-col items-center text-center border rounded-lg overflow-hidden p-4 bg-blue-200 text-gray-700"
                  >
                    <div
                      class="flex-shrink-0 rounded-lg shadow-md w-full flex items-center justify-center overflow-hidden mb-4"
                    >
                      {#if teacher.profile_photo_path != null}
                        <img
                          alt="team"
                          class="object-cover object-center"
                          src={teacher.profile_photo_path}
                        />
                      {:else}
                        <svg
                          class="w-full h-full object-cover object-center"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M16.36 12.76C18.31 13.42 20 14.5 20 16V21H4V16C4 14.5 5.69 13.42 7.65 12.76L8.27 14L8.5 14.5C7 14.96 5.9 15.62 5.9 16V19.1H10.12L11 14.03L10.06 12.15C10.68 12.08 11.33 12.03 12 12.03C12.67 12.03 13.32 12.08 13.94 12.15L13 14.03L13.88 19.1H18.1V16C18.1 15.62 17 14.96 15.5 14.5L15.73 14L16.36 12.76M12 5C10.9 5 10 5.9 10 7C10 8.1 10.9 9 12 9C13.1 9 14 8.1 14 7C14 5.9 13.1 5 12 5M12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7C16 9.21 14.21 11 12 11Z"
                          />
                        </svg>
                      {/if}
                    </div>
                    <div class="w-full">
                      <h2 class="title-font font-extrabold text-lg">
                        {teacher.name}
                      </h2>
                      {#if teacher.academy_subjects.length > 0}
                        <h3 class="mb-3 text-lg">
                          {teacher.academy_subjects[0].name}
                        </h3>
                      {:else if teacher.additional_information != null && typeof teachers.additional_information.rank != "undefined" && teachers.additional_information.rank != null}
                        <h3 class="mb-3 text-lg">
                          {teachers.additional_information.rank.name}
                        </h3>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
              <span class="control" slot="right-control">
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
                    d="M9 5l7 7-7 7"
                  /></svg
                >
              </span>
            </Carousel>
          </div>
        </div>
      </section>
    {/if}
    <!-- {#if articles.length > 0}
      <section class="text-gray-600 body-font bg-blue-200">
        <div class="px-5 md:px-10 py-12">
          <div class="flex flex-col text-center w-full lg:mb-20 md:mb-10">
            <h1 class="text-3xl font-medium title-font mb-4 text-gray-900">
              Berita Terbaru
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base" />
          </div>
          {#if sw > 800}
            <div class="grid grid-cols-2 gap-2">
              <a
                href={BASE_URL + "artikel/" + articles[0].id}
                class="relative flex flex-col h-full justify-center items-center rounded-lg overflow-hidden bg-white hover:shadow-xl hover:border-4 hover:border-blue-400 duration-200"
              >
              <img
              src={BASE_ADMIN_URL + "/static/logo.png"}
              class="object-center object-cover duration-200 hover:h-64"
              alt=""
            />
                <div
                  class="absolute bottom-0 left-0 w-full border rounded-t-lg p-2 w-full bg-white bg-opacity-80"
                >
                  <h2 class="uppercase text-xl text-gray-700">
                    {articles[0].title}
                  </h2>
                </div>
              </a>
              <div class="grid grid-cols-2 gap-1 my-auto py-0">
                {#each articles.splice(-4, 5) as article}
                  <a
                    href={BASE_URL + "artikel/:id" + article.id}
                    class="hover:shadow-lg duration-200 cursor-pointer relative border rounded-lg bg-white mb-2 mr-1 overflow-hidden flex justify-center h-full"
                  >
                    {#if typeof articles[0] != "undefined" && article.image_url != null && article.image_url != ""}
                      <img
                        src={article.image_url}
                        class="object-center object-cover"
                        alt=""
                      />
                    {:else}
                      <img
                        src={BASE_ADMIN_URL + "/static/logo.png"}
                        class="object-center object-cover"
                        alt=""
                      />
                    {/if}
                    <div
                      class="absolute bottom-0 left-0 w-full border rounded-t-lg p-2 w-full bg-white bg-opacity-50"
                    >
                      <h2 class="uppercase text-lg text-gray-700">
                        {article.title}
                      </h2>
                    </div>
                  </a>
                {/each}
              </div>
            </div>
          {:else}
            <Carousel perPage={{ 600: 2 }}>
              <span class="control" slot="left-control">
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
                    d="M15 19l-7-7 7-7"
                  /></svg
                >
              </span>
              {#each articles as article}
                <a
                  href={BASE_URL + "artikel/" + article.id}
                  class="relative md:w-1/2 flex flex-col h-full justify-center items-center rounded-lg overflow-hidden"
                >
                  <img src="https://picsum.photos/seed/picsum/700/400" alt="" />
                  <div
                    class="absolute bottom-0 left-0 w-full border rounded-t-lg p-2 w-full bg-white bg-opacity-80"
                  >
                    <h2 class="uppercase">{article.title}</h2>
                  </div>
                </a>
              {/each}
              <span class="control" slot="right-control">
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
                    d="M9 5l7 7-7 7"
                  /></svg
                >
              </span>
            </Carousel>
          {/if}
        </div>
      </section>
    {/if} -->
  </div>
</PublicTemplate>

<style>
  .control :global(svg) {
    width: 100%;
    height: 100%;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 32px;
  }
  @screen md {
    #sliderHero {
      max-height: 600px;
    }
  }
</style>
