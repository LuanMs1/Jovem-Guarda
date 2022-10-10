// import { spotifyGetArtist } from "./api-spotify/spotifyGetArtist.js";
// import { spotifyGetAlbum } from "./api-spotify/spotifyGetAlbum.js";

const app = document.querySelector("#app");

export function login(evtJoinMain, evtEnter, evtRegister) {
    app.innerHTML = `
        <div id="container-center-login">
            <a href="#">
                <img id="logo-login"class="link" src="./assets/images/jovemGuarda.png">
            </a>
            <form id="form-login" action="">
                <span class="title-login">
                    ENTRAR
                </span>
                <div>
                    <input id="email-login" type="text" placeholder="EMAIL">
                </div>
                <div>
                    <input id="password-login" type="password" placeholder="SENHA">
                </div>
                <p id="messageError-login"></p>
                <div>
                    <input class="link" id="btn-submit-login" onsubmit="return false;" type="button" value="CONFIRMAR">
                </div>
            </form>
            <span id="create-acount">
                <a href="#" class="link">Crie uma conta aqui</a>
            </span>
        </div>
    `;
    loginService([evtJoinMain, evtEnter, evtRegister]);
}

function loginService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i <= elements.length; i++) {
        elements[i].addEventListener("click", () => {
            const logged = loginUser();
            logged.then((value) => {
                if (value == true) {
                    window.dispatchEvent(evt[i]);
                } else if (["/register", "/"].includes(evt[i].detail.name)) {
                    window.dispatchEvent(evt[i]);
                }
            });
        });
    }
    document.title = "Entrar";
}

async function loginUser() {
    const email = document.querySelector("#email-login").value;
    const password = document.querySelector("#password-login").value;
    const messageError = document.querySelector("#messageError-login");

    const data = { email: email, password: password };

    const res = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    if (res.status == 200) {
        return true;
    } else {
        const msgError = await res.json();
        const msgFormated = await msgError.mensagem;
        messageError.innerHTML = msgFormated;
        return false;
    }
}
