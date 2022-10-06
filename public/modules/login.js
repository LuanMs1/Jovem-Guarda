const app = document.querySelector("#app");

export function login(evtJoinMain, evtEnter, evtRegister) {
  app.innerHTML = `
        <div id="container-center">
            <a href="#">
                <img class="link" src="./assets/images/jovemGuarda.png">
            </a>
            <form action="/action_page.php">
                <span class="title">
                    LOGIN
                </span>
                <div>
                    <input type="text" placeholder="EMAIL">
                </div>
                <div>
                    <input type="password" placeholder="SENHA">
                </div>
                <div>
                    <input class="link" id="btn-submit" type="submit" value="ENTRAR">
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

  for (let i = 0; i <= elements.length; i++) {
    elements[i].addEventListener("click", () => {
      window.dispatchEvent(evt[i]);
      fetch();
    });
    console.log(elements);
  }
  document.title = "Login";
}

function fetch() {
  let myInit = {
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
    body: JSON.stringify(data),
  };
  fetch("http://localhost:8000/singup", myInit)
    .then(function (response) {
      if (response.ok) {
        response.blob().then(function (myBlob) {
          var objectURL = URL.createObjectURL(myBlob);
          myImage.src = objectURL;
        });
      } else {
        console.log("Network response was not ok.");
      }
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: " + error.message
      );
    });
}
