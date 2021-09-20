<script>
  import Drawer from "./Drawer.svelte";
  let menuOpen = false;
</script>
<Drawer bind:open={menuOpen}/>
<header class="text-gray-600 body-font p-2">
  <div class="primary container mx-auto flex px-5 py-2 items-center md:justify-between justify-between elevation-1 rounded-full">
    <button class="clickable flex items-center justify-center md:hidden flex-shrink elevation-2 rounded-xl p-1 mr-2 bg-blue-600 text-white" on:click={() => menuOpen = true}>
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
    </button>
    <a class="md:flex hidden title-font font-medium items-center text-gray-900">
      <img src="http://platform.neosantara.co.id/gambar/logo.png" alt="logo toko" class="h-8 max-w-xl">
    </a>
    <div class="flex items-center">
      <nav class="md:ml-auto md:mr-auto md:flex flex-wrap items-center text-base justify-center hidden">
        <a class="mr-5 hover:text-gray-900">First Link</a>
        <a class="mr-5 hover:text-gray-900">Second Link</a>
        <a class="mr-5 hover:text-gray-900">Third Link</a>
        <a class="mr-5 hover:text-gray-900">Fourth Link</a>
      </nav>
      <button class="inline-flex items-center border-0 focus:outline-none hover:bg-gray-200 rounded-full text-base mt-0 primary--reverse p-2 elevation-2">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
      </button>
    </div>
  </div>
</header>