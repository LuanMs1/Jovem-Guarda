const app = document.querySelector("#app");

export function individual(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    evtWishlist,
    evtEvaluation,
    evtDesconect
) {
    app.innerHTML = `
    <section id="container-centralized-myProfile">
    <header>
        <a id="container-logo-myDiscs" href="#">
            <img
                id="logo-img-all"
                class="link"
                src="./assets/images/LogoJovemGuarda.svg"
                alt=""
            />
        </a>
        <span class="link">DISCOS</span>
        <span class="link">ESTILOS</span>
        <div id="container-user-all">
            <img
                id="user-img-all"
                src="./assets/images/userAlpha.jpg"
            />
            <span id="name-user-all">Alpha Edtech</span>
        </div>
    </header>

    <section id="individual-disc">
    <span id="disc-title">Di Melo</span>
    <span>Di Melo</span>
    <span>1975</span>
    <img id="disc-img" src="imgs/disco1.jpeg" alt="">
</section>
<section id="description-disc">
    <div id="description-disc-left">
        <span>TIPO DO ALBUM:</span>
        <span>TIPO DO VINIL:</span>
        <span>DURAÇÃO:</span>
        <span>CONDIÇÕES:</span>
        <span>PROPRIETÁRIO: </span>
    </div>
    <div id="description-line"></div>
    <div id="description-disc-right">
        <span>DESCRIÇÃO: </span>
    </div>
</section>
<button id="btn-trade">TROCAR</button>
<section id="musics-disc">

</section>
<section id="section-imgs-disc">
    <div>
        <span>FOTOS DO PRODUTO:</span>
    </div>
    <div id="position-imgs-disc-user">
        <div class="imgs-disc-user"></div>
        <div class="imgs-disc-user"></div>
        <div class="imgs-disc-user"></div>
        <div class="imgs-disc-user"></div>
    </div>
</section>

<section id="container-menu">
    <div id="menu">
        <div id="container-img-name">
            <img id="img-menu" src="./assets/images/userAlpha.jpg" />
            <span>Alpha Edtech</span>
        </div>
        <div id="menu-options">
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/add.png"
                />
                <span class="link">CADASTRE SEUS DISCOS</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/profile-user.png"
                />
                <span class="selected-page">MEU PERFIL</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/heart.png"
                />
                <span class="link">LISTA DE DESEJOS</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/star.png"
                />
                <span class="link">AVALIAÇÕES</span>
            </div>
        </div>
        <u class="link">Desconectar</u>
    </div>
</section>
    `;

    service([
        evtMydisc,
        evtDiscs,
        evtGenre,
        evtRegister,
        evtWishlist,
        evtEvaluation,
        evtDesconect,
    ]);

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

function service(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Disco individual";
}
