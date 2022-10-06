const app = document.querySelector("#app");

export function meusDiscos(evtJoinMain, evtEnter, evtRegister) {
    app.innerHTML = `
  <div id="container-main">
  <header>
    <a href="#">
      <img id="logo-img" src="./assets/images/LogoJovemGuarda.svg" alt="" />
    </a>
    <span>DISCOS</span>
    <span>ESTILOS</span>
    <span>ARTISTAS</span>
    <input id="searchBar" type="text" placeholder="PESQUISAR" />
    <div id="containerUser">
      <img id="userImg" src="./assets/images/userAlpha.jpg" />
      <span id="nameUser">Alpha Edtech</span>
    </div>
  </header>
  <span id="title">MEUS DISCOS</span>
</div>
<main>
  <div id="container">
    <div class="card-disc">
      <img class="card-img" src="./assets/images/disc2.jfif" alt="" />
      <span id="name-disc"> Matriz - PITTY </span>
      <span id="year-disc"> 2019 </span>
      <span id="info-disc"> info info </span>
    </div>
    <div class="card-disc">
      <img class="card-img" src="./assets/images/disc3.jpg" alt="" />
      <span id="name-disc"> Admirável - PITTY </span>
      <span id="year-disc"> 2003 </span>
      <span id="info-disc"> info info </span>
    </div>
    <div class="card-disc">
      <img class="card-img" src="./assets/images/disc4.webp" alt="" />
      <span id="name-disc"> Imorrível - Di Melo </span>
      <span id="year-disc"> 2016 </span>
      <span id="info-disc"> info info </span>
    </div>
    <div class="card-disc">
      <img class="card-img" src="./assets/images/disco1.jpeg" alt="" />
      <span id="name-disc"> Di Melo - Di Melo </span>
      <span id="year-disc"> 1975 </span>
      <span id="info-disc"> info info </span>
    </div>
    <div class="card-add">
      <img class="card-add-icon" src="./assets/images/mais (3).png" alt="" />
    </div>
  </div>
</main>
    `;
    loginService([evtJoinMain, evtEnter, evtRegister]);
}

function loginService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i <= elements.length; i++) {
        elements[i].addEventListener("click", () => {
            window.dispatchEvent(evt[i]);
        });
    }
    document.title = "Meus discos";
}
