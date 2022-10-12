const app = document.querySelector("#app");

export function discs(
    evtMydisc,
    evtGenre,
    evtRegister,
    evtMyprofile,
    evtWishlist,
    evtEvaluation,
    evtDesconect
) {
    app.innerHTML = `
      <section id="container-centralized">
        <header>
          <a id="container-logo-myDiscs" href="#">
            <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
          </a>
          <span class="selected-page">DISCOS</span>
          <span class="link">ESTILOS</span>
          <div id="container-user-all">
            <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
            <span id="name-user-all">Alpha Edtech</span>
          </div>
        </header>
  
        <span id="disc-title">DISCOS</span>
  
        <section id="container-btn-modal">

            <section id="container-btn-filter">
              <div id="btn-filter-main">
                  <img id="img-filter" src="./assets/images/filter.png" />
                  <span id="filter-btn">Filtrar</span>
              </div>
            </section>

            <section id="container-modal-filter">
              <section id="description-disc">
                <div id="description-disc-left">
                  <div>
                    <span>Estilos</span><br />
                    <input id="style" type="text" /><br /> 
                  
                  </div>
      
                  <div>
                    <span>Artistas</span><br />
                    <input id="artist"type="text" />
                  
                  </div>
                </div>
      
                <div id="description-line"></div>
      
                <div id="description-disc-center">
                  <span>Tipos de discos </span>
                  <div id="container-type-disc">
                    <div class="btn-filter-white">
                      <span>Single</span>
                    </div>
                    <div class="btn-filter-white"><span>EP</span></div>
                    <div class="btn-filter"><span>LP</span></div>
                  </div>
      
                  <span>Tipos de vinil </span>
      
                  <div id="container-type-disc">
                    <div>
                      <div class="btn-filter-white">
                        <span>Transparente</span>
                      </div>
                      <div class="btn-filter-white">
                        <span>Glossy</span>
                      </div>
                      <div class="btn-filter"><span>Color</span></div>
                    </div>
                    <div>
                      <div class="btn-filter-white">
                        <span>Matto</span>
                      </div>
                      <div class="btn-filter-white">
                        <span>Metalic</span>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div id="description-line"></div>
      
                <div id="description-disc-right">
                  <span>Ano</span>
                  <div class="container-input-date">
                    <span>Mín</span>
                    <input id="date-min" type="text">
                  </div>
                  <div class="container-input-date">
                    <span>Máx</span>
                    <input id="date-max"type="text">
                  </div>
                </div>
              </section>
      
              <div id="container-apply-clean">
                <button id="btn-clean">Limpar</button>
                <button id="btn-apply">Aplicar</button>
              </div>
            </section>
          </section>
          <div id="test"></did>
        <section id="description-disc"></section>

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
        evtGenre,
        evtRegister,
        evtMyprofile,
        evtWishlist,
        evtEvaluation,
        evtDesconect,
    ]);

    const filterBtn = document.querySelector("#btn-filter-main");
    const filterModal = document.querySelector("#container-modal-filter");
    filterBtn.addEventListener("click", () => {
        filterModal.style.display === "flex"
            ? (filterModal.style.display = "none")
            : (filterModal.style.display = "flex");
    });

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
    showAllDiscs();
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Discos";
}

async function showAllDiscs() {
    const res = await fetch("http://localhost:8000/user/alldiscs", {
        method: "GET",
    });

    const allDiscs = await res.json();

    console.log(allDiscs);

    for (let c = 0; c < allDiscs.length; c++) {
        console.log("test");

        const test = document.getElementById("test");

        const divDiscContainer = document.createElement("div");
        divDiscContainer.id = "container-modal-discs";
        divDiscContainer.dataset.id = allDiscs[c].id;

        const containerInfo = document.createElement("div");
        containerInfo.id = "container-img-info";

        const imgAlbum = document.createElement("img");
        imgAlbum.id = "img-disc";
        imgAlbum.setAttribute("src", `${allDiscs[c].img}`);

        const nameArtist = document.createElement("span");
        nameArtist.className = "infos-album";
        nameArtist.innerHTML = `${allDiscs[c].artist}`;

        const yearAlbum = document.createElement("span");
        yearAlbum.className = "infos-album";
        yearAlbum.innerHTML = `${allDiscs[c].release_year}`;

        test.appendChild(divDiscContainer);
        divDiscContainer.appendChild(containerInfo);
        containerInfo.appendChild(imgAlbum);
        containerInfo.appendChild(nameArtist);
        containerInfo.appendChild(yearAlbum);

        const typeDiscDiv = document.createElement("div");
        typeDiscDiv.id = "type-disc-div";

        const typeAlbumLabel = document.createElement("label");
        typeAlbumLabel.id = "type-album-label";
        typeAlbumLabel.innerHTML = `Tipo do Album: `;

        const typeDiscLabel = document.createElement("label");
        typeDiscLabel.id = "type-disc-label";
        typeDiscLabel.innerHTML = `Tipo do Disco: `;

        const genreDiscLabel = document.createElement("label");
        genreDiscLabel.id = "genre-label";
        genreDiscLabel.innerHTML = `Gênero: `;

        const lengthAlbumLabel = document.createElement("label");
        lengthAlbumLabel.id = "length-label";
        lengthAlbumLabel.innerHTML = `Duração: `;

        const typeAlbum = document.createElement("span");
        typeAlbum.id = "type-album";
        typeAlbum.innerHTML = `${allDiscs[c].album_type}`;

        const typeDisc = document.createElement("span");
        typeDisc.id = "type-disc";
        typeDisc.innerHTML = `${allDiscs[c].vynil_type}`;
        const genreDisc = document.createElement("span");
        genreDisc.id = "genre";
        genreDisc.innerHTML = `${allDiscs[c].genre}`;
        const lengthAlbum = document.createElement("span");
        lengthAlbum.id = "length";
        lengthAlbum.innerHTML = `${allDiscs[c].length}`;

        divDiscContainer.appendChild(typeDiscDiv);
        typeDiscDiv.appendChild(typeAlbumLabel);
        typeDiscDiv.appendChild(typeDiscLabel);
        typeDiscDiv.appendChild(genreDiscLabel);
        typeDiscDiv.appendChild(lengthAlbumLabel);

        typeAlbumLabel.appendChild(typeAlbum);
        typeDiscLabel.appendChild(typeDisc);
        genreDiscLabel.appendChild(genreDisc);
        lengthAlbumLabel.appendChild(lengthAlbum);

        //   <div id="description-disc-right-infos">
        //   <div id="container-left-exchange">
        //     <div id="type-disc"></divid>
        //       <span>PROPRIETÁRIO:<span> Fulano de tal</span></span>
        //       <span>CONDIÇÃO:<span> Disco bastante conservado</span></span>
        //       <span id="description-text">DESCRIÇÃO:<span> Disco de coleção limitada e autografado </span></span>
        //     </div>
        //   </div>
        // </div>
        const descriptionDiscRightInfo = document.createElement("div");

        descriptionDiscRightInfo.id = "description-disc-right-infos";

        const containerRightExchange = document.createElement("div");
        containerRightExchange.id = "container-left-exchang";

        const typeDiscDivRight = document.createElement("div");
        typeDiscDivRight.id = "type-disc-div";

        descriptionDiscRightInfo.appendChild(containerRightExchange);
        containerRightExchange.appendChild(typeDiscDivRight);

        const ownerLabel = document.createElement("label");
        ownerLabel.innerHTML = `Proprietário(a): `;
        ownerLabel.setAttribute("value", `${allDiscs[c].user_id}`);

        const conditionLabel = document.createElement("label");
        conditionLabel.innerHTML = `Condição: `;
        const descriptionLabel = document.createElement("label");
        descriptionLabel.innerHTML = `Descrição: `;

        const owner = document.createElement("span");
        // owner.innerHTML = `${allDiscs[c].}`
        const condition = document.createElement("span");
        condition.innerHTML = `${allDiscs[c].disc_status}`;
        const description = document.createElement("span");
        description.innerHTML = `${allDiscs[c].disc_description}`;

        divDiscContainer.appendChild(typeDiscDivRight);

        typeDiscDivRight.appendChild(ownerLabel);
        typeDiscDivRight.appendChild(conditionLabel);
        typeDiscDivRight.appendChild(descriptionLabel);

        ownerLabel.appendChild(owner);
        conditionLabel.appendChild(condition);
        descriptionLabel.append(description);

        const changeImgDiv = document.createElement("div");

        changeImgDiv.addEventListener("click", () => {
            console.log(divDiscContainer.dataset);
            console.log("clicked here");
            window.dispatchEvent(
                new CustomEvent("onstatechange", {
                    detail: {
                        name: "/tradeDisc",
                        id: 3,
                    },
                })
            );
        });

        const changeImg = document.createElement("img");

        changeImg.setAttribute(
            "src",
            "./assets/images/icons/exchange-disc.png"
        );
        changeImg.id = "img-exchange";
        changeImg.className = "link";

        divDiscContainer.appendChild(changeImgDiv);
        changeImgDiv.appendChild(changeImg);
    }
}
