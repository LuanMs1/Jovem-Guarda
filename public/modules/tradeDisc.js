const app = document.querySelector("#app");

export function tradeDisc(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    myProfile,
    evtWishlist,
    evtEvaluation,
    evtDesconect,
    e
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

    <section id="trade-disc">
    <div id="offer-disc-left">
        <div>
            <span class="trade-text">Ofereço</span>
        </div>
        <div class = 'discs-from'></div>
        <div class="card-add card-add-offer">
            <img
                class="card-add-icon"
                src="./assets/images/icons/mais (3).png"
                alt=""
            />
        </div>
    </div>
    <div id="central-line"></div>
        <div id="want-disc-right">
            <div id="position-trade-text">
                <span class="trade-text">Quero</span>
                <span>De:Fulano</span>
            </div>
            <div class = "discs-to">
            </div>
            <div class="card-add card-add-asck">
                <img
                    class="card-add-icon"
                    src="./assets/images/icons/mais (3).png"
                    alt=""
                />
            </div>
        </div>
    </section>
    <section id="btns-trade">
        <button id="btn-trade">Propor troca</button>
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
                <span class="link">MEU PERFIL</span>
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

    // id do disco à ser trocado, fazer fetch e preencher os campos
    const discToTradeId = e.detail.id;
    console.log("triger event:");
    console.log(e);

    service([
        evtMydisc,
        evtDiscs,
        evtGenre,
        evtRegister,
        myProfile,
        evtWishlist,
        evtEvaluation,
        evtDesconect,
    ]);

    const profilePic = document.querySelector("#container-user-all");
    const profileMenu = document.querySelector("#menu");
    const profileMenuContainer = document.querySelector("#container-menu");
    const addOfferDisc = document.querySelector(".card-add-offer");
    const addAsckDisc = document.querySelector(".card-add-asck");
    const btnPropose = document.querySelector("#btn-trade");
    profilePic.addEventListener("click", () => {
        profileMenu.style.display === "flex"
            ? ((profileMenu.style.display = "none"),
              (profileMenuContainer.style.display = "none"))
            : ((profileMenu.style.display = "flex"),
              (profileMenuContainer.style.display = "flex"));
    });

    btnPropose.addEventListener("click", () => {
        const wantedDiscsImgs = document
            .querySelector(".discs-to")
            .querySelectorAll(".card-img");
        const offeredDiscsImgs = document
            .querySelector(".discs-from")
            .querySelectorAll(".card-img");
        const wantedDiscsIds = extractIds(wantedDiscsImgs);
        const offeredDiscsIds = extractIds(offeredDiscsImgs);
        makeProposal(wantedDiscsIds, offeredDiscsIds);

        console.log(wantedDiscsIds, offeredDiscsIds);
    });
    addOfferDisc.addEventListener("click", () => {
        choseDiscToOffer(e);
    });

    addAsckDisc.addEventListener("click", () => {
        choseWantedDisc(e);
    });

    showDisc(e);
}

////// FAZENDO PROPOSTAS
async function makeProposal(wanted, offered) {
    const fetchBody = {
        discsTo: wanted,
        discsFrom: offered,
    };
    const options = {
        method: "POST",
        body: JSON.stringify(fetchBody),
        headers: { "Content-type": "application/json; charset=UTF-8" },
    };
    await fetch("/user/exchanges", options);
    alert("PROPOSTA FEITA");
}

function service(evt) {
    const elements = document.querySelectorAll(".link");

    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Propor troca";
}

// adicionando a imagem do disc clicado
async function showDisc(e) {
    const divTo = document.querySelector(".discs-to");
    const img = document.createElement("img");
    img.className = "card-img";
    const discId = e.detail.discId;
    console.log(discId);
    const res = await fetch(`/disc/one/${discId}`);
    const disc = await res.json();
    img.id = discId;
    console.log("clicked disc:");
    console.log(disc);
    const discImg = disc[0].img;
    img.src = discImg;
    divTo.appendChild(img);
}

// adding select to chose a disc to offer
async function choseDiscToOffer(e) {
    // get discs
    const fetchDiscs = await fetch("/user/alldiscs");
    const myDiscs = await fetchDiscs.json();
    // div to put imgs
    const toOfferDiv = document.querySelector("#offer-disc-left");

    // // creating elements to select
    const divFrom = document.querySelector(".discs-from");
    creatingSelection(myDiscs, toOfferDiv, divFrom);
}

async function choseWantedDisc(e) {
    const userTo = e.detail.ownerId;
    const divTo = document.querySelector("#want-disc-right");
    const imgsDiv = document.querySelector(".discs-to");
    const fetchDiscs = await fetch(`/disc/user/${userTo}`);
    const fromDiscs = await fetchDiscs.json();

    creatingSelection(fromDiscs, divTo, imgsDiv);
    console.log(fromDiscs);
}

function creatingSelection(discs, fatherElement, elementForImgs) {
    // creating elements to select
    const select = document.createElement("select");
    select.id = "select-trade"
    const subm = document.createElement("button");
    subm.id="subm-trade"
    for (let i in discs) {
        const option = document.createElement("option");
        option.innerHTML = discs[i].album;
        option.value = i;
        select.appendChild(option);
    }
    fatherElement.appendChild(select);
    subm.addEventListener("click", () => {
        const selectedAlbum = select.options[select.selectedIndex].value;
        addDiscTrade(discs[selectedAlbum], elementForImgs);
        subm.remove();
        select.remove();
    });
    subm.innerHTML = "Selecionar disco!";
    fatherElement.appendChild(subm);
}
// adding disc on the click
async function addDiscTrade(disc, fatherElement) {
    const img = document.createElement("img");
    img.className = "card-img";
    const discImg = disc.img;
    img.src = discImg;
    img.id = disc.id;
    const alreadySelectedDiscs = extractIds(
        fatherElement.querySelectorAll(".card-img")
    );
    if (alreadySelectedDiscs.includes(disc.id.toString())) return;
    img.addEventListener("click", () => img.remove());
    fatherElement.appendChild(img);
}
function extractIds(nodeList) {
    const ids = [];
    for (let node of nodeList) {
        ids.push(node.id);
    }
    return ids;
}
