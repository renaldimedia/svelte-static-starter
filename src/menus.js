import {BASE_API_URL, BASE_URL} from "./stores/index"

export const menuTeacher = [
  {
    show: 1,
    path: BASE_URL + "/panel/dashboard",
    text_link: "Dashboard",
    icon: "bi-speedometer",
  },
  {
    show: 1,
    path: BASE_URL + "/panel/user/profile",
    text_link: "Profile Guru",
    icon: "bi-person-fill",
  },
  {
    show: 1,
    path: BASE_URL + "/panel/absensi",
    text_link: "Absensi",
    icon: "bi-person-bounding-box",
  },
  {
    show: 1,
    path: BASE_URL + "/panel/forum",
    text_link: "Forum",
    icon: "bi-chat-left-text-fill",
  },
  {
    show: 1,
    path: BASE_URL + "/panel/materi",
    text_link: "Materi Guru",
    icon: "bi-journal-album",
  },
  {
    show: 1,
    path: BASE_URL + "/panel/jadwal",
    text_link: "Jadwal Pelajaran",
    icon: "bi-calendar",
  },
  {
    show: 1,
    path: BASE_URL + "/panel/tugas",
    text_link: "Tugas",
    icon: "bi-calendar",
  },

  {
    show: 1,
    path: BASE_URL + "/pengumuman/index",
    text_link: "Pengumuman",
    icon: "bi-envelope-fill",
  },
  {
    show: 0,
    path: BASE_URL + "/panel/raport-guru",
    text_link: "Raport Guru",
    icon: "bi-star-fill",
  },

  {
    show: 0,
    path: BASE_URL + "/panel/perpustakaan",
    text_link: "Perpustakaan",
    icon: "bi-book",
  },
];

export const menuStudent = [
  // { show: 1, path: "/dashboard", text_link: "Dashboard", icon: "bi-speedometer" },
  {
    show: 1,
    path: BASE_URL + "/forum/index",
    text_link: "Forum",
    icon: "bi-chat-left-text-fill",
  },
  // { show: 1, path: "/tugas", text_link: "Tugas", icon: "bi-journal-album" },
  {
    show: 1,
    path: BASE_URL + "/jadwal/index",
    text_link: "Jadwal Pelajaran",
    icon: "bi-calendar",
  },
  {
    show: 1,
    path: BASE_URL + "/materi/index",
    text_link: "Materi Siswa",
    icon: "bi-text-paragraph",
  },
  {
    show: 1,
    path: BASE_URL + "/profile/index",
    text_link: "Profile Siswa",
    icon: "bi-person-fill",
  },
  // {
  //   show: 1, path: "/ujianonline/login",
  //   text_link: "Ujian",
  //   icon: "bi-question-circle-fill",
  // },
  {
    show: 1,
    path: BASE_URL + "/pengumuman/index",
    text_link: "Pengumuman",
    icon: "bi-envelope-fill",
  },
  // { show: 1, path: "/perpustakaan", text_link: "Perpustakaan", icon: "bi-text-paragraph" },
  {
    show: 0,
    path: BASE_URL + "/panel/raport-siswa",
    text_link: "Raport Siswa",
    icon: "bi-star-fill",
  },

  {
    show: 0,
    path: BASE_URL + "/panel/perpustakaan",
    text_link: "Perpustakaan",
    icon: "bi-book",
  },
];

let categories = [];

export const loadArticleCategories = function(){
  const url = BASE_API_URL + "/article-categories";
  // console.log(BASE_API_URL);
  // console.log(url);

  let headers = {
    Accept: "application/json",
  };

  fetch(url, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((res) => {
      if(res.data.length > 0){
        for(let i = 0 ; i < res.data.length ; i ++){
          let x = {
            show: 1,
            path: BASE_URL + "/artikel/page.html?categoryid=" + res.data[i].id,
            relative_path: "./artikel/category/"+res.data[i].id,
            text: res.data[i].name,
          }
          categories.push(x);
        }
      }
    });
}

loadArticleCategories();

export var publicMenu = [
  {
    show: 1,
    path: "#",
    relative_path: "./",
    text_link: "Artikel",
    icon: "fas fa-home",
    submenu: categories,
  },
  {
    show: 1,
    path: "#",
    relative_path: "./",
    text_link: "Profile",
    icon: "fas fa-home",
    submenu: [
      {
        show: 1,
        path: BASE_URL + "/visimisi/index",
        relative_path: "./profil/visi",
        text: "Visi & Misi",
      },
      {
        show: 1,
        path: BASE_URL + "/organisasi/index",
        relative_path: "./profil/struktur-organisasi",
        text: "Struktur Organisasi",
      },
      {
        show: 1,
        path: BASE_URL + "/dapok/index",
        relative_path: "./profil/data-pokok",
        text: "Data Pokok",
      },
      {
        show: 1,
        path: BASE_URL + "/dataguru/index",
        relative_path: "./profil/guru",
        text: "Profile Guru",
      },
      {
        show: 1,
        path: BASE_URL + "/datastaff/index",
        relative_path: "./profil/staff",
        text: "Profile Staff",
      },
    ],
  },
  {
    show: 1,
    path: "#",
    relative_path: "#",
    text_link: "Kesiswaan",
    icon: "fas fa-user",
    submenu: [
      {
        show: 1,
        path: BASE_URL + "/osis/index",
        relative_path: "./ekskul/osis",
        text: "Osis",
      },
      {
        show: 1,
        path: BASE_URL + "/ekskul/index",
        relative_path: "./ekskul",
        text: "Ekstrakulikuler",
      },
    ],
  },
  {
    show: 1,
    path: BASE_URL + "/gallery/index",
    relative_path: "./galery",
    text_link: "Galeri",
    icon: "fas fa-home",
  },
];
