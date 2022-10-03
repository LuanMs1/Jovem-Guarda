const app = document.querySelector("#app");

export function register(evtBack,evtJoin,evtConfirmation) {
    app.innerHTML = `
    <h1>Página Register<h1>
        <nav>
            <a class="link" >Cadastrar</a>
            <a class="link" >Voltar</a>
            <a class="link" >Entrar</a>
        </nav>
    `
    registerService([evtBack,evtJoin,evtConfirmation])
}
function registerService(evt) {
    const elements = document.querySelectorAll(".link");
   
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = () => {
        window.dispatchEvent(evt[i]);
      };
    }
     document.title = "Register";
  }