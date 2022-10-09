import { getSpotifyToken } from "./spotifyToken.js";

const listAlbums = document.getElementById("list-albums");

const selectAlbuns = document.getElementById("select-albums");

listAlbums.addEventListener(
  "keyup",
  debounce(function () {
    const listAlbumsValue = listAlbums.value;
    spotifyGetAlbum(listAlbumsValue);
  }, 2000)
);

function debounce(func, wait) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(func, wait);
  };
}

export async function spotifyRegisterDB(artistName) {
  const tokenSpotify = await getSpotifyToken();

  const urlSpotifyArtist = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=50`;

  try {
    const res = await fetch(urlSpotifyArtist, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${tokenSpotify}`,
      },
    });

    const albums = await res.json();
    const createSelect = document.createElement("select");

    for (let i = 0; i < albums.albums.items.length; i++) {
      if (albums.albums.items[i].album_type == "album") {
        const createOption = document.createElement("option");
        createSelect.setAttribute(
          "size",
          `${albums.albums.items[i].album_type.length}`
        );
        createSelect.classList.add("select-albums");
        createOption.innerHTML = `${albums.albums.items[i].name}`;
        console.log(listAlbums.appendChild(createSelect));
        selectAlbuns.appendChild(createSelect);
        createSelect.appendChild(createOption);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
