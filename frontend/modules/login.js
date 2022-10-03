const app = document.querySelector("#app");

export function login(evtJoinMain,evtRegister) {
    app.innerHTML = `
    <h1>Página Login<h1>
        <nav>
                <a class="link" >Entrar na Main</a>
                <a class="link" >Crie nova conta aqui!</a>
        </nav>
    `
    loginService([evtJoinMain,evtRegister])
}

function loginService(evt) {
    const elements = document.querySelectorAll(".link");
  
    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = () => {
        window.dispatchEvent(evt[i]);
      };
    }
     document.title = "Login";
  }