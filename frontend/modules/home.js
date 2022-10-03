const app = document.querySelector("#app");

export function home(evtJoin,evtRegister) {
    app.innerHTML = `
    <h1>Página Home<h1>
      <nav>
            <a class="link"  id="login" >Entrar</a>
            <a class="link"  id="register" >Cadastrar</a>
        </nav>
    `;
    
    homeService([evtJoin,evtRegister])
}

function homeService(evt) {
    const elements = document.querySelectorAll(".link");
   
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = () => {
        window.dispatchEvent(evt[i]);
      };
    }
     document.title = "Home";
  }