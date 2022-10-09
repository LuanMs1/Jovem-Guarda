const app = document.querySelector("#app");

export function myDiscs(evtJoinDiscs, evtGenres, evtArtists, evtAddDisc) {
    app.innerHTML = `
    <section id="container-centralized-myDisc">
    <header>
      <a id="container-logo-myDiscs" href="#">
        <img id="logo-img-all" src="./assets/images/LogoJovemGuarda.svg" alt="" />
      </a>
      <span class="link">DISCOS</span>
      <span class="link">ESTILOS</span>
      <span class="link">ARTISTAS</span>
      <div id="container-user-all">
        <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
        <span id="name-user-all">Alpha Edtech</span>
      </div>
    </header>

    <span id="genres-title">MEUS DISCOS</span>
</section>
    <div id="container-center-myDisc">
        <div class="card-disc">
            <img
                class="card-img"
                src="./assets/images/disc2.jfif"
                alt=""
            />
            <span id="name-disc"> Matriz - PITTY </span>
            <span id="year-disc"> 2019 </span>
            <span id="info-disc"> info info </span>
        </div>
        <div class="card-disc">
            <img
                class="card-img"
                src="./assets/images/disc3.jpg"
                alt=""
            />
            <span id="name-disc"> Admirável - PITTY </span>
            <span id="year-disc"> 2003 </span>
            <span id="info-disc"> info info </span>
        </div>
        <div class="card-disc">
            <img
                class="card-img"
                src="./assets/images/disc4.webp"
                alt=""
            />
            <span id="name-disc"> Imorrível - Di Melo </span>
            <span id="year-disc"> 2016 </span>
            <span id="info-disc"> info info </span>
        </div>
        <div class="card-disc">
            <img
                class="card-img"
                src="./assets/images/disco1.jpeg"
                alt=""
            />
            <span id="name-disc"> Di Melo - Di Melo </span>
            <span id="year-disc"> 1975 </span>
            <span id="info-disc"> info info </span>
        </div>
        <div class="card-add">
            <img
                id="card-add-icon"
                class="link"
                src="./assets/images/mais (3).png"
                alt=""
            />
        </div>
    </div>
    <section id="container-menu">
    <div id="menu">
        <div id="container-img-name">
            <img id="img-menu" src="./assets/images/userAlpha.jpg" />
            <span>NAME</span>
        </div>
        <div id="menu-options">
            <span>CADASTRE SEUS DISCOS</span>
            <span>MEU PERFIL</span>
            <span>LISTA DE DESEJO</span>
            <span>AVALIAÇÕES</span>
        </div>
        <span>Desconectar</span>
    </div>
</section>

    `;
    loginService([evtJoinDiscs, evtGenres, evtArtists, evtAddDisc]);
}

function loginService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i <= elements.length; i++) {
        elements[i].addEventListener("click", () => {
            window.dispatchEvent(evt[i]);
        });
    }
    document.title = "Meus discos";
}
