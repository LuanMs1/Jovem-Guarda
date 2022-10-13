import { getSpotifyToken } from "./api-spotify/spotifyToken.js";

// import { spotifyGetAlbumToRegister } from "./api-spotify/spotifyGetDatasToRegister.js";

const app = document.querySelector("#app");

export function registerDisc(
    evtMydisc,
    evtDiscs,
    evtGenre,
    evtMyprofile,
    evtWishlist,
    evtEvaluation,
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
    <section id="register-disc-section">
      <span id="register-disc-title">Cadastrar Discos</span>
    </section>
    <section id="logo-register-disc-position">
        <input id="list-albums" list="albums" type="text" placeholder="PESQUISAR ALBUM">
    </section>
    <section id="individual-disc">
        <p id="msg-error"></p>
        <select name="" id="select-albums"></select>
    </section>
    <section id="description-disc-register">
        <div id="description-disc-left-register">
            <label for="select-album-type">TIPO DO ALBUM:
                <select class="style-select" name="album-type" id="select-album-type">
                  <option value="single">Single</option>
                  <option value="ep">EP</option>
                  <option value="lp">LP</option>
                </select>
            </label>
                <label for="conditions-vinil">SITUAÇÃO:
                    <select class="style-select" id="conditions-vinil">
                      <option value="available to trade">Disponível para troca</option>
                      <option value="wishlist">Lista de desejos</option>
                      <option value="own">Pessoal</option>
                    </select></label>
                    <label for="select-vinil-type">TIPO DO VINIL: 
                        <select  class="style-select" name="vinil-type" id="select-vinil-type">
                          <option value="matte">Fosco</option>
                          <option value="transparent">Transparente</option>
                          <option value="glossy">Brilhoso</option>
                          <option value="color">Colorido</option>
                          <option value="metallic">Metálico</option>
                        </select>
                        </label>
                        <label for="select-vinil-type" >GÊNEROS: 
                            <select class="style-select" name="vinil-type" id="select-gender-type">
                              <option value="Axé">Axé</option>
                              <option value="Blues">Blues</option>
                              <option value="Country">Country</option>
                              <option value="Eletrônica">Eletrônica</option>
                              <option value="Forró">Forró</option>
                              <option value="Funk">Funk</option>
                              <option value="Gospel">Gospel</option>
                              <option value="Hip Hop">Hip Hop</option>
                              <option value="Jazz">Jazz</option>
                              <option value="MPB">MPB</option>
                              <option value="Música clássica">Música clássica</option>
                              <option value="Pagode">Pagode</option>
                              <option value="Pop">Pop</option>
                              <option value="Rap">Rap</option>
                              <option value="Reggae">Reggae</option>
                              <option value="Samba">Samba</option>
                              <option value="Rock">Rock</option>
                   </select>
                            </label>
                            <label for="">DURAÇÃO: <span id="duration-tracks"></span></label>
        </div>
        <div id="description-line"></div>
        <div id="description-disc-right-register">
            <label id="description-vinil-label" style="gap: 10px;" for="description-vinil">DESCRIÇÃO:<textarea id="description-vinil" class="style-select" rows="5" cols="30"></textarea></label>
        </div>
    </section>
    <p id="msg-error-register"></p>
    <section id="musics-disc-register">
        <div id="all-tracks"></div>
    </section>
    <section id="section-imgs-disc">
        <div>
            <span>FOTOS DO PRODUTO:</span>
        </div>
        <div id="position-imgs-disc-user">
            <div id="image-one" class="imgs-disc-user">
                <img class="img-div-photo" src="" alt="">
            </div>
            <div id="image-two" class="imgs-disc-user">
                <img class="img-div-photo" src="" alt="">
            </div>
            <div id="image-three" class="imgs-disc-user">
                <img class="img-div-photo" src="" alt="">
            </div>
            <div id="image-four" class="imgs-disc-user">
                <img class="img-div-photo" src="" alt="">
            </div>
        </div>
    </section>
    <form id="formElem">
        <input  name="imgrealvinil" class="input-upload" id="input-type-file-one" type="file">
        <input  name="imgrealvinil" class="input-upload" id="input-type-file-two" type="file">
        <input  name="imgrealvinil" class="input-upload" id="input-type-file-three" type="file">
        <input  name="imgrealvinil" class="input-upload" id="input-type-file-four" type="file">
        <section id="register-album-section" >
            <button id="register-album">CADASTRAR</button>
        </section>
    </form>

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
                    <span class="selected-page">CADASTRE SEUS DISCOS</span>
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
    </section>`;

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

    registerDiscService([
        evtMydisc,
        evtDiscs,
        evtGenre,
        evtMyprofile,
        evtWishlist,
        evtEvaluation,
        evtDesconect,
    ]);
}

function registerDiscService(evt) {
    document.getElementById("register-album").style.display = "none";
    const elements = document.querySelectorAll(".link");
    debounceRegisterApi();

    for (let i = 0; i <= elements.length; i++) {
        elements[i].addEventListener("click", () => {
            window.dispatchEvent(evt[i]);
        });
    }
    document.title = "Cadastrar Disco";
}

function debounceRegisterApi() {
    const listAlbums = document.getElementById("list-albums");

    listAlbums.addEventListener(
        "keyup",
        debounce(function () {
            const listAlbumsValue = listAlbums.value;
            spotifyGetAlbum(listAlbumsValue);
            console.log(listAlbumsValue);
        }, 500)
    );

    function debounce(func, wait) {
        let timer = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(func, wait);
        };
    }
}

export async function spotifyGetAlbum(artistAlbum) {
    const selectAlbuns = document.getElementById("select-albums");

    const createSelect = document.createElement("select");

    const msgError = document.getElementById("msg-error");

    const tokenSpotify = await getSpotifyToken();

    document.querySelector("#select-albums").innerHTML = "";

    const inputValue = document.querySelector("#list-albums").value;

    msgError.innerHTML = "";

    if (inputValue == "") {
        selectAlbuns.style.display = "none";
        msgError.innerHTML = "Por favor, insira um valor válido";
    }

    const urlSpotifyAlbum = `https://api.spotify.com/v1/search?q=${artistAlbum}&type=album&type=single&limit=50`;

    try {
        const res = await fetch(urlSpotifyAlbum, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `${tokenSpotify}`,
            },
        });

        const albums = await res.json();

        for (let i = 0; i < albums.albums.items.length; i++) {
            const createOption = document.createElement("option");

            selectAlbuns.setAttribute("size", `${albums.albums.items.length}`);
            createSelect.classList.add("selected-albums");
            createOption.innerHTML = `${albums.albums.items[i].name}`;
            createOption.setAttribute("value", `${albums.albums.items[i].id}`);
            selectAlbuns.appendChild(createOption);
        }

        selectAlbuns.addEventListener("change", getElementsToRegister);

        function getElementsToRegister() {
            const idAlbum =
                selectAlbuns.options[selectAlbuns.selectedIndex].value;
            selectAlbuns.style.display = "none";
            spotifyGetAlbumToRegister(idAlbum);
            document.querySelector("#select-albums").innerHTML = "";
            document.querySelector("#list-albums").value = "";
        }

        selectAlbuns.style.display = "block";
    } catch (error) {
        console.log(error);
    }
}

const dataToDataBase = [];

export async function spotifyGetAlbumToRegister(idAlbum) {
    const tokenSpotify = await getSpotifyToken();

    const urlSpotifyAlbum = `https://api.spotify.com/v1/albums/${idAlbum}`;

    try {
        const res = await fetch(urlSpotifyAlbum, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `${tokenSpotify}`,
            },
        });

        const album = await res.json();

        const formatedDate = album.release_date.split("-");

        let sumDurationMs = 0;

        for (let t = 0; t < album.tracks.items.length; t++) {
            sumDurationMs += album.tracks.items[t].duration_ms;
        }

        const dateTime = new Date(sumDurationMs);
        const hoursTrackTime = dateTime.getUTCHours();
        const minutesTrackTime = dateTime.getUTCMinutes();
        const secondsTrackTime = dateTime.getSeconds();

        const timeTracksFormated = `${hoursTrackTime
            .toString()
            .padStart(2, "0")}:${minutesTrackTime
            .toString()
            .padStart(2, "0")}:${secondsTrackTime.toString().padStart(2, "0")}`;

        

        const registerData = {
            nameAlbum: album.name,
            nameArtist: album.artists[0].name,
            dateAlbum: formatedDate[0],
            imgAlbum: album.images[0].url,
            durationTracks: timeTracksFormated,
            nameTracks: album.tracks.items,
        };

        const registerDatatoDataBase = {
            nameAlbum: album.name,
            nameArtist: album.artists[0].name,
            dateAlbum: parseInt(formatedDate[0]),
            imgAlbum: album.images[0].url,
            durationTracks: timeTracksFormated,
            nameTracks: album.tracks.items,
        };

        dataToDataBase.splice(0, dataToDataBase.length);
        dataToDataBase.push(registerDatatoDataBase);
        console.log(dataToDataBase);
        createRegisterData(registerData);
    } catch (error) {
        console.log(error);
    }
}

function createRegisterData(registerData) {
    const individualDiscRegister = document.getElementById("individual-disc");

    // individualDiscRegister.innerHTML = "";
    const allTracks = document.getElementById("all-tracks");

    const imgAlbum = document.getElementById("img-album");

    const nameAlbum = document.getElementById("name-album");

    const nameArtist = document.getElementById("name-artist");

    const yearAlbum = document.getElementById("year-album");

    const durationTracks = document.getElementById("duration-tracks");

    const typeAlbum = document.getElementById("type-album");

    const registerAlbum = document.getElementById("register-album");

    document.getElementById("register-album").style.display = "block";

    registerAlbum.addEventListener("click", createRegisterDataToDataBase);

    const cardDisc = document.createElement("div");
    cardDisc.className = "card-myDiscs";

    const imgCard = document.createElement("img");
    imgCard.className = "card-img";
    imgCard.setAttribute("src", `${registerData.imgAlbum}`);

    const spanNameDisc = document.createElement("span");
    spanNameDisc.className = "name-disc";
    spanNameDisc.innerHTML = `${registerData.nameAlbum}`;

    const spanYearDisc = document.createElement("span");
    spanYearDisc.className = "year-disc";
    spanYearDisc.innerHTML = `${registerData.dateAlbum}`;

    const spanArtisDisc = document.createElement("span");
    spanArtisDisc.className = "info-disc";
    spanArtisDisc.innerHTML = `${registerData.nameArtist}`;

    durationTracks.innerHTML = `${registerData.durationTracks}`;

    individualDiscRegister.appendChild(cardDisc);
    cardDisc.appendChild(imgCard);
    cardDisc.appendChild(spanNameDisc);
    cardDisc.appendChild(spanYearDisc);
    cardDisc.appendChild(spanArtisDisc);


    allTracks.innerHTML = "";

    for (let t = 0; t < registerData.nameTracks.length; t++) {
        const createTracks = document.createElement("p");
        createTracks.innerHTML = `${registerData.nameTracks[t].name}`;
        allTracks.appendChild(createTracks);
        console.log(registerData.nameTracks[t].name);
    }

const imgDivPhoto = document.getElementsByClassName("img-div-photo");

const inputOne = document.getElementById("input-type-file-one");

const inputTwo = document.getElementById("input-type-file-two");

const inputThree = document.getElementById("input-type-file-three");

const inputFour = document.getElementById("input-type-file-four");

const divPhoto = document.querySelectorAll(".imgs-disc-user");

divPhoto.forEach((e) => e.addEventListener("dragover", (e) => {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}))


divPhoto.forEach((e) => e.addEventListener("drop", (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log();
    const fileList = e.dataTransfer.files;
    console.log(fileList);

    const imgDisplay = e.target.children[0]

    createPhotoDragandDrop(fileList, imgDisplay);

}))

divPhoto.forEach((e) =>
  e.addEventListener("click", (e) => {
    let inputNumber = "";
    let imgDisplay = null;

    switch (e.target.id) {
      case "image-one":
        inputOne.click();
        inputNumber = inputOne;
        imgDisplay = 0;
        break;
      case "image-two":
        inputTwo.click();
        inputNumber = inputTwo;
        imgDisplay = 1;
        break;
      case "image-three":
        inputThree.click();
        inputNumber = inputThree;
        imgDisplay = 2;
        break;
      case "image-four":
        inputFour.click();
        inputNumber = inputFour;
        imgDisplay = 3;
        break;
    }
    createPhotoInput(inputNumber, imgDisplay);
  })
);

function createPhotoInput(inputNumber, imgDisplay) {
    inputNumber.addEventListener("change", () => {
      let reader = new FileReader();
    
   
        console.log(inputNumber.files[0].File);
      reader.onload = () => {
        imgDivPhoto[imgDisplay].src = reader.result;
        imgDivPhoto[imgDisplay].style.display = "block";

      };
      reader.readAsDataURL(inputNumber.files[0]);
     
    });
  }  
}

function createPhotoDragandDrop(fileList,imgDisplay) {
    console.log("oie");
    let reader = new FileReader();
    console.log(reader);
    reader.onload = () => {
        imgDisplay.src = reader.result;
        imgDisplay.style.display = "block";
    }

    reader.readAsDataURL(fileList[0])
}


function createRegisterDataToDataBase() {

    const msgErrorRegister = document.getElementById("msg-error-register");

    const selectAlbumType = document.getElementById("select-album-type");

    const selectvinilType = document.getElementById("select-vinil-type");

    const selectgenderType = document.getElementById("select-gender-type");

    const conditionsVinil = document.getElementById("conditions-vinil");

    const descriptionVinil = document.getElementById("description-vinil");

    const selectedAlbumType =
        selectAlbumType.options[selectAlbumType.selectedIndex].value;

    const selectedVinilType =
        selectvinilType.options[selectvinilType.selectedIndex].value;

    const selectedStatus =
        conditionsVinil.options[conditionsVinil.selectedIndex].value;

    const selectedGender = [
        selectgenderType.options[selectgenderType.selectedIndex].value,
    ];

    console.log(dataToDataBase[0]);

    const formElem = document.getElementById("formElem");
    const formInfo = new FormData(formElem)
    formInfo.append("album",dataToDataBase[0].nameAlbum);
    formInfo.append("artist",dataToDataBase[0].nameArtist);
    formInfo.append("release_year",dataToDataBase[0].dateAlbum);
    formInfo.append("img",dataToDataBase[0].imgAlbum);
    formInfo.append("vynil_type",selectedVinilType);
    formInfo.append("album_type",selectedAlbumType);
    formInfo.append("genre",selectedGender);
    formInfo.append("length",dataToDataBase[0].durationTracks);
    formInfo.append("disc_description",descriptionVinil.value);
    formInfo.append("disc_status",selectedStatus);
    

    console.log(formElem);
    console.table(formElem);

    formElem.onsubmit = async (e) => {
        e.preventDefault();
       
        let response = await fetch('/user/disc', {
          method: 'POST',
          body: formInfo,
        });

      };



    // if (!dataDisc.disc_description == "") {
    //     msgErrorRegister.style.color = "green";
    //     msgErrorRegister.innerHTML = "Disco cadastro com sucesso!";


    // } else {
    //     msgErrorRegister.innerHTML = "Por favor, insira uma descrição válida.";
    // }
}
