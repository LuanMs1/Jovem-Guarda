const app = document.querySelector("#app");

export function register(evtBack, evtJoin, evtConfirmation) {
    app.innerHTML = `
      <div id="container-center-register">
        <a href="#">
            <img id="logo-register"class="link" src="./assets/images/jovemGuarda.png">
        </a>
        <form id="form-register">
            <span class="title-register">
                CADASTRO
            </span>
            <div>
              <input id="name-register" type="text" placeholder="NOME">
            </div>
            <div>
                <input id="email-register" type="text" placeholder="EMAIL">
            </div>
            <div>
                <input id="password-register" type="password" placeholder="SENHA">
            </div>
            <div>
                <input id="confirm-password-register" type="password" placeholder="CONFIRME SUA SENHA">
            </div>
            <p id="message-error-register"></p>
            <div>
                <input id="btn-submit-register"class="link" type="button" value="CADASTRAR">
            </div>
        </form>
        <span id="create-acount">
          <a href="#" class="link">Entrar</a>
        </span>
      </div>
    `;

    registerService([evtBack, evtJoin, evtConfirmation]);
}

function registerService(evt) {
    const elements = document.querySelectorAll(".link");

    const btnSubmit = document.querySelector("#btn-submit-register");

    // btnSubmit.addEventListener("click", function () {
    //     const pass = document.querySelector("#password-register").value;
    //     const confirmPass = document.querySelector(
    //         "#confirm-password-register"
    //     ).value;
    //     const msgError = document.querySelector("#message-error-register");
    //     const control = 0;

    //     console.log(`pass=${pass}`);
    //     console.log(`confirm=${confirmPass}`);
    //     if (pass !== confirmPass) {
    //         msgError.innerHTML = "As senhas inseridas são diferentes";
    //         control = 1;
    //     } else {
    //         console.log("OK!");
    //         registerService([evtBack, evtJoin, evtConfirmation]);
    //     }
    // });

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            if (evt[i].detail.name == "/confirmation") {
                const pass = document.querySelector("#password-register").value;
                const confirmPass = document.querySelector(
                    "#confirm-password-register"
                ).value;
                const msgError = document.querySelector(
                    "#message-error-register"
                );
                const control = 0;

                console.log(`pass=${pass}`);
                console.log(`confirm=${confirmPass}`);
                if (pass !== confirmPass) {
                    msgError.innerHTML = "As senhas inseridas são diferentes";
                    control = 1;
                } else {
                    registerUser();
                    window.dispatchEvent(evt[i]);
                }
            } else {
                window.dispatchEvent(evt[i]);
            }
        };
    }
    document.title = "Cadastro";
}

function registerUser() {
    const name = document.querySelector("#name-register").value;
    const email = document.querySelector("#email-register").value;
    const password = document.querySelector("#password-register").value;

    const data = { name: name, email: email, password: password };

    fetch("http://localhost:8000/user/signup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    });
}
