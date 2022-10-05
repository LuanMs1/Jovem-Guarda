const discsdb = require('../repositories/discs');
// user_id: userId,
//         album: infos.album,
//         artist: infos.artist,
//         release_year: infos.release_year
function validateDiscInfos(infos) {
    if(!infos?.album) return 'Nome do album necessário';
    if(!infos?.artist) return 'Nome do artista necessário';
    if(!infos?.release_year) return 'Data de lançamente necessária';
}
async function registerUserDisc(userId, discInfos){

    try{
        // Validações
        if (!userId) throw 'Id de usuário necessária';

        const missingData = validateDiscInfos(discInfos);
        if (missingData) throw missingData;

        //dados validados, passar para a requisição ao banco
        const registration = await discsdb.postDisc(discInfos, userId);
        if (registration.error) throw registration.error;

        return {error: null, result: 'Disco cadastrado'};
    }catch(err){
        // caso encontre erro
        return {error: err, result: null};
    }
}

module.exports ={registerUserDisc}