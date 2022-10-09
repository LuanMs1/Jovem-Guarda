const app = document.querySelector("#app");

export function confirmation(evtJoinMain, evtLogin) {
    app.innerHTML = `
      <div id="container-center-confirmation">
        <a href="#">
            <img id="logo-confirmation" class="link" src="./assets/images/jovemGuarda.png">
        </a>
        <span id="message-confirmation">
            Obrigado por se cadastrar,<br>
            entre em sua conta!
        </span>
        <span id="enter-confirmation">
          <input class="link" id="btn-submit-confirmation" type="submit" value="ENTRAR">
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
