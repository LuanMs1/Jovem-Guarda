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
    const treatedExchanges = organizeData(exchanges);
    console.log(treatedExchanges);
    const logUser = await getUser();
    console.log(logUser);

    for (let tradeId in treatedExchanges) {
        const containerMain = document.getElementById("containerMain");

        const divModal = document.createElement("div");
        divModal.className = "container-modal-proposals";
        divModal.id = tradeId;

        divModal.dataset.infos = {
            discId: treatedExchanges[tradeId].id,
            ownerId: treatedExchanges[tradeId].user_id,
        };

        //Div offer:
        const nameTo = document.createElement("span");
        nameTo.innerHTML = `DISCO OFERTADO`;
        const imageTo = document.createElement("img");
        imageTo.id = "img-disc";

        //Div i want:
        const divOffer = document.createElement("div");
        divOffer.id = "div-offer";
        divModal.appendChild(divOffer);

        const nameFrom = document.createElement("span");
        nameFrom.innerHTML = `SEU DISCO`;
        divOffer.appendChild(nameFrom);
        const imageFrom = document.createElement("img");
        for (let discInTrade of treatedExchanges[tradeId]) {
            if (logUser.id === discInTrade.owner_id) {
                imageFrom.setAttribute("src", `${discInTrade.img}`);
            } else {
                imageTo.setAttribute("src", `${discInTrade.img}`);
            }
        }
        imageFrom.id = "img-offer";
        divModal.appendChild(imageFrom);

        const divNameImg = document.createElement("div");
        divNameImg.className = "div-name-img";
        divNameImg.id = tradeId;
        divNameImg.appendChild(nameFrom);
        divNameImg.appendChild(imageFrom);
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

        // //Div offer:
        // const nameTo = document.createElement("span");
        // nameTo.innerHTML = `DISCO OFERTADO`;
        // const imageTo = document.createElement("img");
        // imageTo.id = "img-disc";

        // imageTo.setAttribute("src", `${treatedExchanges[tradeId][1].img}`);

        const divNameImgR = document.createElement("div");
        divNameImgR.className = "div-name-img";
        divNameImg.id = tradeId;
        divNameImgR.appendChild(nameTo);
        divNameImgR.appendChild(imageTo);
        divModal.appendChild(divNameImgR);

        containerMain.appendChild(divModal);
        divModal.appendChild(containerInfo);

        //Buttons:
        const divButtons = document.createElement("div");
        divButtons.id = "div-buttons-pending";
        divModal.appendChild(divButtons);

        // const text = document.querySelector("div-buttons-pending")

        console.log(logUser.id);
        console.log(treatedExchanges[tradeId][1].owner_id);
        if (logUser.name === treatedExchanges[tradeId][1].user_from) {
            const pending = document.createElement("span");
            pending.innerHTML = "PENDENTE";
            divButtons.appendChild(pending);
            pending.id = "span-pending";

            const buttonCancel = document.createElement("button");
            buttonCancel.innerHTML = "CANCELAR";
            divButtons.appendChild(buttonCancel);
            buttonCancel.className = "buttons-proposals";
            buttonCancel.className = "buttons-cancel";

            const divNameImgL = document.createElement("div");
            divNameImgL.className = "div-name-img";
            divNameImg.id = tradeId;
            divNameImgL.appendChild(pending);
            divNameImgL.appendChild(buttonCancel);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
        } else if (treatedExchanges[tradeId][1].status === "pending_approval") {
            const buttonAccept = document.createElement("button");
            buttonAccept.innerHTML = "ACEITAR";
            divButtons.appendChild(buttonAccept);
            buttonAccept.className = "buttons-proposals";
            buttonAccept.className = "buttons-accept";

            const buttonReject = document.createElement("button");
            buttonReject.innerHTML = "REJEITAR";
            divButtons.appendChild(buttonReject);
            buttonReject.className = "buttons-proposals";
            buttonReject.className = "buttons-reject";

            const divNameImgL = document.createElement("div");
            divNameImgL.className = "div-name-img";
            divNameImg.id = tradeId;
            divNameImgL.appendChild(buttonAccept);
            divNameImgL.appendChild(buttonReject);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
        } else {
            const buttonContacts = document.createElement("button");
            buttonContacts.innerHTML = "CONTATOS";
            divButtons.appendChild(buttonContacts);
            buttonContacts.className = "buttons-proposals";
            buttonContacts.className = "buttons-contacts";

            const buttonComplete = document.createElement("button");
            buttonComplete.innerHTML = "COMPLETAR";
            divButtons.appendChild(buttonComplete);
            buttonComplete.className = "buttons-proposals";
            buttonComplete.className = "buttons-complete";

            const buttonCancel = document.createElement("button");
            buttonCancel.innerHTML = "CANCELAR";
            divButtons.appendChild(buttonCancel);
            buttonCancel.className = "buttons-proposals";
            buttonCancel.className = "buttons-cancel";

            const divNameImgL = document.createElement("div");
            divNameImgL.className = "div-name-img";
            divNameImg.id = tradeId;
            divNameImgL.appendChild(buttonContacts);
            divNameImgL.appendChild(buttonComplete);
            divNameImgL.appendChild(buttonCancel);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
            divModal.appendChild(divNameImgL);
        }

        // containerInfo.appendChild(imageTo);

        // switch (treatedExchanges[c].disc_status) {
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

        // const owner = document.createElement("span");
        // owner.innerHTML = `${treatedExchanges[tradeId].owner}`;

        // changeImgDiv.appendChild(changeImg);
        const btn = document.querySelectorAll(".buttons-cancel");
        const btnaccept = document.querySelectorAll(".buttons-accept");
        const btnreject = document.querySelectorAll(".buttons-reject");

        for (let index = 0; index < btnreject.length; index++) {
            btnreject[index].addEventListener("click", function test() {
                rejectExchange(treatedExchanges[tradeId][1].id);
                window.dispatchEvent(
                    new CustomEvent("onstatechange", {
                        detail: {
                            name: "/proposals",
                        },
                    })
                );
            });
        }

        for (let index = 0; index < btnaccept.length; index++) {
            btnaccept[index].addEventListener("click", function test() {
                acceptExchange(treatedExchanges[tradeId][1].id);
                window.dispatchEvent(
                    new CustomEvent("onstatechange", {
                        detail: {
                            name: "/proposals",
                        },
                    })
                );
            });
        }

        for (let index = 0; index < btn.length; index++) {
            btn[index].addEventListener("click", function test() {
                cancelExchange(treatedExchanges[tradeId][1].id);
                window.dispatchEvent(
                    new CustomEvent("onstatechange", {
                        detail: {
                            name: "/proposals",
                        },
                    })
                );
            });
        }
    }

    // const divName = document.querySelector("#div-name-img");
    // const btn = document.querySelectorAll(".buttons-cancel");

    // console.log(btn);

    // for (let index = 0; index < btn.length; index++) {
    //     btn[index].addEventListener("click", function test() {
    //         const test = btn[index].closest("div");
    //         console.log(test);
    //         console.log("button-cancel");
    //         console.log(treatedExchanges[index + 1][1].id);
    //         console.log(treatedExchanges);
    //         // cancelExchange(treatedExchanges[index + 1][1].id);
    //     });
    // }

    // for (let index = 0; index < btn.length; index++) {
    //     btn[index].addEventListener("click", function test() {
    //         const test = btn[index].closest("div");
    //         console.log(test);
    //         console.log("button-cancel");
    //         console.log(treatedExchanges[index + 1][1].id);
    //         console.log(treatedExchanges);
    //         cancelExchange(treatedExchanges[index + 1][1].id);
    //     });
    // }
}

async function getActiveExchanges() {
    const exchangesRes = await fetch(`user/exchanges`);
    const exchanges = await exchangesRes.json();
    return exchanges;
}

async function acceptExchange(exchangeId) {
    const options = {
        method: "PUT",
    };
    try {
        await fetch(`user/exchanges/accept/${exchangeId}`, options);
        return "Troca aceita";
    } catch (err) {
        console.log(err);
        return err;
    }
}

async function rejectExchange(exchangeId) {
    const options = {
        method: "PUT",
    };
    try {
        await fetch(`user/exchanges/reject/${exchangeId}`, options);
        return;
    } catch (err) {
        console.log(err);
        return err;
    }
}
async function completeExchange(exchangeId) {
    const options = {
        method: "PUT",
    };
    await fetch(`user/exchanges/accept/${exchangeId}`, options);
    return;
}
async function cancelExchange(exchangeId) {
    const options = {
        method: "PUT",
    };
    await fetch(`user/exchanges/cancel/${exchangeId}`, options);
    return;
}

function organizeData(exchange) {
    const organized = {};

    for (let disc of exchange) {
        if (organized[disc.id]) {
            disc = discowner(disc);
            organized[disc.id].push(disc);
        } else {
            disc = discowner(disc);
            organized[disc.id] = [disc];
        }
    }
    return organized;
}

function discowner(disc) {
    if (disc.disc_onwer === disc.user_to) {
        disc.disc_onwer = "to";
    } else {
        disc.disc_onwer = "from";
    }
    return disc;
}

async function getUser() {
    const user = await fetch(`/user`);
    return await user.json();
}
