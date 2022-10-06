const app = document.querySelector("#app");

export function confirmation(evtJoinMain, evtLogin) {
  app.innerHTML = `
      <div id="container-center">
        <a href="#">
            <img class="link" src="./assets/images/jovemGuarda.png">
        </a>
        <span id="message">
            Obrigado por se cadastrar,<br>
            faça seu login!
        </span>
        <span id="enter">
          <input class="link" id="btn-submit" type="submit" value="ENTRAR">
        </span>
      </div>
    `;
  confirmationService([evtJoinMain, evtLogin]);
}

function confirmationService(evt) {
  const elements = document.querySelectorAll(".link");

  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = () => {
      window.dispatchEvent(evt[i]);
    };
  }
  document.title = "Confirmation";
}
