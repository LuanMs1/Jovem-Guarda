const app = document.querySelector("#app");

export function artists(x, y, z) {
    app.innerHTML = `
   
        <section id="container-centralized">
        <header>
        <a id="container-logo-myDiscs" href="#">
          <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
        </a>
        <span class="link">DISCOS</span>
        <span class="link">ESTILOS</span>
        <span class="selected-page">ARTISTAS</span>
        <div id="container-user-all">
          <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
          <span id="name-user-all">Alpha Edtech</span>
        </div>
      </header>
    
          <span id="disc-title">ARTISTAS</span>

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
    discsService([x, y, z]);

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
    document.title = "Artistas";
}
