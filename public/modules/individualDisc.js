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
                src="./assets/images/userAlpha.jpg"
            />
            <span id="name-user-all">Alpha Edtech</span>
        </div>
    </header>

    <span id="disc-title"></span>
    <span id="disc-artist" ></span>
    <span id="disc-year"></span>
    <img id="disc-img" src="" alt="">
</section>
<section id="description-disc-individual">
    <div id="description-disc-left">
        <span class="infos-titles" id="album-type-individual">Tipo do Album: </span>
        <span class="infos-titles" id="vinyl-type-individual" >Tipo do Vinil:</span>
        <span class="infos-titles" id="length-individual">Duração:</span>
        <span class="infos-titles" id="status-individual">Situação:</span>
        <span class="infos-titles" id="owner-individual">Proprietário: </span>
    </div>
    <div id="description-line-individual"></div>
    <div id="description-disc-right-individual">
        <span id="description-individual">Descrição:</span>
    </div>
</section>
<button id="btn-trade">TROCAR</button>
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
                    src="./assets/images/icons/star.png"
                />
                <span class="link">AVALIAÇÕES</span>
            </div>
        </div>
        <u class="link">Desconectar</u>
    </div>
</section>
    `;

    createIndividualDisc(e.detail.id)

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

    const individualDisc = await res.json();


    const discTitle = document.getElementById("disc-title");
    discTitle.innerHTML = `${ individualDisc[0].album}`

    const discArtist = document.getElementById("disc-title");
    discArtist.innerHTML = `${individualDisc[0].artist}`

    const discYear = document.getElementById("disc-year");
    discYear.innerHTML = `${individualDisc[0].release_year}`

    const discImg = document.getElementById("disc-img");
    discImg.setAttribute("src", `${individualDisc[0].img}`);

    const albumTypeIndividual = document.getElementById("album-type-individual");
    albumTypeIndividual.innerHTML = `Tipo do Album: ${ individualDisc[0].album_type}`

    const vinylTypeIndividual = document.getElementById("vinyl-type-individual");
    vinylTypeIndividual.innerHTML = `Tipo do Vinil: ${individualDisc[0].vynil_type}`

    const lengthIndividual = document.getElementById("length-individual");
    lengthIndividual.innerHTML = `Duração: ${individualDisc[0].length}`

    const statusIndividual = document.getElementById("status-individual");
    statusIndividual.innerHTML = `Situação: ${individualDisc[0].disc_status}`

    const ownerIndividual = document.getElementById("owner-individual");
    ownerIndividual.innerHTML = `Proprietário: ${individualDisc[0].name}`

    const descriptionIndividual = document.getElementById("description-individual");
    descriptionIndividual.innerHTML = `Descrição: ${individualDisc[0].disc_description}`

   
    const imgsDiscUpload = document.getElementsByClassName("imgs-disc-user")
    
    for (let y = 0; y < individualDisc.length; y++) {
        const imgDiscUploadCreate = document.createElement("img")
        imgDiscUploadCreate.setAttribute("src", `./uploads/discs/${individualDisc[y].real_imgs}`)
        imgDiscUploadCreate.className = "img-disc-upload-create"
        imgsDiscUpload[y].appendChild(imgDiscUploadCreate)
    }
}