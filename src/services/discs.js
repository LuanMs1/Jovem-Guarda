const discsdb = require("../repositories/discs");
// user_id: userId,
//         album: infos.album,
//         artist: infos.artist,
//         release_year: infos.release_year
function validateDiscInfos(infos) {
  if (!infos?.album) return "Nome do album necessário";
  if (!infos?.artist) return "Nome do artista necessário";
  if (!infos?.release_year) return "Data de lançamente necessária";
}
async function registerUserDisc(userId, discInfos) {
  try {
    // Validações
    if (!userId) throw "Id de usuário necessário";

    const missingData = validateDiscInfos(discInfos);
    if (missingData) throw missingData;

    //dados validados, passar para a requisição ao banco
    const registration = await discsdb.postDisc(discInfos, userId);
    if (registration.error) throw registration.error;

    return { error: null, result: "Disco cadastrado" };
  } catch (err) {
    // caso encontre erro
    return { error: err, result: null };
  }
}

async function userDiscs(userId) {
  try {
    //retorno de dados
    const discsRes = await discsdb.selectUserDiscs(userId);
    if (discsRes.error) throw discsRes.error;
    return { error: null, result: discsRes.result.rows };
  } catch (err) {
    return { error: err, result: null };
  }
}

async function getDisc(discId) {
  try {
    // validações
    if (!discId) throw "Necessário informar ID";
    //retorno de dados
    const discRes = await discsdb.getDisc(discId);

    // validações
    if (discRes.error) throw discRes.error;
    if (discRes.result.rowCount === 0) throw "Disco não encontrado";

    return { error: null, result: discRes.result.rows[0] };
  } catch (err) {
    return { error: err, result: null };
  }
}

async function getAllDiscs() {
  try {
    const discsRes = await discsdb.getAllDiscs();
    if (discsRes.error) throw discsRes.error;

    return { error: null, result: discsRes.result.rows };
  } catch (err) {
    return { error: err, result: null };
  }
}

module.exports = { registerUserDisc, userDiscs, getDisc, getAllDiscs };
