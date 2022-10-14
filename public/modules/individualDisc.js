import { getInformationsUser } from "./getInformationsUser.js";

const app = document.querySelector("#app");

export function individualDisc(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtRegister,
    evtMyProfile,
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
                src="./assets/images/icons/mais (3).png"
            />
            <span id="name-user-all"></span>
        </div>
    </header>

    <span id="disc-title"></span>
    <span id="disc-artist" ></span>
    <span id="disc-year"></span>
    <img id="disc-img" src="" alt="">
</section>
<section id="description-disc-individual">
    <div id="description-disc-left">
        <label for="">Tipo do Album: <span class="infos-titles" id="album-type-individual"></span></label>
        
        <label for="">Tipo do Vinil:<span class="infos-titles" id="vinyl-type-individual" ></span></label>
        
        <label for="">Duração:<span class="infos-titles" id="length-individual"></span></label>
        
        <label for="">Situação:<span class="infos-titles" id="status-individual"></span></label>
        
        <label for="">Proprietário:<span class="infos-titles" id="owner-individual"> </span></label>
        
    </div>
    <div id="description-line-individual"></div>
    <div id="description-disc-right-individual">
        <label for="">Descrição:<span id="description-individual"></span></label>
    </div>
</section>
<p id="msg-error-individual" ></p>
<button id="btn-trade">DELETAR</button>
<section id="musics-disc">

</section>
<section id="section-imgs-disc">
    <div>
        <span>FOTOS DO PRODUTO:</span>
    </div>
    <div id="position-imgs-disc-user">
        <div class="imgs-disc-user"></div>
        <div class="imgs-disc-user"></div>
        <div class="imgs-disc-user"></div>
        <div class="imgs-disc-user"></div>
    </div>
</section>

<section id="container-menu">
    <div id="menu">
        <div id="container-img-name">
            <img id="img-menu" src="./assets/images/icons/mais (3).png" />
            <span id="name-user-modal"></span>
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
                    src="./assets/images/icons/mais (3).png.png"
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

    createIndividualDisc(e.detail.id);

    service([
        evtMydisc,
        evtDiscs,
        evtGenre,
        evtRegister,
        evtMyProfile,
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
    getInformationsUser();
    
    const elements = document.querySelectorAll(".link");
    for (let i = 0; i < elements.length; i++) {
        elements[i].onclick = () => {
            window.dispatchEvent(evt[i]);
        };
    }
    document.title = "Disco individual";
}

async function createIndividualDisc(id) {
    const res = await fetch(`/disc/one/${id}`, {
        method: "GET",
    });

    discID = id;

    const individualDisc = await res.json();

    const discTitle = document.getElementById("disc-title");
    discTitle.innerHTML = `${individualDisc[0].album}`;

    const discArtist = document.getElementById("disc-artist");
    discArtist.innerHTML = `${individualDisc[0].artist}`;

    const discYear = document.getElementById("disc-year");
    discYear.innerHTML = `${individualDisc[0].release_year}`;

    const discImg = document.getElementById("disc-img");
    discImg.setAttribute("src", `${individualDisc[0].img}`);

    let typeVinylDiscSwitch = null;

    switch (individualDisc[0].vynil_type) {
        case "transparent":
            typeVinylDiscSwitch = "Transparente";
            break;
        case "matte":
            typeVinylDiscSwitch = "Fosco";
            break;
        case "glossy":
            typeVinylDiscSwitch = "Lustroso";
            break;
        case "color":
            typeVinylDiscSwitch = "Colorido";
            break;
        case "metallic":
            typeVinylDiscSwitch = "Metálico";
            break;
    }

    let typeAlbumDiscSwitch = null;

    switch (individualDisc[0].album_type) {
        case "single":
            typeAlbumDiscSwitch = "Single";
            break;
        case "ep":
            typeAlbumDiscSwitch = "EP";
            break;
        case "lp":
            typeAlbumDiscSwitch = "LP";
            break;
    }

    let conditionDisc = null;

    switch (individualDisc[0].disc_status) {
        case "available to trade":
            conditionDisc = "Disponível para troca.";
            break;
        case "wishlist":
            conditionDisc = "Lista de Desejos.";
            break;
        case "own":
            conditionDisc = "Coleção Própria.";
            break;
    }

    const albumTypeIndividual = document.getElementById(
        "album-type-individual"
    );
    albumTypeIndividual.innerHTML = ` ${typeAlbumDiscSwitch}`;

    const vinylTypeIndividual = document.getElementById(
        "vinyl-type-individual"
    );
    vinylTypeIndividual.innerHTML = ` ${typeVinylDiscSwitch}`;

    const lengthIndividual = document.getElementById("length-individual");
    lengthIndividual.innerHTML = ` ${individualDisc[0].length}`;

    const statusIndividual = document.getElementById("status-individual");
    statusIndividual.innerHTML = ` ${conditionDisc}`;

    const ownerIndividual = document.getElementById("owner-individual");
    ownerIndividual.innerHTML = ` ${individualDisc[0].name}`;

    const descriptionIndividual = document.getElementById(
        "description-individual"
    );
    descriptionIndividual.innerHTML = ` ${individualDisc[0].disc_description}`;

    const imgsDiscUpload = document.getElementsByClassName("imgs-disc-user");

    for (let y = 0; y < individualDisc.length; y++) {
        const imgDiscUploadCreate = document.createElement("img");
        imgDiscUploadCreate.setAttribute(
            "src",
            `./uploads/discs/${individualDisc[y].real_imgs}`
        );
        imgDiscUploadCreate.className = "img-disc-upload-create";
        imgsDiscUpload[y].appendChild(imgDiscUploadCreate);
    }

    const deleteButton = document.getElementById("btn-trade");
    deleteButton.addEventListener("click", deleteIndividualDisc);
}

let discID = null;

async function deleteIndividualDisc() {
    const res = await fetch(`/user/disc/${discID}`, {
        method: "DELETE",
    });
    const deleted = res.json();

    document.getElementById("disc-title").style.textDecoration = "line-through";
    document.getElementById("disc-artist").style.textDecoration =
        "line-through";
    document.getElementById("disc-year").style.textDecoration = "line-through";
    document.getElementById("disc-img").style.opacity = "0.3";
    document.getElementById("album-type-individual").style.textDecoration =
        "line-through";
    document.getElementById("vinyl-type-individual").style.textDecoration =
        "line-through";
    document.getElementById("length-individual").style.textDecoration =
        "line-through";
    document.getElementById("status-individual").style.textDecoration =
        "line-through";
    document.getElementById("owner-individual").style.textDecoration =
        "line-through";
    document.getElementById("description-individual").style.textDecoration =
        "line-through";

    const msgError = document.getElementById("msg-error-individual");
    msgError.innerHTML = "Disco excluído com sucesso!";

    // if (res.status == 200) {

    // }
}