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
        
    </div>
    <section id="container-menu">
    <div id="menu">
        <div id="container-img-name">
            <img id="img-menu" src="./imgs/userAlpha.jpg" />
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
  loadMyDiscs();
  for (let i = 0; i <= elements.length; i++) {
    elements[i].addEventListener("click", () => {
      window.dispatchEvent(evt[i]);
    });
  }
  document.title = "Meus discos";
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
