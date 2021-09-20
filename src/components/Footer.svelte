<script>
import { school } from "../stores/index";
</script>

<!-- footer -->
<footer class="text-gray-600 body-font bg-white shadow-md w-screen relative">
    {#if $school != null}
    <div
      class="container px-10 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div class="md:w-2/6 w-full flex-shrink-0 md:mx-0 mx-auto text-center md:text-left flex flex-col justify-center">
        <a
          class="flex flex-col title-font text-center font-medium items-center md:justify-start justify-center text-gray-900">
          <img
            src="{'__BASE_ADMIN_URL/static/logo.png'}"
            alt="logo-sekolah"
            class="max-w-sm h-12" />
          <span class="ml-3 text-lg">{$school.school_name}</span>
        </a>
        <p class="mt-2 text-sm text-gray-500">
          {#if typeof $school.school_address != 'undefined' && typeof $school.school_address.street != 'undefined'}
            {$school.school_address.street}
          {/if}
          {#if typeof $school.school_address != 'undefined' && typeof $school.school_address.sub_district != 'undefined'}
            {$school.school_address.sub_district}
          {/if}
          {#if typeof $school.school_address != 'undefined' && typeof $school.school_address.district != 'undefined'}
            {$school.school_address.district}
          {/if}
          {#if typeof $school.school_address != 'undefined' && typeof $school.school_address.city != 'undefined'}
            {$school.school_address.city}
          {/if}
          {#if typeof $school.school_address != 'undefined' && typeof $school.school_address.province != 'undefined'}
            {$school.school_address.province}
          {/if}
        </p>
      </div>
      <div
        class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
            HOME
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a
                href={"__BASE_URL/ppdb"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">PPDB</a>
            </li>
            <li>
              <!-- <a
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Login</a> -->
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
            ARTIKEL
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a
                href={"__BASE_URL/artikel/berita"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Informasi</a>
            </li>
            <li>
              <a
              href={"__BASE_URL/artikel/karya-ilmiah"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Karya Ilmiah</a>
            </li>
          </nav>
        </div>
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
            PROFIL
          </h2>
          <nav class="list-none mb-10">
            <!-- <li>
              <a
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Sejarah</a>
            </li> -->
            <li>
              <a
              href={"__BASE_URL/profil/visi"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Visi
                & Misi</a>
            </li>
            <li>
              <a
              href={"__BASE_URL/profil/struktur-organisasi"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Struktur
                Organisasi</a>
            </li>
            <li>
              <a
              href={"__BASE_URL/profil/data-pokok"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Data
                Pokok</a>
            </li>
          </nav>
        </div>
        <!-- <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
            KURIKULUM
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Kompetensi
                Siswa</a>
            </li>
          </nav>
        </div> -->
        <div class="lg:w-1/4 md:w-1/2 w-full px-4">
          <h2
            class="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">Gallery
          </h2>
          <nav class="list-none mb-10">
            <li>
              <a
              href={"__BASE_URL/galery"}
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Index</a>
            </li>
            <!-- <li>
              <a
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Ekstrakulikuler</a>
            </li>
            <li>
              <a
                class="text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:text-blue-400 hover:border-blue-400 cursor-pointer">Sarpas</a>
            </li> -->
          </nav>
        </div>
      </div>
    </div>
    <div class="bg-gray-100">
      <div
        class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p class="text-gray-500 text-sm text-center sm:text-left">
          © {$school.school_name}
        </p>
        <span
          class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <!-- <a class="text-gray-500">
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
                d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a class="ml-3 text-gray-500">
            <svg
              fill="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a class="ml-3 text-gray-500">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path
                d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
          <a class="ml-3 text-gray-500">
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              class="w-5 h-5"
              viewBox="0 0 24 24">
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" stroke="none" />
            </svg>
          </a> -->
        </span>
      </div>
    </div>
    {/if}
  </footer>
  <!-- /footer -->