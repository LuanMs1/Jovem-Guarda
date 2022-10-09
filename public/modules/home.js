const app = document.querySelector("#app");

export function home(evtJoin, evtRegister) {
    app.innerHTML = `
    <div id="main-disc">
    <header id= main-header>
            <div id="window-header">
                <a id="join-text" class="link">ENTRAR</a>
                <button id="registration-text"class="link">CADASTRAR</button>
             </div>
        </header>
        <div id="logo-div">
            <img id="logo-img-home" src="./assets/images/LogoJovemGuarda.svg" alt="">
        </div>
        <main id="main-home">
            <div id="window-main">
                <div id="title">
                    <h1>Colecione!<br>
                        Troque! <br>
                         Tudo em um só lugar.</h1>
                </div>
                <div id="victrola-div">
                    <img id="victrola-img" src="./assets/images/vitrol.png" alt="">
                </div>
            </div>
        </main>
        <div>
    `;

    homeService([evtJoin, evtRegister]);
}

function homeService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Home";
}
