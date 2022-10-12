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
    'disc_description', 'disc_status','genre'
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
async function registerUserDisc(userId, discInfos, discsImgs) {
    try {
        // Validações
        if (!userId) throw "Id de usuário necessário";

        const missingData = validateDiscInfos(discInfos);
        if (missingData) throw missingData;

        //dados validados, passar para a requisição ao banco
        const registration = await discsdb.postDisc(discInfos, userId);
        if (registration.error) throw registration.error;

        //salvando nome das imagens no banco
        const discId = registration.result.rows[0].id;
        const discsImgsArray = [];
        discsImgs.forEach((element) => {
            discsImgsArray.push(element.filename);
        })
        await discsdb.postDiscImg(discId,discsImgsArray)


        return {error: null, result: registration.result.rows};
    }catch(err){
        // caso encontre erro
        return { error: err, result: null };
    }
}

async function userDiscs(userId, offset = 0) {
    try {
        //retorno de dados
        const discsRes = await discsdb.selectUserDiscs(userId, offset);
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

async function getUserDisc(userId, albumName){
    try {
        // validações
        if (!albumName) throw "Necessário informar nome do album";
        //retorno de dados
        const discRes = await discsdb.getUserDiscByAlbum(albumName, userId);

        // validações
        if (discRes.error) throw discRes.error;
        if (discRes.result.rowCount === 0) throw "Disco não encontrado";

        return { error: null, result: discRes.result.rows[0] };
    } catch (err) {
        return { error: err, result: null };
    }
}

async function getAllDiscs(offset) {
    try {
        const discsRes = await discsdb.getAllDiscs(offset);
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

async function deleteDisc(discId){
    if (!discId) return "ID de disco necessário";

    try{
        const deleteRes = await discsdb.remove(discId);
        if(deleteRes.error) throw filter.error;

        if (deleteRes.result.rowCount === 0) throw 'Disco não encontrado';
        return {error: null, result: 'Disco deletado'};
    }catch(err){
        return {error: err, result: null};
    }
}


async function filter(filterInfo, offset = 0){
    try{
        //validando colunas
        const columns = Object.keys(filterInfo);
        if(!columns) throw 'Informar filtro';
        const invalidAtribute = validateAtributes(filterInfo);
        if(invalidAtribute) return 'Atributo inválido';

        //Validando dados de tempo se existirem;
        if (filterInfo.release_year){
            if(filterInfo.release_year.length !== 2) throw 'Filtro por lançamento espera intervalo'
        }
        //Validando constraints
        for (let constraint of ['vynil_type', 'disc_status', 'album_type']){

            const invalidConstraint = checkConstraint(constraint, filterInfo[constraint])
            if (invalidConstraint) return invalidConstraint;
        }

        //removendo espaço em branco e adicionando % para pegar padrão
        for (let fil in filterInfo){
            if (fil !== 'release_year'){
                for (let i in filterInfo[fil]){
                    filterInfo[fil][i] ='%' + filterInfo[fil][i].trim().toUpperCase() + '%'
                }
            }
        }
        //fazendo filtro
        const filter = await discsdb.filterOr(filterInfo, offset);
        if (filter.error) throw filter.error;

        return {error: null, result: filter.result.rows};
    }catch(err){
        return {error: err, result: null};
    }
}

async function deleteDisc(discId){
    if (!discId) return "ID de disco necessário";

    try{
        const deleteRes = await discsdb.remove(discId);
        if(deleteRes.error) throw filter.error;

        if (deleteRes.result.rowCount === 0) throw 'Disco não encontrado';
        return {error: null, result: 'Disco deletado'};
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
    filter,
    deleteDisc,
    getUserDisc
};