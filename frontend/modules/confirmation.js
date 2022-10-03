const app = document.querySelector("#app");

export function confirmation(evtLogin) {
    app.innerHTML = `
    <h1>Página Notificação<h1>
        <nav>
            <h2>Obrigado por se cadastrar!<h2>
            <a class="link" >Entrar</a>         
        </nav>
    `
    confirmationService([evtLogin])
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