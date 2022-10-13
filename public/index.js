import { home } from "./modules/home.js";
import { login } from "./modules/login.js";
import { register } from "./modules/register.js";
import { confirmation } from "./modules/confirmation.js";
import { myDiscs } from "./modules/myDiscs.js";
import { discs } from "./modules/discs.js";
import { genres } from "./modules/genres.js";
import { registerDisc } from "./modules/registerDisc.js";
import { myProfile } from "./modules/myProfile.js";
import { proposals } from "./modules/proposals.js";
import { wishlist } from "./modules/wishlist.js";
import { singleDisc } from "./modules/singleDisc.js";
import { tradeDisc } from "./modules/tradeDisc.js";
import { individualDisc } from "./modules/individualDisc.js";
// import { errorNotFound } from "./modules/errorNotFound.js";

const routes = {
    "/": function () {
        home(events("/login"), events("/register"));
    },
    "/login": function () {
        login(events("/"), events("/myDiscs"), events("/register"));
    },
    "/register": function () {
        register(events("/"), events("/confirmation"), events("/login"));
    },
    "/confirmation": function () {
        confirmation(events("/"), events("/login"));
    },
    "/myDiscs": function () {
        myDiscs(
            events("/discs"),
            events("/genres"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/wishlist"),
            events("/proposals"),
            events("/login")
        );
    },
    "/registerDisc": function () {
        registerDisc(
            events("/myDiscs"),
            events("/discs"),
            events("/genres"),
            events("/myProfile"),
            events("/wishlist"),
            events("/proposals"),
            events("/login")
        );
    },
    "/discs": function (e) {
        discs(
            events("/myDiscs"),
            events("/genres"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/wishlist"),
            events("/proposals"),
            events("/login"),
            e
        );
    },
    "/genres": function (e) {
        genres(
            events("/myDiscs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/discs"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/wishlist"),
            events("/proposals"),
            events("/login"),
            e
        );
    },
    "/myProfile": function () {
        myProfile(
            events("/myDiscs"),
            events("/discs"),
            events("/genres"),
            events("/registerDisc"),
            events("/wishlist"),
            events("/proposals"),
            events("/login")
        );
    },
    "/wishlist": function () {
        wishlist(
            events("/myDiscs"),
            events("/discs"),
            events("/genres"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/proposals"),
            events("/login")
        );
    },
    "/proposals": function () {
        proposals(
            events("/myDiscs"),
            events("/discs"),
            events("/genres"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/wishlist"),
            events("/login")
        );
    },
    "/tradeDisc": function (e) {
        tradeDisc(
            events("/myDiscs"),
            events("/discs"),
            events("/genres"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/wishlist"),
            events("/proposals"),
            events("/login"),
            e
        );
    },
    "/individualDisc": function (e) {
        individualDisc(
            events("/myDiscs"),
            events("/discs"),
            events("/genres"),
            events("/registerDisc"),
            events("/myProfile"),
            events("/wishlist"),
            events("/proposals"),
            events("/login"),
            e
        );
    },
    "/singleDisc": function (e) {
        singleDisc(e);
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

function router(e) {
    const adress = window.location.href.substring(8);
    const url = adress.substring(adress.indexOf("/"));
    const route = testUrlRoute(url);
    route(e);
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
    router(e);
});

window.addEventListener("popstate", router);

window.addEventListener("load", router);
