const app = document.querySelector("#app");

export function myDiscs(evtJoinmyDisc1, evtJoinmyDisc, evtArtists) {
    app.innerHTML = `
      <section id="container-centralized-myDyscs">
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

        <span id="title-myDiscs">MEUS DISCOS</span>

        </section>

        <div id="container-center-myDiscs">
            <div class="card-myDiscs">
                <img class="card-img" src="./assets/images/disc2.jfif" alt="" />
                <span id="name-disc"> Di Melo - Di Melo </span>
                <span id="year-disc"> 1975 </span>
                <span id="info-disc"> info info </span>
            </div>
            <div class="card-myDiscs">
                <img
                    class="card-img"
                    src="./assets/images/disc3.jpg"
                    alt=""
                />
                <span id="name-disc"> Di Melo - Di Melo </span>
                <span id="year-disc"> 1975 </span>
                <span id="info-disc"> info info </span>
            </div>
            <div class="card-myDiscs">
                <img
                    class="card-img"
                    src="./assets/images/disc4.webp"
                    alt=""
                />
                <span id="name-disc"> Di Melo - Di Melo </span>
                <span id="year-disc"> 1975 </span>
                <span id="info-disc"> info info </span>
            </div>
            <div class="card-myDiscs">
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
                <img class="card-add-icon" src="./assets/images/mais (3).png" alt="" />
            </div>

        </div>

        <section id="container-menu">
            <div id="menu">
                <div id="container-img-name">
                    <img id="img-menu" src="./assets/images/userAlpha.jpg" />
                    <span>Alpha Edtech</span>
                </div>
                <div id="menu-options">
                    <div>
                        <img class="icons" src="./assets/images/icons/add.png" />
                        <span>CADASTRE SEUS DISCOS</span>
                    </div>
                    <div>
                        <img
                            class="icons"
                            src="./assets/images/icons/profile-user.png"
                        />
                        <span>MEU PERFIL</span>
                    </div>
                    <div>
                        <img class="icons" src="./assets/images/icons/heart.png" />
                        <span>LISTA DE DESEJOS</span>
                    </div>
                    <div>
                        <img class="icons" src="./assets/images/icons/star.png" />
                        <span>AVALIAÇÕES</span>
                    </div>
                </div>
                <u>Desconectar</u>
            </div>
        </section>
    `;
    discsService([evtJoinmyDisc1, evtJoinmyDisc, evtArtists]);

    const profilePic = document.querySelector("#container-user-all");
    const profileMenu = document.querySelector("#menu");
    const profileMenuContainer = document.querySelector("#container-menu");

    profilePic.addEventListener("click", () => {
        profileMenu.style.display === "flex"
            ? ((profileMenu.style.display = "none"),
              (profileMenuContainer.style.display = "none"))
            : ((profileMenu.style.display = "flex"),
              (profileMenuContainer.style.display = "flex"));
    });
}

function discsService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Estilos";
}
