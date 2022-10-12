const app = document.querySelector("#app");

export function tradeDisc(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    myProfile,
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

    <section id="trade-disc">
    <div id="offer-disc-left">
        <div>
            <span class="trade-text">Ofereço</span>
        </div>
        <div class="card-add">
            <img
                class="card-add-icon"
                src="./assets/images/icons/mais (3).png"
                alt=""
            />
        </div>
    </div>
    <div id="central-line"></div>
        <div id="want-disc-right">
            <div id="position-trade-text">
                <span class="trade-text">Quero</span>
                <span>De:Fulano</span>
            </div>
            <div>
                <img class="card-img" src="./assets/images/disco1.jpeg" alt="" />
            </div>
            <div class="card-add">
                <img
                    class="card-add-icon"
                    src="./assets/images/icons/mais (3).png"
                    alt=""
                />
            </div>
        </div>
    </section>
    <section id="btns-trade">
        <button id="btn-trade">Propor troca</button>
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
                <span class="link">MEU PERFIL</span>
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
        myProfile,
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
    document.title = "Propor troca";
}
