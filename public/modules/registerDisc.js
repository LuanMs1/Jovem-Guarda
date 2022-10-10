import { getSpotifyToken } from "./api-spotify/spotifyToken.js";

// import { spotifyGetAlbumToRegister } from "./api-spotify/spotifyGetDatasToRegister.js";

const app = document.querySelector("#app");

export function registerDisc(evtBack, evtJoin, evtConfirmation) {
  app.innerHTML = `
  <header>
      <a id="container-logo-myDiscs" href="#">
        <img id="logo-img-all" src="./assets/images/LogoJovemGuarda.svg" alt="" />
      </a>
      <span class="link">DISCOS</span>
      <span class="link">ESTILOS</span>
      <span class="link">ARTISTAS</span>
      <div id="container-user-all">
        <img id="user-img-all" src="./assets/images/userAlpha.jpg" />
        <span id="name-user-all">Alpha Edtech</span>
      </div>
    </header>

    <section id="individual-disc">
        <input id="list-albums" list="albums" type="text" placeholder="PESQUISAR">
        <select name="" id="select-albums"></select>
        <span id="name-album">Album</span>
        <span id="name-artist">Artista</span>
        <span id="year-album">Ano</span>
        <img id="img-album" src="imgregisterDisc.png" alt="">
    </section>
    <section id="description-disc">
        <div id="description-disc-left">
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
    <section id="register-album-section" >
        <button id="register-album">CADASTRAR</button>
    </section>
    <section id="musics-disc">
        <div id="all-tracks"></div>
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
    </section>`;

  registerDiscService([evtBack, evtJoin, evtConfirmation]);
}

function registerDiscService(evt) {
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
    }, 1000)
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
  const tokenSpotify = await getSpotifyToken();

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
   
    const selectAlbuns = document.getElementById("select-albums");

    const createSelect = document.createElement("select");

    for (let i = 0; i < albums.albums.items.length; i++) {
      
      const createOption = document.createElement("option");
      selectAlbuns.setAttribute(
        "size",
        `${albums.albums.items[i].album_type.length}`
      );
      createSelect.classList.add("selected-albums");
      createOption.innerHTML = `${albums.albums.items[i].name}`;
      createOption.setAttribute("value", `${albums.albums.items[i].id}`);
      selectAlbuns.appendChild(createOption);
    }
    selectAlbuns.addEventListener("change", getElementsToRegister);

    function getElementsToRegister() {
      const idAlbum = selectAlbuns.options[selectAlbuns.selectedIndex].value;
      selectAlbuns.style.display = "none";
      spotifyGetAlbumToRegister(idAlbum);
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
  const allTracks = document.getElementById("all-tracks");

  const imgAlbum = document.getElementById("img-album");

  const nameAlbum = document.getElementById("name-album");

  const nameArtist = document.getElementById("name-artist");

  const yearAlbum = document.getElementById("year-album");

  const durationTracks = document.getElementById("duration-tracks");

  const typeAlbum = document.getElementById("type-album");

  const registerAlbum = document.getElementById("register-album");

  registerAlbum.addEventListener("click", createRegisterDataToDataBase);

  imgAlbum.setAttribute("src", `${registerData.imgAlbum}`);

  nameAlbum.innerHTML = `${registerData.nameAlbum}`;
  nameArtist.innerHTML = `${registerData.nameArtist}`;
  yearAlbum.innerHTML = `${registerData.dateAlbum}`;
  durationTracks.innerHTML = ` ${registerData.durationTracks}`;

  allTracks.innerHTML = "";

  for (let t = 0; t < registerData.nameTracks.length; t++) {
    const createTracks = document.createElement("p");
    createTracks.innerHTML = `${registerData.nameTracks[t].name}`;
    allTracks.appendChild(createTracks);
    console.log(registerData.nameTracks[t].name);
  }
}

function createRegisterDataToDataBase() {
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

  const dataDisc = {
    album: dataToDataBase[0].nameAlbum,
    artist: dataToDataBase[0].nameArtist,
    release_year: dataToDataBase[0].dateAlbum,
    img: dataToDataBase[0].imgAlbum,
    vynil_type: selectedVinilType,
    album_type: selectedAlbumType,
    genre: selectedGender,
    length: dataToDataBase[0].durationTracks,
    disc_status: selectedStatus,
    disc_description: descriptionVinil.value,
  };

  if (!dataDisc.disc_description == "" ) {
    fetch("http://localhost:8000/user/disc", {
        method: "POST",
        body: JSON.stringify(dataDisc),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
  }
  

 
}
