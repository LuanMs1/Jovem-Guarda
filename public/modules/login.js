const app = document.querySelector("#app");

export function login(evtJoinMain, evtEnter, evtRegister) {
  app.innerHTML = `
        <div id="container-center">
            <a href="#">
                <img class="link" src="./assets/images/jovemGuarda.png">
            </a>
            <form action="">
                <span class="title">
                    LOGIN
                </span>
                <div>
                    <input id="email" type="text" placeholder="EMAIL">
                </div>
                <div>
                    <input id="password" type="password" placeholder="SENHA">
                </div>
                <p id="messageError"></p>
                <div>
                    <input class="link" id="btn-submit" onsubmit="return false;" type="submit" value="ENTRAR">
                </div>
            </form>
            <span id="create-acount">
                <a href="#" class="link">Crie uma conta aqui</a>
            </span>
        </div>
    `;
  loginService([evtJoinMain, evtEnter, evtRegister]);
}

function loginService(evt) {
  const elements = document.querySelectorAll(".link");
  console.log(elements);

  for (let i = 0; i <= elements.length; i++) {
    elements[i].addEventListener("click", () => {
      const logged = loginUser();
      console.log(logged);
      if (logged.then((value) => value)) {
        window.dispatchEvent(evt[i]);
        console.log("testee");
      }

      // console.log(logged.then((value) => console.log(value)));
    });
    // console.log(elements);
  }
  document.title = "Login";
}

async function loginUser() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const messageError = document.querySelector("#messageError");

  const data = { email: email, password: password };

  const res = await fetch("http://localhost:8000/user/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });

  if (res.status == 200) {
    console.log("login bem sucedido, pensar na logica de controle de acesso");
    return true;
  } else {
    const msgError = await res.json();
    console.log(`Erro: ${msgError}`);
    messageError.innerHTML = msgError;
    return false;
  }
}
