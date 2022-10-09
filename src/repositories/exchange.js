const db = require("./index");

async function exchangeProposal(userTo, userFrom, discs){
    const client = await db.getClient();
    try{
        await client.query('BEGIN');
        // inserting exchange
        const exchangeValues = [userTo, userFrom, new Date()];
        const exchangeText = `
            INSERT INTO exchange (user_to, user_from, requested_at)
            VALUES ($1, $2, $3)
            RETURNING id;
        `
        const exchange = await client.query(exchangeText, exchangeValues);
        const exchangeId = exchange.rows[0].id;
        
        //creating values string
        const valuesString = []
        for (let i in discs){
            i++;
            valuesString.push(`(${exchangeId}, $${i})`);
        };

        const discsText = `
            INSERT INTO exchange_disc_list (exchange_id, disc_id)
            VALUES ${valuesString.toString()};
        `
        await client.query(discsText, discs);        

        await client.query('COMMIT');
        return {error: null, result: 'Cadastrado'}
    } catch(err){
        await client.query('ROLLBACK');
        return {error: err, result: null}
    }finally{
        client.release();
    }
};

async function userActiveExchanges(userId){
    const text = `
        SELECT  exchange.id, exchange.status, userFrom.name As user_from, 
                userTo.name AS user_to, discs.album AS disc_name, 
                userOwner.name As disc_onwer, discs.img
        FROM exchange
        INNER JOIN users AS userFrom
            ON userFrom.id = exchange.user_from
        INNER JOIN users AS userTo
            ON userTo.id = exchange.user_to
        INNER JOIN exchange_disc_list ON exchange.id = exchange_disc_list.exchange_id
        INNER JOIN discs ON discs.id = exchange_disc_list.disc_id
        INNER JOIN users AS userOwner
            ON userOwner.id = discs.user_id
        WHERE user_from = $1 AND (status = 'pending_approval' OR status = 'pending_exchange');
    `

    try{
        const exchangesRes = await db.query(text,[userId]);
        return {error: null, result: exchangesRes};
    }catch(err){

        return {error: err, result: null}
    }

};

async function getExchange(exchangeId){
    const text = `
        SELECT  exchange.id, exchange.status, userFrom.name As user_from, 
                userTo.name AS user_to, discs.album AS disc_name, 
                userOwner.name As disc_onwer, discs.img
        FROM exchange
        INNER JOIN users AS userFrom
            ON userFrom.id = exchange.user_from
        INNER JOIN users AS userTo
            ON userTo.id = exchange.user_to
        INNER JOIN exchange_disc_list ON exchange.id = exchange_disc_list.exchange_id
        INNER JOIN discs ON discs.id = exchange_disc_list.disc_id
        INNER JOIN users AS userOwner
            ON userOwner.id = discs.user_id
        WHERE exchange.id = $1;
    `

    try{
        const exchangesRes = await db.query(text,[exchangeId]);
        return {error: null, result: exchangesRes};
    }catch(err){

        return {error: err, result: null}
    }
};

async function accept(exchangeId){
    const text = `
        UPDATE exchange
        SET status = 'pending_exchange'
        WHERE id = $1
    `
    try{
        const acceptRes = await db.query(text, [exchangeId]);
        return {error: null, result: acceptRes};
    }catch(err){
        return {error:err, result: null};
    }
};

async function reject(exchangeId){
    const text = `
        UPDATE exchange
        SET status = 'rejected'
        WHERE id = $1
    `
    try{
        const rejectRes = await db.query(text, [exchangeId]);
        return {error: null, result: rejectRes};

    }catch(err){
        return {error:err, result: null};
    }
};

async function cancel(exchangeId){
    const text = `
        UPDATE exchange
        SET status = 'canceled'
        WHERE id = $1
    `
    try{
        const rejectRes = await db.query(text, [exchangeId]);
        return {error: null, result: rejectRes};
        
    }catch(err){
        return {error:err, result: null};
    }
};
module.exports = {
    exchangeProposal,
    userActiveExchanges,
    getExchange,
    accept,
    reject,
    cancel
}