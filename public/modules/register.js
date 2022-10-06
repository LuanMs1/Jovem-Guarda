const app = document.querySelector("#app");

export function register(evtBack, evtJoin, evtConfirmation) {
  app.innerHTML = `
      <div id="container-center-register">
        <a href="#">
            <img class="link" src="./assets/images/jovemGuarda.png">
        </a>
        <form action="/user/singup" method="POST">
            <span class="title">
                CADASTRO
            </span>
            <div>
              <input name="name" type="text" placeholder="NOME">
            </div>
            <div>
                <input name="email" type="text" placeholder="EMAIL">
            </div>
            <div>
                <input name="password" type="password" placeholder="SENHA">
            </div>
            <div>
                <input type="password" placeholder="CONFIRME SUA SENHA">
            </div>
            <div>
                <input class="link" id="btn-submit" type="submit" value="CADASTRAR">
            </div>
        </form>
        <span id="create-acount">
          <a href="#" class="link">Voltar</a>
        </span>
      </div>
    `;
  registerService([evtBack, evtJoin, evtConfirmation]);
}
function registerService(evt) {
  const elements = document.querySelectorAll(".link");
  console.log(`elements: ${elements}`);

  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = () => {
      window.dispatchEvent(evt[i]);
      const name = document.querySelector("#name");
      console.log(name);
    };
  }
  document.title = "Register";
}
