const app = document.querySelector("#app");

export function myProfile(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    evtWishlist,
    evtEvaluation,
    evtDesconect
) {
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
        <span class="link">DISCOS</span>
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
    <form id="formElem">
        <img id="img-center-myProfile" src="./assets/images/userAlpha.jpg" />
        <input name="img" id="input-profile" type="file" value="">
    <section id="container-edit-profile">
        <div id="modal-profile-left">
            <span>DADOS DA CONTA:</span>
            <input name="email"
                class="input-edit-profile"
                type="text"
                placeholder="EMAIL"
            />
            <input name="password"
                class="input-edit-profile"
                type="text"
                placeholder="SENHA"
            />
        </div>
        <div id="modal-profile-center">
            <span> DADOS PESSOAIS:</span>
            <input name="name"
                class="input-edit-profile"
                type="text"
                placeholder="NOME"
            />
            <input name="phone"
                class="input-edit-profile"
                type="text"
                placeholder="CONTATO"
            />
            <input name="cpf"
                class="input-edit-profile"
                type="text"
                placeholder="CPF"
            />
        </div>
        <div id="modal-profile-right">
            ENDEREÇO:
            <input name="address_zip"
                class="input-edit-profile-adress"
                type="text"
                placeholder="CEP"
            />
            <input name="address_street"
                class="input-edit-profile-adress"
                type="text"
                placeholder="RUA"
            />
            <input name="address_number"
                class="input-edit-profile-adress"
                type="text"
                placeholder="NÚMERO"
            />
            <input name="address_city"
                class="input-edit-profile-adress"
                type="text"
                placeholder="CIDADE"
            />
            <input name="address_state"
                class="input-edit-profile-adress"
                type="text"
                placeholder="ESTADO"
            />
        </div>
    </section>
    <button id="btn-confirm-edit">ALTERAR</button>
    </form>
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
                <span class="link">CADASTRE SEUS DISCOS</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/profile-user.png"
                />
                <span class="selected-page">MEU PERFIL</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/heart.png"
                />
                <span class="link">LISTA DE DESEJOS</span>
            </div>
            <div>
                <img
                    class="icons"
                    src="./assets/images/icons/two-arrows.png"
                />
                <span class="link">PROPOSTAS</span>
            </div>
        </div>
        <u class="link">Desconectar</u>
    </div>
</section>
    `;

    service([
        evtMydisc,
        evtDiscs,
        evtGenre,
        evtRegister,
        evtWishlist,
        evtEvaluation,
        evtDesconect,
    ]);

    const profilePic = document.querySelector("#container-user-all");
    const profileMenu = document.querySelector("#menu");
    const profileMenuContainer = document.querySelector("#container-menu");

    profilePic.addEventListener("click", () => {
        profileMenu.style.display === "flex"
            ? ((profileMenu.style.display = "none"),
              (profileMenuContainer.style.display = "none"))
            : ((profileMenu.style.display = "flex"),
              (profileMenuContainer.style.display = "flex"));
    });
}

function service(evt) {
    const elements = document.querySelectorAll(".link");

    getInformationsUser();
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Meu perfil";
}


async function getInformationsUser() {

    const inputEditProfile = document.getElementsByClassName("input-edit-profile");

    const inputEditProfileAdress = document.getElementsByClassName("input-edit-profile-adress");

    let response = await fetch('/user/', {
        method: 'GET',
      });
      
      const infoUser = await response.json();
      
        console.log(infoUser);
      console.log(inputEditProfileAdress);

      inputEditProfile[0].value = infoUser.email
      inputEditProfile[2].value = infoUser.name
      inputEditProfile[3].value = infoUser.phone
      inputEditProfile[4].value = infoUser.cpf

      inputEditProfileAdress[0].value = infoUser.address_zip
      inputEditProfileAdress[1].value = infoUser.address_street
      inputEditProfileAdress[2].value = infoUser.address_number
      inputEditProfileAdress[3].value = infoUser.address_city
      inputEditProfileAdress[4].value = infoUser.address_state
      uploadProfile();
}


function uploadProfile() {
const inputProfile = document.getElementById("input-profile");

const btnConfirmEdit = document.getElementById("btn-confirm-edit");

const imgProfile = document.getElementById("img-center-myProfile");



imgProfile.addEventListener('click', () => {

    inputProfile.click();
 
    inputProfile.addEventListener("change", () => {
        let reader = new FileReader();
        console.log("escolheu");
        reader.onload = () => {
            imgProfile.src = reader.result
        }
        reader.readAsDataURL(inputProfile.files[0])
    })
})

const formElem = document.getElementById("formElem");
const formInfo = new FormData(formElem)
console.log(formInfo);

formElem.onsubmit = async (e) => {
    e.preventDefault();
   
    let response = await fetch('/user/', {
      method: 'PUT',
      body: formInfo,
    });

  };
}
