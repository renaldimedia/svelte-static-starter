<script>
import { loginAs, userData } from "../stores/auth";


</script>
<!-- aside data -->
<div
class="flex flex-col md:flex-row bg-white rounded-lg items-center justify-center py-2 px-5"
>
<div class="py-2 md:py-0">
    <div class="bg-gray-400 h-12 w-12 rounded-full ml-auto" >
        <img src="./../images/profile-img.png" alt="" class="rounded-full">
    </div>
</div>
<div class="md:mx-2" />
<div class="py-2 flex flex-col">
    <div class="text-base md:text-lg font-bold text-gray-700">
        Selamat datang,
        <span class="font-light">{$userData.name}</span>
    </div>
    <div
        class="font-light text-xs text-gray-500 hover:text-blue-400 cursor-pointer"
    >
        lihat profil
    </div>
    <div class="font-light md:mt-2 text-xs text-gray-700">
        {$loginAs.toUpperCase()}
    </div>
</div>
</div>
<!-- /aside data -->