const db = require("./index");

async function completeFancy(exchangeId, avaliation){
    const {rate, text} = avaliation; 
    const client = await db.getClient();
    try{
        await client.query('BEGIN');
        // get exchange infos
        const exchangeText = `
            SELECT exchange.*, exchange_disc_list.disc_id FROM exchange_disc_list
            INNER JOIN exchange ON exchange.id = exchange_disc_list.exchange_id
            WHERE exchange_id = $1;
        `
        const exchange = (await client.query(exchangeText,[exchangeId])).rows;
        const userFrom = exchange[0].user_from;
        const userTo = exchange[0].user_to;
        //changing exchange status
        // const statusText = `
        //     UPDATE exchange
        //     SET status = 'complete'
        //     WHERE id = $1
        // `;
        // await client.query(statusText,[exchangeId]);

        //getting discs infos; changing info owner
        const discText = `
            SELECT * FROM discs
            WHERE id = $1;
        `
        const deleteText = `
            UPDATE discs
            SET deleted_at = $1
            WHERE id = $2
        `;

        
        for (let item of exchange){
            const disc = (await client.query(discText, [item.disc_id])).rows[0];
            delete disc.created_at;
            delete disc.deleted_at;
            delete disc.updated_at;
            delete disc.id;
            // deleting discs
            await client.query(deleteText, [new Date(), item.disc_id]);
            const isFrom = disc.user_id === userFrom;
            disc.user_id = (isFrom) ? userTo : userFrom; 

            //creating discs
            const values = Object.values(disc);
            const columns = Object.keys(disc);
            const createDiscText = `
                INSERT INTO discs (${columns.toString('')})
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING id
            `
            const newDiscId = await client.query(createDiscText,[values]);

            //geting disc genres
            const genresText = `
                SELECT 
            `
        }

        //creating avaliation
        const avaliationQueryText = `
            INSERT INTO avaliations (user_id, rate, description, exchange_id, created_at)
            VALUES ($1, $2, $3, $4, $5)
        `

        await client.query('COMMIT');
        return {error:null, result: 'Complete'};
    }catch(err){
        await client.query('ROLLBACK');
        return {error:err, result: null};
    }finally{
        client.release();
    }
};

async function complete(exchangeId, avaliation){
    const client = await db.getClient();
    try{
        await client.query('BEGIN');
        // get exchange infos
        const exchangeText = `
            SELECT exchange.*, exchange_disc_list.disc_id FROM exchange_disc_list
            INNER JOIN exchange ON exchange.id = exchange_disc_list.exchange_id
            WHERE exchange_id = $1;
        `
        const exchange = (await client.query(exchangeText,[exchangeId])).rows;
        const userFrom = exchange[0].user_from;
        const userTo = exchange[0].user_to;
        //changing exchange status
        const statusText = `
            UPDATE exchange
            SET status = 'complete'
            WHERE id = $1
        `;
        await client.query(statusText,[exchangeId]);

        //altering discId
        const alterOwnerText = `
            UPDATE discs
            SET user_id = $1
            WHERE id = $2
        `
        const discText = `
            SELECT * FROM discs
            WHERE id = $1;
        `
        for (let item of exchange){
            const discId = item.disc_id;
            const disc = (await client.query(discText, [discId])).rows[0];
            const newOwner = (disc.user_id == userFrom)? userTo : userFrom;
            await client.query(alterOwnerText, [newOwner, discId]);
        }

        //creating avaliation
        const avaliationQueryText = `
            INSERT INTO avaliations (user_id, rate, description, exchange_id, created_at)
            VALUES ($1, $2, $3, $4, $5)
        `
        for (let user of avaliation){
            const ratingUser = user.id;
            const text = user.text;
            const rate = user.rate;
            const values = [ratingUser, rate, text, exchangeId, new Date()]
            await client.query(avaliationQueryText, values)
        }

        await client.query('COMMIT');
        return {error:null, result: 'Complete'};
    }catch(err){
        await client.query('ROLLBACK');
        return {error:err, result: null};
    }finally{
        client.release();
    }

}
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
async function userInactiveExchanges(userId){
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
        WHERE user_from = $1 AND NOT (status = 'pending_approval' OR status = 'pending_exchange');
    `

    try{
        const exchangesRes = await db.query(text,[userId]);
        return {error: null, result: exchangesRes};
    }catch(err){

        return {error: err, result: null}
    }

};
async function allInactiveExchanges(userId){
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
        WHERE NOT (status = 'pending_approval' OR status = 'pending_exchange');
    `

    try{
        const exchangesRes = await db.query(text,[userId]);
        return {error: null, result: exchangesRes};
    }catch(err){

        return {error: err, result: null}
    }

};
async function allActiveExchanges(userId){
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
        WHERE (status = 'pending_approval' OR status = 'pending_exchange');
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

async function getUnformatedExchange(exchangeId){
    const text = `
        SELECT * FROM exchange
        WHERE id = $1;
    `;
    try{
        const exchangesRes = await db.query(text,[exchangeId]);
        return {error: null, result: exchangesRes};
    }catch(err){

        return {error: err, result: null}
    }
}
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
        SET status = 'cancelled'
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
    userInactiveExchanges,
    allInactiveExchanges,
    allActiveExchanges,
    getExchange,
    accept,
    reject,
    cancel,
    complete,
    getUnformatedExchange
}