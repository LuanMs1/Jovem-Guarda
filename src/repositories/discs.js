const db = require("./index");

const postDisc = async (infos, userId) => {
    const discInfos = {
        user_id: userId,
        album: infos.album,
        artist: infos.artist,
        release_year: infos.release_year,
        img: infos.img || null,
        vynil_type: infos.vynil_type || null,
        album_type: infos.album_type || null,
        length: infos.length || null,
        disc_description: infos.disc_description || null,
        disc_status: infos.disc_status || null,
        genre: infos.genre || null
    };
    //extraindo dados para variáveis
    const values = Object.values(discInfos);
    const columns = Object.keys(discInfos);

    //construindo o texto com as colunas retiradas do objeto
    const text = `
        INSERT INTO discs (${columns.toString('')})
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id;
    `
    try{
        const dbRes = await db.query(text, values);
        return {error: null, result: dbRes}
    }catch(err){
        // console.log('error disc:')
        // console.log(err);
        return {error: err, result: null};
    }
};

const postDiscImg = async (discId, discImgs) => {
    const valuesString = [];
    const values = [];
    let param = 0;

    for (let i = 1; i < (discImgs.length * 2) + 1; i+=2){
        valuesString.push(`($${i}, $${i+1})`);
        values.push(discId, discImgs[param]);
        param++;
    }

    const text = `
        INSERT INTO discs_img (disc_id, img)
        VALUES ${valuesString.toString()}
    `


    try{
        const resul = await db.query(text,values);
        return {error:null, result: 'inserted'};
    }catch(err){
        return{error: err, result: null};
    }
}

const updateDisc = async (infos, discId) => {
    const discInfos = {
        album: infos.album || null,
        artist: infos.artist || null,
        release_year: infos.release_year || null,
        img: infos.img || null,
        vynil_type: infos.vynil_type || null,
        album_type: infos.album_type || null,
        length: infos.length || null,
        disc_description: infos.disc_status || null,
        disc_status: infos.disc_status || null,
        genre: infos.genre || null
    }
    //extraindo dados para variáveis
    const values = Object.values(discInfos);
    const columns = Object.keys(discInfos);
    values.push(new Date());
    values.push(discId);
    
    //fazendo a string do SET 
    for (let i in columns){
        columns[i] += ` = $` + (parseInt(i) + 1);
    }
    columns.push(`updated_at = $${columns.length + 1}`);
    const text = `
        UPDATE discs    
        SET ${columns.toString()}
        WHERE id = $${columns.length + 1}
    `
    try{
        const dbRes = await db.query(text,values);
        return {error: null, result: dbRes};
    }catch(err){
        return {error: err, result: null};
    }
}


const selectUserDiscs = async (userId, offset = 0) => {
    offset *=15;

    const text = `
        SELECT discs.*, users.name AS owner
        FROM discs
        LEFT JOIN users ON users.id = discs.user_id
        WHERE user_id = $1 AND discs.deleted_at is NULL
        LIMIT 15 OFFSET $2
    `;
    console.log(text);

    try {
        const dbRes = await db.query(text, [userId, offset]);
        return { error: null, result: dbRes };
    } catch (err) {
        console.log(err)
        return { error: err, result: null };
    }
};

/**
 * 
 * @param {integer} discId 
 * @returns dbRes
 */
const getDisc = async (discId) => {

    const text = `
        SELECT discs.*, users.name, discs_img.img AS real_imgs
        FROM discs
        LEFT JOIN users ON users.id = discs.user_id
        LEFT JOIN discs_img ON discs_img.disc_id = discs.id
        WHERE discs.id = $1
    `
    
    try{
        const dbRes = await db.query(text, [discId]);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
};


const getUserDiscByAlbum = async (albumName, userId) => {
    const text = `
        SELECT discs.*, users.name
        FROM discs
        LEFT JOIN users ON users.id = discs.user_id
        WHERE user_id = $1 AND UPPER(album) = UPPER($2)
    `
    try{
        const dbRes = await db.query(text, [userId, albumName]);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
}
const getAllDiscs = async (offset = 0) => {
    offset *= 15;
    const text = `
        SELECT discs.*, users.name AS owner FROM discs
        INNER JOIN users ON users.id = discs.user_id
        WHERE discs.deleted_at is NULL
        LIMIT 15 OFFSET $1
    `;

    try {
        const dbRes = await db.query(text, [offset]);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
};
const getAllDiscsButOwners = async (ownerId, offset = 0) => {
    offset *= 15;
    const text = `
        SELECT discs.*, users.name AS owner FROM discs
        INNER JOIN users ON users.id = discs.user_id
        WHERE discs.deleted_at is NULL AND NOT (discs.user_id = $1)
        LIMIT 15 OFFSET $2
    `;

    try {
        const dbRes = await db.query(text, [ownerId,offset]);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
};

const remove = async(discId) => {
    const values = [new Date(), discId];
    const text = `
        UPDATE discs
        SET deleted_at = $1
        WHERE id = $2
    `;

    try{
        const dbRes = await db.query(text,values);
        return {error: null, result: dbRes};
    }catch(err){
        return {error: err, result: null};
    }
}

const filterOr = async (filterInfo, offset = 0) => {
    offset *= 15
    let values = []
    let conditionText = [];
    let param = 1;

    //pegando cada parametro para construir as condições da query
    for (atribute in filterInfo){
        let conditions = []

        // construindo o array de valores para query
        values.push(... filterInfo[atribute]);
        for (let i in filterInfo[atribute]){
            if (atribute === 'release_year') {
                //release_year usa intervalo de tempo
                conditions
                    .push(`(release_year BETWEEN $${param} AND $${param + 1})`);
                param += 2;
                break;
            }else{
                //parte da query para pesquisar por padrão fornecido
                conditions.push(`(UPPER(${atribute}) LIKE UPPER($${param}))`);
            }
            param++
        }
        // OR entre parametros de mesma chave
        conditionText.push(conditions.join(' OR '));
    }
    // AND para comparação entre chaves;
    conditionText = '(' + conditionText.join(') AND (') + ')';
    const text = `
        SELECT discs.*, users.name AS owner
        FROM discs
        LEFT JOIN users ON users.id = discs.user_id
        WHERE discs.deleted_at is NULL AND ${conditionText}
        LIMIT 15 OFFSET $${param}
    `
    values.push(offset);
    try{
        const dbRes = await db.query(text, values);
        return {error: null, result: dbRes};
    }catch(err){
        return {error: err, result: null};
    }
}
module.exports = {
    postDisc, 
    selectUserDiscs, 
    getDisc, 
    getAllDiscs,
    updateDisc,
    remove,
    filterOr,
    getUserDiscByAlbum,
    postDiscImg,
    getAllDiscsButOwners
};
