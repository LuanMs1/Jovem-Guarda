import { home } from "./modules/home.js";
import { login } from "./modules/login.js";
import { register } from "./modules/register.js";
import { confirmation } from "./modules/confirmation.js";
import { meusDiscos } from "./modules/meusDiscos.js";
// import { errorNotFound } from "./modules/errorNotFound.js";

const routes = {
  "/": function () {
    home(events("/login"), events("/register"));
  },
  "/login": function () {
    login(events("/"), events("/meusDiscos"), events("/register"));
  },
  "/register": function () {
    register(events("/"), events("/confirmation"), events("/login"));
  },
  "/confirmation": function () {
    confirmation(events("/"), events("/login"));
  },
  "/meusDiscos": function () {
    meusDiscos(events("/"), events("/meusDiscos"));
  },
  "/404": function () {
    errorNotFound(events("/"), events("/login"));
  },
  // "/main": function () {
  //   register(events("/login"), events("/register"));
  // },
};

function events(prop) {
  return new CustomEvent("onstatechange", {
    detail: {
      name: prop,
    },
  });
}

history.pushState({}, "", "/");

function router() {
  const adress = window.location.href.substring(8);
  const url = adress.substring(adress.indexOf("/"));
  const route = testUrlRoute(url);
  route();
}

function testUrlRoute(route) {
  try {
    return routes[route];
  } catch (e) {
    throw "Not Fund " + e;
  }
}

window.addEventListener("onstatechange", (e) => {
  history.pushState({}, "", e.detail.name);
  router();
});

window.addEventListener("popstate", router);

window.addEventListener("load", router);
