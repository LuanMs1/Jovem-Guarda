import { getSpotifyToken } from "./spotifyToken.js";

export async function spotifyGetArtist(artistName) {
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

    const artists = await res.json();

    for (let i = 0; i < artists.artists.items.length; i++) {
      console.log(artists.artists.items[i]);
      console.log(artists.artists.items[i].name);
    }
  } catch (error) {
    console.log(error);
  }
}
