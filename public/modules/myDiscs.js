const app = document.querySelector("#app");

export function myDiscs( evtJoinmyDisc1,
    evtJoinmyDisc,
    evtArtists,
    x1,
    x2,
    x3,
    x4,
    x5,
    x6) {
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
                        <span class="link">LISTA DE DESEJOS</span>
                    </div>
                    <div>
                        <img class="icons" src="./assets/images/icons/star.png" />
                        <span class="link">AVALIAÇÕES</span>
                    </div>
                </div>
                <u class="link">Desconectar</u>
            </div>
        </section>
    `;

  discsService([
        evtJoinmyDisc1,
        evtJoinmyDisc,
        evtArtists,
        x1,
        x2,
        x3,
        x4,
        x5,
        x6,
    ]);
}

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
    loadMyDiscs();
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Estilos";

}

async function loadMyDiscs() {
  const res = await fetch("http://localhost:8000/user/alldiscs", {
    method: "GET",
  });

  const dataAllUserDiscs = await res.json();

  const containerCenterMyDisc = document.getElementById(
    "container-center-myDisc"
  );

  for (let c = 0; c < dataAllUserDiscs.length; c++) {
    const cardDisc = document.createElement("div");
    cardDisc.className = "card-myDiscs";

    const imgCard = document.createElement("img");
    imgCard.className = "card-img";
    imgCard.setAttribute("src", `${dataAllUserDiscs[c].img}`);

    const spanNameDisc = document.createElement("span");
    spanNameDisc.className = "name-disc";
    spanNameDisc.innerHTML = `${dataAllUserDiscs[c].album}`;

    const spanYearDisc = document.createElement("span");
    spanYearDisc.className = "year-disc";
    spanYearDisc.innerHTML = `${dataAllUserDiscs[c].release_year}`;

    const spanArtisDisc = document.createElement("span");
    spanArtisDisc.className = "info-disc";
    spanArtisDisc.innerHTML = `${dataAllUserDiscs[c].artist}`;

    containerCenterMyDisc.appendChild(cardDisc);
    cardDisc.appendChild(imgCard);
    cardDisc.appendChild(spanNameDisc);
    cardDisc.appendChild(spanYearDisc);
    cardDisc.appendChild(spanArtisDisc);
  }

  const divImgAddCar = document.createElement("div");
  divImgAddCar.className = "card-add"

  const imgAddCard = document.createElement("img");
  imgAddCard.className = "link";
  imgAddCard.id ="card-add-icon"
  imgAddCard.setAttribute("src", "./assets/images/mais (3).png");
  divImgAddCar.appendChild(imgAddCard)
  containerCenterMyDisc.appendChild(divImgAddCar);
}

