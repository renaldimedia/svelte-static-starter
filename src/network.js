import { get } from "svelte/store";
import { authToken } from "./stores/auth";
import { authStore, BASE_API_URL } from "./stores/index";


export const getMataPelajaran = async () => {
  authStore.getItem("auth_token").then(function (val) {
    if (val != null) {
      const url = new URL(BASE_API_URL + "/teacher/current-academy-subjects");

      let headers = {
        Authorization: val,
        Accept: "application/json",
      };

      return fetch(url, {
        method: "GET",
        headers,
      }).then((response) => response.json());
    }
  });
};

export const getKelas = async () => {
    const response = await getData("GET", BASE_API_URL + "/teacher/current-academy-classes", {}, {});
    return response;
//   authStore.getItem("auth_token").then(function (val) {
//     if (val != null) {
//       const url = new URL(BASE_API_URL + "/teacher/current-academy-classes");

//       let headers = {
//         Authorization: val,
//         Accept: "application/json",
//       };

//       return fetch(url, {
//         method: "GET",
//         headers,
//       }).then((response) => response.json());
//     }
//   });
};

export const saveMateri = (
  id = null,
  fileInput,
  mapel,
  title,
  content,
  publish,
  currentDate,
  academy_class,
  academy_class_ids
) => {
  authStore.getItem("auth_token").then(function (val) {
    if (val != null) {
      try {
        let url;

        if (id == null) {
          url = new URL(BASE_API_URL + "/teacher/academy-theory");
        } else {
          url = new URL(BASE_API_URL + `/teacher/academy-theory/${id}`);
        }

        let headers = {
          Authorization: val,
          Accept: "application/json",
        };

        academy_class_ids = [];
        academy_class.forEach((kelas) => {
          academy_class_ids.push(kelas.value);
        });
        const body = new FormData();
        body.append("academy_subject_id", mapel.value);
        body.append("title", title);
        body.append("content", content);
        body.append("publish", publish ? 1 : 0);
        body.append("publish_at", currentDate);
        body.append("academy_class_ids", JSON.stringify(academy_class_ids));
        if (fileInput.files[0]) {
          body.append("file", fileInput.files[0]);
        }

        return fetch(url, {
          method: "POST",
          headers,
          body,
        });
      } catch (error) {}
    }
  });
};

export const getData = async (method = "GET", url, urlParams = {}, body = {}) => {
  // console.log(url);
  const httpUrl = new URL(url);

  let params = urlParams;
  if (params !== {}) {
    Object.keys(params).forEach((key) =>
      httpUrl.searchParams.append(key, params[key])
    );
  }
  let tk = "";
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: get(authToken)
  };
  console.log(headers);
//   console.log(authStore.getItem("auth_token"));
  if(method == "GET"){
    const response = await fetch(httpUrl, {
        method: method,
        headers,
        redirect: "follow"
      });
      return await response.json();
  }else{
    const response = await fetch(httpUrl, {
        method: method,
        headers,
        redirect: "follow",
        body: JSON.stringify(body)
      });
      return await response.json();
  }
  
};

export const getAllUserData = async (role) => {
  let params = {};
  if (role == "student") {
    params = {
      include:
        "roles, additional-information, address, personal-information,additional-information.academy-class-student",
    };
  } else if (role == "teacher") {
    params = {
      include:
        "roles, additional-information, address, personal-information, academy-subjects",
    };
  }
  const response = await getData("GET", BASE_API_URL + "/user", params);
  return response.data;
};

// Update User Data
export const updateDataUser = async (url = "", body = {}) => {
//   const httpUrl = new URL(url);

//   let headers = {
//     Authorization: get(authToken),
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   };

//   return await fetch(httpUrl, {
//     method: "PUT",
//     headers,
//     body: JSON.stringify(body),
//   }).then((response) => response.json());
  const response = await getData("PUT", url, {}, body);
  return response.data;
};
