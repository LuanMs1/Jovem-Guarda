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
                    src="./assets/images/icons/star.png"
                />
                <span class="link">AVALIAÇÕES</span>
            </div>
        </div>
        <u class="link">Desconectar</u>
    </div>
</section>
    `;

    // id do disco à ser trocado, fazer fetch e preencher os campos
    console.log(e);
    const discToTradeId = e.detail.id;
    console.log(discToTradeId);

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
    const addOfferDisc = document.querySelector('.card-add-offer');
    const addAsckDisc = document.querySelector('.card-add-asck')

    profilePic.addEventListener("click", () => {
        profileMenu.style.display === "flex"
            ? ((profileMenu.style.display = "none"),
              (profileMenuContainer.style.display = "none"))
            : ((profileMenu.style.display = "flex"),
              (profileMenuContainer.style.display = "flex"));
    });
    addOfferDisc.addEventListener('click', () =>{
        console.log(e);
        choseDiscToOffer(e);
    });

    addAsckDisc.addEventListener('click', () => {
        choseWantedDisc(e);
    })
    showDisc(e);
    console.log('detail:')
    console.log(e.detail)
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

async function showDisc(e){

    const divFrom = document.querySelector('.discs-to');
    const img = document.createElement('img');
    img.className = 'card-img';
    const discId = e.detail.discId;

    const res = await fetch(`http://localhost:8000/disc/one/${discId}`)
    const disc = await res.json();
    console.log(disc);
    const discImg = disc.img;
    console.log(discImg);
    img.src = discImg;
    divFrom.appendChild(img);
}

async function choseDiscToOffer(e){
    const fetchDiscs = await fetch('http://localhost:8000/user/alldiscs');
    const myDiscs = await fetchDiscs.json();
    console.log(myDiscs)
}

async function choseWantedDisc(e){
    const userTo = e.detail.ownerId;
    console.log(userTo)
    const fetchDiscs = await fetch(`http://localhost:8000/disc/user/${userTo}`);
    const fromDiscs =  await fetchDiscs.json();
    console.log(fromDiscs);
}