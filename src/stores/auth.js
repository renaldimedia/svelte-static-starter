import { get, readable, writable } from "svelte/store";
import { authStore, globalStore, BASE_API_URL } from "./index";

let _token = "";
let _loginAs = "";

export const dummyToken = {
  teacher: "Bearer 37|t1or0sLxKts6KYSIRDb2PHz6nJx1d9G8fQaFyQYV",
  student: "Bearer 36|EeTQ4c7MMadJribeNxIEh0DaS1Ebm7hC85XKD9ze",
};

const CURRENT_TOKEN = function () {
  if (typeof TOKEN_ID != "undefined" && TOKEN_ID != "") {
    return TOKEN_ID;
  } else {
    if (__DEMO_MODE && "__DEMO_TYPE" === "student") {
      return dummyToken.student;
    } else if (__DEMO_MODE && "__DEMO_TYPE" === "teacher") {
      return dummyToken.teacher;
    }
  }
};

export const authToken = writable(false);
export const userData = writable(false);
export const loginAs = writable("");
export const siswaSaya = writable([]);
export const mapelSaya = writable([]);
export const kelasSaya = writable([]);
let isAuthorized = false;

export const loadToken = async function () {
  // if (__DEMO_MODE && "__DEMO_TYPE" === "student") {
  //   authToken.set(CURRENT_TOKEN());
  //   return CURRENT_TOKEN();
  // }
  try {
    const value = await authStore.getItem("auth_token");
    // This code runs once the value has been loaded
    // from the offline store.
    return value;
  } catch (err) {
    // This code runs if there were any errors.
    console.log(err);
  }
};

export const tokenNow = loadToken();
export async function loadUserApi(token) {
  console.log(token);
  if(typeof token == 'undefined'){
    console.log('token kosong!');
    return;
  }
  const url = new URL(BASE_API_URL + "/user");

  let params = {
    include: "roles,additional-information, address, personal-information ",
  };

  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  let myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", token);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(url, requestOptions)
    .then((response) => response.json())
    .then((response) => {
      if (typeof response != "undefined") {
        console.log('ada user!')
        userData.set(response.data);
        authStore.setItem("profile", response.data);
        if (typeof response.data.roles != "undefined") {
          loginAs.set(response.data.roles[0].name);
        }
      }
    })
    .catch((error) => console.log("error", error));

  // fetch(url, {
  //   method: "GET",
  //   headers,
  // })
  //   .then((response) => {
  //     response.text();
  //   })
  //   .then((response) => {
  //     console.log(response);
  //     if (typeof response != "undefined") {
  //       userData.set(res.data);
  //       authStore.setItem("profile", res.data);
  //     }
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
}
export function loadUser(refresh = false) {
  authStore.getItem("auth_token").then(function (val) {
    if (refresh && typeof val != "undefined") {
      if (val && val != null) {
        loadUserApi(val);
      }
    } else {
      authStore.getItem("profile").then(function (val) {
        if (val != null) {
          userData.set(val);
        } else {
          loadUser(true);
        }
      });
    }
  });
}

function getMapelSayaApi(token) {
  const url = new URL(BASE_API_URL + "/teacher/current-academy-subjects");

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
    Authorization: token,
  };

  fetch(url, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((res) => {
      // console.log(res);
      mapelSaya.set(res);
      authStore.setItem("mysubject", res.data);
    })
    .catch((e) => {
      console.log(e);
    });
}

export const getMapelSaya = function () {
  if (__DEMO_MODE) {
    loadUserApi(CURRENT_TOKEN());
    return;
  }
  authStore.getItem("auth_token").then((val) => {
    if (val != null && get(loginAs) == "teacher" && typeof val != "undefined") {
      getMapelSayaApi(val);
    }
  });
};

export async function logout() {
  const url = new URL(BASE_API_URL + "/logout");
  let headers = {
    Authorization: $authToken,
    Accept: "application/json",
  };
  fetch(url, {
    method: "DELETE",
    headers,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message == "Token dihapus!") {
        authStore.clearItem();
        authToken.set("logout");
        $userData = "";
        isLoading = false;
        window.location.href = new URL("/auth/login", BASE_URL);
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
function getKelasSayaApi(token) {
  const url = new URL(BASE_API_URL + "/teacher/current-academy-classes");

  let headers = {
    Authorization: token,
    Accept: "application/json",
  };

  fetch(url, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((res) => {
      kelasSaya.set(res);
      authStore.setItem("myclass", res.data);
    })
    .catch((e) => {
      console.log(e);
    });
}
export const getKelasSaya = function () {
  if (__DEMO_MODE && "__DEMO_TYPE" === "teacher") {
    getKelasSayaApi(dummyToken.teacher);
    return;
  }
  authStore.getItem("auth_token").then((val) => {
    if (val != null && get(loginAs) == "teacher" && typeof val != "undefined") {
      getKelasSayaApi(val);
    }
  });
};

export const getSiswaSaya = function (kelas) {
  const url = new URL(BASE_API_URL + "/classes");

  let headers = {
    Accept: "application/json",
  };

  let params = {
    search: kelas,
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );

  fetch(url, {
    method: "GET",
    headers,
  })
    .then((response) => response.json())
    .then((res) => siswaSaya.set(res))
    .catch((e) => {
      console.log(e);
    });
};

authStore.getItem("profile").then((val) => {
  if (val != null) {
    userData.set(val);
  }
});
authStore.getItem("auth_token").then((val) => {
  console.log("load from localforage : ");
  console.log(typeof val);
  if (val != null && typeof val == "string" && typeof val != "undefined") {
    authToken.set(val);
  }
});

authToken.subscribe((auth) => {
  if (auth && auth != null && typeof auth != "undefined") {
    loadUser(true);
    getKelasSaya();
    getMapelSaya();
  } else if (auth === "logout") {
    authStore.clear();
    loginAs.set(false);
    userData.set(false);
  }
});
