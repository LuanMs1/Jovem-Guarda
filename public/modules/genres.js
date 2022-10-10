const app = document.querySelector("#app");

export function genres(evtJoinmyDisc1, evtJoinmyDisc, evtArtists) {
    app.innerHTML = `
      <section id="container-centralized-genre">
        <header>
          <a id="container-logo-myDiscs" href="#">
            <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
          </a>
          <span class="link">DISCOS</span>
          <span class="selected-page">ESTILOS</span>
          <span class="link">ARTISTAS</span>
          <div id="container-user-all">
            <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
            <span id="name-user-all">Alpha Edtech</span>
          </div>
        </header>

        <span class="title-all">ESTILOS</span>

        </section>

        <div id="container-center-genre">
          <div class="card-genre">
              <img class="card-img" src="./assets/images/imgs-genres/axe.jpg" alt="" />
              <span id="name-genre"> AXÉ </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/blues.png"
                  alt=""
              />
              <span id="name-genre"> BLUES </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/country.jpg"
                  alt=""
              />
              <span id="name-genre"> COUNTRY </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/eletronica.jpg"
                  alt=""
              />
              <span id="name-genre"> ELETRÔNICA </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/forro.jpg"
                  alt=""
              />
              <span id="name-genre"> FORRÓ </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/funk.webp"
                  alt=""
              />
              <span id="name-genre"> FUNK </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/gospel.jpg"
                  alt=""
              />
              <span id="name-genre"> GOSPEL </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/hiphop.webp"
                  alt=""
              />
              <span id="name-genre"> HIP HOP </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/jazz.jpeg"
                  alt=""
              />
              <span id="name-genre"> JAZZ </span>
          </div>
          <div class="card-genre">
              <img class="card-img" src="./assets/images/imgs-genres/MPB.png" alt="" />
              <span id="name-genre"> MPB </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/musicaClassica.jpg"
                  alt=""
              />
              <span id="name-genre"> MÚSICA CLÁSSICA </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/pagode.webp"
                  alt=""
              />
              <span id="name-genre"> PAGODE </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/pop.webp"
                  alt=""
              />
              <span id="name-genre"> POP </span>
          </div>
          <div class="card-genre">
              <img class="card-img" src="../assets/images/imgs-genres/RAP.png" alt="" />
              <span id="name-genre"> RAP </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/reggae.jfif"
                  alt=""
              />
              <span id="name-genre"> REGGAE </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/rock.webp"
                  alt=""
              />
              <span id="name-genre"> ROCK </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/samba.jfif"
                  alt=""
              />
              <span id="name-genre"> SAMBA </span>
          </div>
          <div class="card-genre">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/sertanejo.png"
                  alt=""
              />
              <span id="name-genre"> SERTANEJO </span>
          </div>
        </div>

        <section id="container-menu">
          <div id="menu">
            <div id="container-img-name">
              <img id="img-menu" src="./assets/images/userAlpha.jpg">
              <span>NAME</span>
            </div>
            <div id="menu-options">
              <img class="img-options" src="./imgs/adicionar-botao.png"><span>CADASTRE SEUS DISCOS</span>
              <span>MEU PERFIL</span>
              <span>LISTA DE DESEJO</span>
              <span>AVALIAÇÕES</span>
            </div>
            <span>Desconectar</span>
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
