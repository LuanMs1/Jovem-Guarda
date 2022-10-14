const app = document.querySelector("#app");

export function wishlist(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    evtMyprofile,
    evtEvaluation,
    evtDesconect
) {
    app.innerHTML = `
        <header>
            <a id="container-logo-myDiscs" href="#">
                <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
            </a>
            <span class="link">DISCOS</span>
            <span class="link">ESTILOS</span>
            <div id="container-user-all">
                <img id="user-img-all" src="./assets/images/icons/mais (3).png" />
            <span id="name-user-all"></span>
            </div>
        </header>

        <span id="title-all">LISTA DE DESEJOS</span>

        <section id="container-menu">
            <div id="menu">
                <div id="container-img-name">
                    <img id="img-menu" src="./assets/images/icons/mais (3).png" />
                    <span id="name-user-modal"></span>
                </div>
                <div id="menu-options">
                    <div>
                        <img class="icons" src="./assets/images/icons/add.png" />
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
                        <img class="icons" src="./assets/images/icons/heart.png" />
                        <span class="selected-page">LISTA DE DESEJOS</span>
                    </div>
                    <div>
                        <img class="icons" src="./assets/images/icons/star.png" />
                        <span class="link">PROPOSTAS</span>
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
        evtMyprofile,
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
    getInformationsUser();

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Lista de desejos";
}
async function getInformationsUser() {
    const userName = document.getElementById("name-user-all");
    const userNameModal = document.getElementById("name-user-modal");

    const res = await fetch('/user/', {
        method: 'GET',
      });
      
      const infoName = await res.json();

      userName.innerHTML = infoName.name;
      userNameModal.innerHTML = infoName.name; 
}