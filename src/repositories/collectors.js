const db = require('./index');

// user infos
/*
    required:
    name, email, password

    optional
    cpf, picture, about

    address:
    street, number, city, state, zip

    phone
*/

// user register info
    //name, email, password, user type

async function getUser(email){
    const text = `SELECT * FROM users where email = $1`;
    
    try{
        const dbRes = await db.query(text, [email]);
        if (dbRes.rowCount === 0) throw 'Usuário não encontrado';
        return {error: null, result: dbRes.rows[0]};
    }catch(err){
        return {error: err, result: null};
    }
}
async function register(userInfo){

    const values = [userInfo.name, userInfo.email, userInfo.password, userInfo.type];
    const text = `
        INSERT INTO users (name, email, password, user_type)
        values ($1, $2, $3, $4)
    `
    try{
        const dbRes = await db.query(text, values);
        return {error: null, result: 'user registration successful'}
    }catch(err){
        return {error: err, result: null};
    }

}

// função para retornar senha de usuário passado
async function login(email){

    const values = [email];
    const text = `SELECT password FROM users WHERE email = $1`

    try {
        const dbRes = await db.query(text, values);
        return {error: null, result: dbRes.rows[0].password};
    }catch(err){
        return {error: err, result: null};
    }

}

async function remove(email){

    const now = new Date();
    const values = [now, email];
    const text = `
        UPDATE users
        SET deleted_at = $1
        WHERE email = $2
    `;

    try {
        const dbRes = await db.query(text, values);
        if (dbRes.rowCount === 0) throw 'Usuário não encontrado';
        return {error: null, result: 'Usuário deletado'};
    }catch (err){
        return {error: err, result: null};
    }
}

async function alter(email, infos){
    const columns = Object.keys(infos);
    const values = Object.values(infos);
    values.push(new Date());
    values.push(email);

    //fazendo a string do SET 
    for (let i in columns){
        columns[i] += ` = $` + (parseInt(i) + 1);
    }
    columns.push(`updated_at = $${columns.length + 1}`);

    const text = `
        UPDATE users
        SET ${columns.toString()}
        WHERE email = $${columns.length + 1}
    `

    try {
        const dbRes = await db.query(text, values);
        console.log('dbRes:')
        console.log(dbRes);
        if (dbRes.rowCount === 0) throw 'Usuário não encontrado';
        return {error: null, result: 'Usuário alterado com sucesso'};
    }catch (err){
        return {error: err, result: null};
    }

}
module.exports = {register, login, remove, alter, getUser};