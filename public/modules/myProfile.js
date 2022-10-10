const app = document.querySelector("#app");

export function myProfile(evtJoin, evtRegister) {
    app.innerHTML = `
    <section id="container-centralized-myProfile">
    <header>
        <a id="container-logo-myDiscs" href="#">
            <img
                id="logo-img-all"
                class="link"
                src="./assets/images/LogoJovemGuarda.svg"
                alt=""
            />
        </a>
        <span class="selected-page">DISCOS</span>
        <span class="link">ESTILOS</span>
        <div id="container-user-all">
            <img
                id="user-img-all"
                src="./assets/images/userAlpha.jpg"
            />
            <span id="name-user-all">Alpha Edtech</span>
        </div>
    </header>

    <span id="title-myProfile">MEU PERFIL</span>
    <img id="img-center-myProfile" src="./assets/images/userAlpha.jpg" />
    <u id="alter-img">Altere sua imagem</u>

    <section id="container-edit-profile">
        <div id="modal-profile-left">
            <span>DADOS DA CONTA:</span>
            <input
                class="input-edit-profile"
                type="text"
                placeholder="EMAIL"
            />
            <input
                class="input-edit-profile"
                type="text"
                placeholder="SENHA"
            />
        </div>
        <div id="modal-profile-center">
            <span> DADOS PESSOAIS:</span>
            <input
                class="input-edit-profile"
                type="text"
                placeholder="NOME"
            />
            <input
                class="input-edit-profile"
                type="text"
                placeholder="CONTATO"
            />
            <input
                class="input-edit-profile"
                type="text"
                placeholder="CPF"
            />
        </div>
        <div id="modal-profile-right">
            ENDEREÇO:
            <input
                class="input-edit-profile-adress"
                type="text"
                placeholder="CEP"
            />
            <input
                class="input-edit-profile-adress"
                type="text"
                placeholder="RUA"
            />
            <input
                class="input-edit-profile-adress"
                type="text"
                placeholder="NÚMERO"
            />
            <input
                class="input-edit-profile-adress"
                type="text"
                placeholder="BAIRRO"
            />
            <input
                class="input-edit-profile-adress"
                type="text"
                placeholder="CIDADE"
            />
            <input
                class="input-edit-profile-adress"
                type="text"
                placeholder="ESTADO"
            />
        </div>
    </section>
    <button id="btn-confirm-edit">ALTERAR</button>
</section>

<section id="container-menu">
    <div id="menu">
        <div id="container-img-name">
            <img id="img-menu" src="./assets/images/userAlpha.jpg" />
            <span>Alpha Edtech</span>
        </div>
        <div id="menu-options">
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/add.png"
                />
                <span>CADASTRE SEUS DISCOS</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/profile-user.png"
                />
                <span>MEU PERFIL</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/heart.png"
                />
                <span>LISTA DE DESEJOS</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/star.png"
                />
                <span>AVALIAÇÕES</span>
            </div>
        </div>
        <u>Desconectar</u>
    </div>
</section>
    `;

    homeService([evtJoin, evtRegister]);
}

function homeService(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Meu perfil";
}
