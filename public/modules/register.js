const app = document.querySelector("#app");

export function register(evtBack, evtJoin, evtConfirmation) {
  app.innerHTML = `
      <div id="container-center-register">
        <a href="#">
            <img class="link" src="./assets/images/jovemGuarda.png">
        </a>
        <form action="" method="POST">
            <span class="title">
                CADASTRO
            </span>
            <div>
              <input id="name" name="name" type="text" placeholder="NOME">
            </div>
            <div>
                <input id="email" name="email" type="text" placeholder="EMAIL">
            </div>
            <div>
                <input id="password" name="password" type="password" placeholder="SENHA">
            </div>
            <div>
                <input type="password" placeholder="CONFIRME SUA SENHA">
            </div>
            <div>
                <input class="link" onsubmit="return false;" id="btn-submit" type="submit" value="CADASTRAR">
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

  for (let i = 0; i < elements.length; i++) {
    elements[i].onclick = () => {
      if (evt[i].detail.name == "/confirmation") {
        registerUser();
      }
      window.dispatchEvent(evt[i]);
    };
  }
  document.title = "Register";
}

function registerUser() {
  const name = document.getElementById("name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = { name: name, email: email, password: password };

  fetch("http://localhost:8000/user/signup", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}
