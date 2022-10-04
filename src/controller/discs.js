const { query } = require('../repositories');

//validação de campos obrigatórios
function validateData(body) {
  if (!body.album) return "O campo 'album' deve ser informado.";
  if (!body.artist) return "O campo 'artist' deve ser informado.";
  if (!body.img) return "O campo 'img' deve ser informado.";
  if (!body.vynil_type) return "O campo 'vynil_type' deve ser informado.";
  if (!['transparent', 'matte', 'glossy', 'color', 'metallic'].includes(body.vynil_type)) return "O valor 'vynil_type' informafo é inválido.";
  if (!body.album_type) return "O campo 'album_type' deve ser informado.";
  if (!['single', 'ep', 'lp'].includes(body.album_type)) return "O valor 'album_type' informado é inválido.";
  if (!body.length) return "O campo 'length' deve ser informado.";
  if (!body.disc_description) return "O campo 'disc_description' deve ser informado.";
  if (!body.disc_status) return "O campo 'disc_status' deve ser informado.";
  if (!['available to trade', 'wishlist', 'own'].includes(body.disc_status)) return "O valor 'disc_status' informado é inválido.";
  if (!body.genre) return "O campo 'genre' deve ser informado.";
}

const getAllDiscs = async (req, res) => {
  try {
    const discs = await query(`SELECT * FROM discs`);
    return res.status(200).json(discs.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

const getMyDiscs = async (req, res) => {
  const user = req.user;

  try {
    const discs = await query(`SELECT * FROM discs WHERE user_id = $1`, [user.id]);
    return res.status(200).json(discs.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

const getUserDiscs = async (req, res) => {
  const { user_id } = req.params;

  try {
    const discs = await query(`SELECT * FROM discs WHERE user_id = $1`, [user_id]);
    return res.status(200).json(discs.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

const getDiscsByGenre = async (req, res) => {
  const { genre } = req.params;

  try {
    const discs = await query(`SELECT * FROM discs d INNER JOIN music_genre_list mg ON mg.genre = $1 AND mg.album_id = d.id`, [genre]);
    return res.status(200).json(discs.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

const getDiscsByArtist = async (req, res) => {
  const { artist } = req.params;

  try {
    const discs = await query(`SELECT * FROM discs WHERE artist = $1`, [artist]);
    return res.status(200).json(discs.rows);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

const getDiscDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const disc = await query('SELECT * FROM produtos WHERE id = $1', [id]);
    if (disc.rowCount === 0) return res.status(404).json({ mensagem: `Disco não encontrado` });

    return res.status(200).json(disc.rows[0]);
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

module.exports = {
  getMyDiscs,
  getUserDiscs,
  getAllDiscs,
  getDiscsByGenre,
  getDiscsByArtist,
  getDiscDetails
}