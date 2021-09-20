<script>
    import { onMount } from "svelte";
    import { getData } from "../network";
    import { authToken } from "../stores/auth";
    import { BASE_API_URL, BASE_URL } from "../stores/index";
    let response;
    let filterResult;

    let isLogin = false;

    async function loadData(){
        response = await getData(
            "GET",
            BASE_API_URL + "/my-schedule"
        );
        filterResult = response.data.filter(
            (mapel) => mapel.day == (new Date()).getDay()
        );
        // console.log((new Date()).getDay());
    }
    
    $: {
        if($authToken != "" && $authToken != 0 && !isLogin){
            loadData();
            isLogin = !isLogin;
        }
    }
</script>

{#if $authToken != ''}
<!-- content -->
<div class="flex flex-col md:flex-row">
    <div class="py-2 w-full">
        <!-- content -->
        <div class="flex flex-col md:flex-row">
            <div class="mt-5 w-full">
                <!-- statistik kelas -->
              
                <!-- /statistik kelas -->
                <!-- jadwal pelajaran hari ini -->
                <div class="bg-white px-5 rounded-lg py-2 mt-5 shadow-lg">
                    <!-- header -->
                    <div
                        class="flex flex-row justify-between items-center px-0"
                    >
                        <h1
                            class="font-bold py-2 text-base md:text-xl text-gray-700"
                        >
                            Jadwal Saya Hari Ini
                        </h1>
                    </div>
                    <!-- /header -->
                    <!-- content -->
                    <div class="flex flex-col">
                        {#if filterResult}
                            {#if filterResult.length > 0}
                            {#each filterResult as jadwalKelas}
                                
                                {#each jadwalKelas.schedule_subjects as subject}
                                    <div
                                        class="border-l-8 border-2 border-blue-400 py-2 px-4 mb-2"
                                    >
                                        <div
                                            class="flex flex-col md:flex-row items-center justify-between px-4 py-2"
                                        >
                                            <div
                                                class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base"
                                            >
                                                <i class="bi bi-calendar" />
                                                <div
                                                    class="ml-4 truncate w-40 md:w-60"
                                                >
                                                {jadwalKelas.academy_class.name}                                                </div>
                                            </div>
                                            <div
                                                class="ml-4 flex flex-row items-center text-gray-700 text-sm"
                                            >
                                                <div
                                                    class="mx-2 hover:text-blue-400 cursor-pointer"
                                                >
                                                    <i
                                                        class="bi bi-clock-fill mr-2"
                                                    />{subject.start_time} - {subject.end_time}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/each}
                                
                            {/each}
                            {:else}
                                    <div class="w-full flex items-center justify-center">
                                        <h4>Tidak ada jadwal untuk hari ini.</h4>
                                    </div>
                                {/if}
                        {:else}
                            <img
                                src="./../images/loading.svg"
                                alt="Loading..."
                                class="self-center justify-self-center"
                            />
                        {/if}
                    </div>
                    <!-- /content -->
                </div>
                <!-- /jadwal pelajaran hari ini -->
                <!-- materi -->
                <div class="bg-white px-5 rounded-lg py-2 mt-5 shadow-lg">
                    <!-- header -->
                    <div
                        class="flex flex-row justify-between items-center px-0"
                    >
                        <div>
                            <h1
                                class="font-bold py-2 text-base md:text-xl text-gray-700"
                            >
                                Materi Saya
                                <span class="font-light text-sm">(2)</span>
                            </h1>
                        </div>
                        <a href={BASE_URL + '/materi-guru'}
                            class="text-sm text-gray-700 cursor-pointer hover:text-blue-400"
                        >
                            Selengkapnya
                        </a>
                    </div>
                    <!-- /header -->
                    <!-- content -->
                    <!-- list materi -->
                    <div class="flex flex-col">
                        {#await getData(
                            "GET",
                            BASE_API_URL + "/teacher/academy-theories",
                            {
                                include: "academy-subject,academy-class",
                            }
                        )}
                            <img
                                src="./../images/loading.svg"
                                alt="Loading..."
                                class="self-center justify-self-center"
                            />
                        {:then result}
                            {#if result.data.length <= 0}
                                <p class="text-center p-4 border border-blue-400">Hari ini tidak ada materi yang dibuat</p>
                            {:else}
                            {#each result.data as materi}
                                 <!-- list materi -->
                                 <div
                                 class="border-l-8 border-2 border-gray-700 py-2 px-4 mb-2"
                             >
                                 <div
                                     class="flex flex-col md:flex-row items-center justify-between px-4 py-2"
                                 >
                                     <div
                                         class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base"
                                     >
                                         <i
                                             class="bi bi-file-earmark-post"
                                         />
                                         <div class="ml-4">
                                             {materi.title}
                                         </div>
                                     </div>
                                     <div
                                         class="ml-4 flex flex-row items-center text-gray-700 text-sm"
                                     >
                                         <div
                                             class="mx-0.5 md:mx-1 text-right"
                                         >
                                             <i
                                                 class="bi bi-book mr-0.5 md:mr-1"
                                             />
                                             {#if materi.academy_subject !== null}
                                                 {materi
                                                     .academy_subject
                                                     .name}
                                             {/if}
                                         </div>
                                     </div>
                                 </div>
                             </div>
                             <!-- /list materi -->
                                
                            {/each}
                            {/if}
                        {/await}
                    </div>
                    <!-- /list materi -->
                    <!-- /content -->
                </div>
                <!-- /materi -->
                <!-- pengumuman untuk guru -->
                <div class="bg-white px-5 rounded-lg py-2 mt-5 shadow-lg border">
                    <!-- header -->
                    <div
                        class="flex flex-row justify-between items-center px-0 md:px-5"
                    >
                        <div>
                            <h1
                                class="font-bold px-5 py-2 text-base md:text-xl text-gray-700"
                            >
                                Pengumuman
                            </h1>
                        </div>
                        <a href={BASE_URL + '/pengumuman'}
                            class="text-sm text-gray-700 cursor-pointer hover:text-blue-400"
                        >
                            Selengkapnya
                        </a>
                    </div>
                    <!-- /header -->
                    <!-- content -->
                    <div class="flex flex-col">
                        {#await getData(
                            "GET",
                            BASE_API_URL + "/announcement/for-me",
                        )}
                            <img
                                src="./../images/loading.svg"
                                alt="Loading..."
                                class="self-center justify-self-center"
                            />
                        {:then result}
                        {#if result.data.length <= 0}
                                <p class="text-center p-4 border border-blue-400">Tidak ada pengumuman untuk anda</p>
                        {:else}
                            {#each result.data as pengumuman}
                                <div
                                    class="border-l-8 border-2 border-green-700 py-2 px-4 mb-2"
                                >
                                    <div
                                        class="flex flex-col md:flex-row justify-between px-4 py-2"
                                    >
                                        <div>
                                            <div
                                                class="flex flex-row items-center text-gray-700 hover:text-blue-400 cursor-pointer font-light text-base"
                                            >
                                                <i
                                                    class="bi bi-chat-square-text-fill"
                                                />
                                                <div class="ml-4">{pengumuman.title}</div>
                                            </div>
                                        </div>
                                        <div
                                            class="flex md:flex-row flex-col text-gray-700 text-sm"
                                        >
                                            <div
                                                class="mx-2 hover:text-blue-400 cursor-pointer"
                                            >
                                                <i
                                                    class="bi bi-person-fill md:mr-2"
                                                />Nama yang Posting
                                            </div>
                                            <div class="mx-2">
                                                <i
                                                    class="bi bi-calendar md:mr-2"
                                                />22-02-2021
                                            </div>
                                            <div class="mx-2">
                                                <i class="bi bi-eye-fill md:mr-2" />32
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        {/if}
                        {/await}
                    </div>
                    <!-- /content -->
                </div>
                <!-- /pengumuman untuk guru -->
            </div>
        </div>
        <!-- /content -->
    </div>
</div>
<!-- /content -->
{/if}
