import { get, writable } from "svelte/store";
import localForage from "localforage";

const currentDate = new Date();

export const authStore = localForage.createInstance({
  storeName: "auth",
  name: "zmi_app",
});
export const globalStore = localForage.createInstance({
  storeName: "global",
  name: "zmi_app",
});
export const tempStore = localForage.createInstance({
  storeName: 'temp',
  name: "zmi_app"
});

if(typeof BASE_API_URL == 'undefined'){
  var BASE_API_URL = "__BASE_API_URL";
}
if(typeof BASE_ADMIN_URL == 'undefined'){
  var BASE_ADMIN_URL = "__BASE_ADMIN_URL";
}
if(typeof BASE_URL == 'undefined'){
  var BASE_URL = "__BASE_URL";
}
export {BASE_API_URL, BASE_ADMIN_URL, BASE_URL};


export const school = writable(false);
export const currentPPDB = writable(false);
export const mapel = writable([]);
export const pageLoader = writable(false);

// temp
export const detail = writable([]);
export const dataUpdateTemp = writable([]);

function loadSchool() {
  
  const url = new URL(BASE_API_URL + "/school-information?include=schoolAddress")

  let headers = {
    Accept: "application/json",
  };

  fetch(url, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((res) => {
      school.set(res);  
    });
}

function diffDays(update_date) {
  // console.log(startDate);
  let current = currentDate.getDate();
  let dua = update_date.getDate();

  return current - dua;
}
export const getAllMapel = function (reload = false) {
  const url = new URL("/api/subjects", BASE_API_URL);

  let params = {
    sort: "-name",
    include: "teachers",
    "page[size]": 100,
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  let headers = {
    Accept: "application/json",
  };

  fetch(url, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((res) => {
      mapel.set(res.data);
    });
};
function loadPPDB() {
  globalStore.getItem("ppdb_last_update").then(function (upt) {
    globalStore.getItem("ppdb").then(function (value) {
      if (value == null || upt == null || (upt != null && diffDays(upt) > 0)) {
        const url = new URL("/api/ppdbs?include=requirements", BASE_API_URL);

        let headers = {
          Accept: "application/json"
        };

        fetch(url, {
          method: "GET",
          headers,
        })
          .then((response) => response.json())
          .then((res) => {
            if (res.data.length > 0) {
              for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].status_code == 1) {
                  currentPPDB.set(res.data[i]);
                }
              }
            }
          });
      } else if (value != null) {
        currentPPDB.set(value);
      }
    });
  });
}
globalStore.getItem("school_data").then((val) => {
  // console.log(val)
  if (val != null) {
    school.set(val);
  } else {
    loadSchool();
  }
});
globalStore.getItem("ppdb").then((val) => {
  if (val != null) {
    currentPPDB.set(val);
  } else {
    loadPPDB();
  }
});
school.subscribe((val) => {
  if (val && val != null) {
    val["update_at"] = currentDate;
    globalStore.setItem("school_data", val);
    globalStore.setItem("school_data_last_update", currentDate);
  }else if(!val || val == null){
    loadSchool(true);
  }
});
mapel.subscribe((val) => {
  if (!val || val == "") {
    getAllMapel();
  } else {
    globalStore.setItem("data_mapel", val);
    globalStore.setItem("data_mapel_last_update", currentDate);
  }
});
currentPPDB.subscribe((val) => {
  if (!val || val == "") {
    loadPPDB();
  } else {
    globalStore.setItem("ppdb", val);
    globalStore.setItem("ppdb_last_update", currentDate);
  }
});




