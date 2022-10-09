const app = document.querySelector("#app");

export function discs(evtJoinmyDisc, evtGenres, evtArtists, proposeExchange) {
    app.innerHTML = `
      <section id="container-centralized">
        <header>
          <a id="container-logo-myDiscs" href="#">
            <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
          </a>
          <span id="discs-span">DISCOS</span>
          <span class="link">ESTILOS</span>
          <span class="link">ARTISTAS</span>
          <div id="container-user-all">
            <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
            <span id="name-user-all">Alpha Edtech</span>
          </div>
        </header>
  
        <span id="disc-title">DISCOS</span>
  
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
  
        <section id="container-modal-discs">
            <section id="description-disc">
              <div id="container-disc">
                <div id="container-img-info">
                  <img id="img-disc" src="./assets/images/disc4.webp">
                  <strong>Di Melo</strong>
                  <strong>1975</strong>
                </div>
  
                  <div id="type-disc">
                    <span>TIPO DO ALBUM:<span> Single</span></span>
                    <span>TIPO DO DISCO:<span> Color</span></span>
                    <span>DURAÇÃO:<span> 70 min</span></span>
                  </div>
              </div>       
    
              <div id="description-line"></div>
    
              <div id="description-disc-right-infos">
                  <div id="container-left-exchange">
                    <div id="type-disc"></divid>
                      <span>PROPRIETÁRIO:<span> Fulano de tal</span></span>
                      <span>CONDIÇÃO:<span> Disco bastante conservado</span></span>
                      <span id="description-text">DESCRIÇÃO:<span> Disco de coleção limitada e autografado </span></span>
                    </div>
                  </div>
                </div>
                <div>
                  <img id="img-exchange" class="link" src="./assets/images/exchange.png">
                </div>
              </div>
        </section>
  
      </section>
      <div id="container-menu">
        <div id="menu">
          <div id="container-img-name">
            <img id="img-menu" src="./imgs/userAlpha.jpg">
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
      </div>
`;

    discsService([evtJoinmyDisc, evtGenres, evtArtists, proposeExchange]);

    const filterBtn = document.querySelector("#filter-btn");
    const filterModal = document.querySelector("#container-modal-filter");
    filterBtn.addEventListener("click", () => {
        filterModal.style.display === "flex"
            ? (filterModal.style.display = "none")
            : (filterModal.style.display = "flex");
    });

    const profilePic = document.querySelector("#container-user-all");
    const profileMenu = document.querySelector("#container-menu");
    const body = document.querySelector("body");
    profilePic.addEventListener("click", () => {
        profileMenu.style.display === "flex"
            ? (profileMenu.style.display = "none")
            : (profileMenu.style.display = "flex");
    });
}

function discsService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Confirmation";
}
