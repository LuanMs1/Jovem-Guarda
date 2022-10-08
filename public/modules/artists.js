const app = document.querySelector("#app");

export function artists(x, y, z) {
    app.innerHTML = `
    <!DOCTYPE html>
    <html lang="pt-br">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="individalDisc.css" />
        <title>Document</title>
      </head>
      <body>
        <section id="container-centralized">
          <header>
            <a href="#">
              <img id="logo-img" src="imgs/LogoJovemGuarda.svg" alt="" />
            </a>
            <span class="link">MEUS DISCOS</span>
            <span class="link">DISCOS</span>
            <span class="link">ESTILOS</span>
            <input id="searchBar" type="text" placeholder="PESQUISAR" />
            <div id="containerUser">
              <img id="userImg" src="imgs/userAlpha.jpg" />
              <span id="nameUser">Alpha Edtech</span>
            </div>
          </header>
    
          <span id="disc-title">DISCOS</span>
    
          <section id="container-btn-filter">
            <div id="btn-filter-main">
                <img id="img-filter" src="./imgs/filter.png" />
                <span>Filtrar</span>
            </div>
          </section>
    
          <section id="container-modal-filter">
            <section id="description-disc">
              <div id="description-disc-left">
    
                <div>
                  <span>Estilos</span><br />
                  <input id="style" type="text" /><br />
                  <div class="btn-filter"><span>Rock</span></div>
                </div>
    
                <div>
                  <span>Artistas</span><br />
                  <input id="artist"type="text" />
                  <div class="btn-filter"><span>Cartola</span></div>
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
                    <img id="img-disc" src="./imgs/disc4.webp">
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
                  <img id="img-exchange" src="./imgs/exchange.png">
                </div>
              </div>
          </section>
    
        </section>
      </body>
    </html>
    `;
    discsService([x, y, z]);
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
