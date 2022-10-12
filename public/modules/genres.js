const app = document.querySelector("#app");

export function genres(
    evtMydisc,
    evtDisc,
    evtRegister,
    evtMyprofile,
    evtWishlist,
    evtEvaluation,
    evtDesconect,
    g1,
    g2,
    g3,
    g4,
    g5,
    g6,
    g7,
    g8,
    g9,
    g10,
    g11,
    g12,
    g13,
    g14,
    g15,
    g16,
    g17,
    g18
) {
    app.innerHTML = `
      <section id="container-centralized-genre">
        <header>
          <a id="container-logo-myDiscs" href="#">
            <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
          </a>
          <span class="link">DISCOS</span>
          <span class="selected-page">ESTILOS</span>
          <div id="container-user-all">
            <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
            <span id="name-user-all">Alpha Edtech</span>
          </div>
        </header>

        <span class="title-all" class="link">ESTILOS</span>

        </section>

        <div id="container-center-genre">
          <div id="card-genre" class="link">
              <img class="card-img" src="./assets/images/imgs-genres/axe.jpg" alt="" />
              <span id="name-genre"> AXÉ </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/blues.png"
                  alt=""
              />
              <span id="name-genre"> BLUES </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/country.jpg"
                  alt=""
              />
              <span id="name-genre"> COUNTRY </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/eletronica.jpg"
                  alt=""
              />
              <span id="name-genre"> ELETRÔNICA </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/forro.jpg"
                  alt=""
              />
              <span id="name-genre"> FORRÓ </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/funk.webp"
                  alt=""
              />
              <span id="name-genre"> FUNK </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/gospel.jpg"
                  alt=""
              />
              <span id="name-genre"> GOSPEL </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/hiphop.webp"
                  alt=""
              />
              <span id="name-genre"> HIP HOP </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/jazz.jpeg"
                  alt=""
              />
              <span id="name-genre"> JAZZ </span>
          </div>
          <div id="card-genre" class="link">
              <img class="card-img" src="./assets/images/imgs-genres/MPB.png" alt="" />
              <span id="name-genre"> MPB </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/musicaClassica.jpg"
                  alt=""
              />
              <span id="name-genre"> MÚSICA CLÁSSICA </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/pagode.webp"
                  alt=""
              />
              <span id="name-genre"> PAGODE </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/pop.webp"
                  alt=""
              />
              <span id="name-genre"> POP </span>
          </div>
          <div id="card-genre" class="link">
              <img class="card-img" src="../assets/images/imgs-genres/RAP.png" alt="" />
              <span id="name-genre"> RAP </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/reggae.jfif"
                  alt=""
              />
              <span id="name-genre"> REGGAE </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/rock.webp"
                  alt=""
              />
              <span id="name-genre"> ROCK </span>
          </div>
          <div id="card-genre" class="link">
              <img
                  class="card-img"
                  src="./assets/images/imgs-genres/samba.jfif"
                  alt=""
              />
              <span id="name-genre"> SAMBA </span>
          </div>
          <div id="card-genre" class="link">
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
        evtMydisc,
        evtDisc,
        evtRegister,
        evtMyprofile,
        evtWishlist,
        evtEvaluation,
        evtDesconect,
        g1,
        g2,
        g3,
        g4,
        g5,
        g6,
        g7,
        g8,
        g9,
        g10,
        g11,
        g12,
        g13,
        g14,
        g15,
        g16,
        g17,
        g18,
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

function discsService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            let nameGenre = document.querySelector("#name-genre");
            console.log(nameGenre.textContent);
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Estilos";
}
