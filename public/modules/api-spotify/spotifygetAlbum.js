import { getSpotifyToken } from "./spotifyToken.js";

export async function spotifyGetAlbum(artistAlbum) {
  const tokenSpotify = await getSpotifyToken();

  const urlSpotifyAlbum = `https://api.spotify.com/v1/search?q=${artistAlbum}&type=album&limit=50`;

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
      console.log(albums.albums.items[i].name);
    }
  } catch (error) {
    console.log(error);
  }
}
