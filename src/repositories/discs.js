const db = require("./index");

// CREATE TABLE discs (
//   id serial NOT NULL PRIMARY KEY,
//   user_id integer NOT NULL REFERENCES users(id),
//   album varchar(100) NOT NULL,
//   artist varchar(100) NOT NULL,
//   release_year integer NOT NULL,
//   img text,
//   vynil_type varchar(100),
//   album_type varchar(100),
//   length time,
//   disc_description text,
//   disc_status varchar(50),
//   created_at timestamptz DEFAULT now(),
//   updated_at timestamptz,
//   deleted_at timestamptz
// );
// ALTER TABLE discs ADD CONSTRAINT vynil_type_check CHECK (vynil_type IN ('transparent', 'matte', 'glossy', 'color', 'metallic'));
// ALTER TABLE discs ADD CONSTRAINT album_type_check CHECK (album_type IN ('single', 'ep', 'lp'));
// ALTER TABLE discs ADD CONSTRAINT disc_status_check CHECK (disc_status IN ('available to trade', 'wishlist', 'own'));

// DROP TABLE IF EXISTS music_genre_list;
// CREATE TABLE music_genre_list (
//   genre varchar(20) NOT NULL,         -- import from foreign api
//   album_id integer NOT NULL REFERENCES discs(id)
// );
// ALTER TABLE music_genre_list ADD CONSTRAINT music_genre_list_pk PRIMARY KEY (genre, album_id);

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
        disc_description: infos.disc_status || null,
        disc_status: infos.disc_status || null,
    };
    //extraindo dados para variáveis
    const values = Object.values(discInfos);
    const columns = Object.keys(discInfos);

    //construindo o texto com as colunas retiradas do objeto
    const text = `
        INSERT INTO discs (${columns.toString('')})
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
    `
    try{
        const dbRes = await db.query(text, values);
        return {error: null, result: dbRes}
    }catch(err){
        return {error: err, result: null};
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
        disc_status: infos.disc_status || null
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


const selectUserDiscs = async (userId) => {
    const text = `
        SELECT discs.*, string_agg(music_genre_list.genre, ',') AS genre
        FROM discs
        LEFT JOIN music_genre_list ON music_genre_list.album_id = discs.id
        WHERE user_id = $1
        GROUP BY discs.id
    `;

    try {
        const dbRes = await db.query(text, [userId]);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
};

const getDisc = async (discId) => {
    const text = `
        SELECT discs.*, string_agg(music_genre_list.genre, ',') AS genre
        FROM discs
        LEFT JOIN music_genre_list ON music_genre_list.album_id = discs.id
        WHERE id = $1
        GROUP BY discs.id
    `
    try{
        const dbRes = await db.query(text, [discId]);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
};

const getAllDiscs = async () => {
    const text = `
        SELECT * FROM discs
    `;

    try {
        const dbRes = await db.query(text);
        return { error: null, result: dbRes };
    } catch (err) {
        return { error: err, result: null };
    }
};

// genre is a vector
const setGenre = async (discId, genre) => {
    //fazendo a extrutura de vetores;
    let values = [];
    for (let i in genre){
        i++
        values.push(`(${discId}, $${i})`);
    };

    const text = `
        INSERT INTO music_genre_list (album_id, genre)
        VALUES ${values.toString()};
    `
    try{
        const dbRes = await db.query(text, genre);
        return {error: null, result: dbRes};

    }catch(err){
        return {error: err, result: null};
    }
}

const genreFilter = async (genre) => {
    let conditions = [];
    for (let i in genre){
        i++
        conditions.push(`(UPPER(genre) = UPPER($${i}))`);
    };

    const text = `
        SELECT DISTINCT discs.*, music_genre_list.genre
        FROM discs
        LEFT JOIN music_genre_list ON music_genre_list.album_id = discs.id
        WHERE ${conditions.join(' OR ')} ;
    `
    try{
        const dbRes = await db.query(text, genre);
        return {error: null, result: dbRes};
    }catch(err){
        return {error: err, result: null};
    }
}

const filterOr = async (filterInfo) => {
    console.log(filterInfo)
    let conditions = []
    let values = []
    let param = 1;
    // constructing conditions
    for (atribute in filterInfo){
        values.push(... filterInfo[atribute]);
        for (let i in filterInfo[atribute]){
            conditions.push(`(UPPER(${atribute}) = UPPER($${param}))`);
            param++
        };
    }

    const text = `
        SELECT DISTINCT discs.*, string_agg(music_genre_list.genre, ',') AS genre
        FROM discs
        LEFT JOIN music_genre_list ON music_genre_list.album_id = discs.id
        WHERE deleted_at is null AND ${conditions.join(' OR ')}
        GROUP BY discs.id
    `
    console.log(text);
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
    setGenre,
    updateDisc,
    genreFilter,
    filterOr
};
