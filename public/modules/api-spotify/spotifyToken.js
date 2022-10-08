const clientId = "fcb21b6cbb634ff88f9ed27042c09d38";
const clientSecret = "4ce4b833e6a248c99de6b89c954bb6ec";

const urlSpotifyToken = (id, secret) =>
  `https://accounts.spotify.com/api/token?grant_type=client_credentials&client_id=${id}&client_secret=${secret}`;

export async function getSpotifyToken() {
  try {
    const res = await fetch(urlSpotifyToken(clientId, clientSecret), {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    });

    const { access_token, token_type } = await res.json();
    return `${token_type} ${access_token}`;
  } catch (error) {
    console.log(error);
  }
}
