const app = document.querySelector("#app");

export function proposals(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    evtMyprofile,
    evtWishlist,
    evtDesconect
) {
    app.innerHTML = `
        <header>
            <a id="container-logo-myDiscs" href="#">
                <img id="logo-img-all" class="link" src="./assets/images/LogoJovemGuarda.svg" alt="" />
            </a>
            <span class="link">DISCOS</span>
            <span class="link">ESTILOS</span>
            <div id="container-user-all">
                <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
            <span id="name-user-all">Alpha Edtech</span>
            </div>
        </header>

        <span id="disc-title">PROPOSTAS</span>
  
        <div id="containerMain"></did>
        <section id="description-disc"></section>

        <section id="container-menu">
            <div id="menu">
                <div id="container-img-name">
                    <img id="img-menu" src="./assets/images/userAlpha.jpg" />
                    <span>Alpha Edtech</span>
                </div>
                <div id="menu-options">
                    <div>
                        <img class="icons" src="./assets/images/icons/add.png" />
                        <span class="link">CADASTRE SEUS DISCOS</span>
                    </div>
                    <div>
                        <img
                            class="icons"
                            src="./assets/images/icons/profile-user.png"
                        />
                        <span class="link">MEU PERFIL</span>
                    </div>
                    <div>
                        <img class="icons" src="./assets/images/icons/heart.png" />
                        <span class="link">LISTA DE DESEJOS</span>
                    </div>
                    <div>
                        <img class="icons" src="./assets/images/icons/two-arrows.png" />
                        <span class="selected-page">PROPOSTAS</span>
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
        evtMyprofile,
        evtWishlist,
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

    showOffers();

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Propostas";
}

async function showOffers() {
    const exchanges = await getActiveExchanges();
    console.log(exchanges);
    const res = await fetch("/user/alldiscs", {
        method: "GET",
    });

    const allDiscs = await res.json();

    for (let c = 0; c < allDiscs.length; c++) {
        const containerMain = document.getElementById("containerMain");

        const divModal = document.createElement("div");
        divModal.id = "container-modal-proposals";
        divModal.dataset.infos = {
            discId: allDiscs[c].id,
            ownerId: allDiscs[c].user_id,
        };

        //Div offer:
        const divOffer = document.createElement("div");
        divOffer.id = "div-offer";
        divModal.appendChild(divOffer);

        const nameFrom = document.createElement("span");
        nameFrom.innerHTML = `SEU DISCO`;
        divOffer.appendChild(nameFrom);
        const imgOffer = document.createElement("img");
        imgOffer.setAttribute("src", "./assets/images/disc3.jpg");
        imgOffer.id = "img-offer";
        divModal.appendChild(imgOffer);

        const divNameImg = document.createElement("div");
        divNameImg.id = "div-name-img";
        divNameImg.appendChild(nameFrom);
        divNameImg.appendChild(imgOffer);
        divModal.appendChild(divNameImg);

        const changeImg = document.createElement("img");

        changeImg.setAttribute(
            "src",
            "./assets/images/icons/exchange-disc.png"
        );
        changeImg.id = "img-exchange";
        changeImg.className = "link";

        //Div Img exchange:
        divModal.appendChild(changeImg);

        const containerInfo = document.createElement("div");
        containerInfo.id = "container-img-info";

        //Div i want:
        const nameTo = document.createElement("span");
        nameTo.innerHTML = `DISCO OFERTADO`;
        const imgAlbum = document.createElement("img");
        imgAlbum.id = "img-disc";
        imgAlbum.setAttribute("src", `${allDiscs[c].img}`);

        const divNameImgR = document.createElement("div");
        divNameImgR.id = "div-name-img";
        divNameImgR.appendChild(nameTo);
        divNameImgR.appendChild(imgAlbum);
        divModal.appendChild(divNameImgR);

        containerMain.appendChild(divModal);
        divModal.appendChild(containerInfo);

        //Buttons:
        const divButtons = document.createElement("div");
        divButtons.id = "div-buttons-pending";
        divModal.appendChild(divButtons);

        console.log(exchanges[c].status);

        if (exchanges[c].status === "pending_approval") {
            const buttonAccept = document.createElement("button");
            buttonAccept.innerHTML = "ACEITAR";
            divButtons.appendChild(buttonAccept);
            buttonAccept.id = "buttons-proposals";

            const buttonReject = document.createElement("button");
            buttonReject.innerHTML = "REJEITAR";
            divButtons.appendChild(buttonReject);
            buttonReject.id = "buttons-proposals";

            const divNameImgL = document.createElement("div");
            divNameImgL.id = "div-name-img";
            divNameImgL.appendChild(buttonAccept);
            divNameImgL.appendChild(buttonReject);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
        } else {
            const buttonContacts = document.createElement("button");
            buttonContacts.innerHTML = "CONTATOS";
            divButtons.appendChild(buttonContacts);
            buttonContacts.id = "buttons-proposals";

            const buttonComplete = document.createElement("button");
            buttonComplete.innerHTML = "COMPELTAR";
            divButtons.appendChild(buttonComplete);
            buttonComplete.id = "buttons-proposals";

            const buttonCancel = document.createElement("button");
            buttonCancel.innerHTML = "CANCELAR";
            divButtons.appendChild(buttonCancel);
            buttonCancel.id = "buttons-proposals";

            const divNameImgL = document.createElement("div");
            divNameImgL.id = "div-name-img";
            divNameImgL.appendChild(buttonContacts);
            divNameImgL.appendChild(buttonComplete);
            divNameImgL.appendChild(buttonCancel);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
        }

        // containerInfo.appendChild(imgAlbum);

        // switch (allDiscs[c].disc_status) {
        //     case "available to trade":
        //         conditionDisc = "Disponível para troca.";
        //         break;
        //     case "wishlist":
        //         conditionDisc = "Lista de Desejos.";
        //         break;
        //     case "own":
        //         conditionDisc = "Coleção Própria.";
        //         break;
        // }

        const owner = document.createElement("span");
        owner.innerHTML = `${allDiscs[c].owner}`;

        // changeImgDiv.appendChild(changeImg);
    }
}

async function getActiveExchanges() {
    const exchangesRes = await fetch(`user/exchanges`);
    const exchanges = await exchangesRes.json();
    return exchanges;
}

async function acceptExchange(exhcangeId) {
    try {
        await fetch(`user/exchanges/accept/${exchangeId}`);
        return "Troca aceita";
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function rejectExchange(exchangeId) {
    try {
        await fetch(`user/exchanges/reject/${exchangeId}`);
        return;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function completeExchange(exchangeId) {
    await fetch(`user/exchanges/accept/${exchangeId}`);
    return;
}
async function cancelExchange(exchangeId) {
    await fetch(`user/exchanges/cancel/${exchangeId}`);
}
