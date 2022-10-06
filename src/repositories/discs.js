const db = require('./index');

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

const postDisc = async (infos,userId) => {
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
        disc_status: infos.disc_status || null
    }
    //extraindo dados para variáveis
    const values = Object.values(discInfos);
    const columns = Object.keys(discInfos);

    //construindo o texto com as colunas retiradas do objeto
    const text = `
        INSERT INTO discs (${columns.toString('')})
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `
    try{
        const dbRes = await db.query(text, values);
        return {error: null, result: 'disc registration successful'}
    }catch(err){
        return {error: err, result: null};
    }
}

const selectUserDiscs = async (userId) => {
    const text = `
        SELECT * FROM discs
        WHERE user_id = $1
    `;

    try{
        const dbRes = await db.query(text,[userId]);
        return {error: null, result: dbRes};

    }catch(err){
        return {error: err, result: null};
    }
}

const getDisc = async (discId) => {
    const text = `
        SELECT * FROM discs
        WHERE id = $1
    `
    try{
        const dbRes = await db.query(text, [discId]);
        return {error: null, result: dbRes};

    }catch(err){
        return {error: err, result: null};
    }
}

module.exports = {postDisc, selectUserDiscs, getDisc};
