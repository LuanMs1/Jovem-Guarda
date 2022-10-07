const discsdb = require("../repositories/discs");
// user_id: userId,
//         album: infos.album,
//         artist: infos.artist,
//         release_year: infos.release_year
const discColumns = [
    'user_id', 'album', 
    'artist', 'release_year', 
    'img', 'vynil_type', 
    'album_type', 'length', 
    'disc_description', 'disc_status'
]

function validateDiscInfos(infos) {
    if (!infos?.album) return "Nome do album necessário";
    if (!infos?.artist) return "Nome do artista necessário";
    if (!infos?.release_year) return "Data de lançamente necessária";
}

function validateAtributes(infos) {
    const infomedAtributes = Object.keys(infos);
    for (element of infomedAtributes){
        if(!discColumns.includes(element)) return 'Atributo inválido';
    };
}

function checkConstraint(atribute,value){
    if (!value) return;
    let allowed;
    switch (atribute){
        case 'vynil_type':
            allowed = ['transparent', 'glossy', 'matte', 'collor', 'metallic'];
            if (!allowed.includes(value)) return 'Tipo de vynil inválido';
            break;

        case 'disc_status':
            allowed = ['own', 'available to trade', 'wishlist'];
            if (!allowed.includes(value)) return 'Status de disco inválido';
            break;
        case 'album_type':
            allowed = ['single', 'ep', 'lp'];
            if (!allowed.includes(value)) return 'Tipo de album inválido';
            break;
    }
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

        return {error: null, result: registration.result.rows};
    }catch(err){
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

async function setDiscGenre(discId, genre){
    try{        
        if (!genre) throw {error: 'Informar gênero', result: null};
        if (!discId) throw {error: 'Informar ID de disco', result: null};

        const discRes = await discsdb.setGenre(discId, genre);
        if (discRes.error) throw discRes.error;
        
        return {error: null, result: 'Gênero cadastrado'};
    }catch(err){
        return {error: err, result: null};
    }
}

async function putDisc (infos, discId){
    try{
        // Validações
        if (!discId) throw 'Id de disco necessário';
        // console.log(infos);
        const missingData = validateDiscInfos(infos);
        if (missingData) throw missingData;

        //dados validados, passar para a requisição ao banco
        const registration = await discsdb.updateDisc(infos, discId);
        if (registration.error) throw registration.error;

        return {error: null, result: registration.result.rows};
    }catch(err){
        // caso encontre erro
        return {error: err, result: null};
    }
}

async function filterByGenre (genre){
    try{
        if (!genre) return 'Necessário designar generos';

        const filter = await discsdb.genreFilter(genre);
        if (filter.error) throw filter.error;

        return {error: null, result: filter.result.rows};
    }catch(err){
        return {error: err, result: null};
    }
}

async function filter(filterInfo){
    try{
        const columns = Object.keys(filterInfo);
        if(!columns) throw 'Informar filtro';
        const invalidAtribute = validateAtributes(filterInfo);
        if(invalidAtribute) return 'Atributo inválido';
        //Validando constraints
        const invalidVynilType = checkConstraint('vynil_type', filterInfo.vynil_type)
        if (invalidVynilType) return invalidVynilType;

        const invalidDiscStatus = checkConstraint('disc_status', filterInfo.disc_status);
        if (invalidDiscStatus) return invalidDiscStatus;

        const invalidAlbumType = checkConstraint('album_type', filterInfo.disc_status);
        if  (invalidAlbumType) return invalidAlbumType;

        //fazendo filtro
        const filter = await discsdb.filterOr(filterInfo);
        if (filter.error) throw filter.error;

        return {error: null, result: filter.result.rows};
    }catch(err){
        return {error: err, result: null};
    }
}

module.exports ={
    registerUserDisc, 
    userDiscs, 
    getDisc, 
    getAllDiscs, 
    setDiscGenre,
    putDisc,
    filterByGenre,
    filter
};