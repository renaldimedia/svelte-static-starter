<script>
    import { slide } from "svelte/transition";
    import DateInput from "../../components/DateInput.svelte";
    import SelectInput from "../../components/SelectInput.svelte";
    import ImageHeroIlustration from "../../components/ImageHeroIlustration.svelte";
    // import { goto } from "@roxi/routify";
    import TextInput from "../../components/TextInput.svelte";
    import Button from "../../components/Button.svelte";
    // import { baseApiUrl } from "../../network";
    import { currentPPDB, BASE_API_URL, pageLoader } from "../../stores/index";
    import {onDestroy} from "svelte";
    let avatar, fileinput;
    let aggree = false;
    let ppdbKey;
    let newPpdbKey;
    let errors;
    let isLoading = false;
    let activeTab = 1;
    let presLoaded = false;

    let modal = true;
    let showkeyAlertModal = false;
    let successModal = false;
    let showInputCode = false;


    let requirements = (typeof $currentPPDB.requirements != 'undefined') ? $currentPPDB.requirements : [];
    let persyaratan = [];
    let filename = [];

    const formInputs = {
        name: "",
        email: "",
        phone_number: "",
        gender: "",
        place_of_birth: "",
        date_of_birth: "",
        religion: "",
        address: "",
        entry_year: "",
        neighbourhood: "",
        hamlet: "",
        urban_village: "",
        sub_district: "",
        city: "",
        postal_code: "",
        p_ktp_number: "",
        p_name: "",
        p_gender: "",
        p_place_of_birth: "",
        p_date_of_birth: "",
        p_religion: "",
        p_address: "",
        p_neighbourhood: "",
        p_hamlet: "",
        p_urban_village: "",
        p_sub_district: "",
        p_city: "",
        p_postal_code: "",
        p_education: "",
        p_salary: "",
        p_work: "",
        photo: "",
    };

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
        };

        formInputs.photo = image;
    };

    const postData = async () => {
        isLoading = true;
        pageLoader.set(true);
        var formdata = new FormData();
        formdata.append("ppdb_id", $currentPPDB.id),
        formdata.append("name", formInputs.name);
        formdata.append("email", formInputs.email);
        formdata.append("phone_number", formInputs.phone_number);
        formdata.append("gender", formInputs.gender.value);
        formdata.append("place_of_birth", formInputs.place_of_birth);
        formdata.append("date_of_birth", formInputs.date_of_birth);
        formdata.append("religion", formInputs.religion.value);
        formdata.append("address", formInputs.address);
        formdata.append("entry_year", formInputs.entry_year);
        formdata.append("neighbourhood", formInputs.neighbourhood);
        formdata.append("hamlet", formInputs.hamlet);
        formdata.append("urban_village", formInputs.urban_village);
        formdata.append("sub_district", formInputs.sub_district);
        formdata.append("city", formInputs.city);
        formdata.append("postal_code", formInputs.postal_code);
        formdata.append("p_ktp_number", formInputs.p_ktp_number);
        formdata.append("p_name", formInputs.p_name);
        formdata.append("p_gender", formInputs.p_gender.value);
        formdata.append("p_place_of_birth", formInputs.p_place_of_birth);
        formdata.append("p_date_of_birth", formInputs.p_date_of_birth);
        formdata.append("p_religion", formInputs.p_religion.value);
        formdata.append("p_address", formInputs.p_address);
        formdata.append("p_neighbourhood", formInputs.neighbourhood);
        formdata.append("p_hamlet", formInputs.p_hamlet);
        formdata.append("p_urban_village", formInputs.p_urban_village);
        formdata.append("p_sub_district", formInputs.p_sub_district);
        formdata.append("p_city", formInputs.p_city);
        formdata.append("p_postal_code", formInputs.p_postal_code);
        formdata.append("p_education", formInputs.p_education.value);
        formdata.append("p_salary", formInputs.p_salary);
        formdata.append("p_work", formInputs.p_work);
        formdata.append("photo", formInputs.photo);
        formdata.append('no_kk', formInputs['no_kk']);
        formdata.append('nisn', formInputs['nisn']);
        formdata.append('nik', formInputs['nik']);
        persyaratan.forEach((data,index)=>{
            formdata.append(`requirement_files[${index}][ppdb_requirement_id]`,data.ppdb_requirement_id);
            formdata.append(`requirement_files[${index}][file]`, data.file);
        })

        formdata.forEach((value)=>console.log(value));

        var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json")
        myHeaders.append("Accept", "application/json");

        var requestOptions = {  
            method: "POST",
            headers: myHeaders,
            body: formdata,
        };

        if (ppdbKey !== undefined) {
            formdata.append("ppdb_key", ppdbKey);

            if (fileinput.files[0]) {
                formdata.set("photo", fileinput.files[0]);
            } else {
                formdata.delete("photo");
            }


            persyaratan.forEach((data,index)=>{
                if(data.file === null){
                    formdata.delete(`requirement_files[${index}][ppdb_requirement_id]`);
                    formdata.delete(`requirement_files[${index}][file]`);
                }

            })

            fetch(BASE_API_URL + "/ppdb/student/update", requestOptions)
                .then((response) => {
                    if (response.ok && (response.status >= 200 && response.status < 400)) {
                        successModal = !successModal;
                        return response.json();
                    }
                })
                .then((res) => {
                    errors = res.errors;
                });
        } else {
            // axios.post(baseApiUrl + "/ppdb/student/create", formdata)
            // .then(function (res) {
            //     if (res.errors == undefined) {
            //             if(res.data != null){
            //                 newPpdbKey = res.data.ppdb_key;
            //                 console.log(res.data);
            //             }
            //         } else {
            //             errors = res.errors;
            //             isLoading = false;
            //         }
            // })
            // .catch(function (error) {
            //     alert('terjadi error! bukan console untuk meilah error')
            //     console.log(error.response.data.errors);
            // });
            fetch(BASE_API_URL + "/ppdb/student/create", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        showkeyAlertModal = !showkeyAlertModal;
                        isLoading = false;
                        pageLoader.set(false);
                    } else if(response.status == 500){
                        pageLoader.set(false);
                        alert('Server Error');
                    }
                    return response.json();
                })
                .then((response) => {
                    console.log(response);
                    if (response.errors == undefined) {
                        if(response != null){
                            newPpdbKey = response.ppdb_key;
                        }
                    } else {
                        errors = response.errors;
                        isLoading = false;
                        pageLoader.set(false);
                    }
                });
        }
    };

    function getData() {
        pageLoader.set(true);
        const url = new URL(BASE_API_URL + "/ppdb/student/current");
        url.searchParams.append('ppdb_key', ppdbKey);
        fetch(url, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.errors){
                    pageLoader.set(false);
                    return;
                }

                formInputs["name"] = data.name;
                formInputs["email"] = data.email;
                formInputs["phone_number"] = data.phone_number;
                formInputs["gender"] = data.gender;
                formInputs["place_of_birth"] = data.place_of_birth;
                formInputs["date_of_birth"] = data.date_of_birth;
                formInputs["religion"] = data.religion;
                formInputs["address"] = data.address;
                formInputs["entry_year"] = data.entry_year;
                formInputs["neighbourhood"] = data.neighbourhood;
                formInputs["hamlet"] = data.hamlet;
                formInputs['no_kk'] = data.no_kk;
                formInputs['nik'] = data.nik;
                formInputs['nisn'] = data.nisn;
                formInputs["urban_village"] = data.urban_village;
                formInputs["sub_district"] = data.sub_district;
                formInputs["city"] = data.city;
                formInputs["postal_code"] = data.postal_code;
                formInputs["p_ktp_number"] = data.p_ktp_number;
                formInputs["p_name"] = data.p_name;
                formInputs["p_gender"] = data.p_gender;
                formInputs["p_place_of_birth"] = data.p_place_of_birth;
                formInputs["p_date_of_birth"] = data.p_date_of_birth;
                formInputs["p_religion"] = data.p_religion;
                formInputs["p_address"] = data.p_address;
                formInputs["p_neighbourhood"] = data.neighbourhood;
                formInputs["p_hamlet"] = data.p_hamlet;
                formInputs["p_urban_village"] = data.p_urban_village;
                formInputs["p_sub_district"] = data.p_sub_district;
                formInputs["p_city"] = data.p_city;
                formInputs["p_postal_code"] = data.p_postal_code;
                formInputs["p_education"] = data.p_education;
                formInputs["p_salary"] = data.p_salary;
                formInputs["p_work"] = data.p_work;

                avatar = data.profile_photo_url;

                toggleModal();
                pageLoader.set(false);
            });
    }

    function toggleModal() {
        modal = !modal;
    }
    onDestroy(()=>{
        document.body.classList.remove("overflow-hidden");
    });

    $:{
        if(typeof $currentPPDB.requirements != 'undefined' && !presLoaded){
            requirements = $currentPPDB.requirements;
            requirements.forEach((requirement) => {
                persyaratan.push({ppdb_requirement_id : requirement.pivot.ppdb_requirement_id, file: null});
            });
            presLoaded = true
        }
    }
    

function inputRequirement(e, index) {
    persyaratan[index].file = e.target.files[0];
    filename[index] = e.target.files[0].name;
}



</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</svelte:head>

{#if modal}
    <div class=" bg-gray-500 opacity-50 h-screen w-screen fixed" />
    <div class="w-screen h-screen fixed flex justify-center items-center z-50">
        <div
            class="card shadow-lg rounded-lg max-w-sm bg-white p-5 flex flex-col justify-center items-center"
        >
            <h1 class="font-bold text-biru text-xl my-5">PPDB</h1>
            <div class="flex flex-col items-center space-y-4">
                {#if !showInputCode}
                    <Button
                        classes="bg-biru w-full"
                        on:click={() => (showInputCode = !showInputCode)}
                        >Edit Data PPDB</Button
                    >
                    <Button classes="bg-biru w-full" on:click={toggleModal}
                        >Data Baru</Button
                    >
                {/if}

                {#if showInputCode}
                    <TextInput
                        placeholder="Masukan Kode PPDB"
                        bind:value={ppdbKey}
                    />
                    <div class="flex space-x-2">
                        <Button
                            classes="bg-merah"
                            on:click={() => (showInputCode = !showInputCode)}
                            >Back</Button
                        >
                        <Button classes="bg-hijau" on:click={getData}
                            >Submit</Button
                        >
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}

{#if showkeyAlertModal}
    <div class=" bg-gray-500 opacity-50 h-screen w-screen fixed" />
    <div class="w-screen h-screen fixed flex justify-center items-center z-50">
        <div
            class="card shadow-lg rounded-lg max-w-sm bg-white p-5 flex flex-col justify-center items-center"
        >
            <img
                src="./images/alert-circle.svg"
                alt="Alert Icon"
                class="w-10"
            />
            <h1>Mohon Perhatian</h1>
            <p class="text-center w-full">
                Pendaftaran Berhasil harap simpan kode dibawah ini, untuk
                melakukan perubahan apabila ada kesalahan data
            </p>
            <div class="border-b w-full my-2" />
            <p class="text-xl font-semibold border-2 border-red-700 p-5">
                {newPpdbKey}
            </p>
            <a href="/" class="bg-merah md:px-2 py-1 mt-5">Clise</a>
            <Button
                classes="bg-merah md:px-2 py-1 mt-5"
                on:click={() => {
                    showkeyAlertModal = false;
                    window.location.href('/');
                }}>Close</Button
            >
        </div>
    </div>
{/if}

{#if successModal}
    <div class=" bg-gray-500 opacity-50 h-screen w-screen fixed" />
    <div class="w-screen h-screen fixed flex justify-center items-center z-50">
        <div
            class="card shadow-lg rounded-lg max-w-lg bg-white p-5 flex flex-col space-y-3 justify-center items-center"
        >
            <h1>Data berhasil diupdate!</h1>
            <img src="./images/Check.png" alt="Success Icon" class="w-16" />
            <Button
                classes="bg-hijau py-1 mt-5"
                on:click={() => {
                    successModal = false;
                    window.location.href('/');
                }}>Ok</Button
            >
        </div>
    </div>
{/if}
<div class="wrapper flex">
    <ImageHeroIlustration />
    <div class="img-ilustration w-1/3 min-h-screen hidden md:flex items-stretch justify-center"></div>
    <div class="registration">
        <h1>Registrasi PPDB</h1>

        <div class="bg-white shadow rounded-t-md">
            <nav class="flex flex-col sm:flex-row">
                <button
                    on:click={() => (activeTab = 1)}
                    class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {activeTab == 1
                        ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                        : ''}"
                >
                    Data Formulir
                </button>
                <button
                    on:click={() => (activeTab = 2)}
                    class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none {activeTab ==
                    2
                        ? 'text-blue-500 border-b-2 font-medium border-blue-500'
                        : ''}"
                >
                    Upload Persyaratan</button
                >
            </nav>
        </div>

        <form
            on:submit|preventDefault={aggree
                ? postData
                : () =>
                      alert(
                          "Jika anda tidak menyetujui pernyataan diatas, maka anda tidak bisa melanjutkan pendaftaran!"
                      )}
            class="bg-white card shadow rounded-b-lg p-5"
        >
            {#if activeTab == 1}
                <div class="container" transition:slide>
                    <p class="form-title">Data Pribadi</p>
                    <div class=" md:grid-cols-2 grid grid-cols-1 gap-4 pt-6">
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Nama Lengkap"
                                bind:value={formInputs.name}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('name')}
                                    {#each errors.name as error}
                                        <p class="text-merah">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="NISN"
                                type="number"
                                bind:value={formInputs.nisn}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('nisn')}
                                    {#each errors.name as error}
                                        <p class="text-merah">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="No KK"
                                type="number"
                                bind:value={formInputs.no_kk}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('no_kk')}
                                    {#each errors.name as error}
                                        <p class="text-merah">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="NIK"
                                type="number"
                                bind:value={formInputs.nik}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('nik')}
                                    {#each errors.name as error}
                                        <p class="text-merah">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                type="email"
                                placeholder="Email"
                                bind:value={formInputs.email}
                            />
                        </div>
                        <div>
                            <SelectInput
                                items={[
                                    { value: "laki-laki", label: "Laki-Laki" },
                                    { value: "perempuan", label: "Perempuan" },
                                ]}
                                placeholder="Jenis Kelamin"
                                bind:value={formInputs.gender}
                            />
                            {#if errors}
                                    {#if errors.hasOwnProperty('gender')}
                                        {#each errors.gender as error}
                                            <p class="text-merah pl-3">{error}</p>
                                        {/each}
                                    {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Tempat Lahir"
                                bind:value={formInputs.place_of_birth}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('place_of_birth')}
                                    {#each errors.place_of_birth as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <DateInput
                                placeholder="Tanggal Lahir"
                                bind:value={formInputs.date_of_birth}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('date_of_birth')}
                                    {#each errors.date_of_birth as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <SelectInput
                                items={[
                                    { value: "islam", label: "Islam" },
                                    { value: "protestan", label: "Protestan" },
                                    { value: "katolik", label: "Katolik" },
                                    { value: "hindu", label: "Hindu" },
                                    { value: "budha", label: "Budha" },
                                ]}
                                placeholder="Agama"
                                bind:value={formInputs.religion}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('religion')}
                                    {#each errors.religion as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                type="number"
                                placeholder="RT"
                                bind:value={formInputs.neighbourhood}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('neighbourhood')}
                                    {#each errors.neighbourhood as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                type="number"
                                placeholder="RW"
                                bind:value={formInputs.hamlet}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('hamlet')}
                                    {#each errors.hamlet as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Kelurahan"
                                bind:value={formInputs.urban_village}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('urban_village')}
                                    {#each errors.urban_village as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Kecamatan"
                                bind:value={formInputs.sub_district}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('sub_district')}
                                    {#each errors.sub_district as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Kota"
                                bind:value={formInputs.city}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('city')}
                                    {#each errors.city as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                type="number"
                                placeholder="Kode Pos"
                                bind:value={formInputs.postal_code}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('postal_code')}
                                    {#each errors.postal_code as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div class="grid grid-rows-2">
                            <TextInput
                                isRequired={true}
                                type="number"
                                maxlength="4"
                                minlength="4"
                                placeholder="Tahun Masuk"
                                bind:value={formInputs.entry_year}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('entry_year')}
                                    {#each errors.entry_year as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <label for="alamat" class="text-gray-500"
                                >Alamat Lengkap</label
                            >
                            <textarea
                                placeholder="Alamat Lengkap"
                                class="rounded-md shadow-sm p-3 bg-gray-200 w-full"
                                rows="2"
                                bind:value={formInputs.address}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('address')}
                                    {#each errors.address as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div class="grid grid-rows-4">
                            <TextInput
                                isRequired={true}
                                placeholder="No HP Aktif"
                                type="tel"
                                bind:value={formInputs.phone_number}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('phone_number')}
                                    {#each errors.phone_number as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <label for="foto-profile" class="text-gray-500"
                                >Foto Profil Siswa</label
                            >
                            <div
                                class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
                            >
                                <div class="space-y-1 text-center">
                                    {#if avatar}
                                        <img
                                            class="avatar"
                                            src={avatar}
                                            alt="d"
                                            width="100%"
                                        />
                                    {:else}
                                        <svg
                                            class="mx-auto h-12 w-12 text-gray-400"
                                            on:click={fileinput.click()}
                                            stroke="currentColor"
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    {/if}
                                    <div
                                        class="sm:flex text-sm text-gray-600"
                                    >
                                        <label
                                            for="file-upload"
                                            class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                            <span
                                                on:click={fileinput.click()}
                                                >Upload a file</span
                                            >
                                            <input
                                                style="display:none"
                                                type="file"
                                                id="foto-profile"
                                                accept=".jpg, .jpeg, .png"
                                                on:change={(e) =>
                                                    onFileSelected(e)}
                                                bind:this={fileinput}
                                            />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                    <p class="form-title">Data Orang Tua</p>
                    <div
                        class=" md:grid-cols-2 grid grid-cols-1 gap-4 pt-6"
                    >
                        <TextInput
                            isRequired={true}
                            type="number"
                            placeholder="Nomor KTP / NIK"
                            bind:value={formInputs.p_ktp_number}
                        />
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Nama Lengkap"
                                bind:value={formInputs.p_name}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_name')}
                                    {#each errors.p_name as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <SelectInput
                                items={[
                                    {
                                        value: "laki-laki",
                                        label: "Laki-Laki",
                                    },
                                    {
                                        value: "perempuan",
                                        label: "Perempuan",
                                    },
                                ]}
                                placeholder="Jenis Kelamin"
                                bind:value={formInputs.p_gender}
                            />
                            {#if errors}
                                    {#if errors.hasOwnProperty('p_gender')}
                                        {#each errors.p_gender as error}
                                            <p class="text-merah pl-3">{error}</p>
                                        {/each}
                                    {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Tempat Lahir"
                                bind:value={formInputs.p_place_of_birth}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_place_of_birth')}
                                    {#each errors.p_place_of_birth as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <DateInput
                                placeholder="Tanggal Lahir"
                                bind:value={formInputs.p_date_of_birth}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_date_of_birth')}
                                    {#each errors.p_date_of_birth as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <SelectInput
                            items={[
                                { value: "islam", label: "Islam" },
                                { value: "protestan", label: "Protestan" },
                                { value: "katolik", label: "Katolik" },
                                { value: "hindu", label: "Hindu" },
                                { value: "budha", label: "Budha" },
                            ]}
                            placeholder="Agama"
                            bind:value={formInputs.p_religion}
                        />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_religion')}
                                    {#each errors.p_religion as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <label for="alamat" class="text-gray-500"
                                >Alamat Lengkap</label
                            >
                            <textarea
                                placeholder="Alamat Lengkap Orang Tua"
                                class="mt-1 md:col-span-2 w-full bg-gray-200 rounded-md shadow-sm p-3"
                                rows="3"
                                bind:value={formInputs.p_address}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_address')}
                                    {#each errors.p_address as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                type="number"
                                placeholder="RT"
                                bind:value={formInputs.p_neighbourhood}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_neighbourhood')}
                                    {#each errors.p_neighbourhood as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                type="number"
                                placeholder="RW"
                                bind:value={formInputs.p_hamlet}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_hamlet')}
                                    {#each errors.p_hamlet as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Kelurahan"
                                bind:value={formInputs.p_urban_village}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_urban_village')}
                                    {#each errors.p_urban_village as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Kecamatan"
                                bind:value={formInputs.p_sub_district}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_sub_district')}
                                    {#each errors.p_sub_district as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Kota"
                                bind:value={formInputs.p_city}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_city')}
                                    {#each errors.p_city as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                type="number"
                                placeholder="Kode Pos"
                                bind:value={formInputs.p_postal_code}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_postal_code')}
                                    {#each errors.p_postal_code as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Pekerjaan"
                                bind:value={formInputs.p_work}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_work')}
                                    {#each errors.p_work as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <TextInput
                                isRequired={true}
                                placeholder="Gaji"
                                type="number"
                                bind:value={formInputs.p_salary}
                            />
                            {#if errors}
                                {#if errors.hasOwnProperty('p_salary')}
                                    {#each errors.p_salary as error}
                                        <p class="text-merah pl-3">{error}</p>
                                    {/each}
                                {/if}
                            {/if}
                        </div>
                        <div>
                            <SelectInput
                                items={[
                                    { value: "sd", label: "SD" },
                                    { value: "smp", label: "SD" },
                                    {
                                        value: "sma/smk sederajat",
                                        label: "SMA/SMK Sederajat",
                                    },
                                    { value: "s1", label: "S1" },
                                    { value: "lainnya", label: "Lainnya" },
                                ]}
                                placeholder="Pendidikan Terakhir"
                                bind:value={formInputs.p_education}
                            />
                            {#if errors}
                                    {#if errors.hasOwnProperty('p_education')}
                                        {#each errors.p_education as error}
                                            <p class="text-merah pl-3">{error}</p>
                                        {/each}
                                    {/if}
                            {/if}
                        </div>
                    </div>

                    <div class="pernyataan mt-12">
                        <label for="pernyataan" class="text-lg">
                            Pernyataan
                            <input
                                type="checkbox"
                                name="pernyataan"
                                id="pernyataan"
                                bind:checked={aggree}
                                class="border-2 border-biru"
                            />
                        </label>
                        <p class="text-xs text-gray">
                            Saya menyatakan dengan sesungguhnya bahwa isian
                            data dalam formulir ini adalah benar. Apabila
                            ternyata data tersebut tidak benar / palsu, maka
                            saya bersedia menerima sanksi berupa Pembatalan
                            sebagai Calon Peserta Didik.
                        </p>
                    </div>
                </div>
            {:else}
                <div class="bg-white rounded-b-md">
                    <ul>
                        {#each persyaratan as error, index}
                        {#if errors && errors.hasOwnProperty(`requirement_files.${index}.file`)}
                            <li>{errors[`requirement_files.${index}.file`]}</li>
                        {/if}
                        {/each}
                    </ul>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {#each requirements as requirement, index}
                                <div class="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
                                    <label for="{requirement.name}">{requirement.name}</label>
                                    <div class="md:flex">
                                        <div class="w-full">
                                            <div class="relative h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
                                                <div class="absolute">
                                                    <div class="flex flex-col items-center p-5"> <i class="fa fa-folder-open fa-4x text-blue-700"></i> <span class="block text-gray-400 font-normal text-center">
                                                        {#if filename.length == 0 || filename === [] || filename[index] == undefined}
                                                            Upload persyaratan disini
                                                        {:else}
                                                            {filename[index]}
                                                        {/if}
                                                        </span> </div>
                                                </div> <input type="file" on:change={(e)=>inputRequirement(e, index)} class="h-full w-full opacity-0" name="">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            <!-- <div>
                                <label for="{requirement.name}">{requirement.name}</label>
                                <input type="file" name={requirement.name} id={requirement.name}>
                            </div> -->
                        {/each}
                    </div>
                </div>
            {/if}
            <div class="flex justify-end mt-3 space-x-2">
                <Button
                    buttonType="button"
                    classes="bg-merah"
                    on:click={() => window.location.href('/')}>Batal</Button
                >
                <Button classes="bg-biru"
                    >{#if isLoading}
                        Sending....
                    {:else}
                        Kirim Formulir
                    {/if}</Button
                >
            </div>
        </form>
    </div>
</div>

<style type="text/postcss" lang="postcss">
    .registration {
        @apply w-full;
        padding: 50px 40px;
    }

    @screen md {
        .registration {
            @apply w-2/3;
            padding: 50px 124px;
        }
    }

    .registration h1 {
        font-size: 36px;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        font-weight: bold;
    }

    .registration .form-title {
        font-size: 24px;
        @apply pt-6 pb-3;
    }
</style>
