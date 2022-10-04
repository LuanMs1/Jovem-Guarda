const app = document.querySelector("#app");

export function login(evtJoinMain,evtEnter, evtRegister) {
    app.innerHTML = `
        <div id="container-center">
            <a href="#">
                <img class="link" src="./public/assets/images/jovemGuarda.png">
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
    `
    loginService([evtJoinMain,evtEnter, evtRegister])
}

function loginService(evt) {
    const elements = document.querySelectorAll(".link");
    
    for (let i = 0; i <= elements.length; i++) {
        console.log(elements.length)
      elements[i].onclick = () => {
        window.dispatchEvent(evt[i]);
      };
    }
     document.title = "Login";
}