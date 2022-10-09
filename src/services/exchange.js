const exchangedb = require('../repositories/exchange');
const discsdb = require("../repositories/discs");

// validations
async function checkDiscFromOwnership (userId, discIdList){
    for (let discId of discIdList){
        const disc = await discsdb.getDisc(discId);
        if (disc.result.rows[0].user_id !== userId){
            return 'Discos oferecidos não pertencente à usuario';
        };
    }
    return;
}

async function checkDiscsToOwnership(discsList){
    const firstDisc = await discsdb.getDisc(discsList[0]);
    const ownerId = firstDisc.result.rows[0].user_id;
    if (discsList.length === 1) return {error: null, result: ownerId};
    for (let i = 1; i < discsList.length; i++){
        const disc = await discsdb.getDisc(discsList[i]);
        const id = disc.result.rows[0].user_id;
        if (ownerId !== id) {
            return {error: 'Discos pedidos devem pertencer ao mesmo usuário', result: null};
        };
    return {error: null, result: ownerId};
    } 
}

async function exchangeProposal(userIdFrom, discsFromList, discsToList){
    try{
        //Checar se discos foram fornecidos
        if(!discsFromList || discsFromList?.length === 0 || !discsFromList.length) 
                throw "Necessário propor discos";

        if(!discsToList || discsToList?.length === 0 || !discsToList.length) 
                throw "Necessário pedir discos";

        //Checar se discos oferecidos pertencem à usuário logado
        const checkDiscsFrom = await checkDiscFromOwnership(userIdFrom, discsFromList)
        if (checkDiscsFrom) throw checkDiscsFrom;
        
        //Pegar o numero de id do usuário dono do disco requeridos e comparar 
        //se pertencem ao mesmo.
        const checkDiscsTo = await checkDiscsToOwnership(discsToList);
        if (checkDiscsTo.error) throw checkDiscsTo.error;
        const userIdTo = checkDiscsTo.result;
        const discs = [... discsToList, ... discsFromList];
        const exchangeTransaction = await exchangedb.exchangeProposal(userIdTo,userIdFrom, discs);
        if (exchangeTransaction.error) throw exchangeTransaction.error;
        return {error: null, result: 'Proposta feita'};
    }catch(err){

        return {error: err, result: null};
    }
};

async function userExchanges(userId){
    try{
        const exchangesRes = await exchangedb.userActiveExchanges(userId);
        if (exchangesRes.error) throw exchangesRes.error

        return {error: null, result: exchangesRes.result.rows};
    }catch(err){
        return {error: err, result: null};
    }
}
async function getExchange(exchangeId){
    try{
        const exchangeRes = await exchangedb.getExchange(exchangeId);
        if (exchangeRes.error) throw exchangeRes.error;
        const exchange = exchangeRes.result.rows;
        if (exchangeRes.result.rowCount === 0) throw 'Troca não existe'

        return {error: null, result: exchange};
    }catch(err){
        return {error: err, result: null};
    }
}
async function acceptExchange(exchangeId,userId){
    try{
        const exchangeRes = await exchangedb.getExchange(exchangeId);
        const exchangeStatus = exchangeRes.result.rows[0].status;
        const userOfering = exchangeRes.result.rows[0].user_from;
        if(userOfering !== userId) throw 'Usuário não é dono da troca'
        if(exchangeStatus !== 'pending_approval') throw 'Aprovação não pendente';
        

        const acceptRes = await exchangedb.accept(exchangeId);
        if (acceptRes.error) throw acceptRes.error;
        if (acceptRes.result.rowCount === 0) throw 'Troca não existe';

        return {error: null, result: 'Troca aceita'};
    }catch(err){
        return {error: err, result: null};
    }
};

async function rejectExchange(exchangeId, userId){
    try{
        const exchangeRes = await exchangedb.getExchange(exchangeId);
        const exchangeStatus = exchangeRes.result.rows[0].status;
        const userOfering = exchangeRes.result.rows[0].user_from;
        if(userOfering !== userId) throw 'Usuário não é dono da troca'
        if(exchangeStatus !== 'pending_approval') throw 'Aprovação não pendente';

        const rejectRes = await exchangedb.reject(exchangeId);
        if (rejectRes.error) throw rejectRes.error;
        if (rejectRes.result.rowCount === 0) throw 'Troca não existe';

        return {error: null, result: 'Troca aceita'};
    }catch(err){
        return {error: err, result: null};
    }
}

async function cancelExchange(exchangeId,userId){
    try{
        const exchangeRes = await exchangedb.getExchange(exchangeId);
        const exchangeStatus = exchangeRes.result.rows[0].status;
        const userOfering = exchangeRes.result.rows[0].user_from;
        if(userOfering !== userId) throw 'Usuário não é dono da troca'
        if(exchangeStatus !== 'pending_exchange') throw 'Troca não esta acontecendo';

        const cancelRes = await exchangedb.cancel(exchangeId);
        if (cancelRes.error) throw cancelRes.error;
        if (cancelRes.result.rowCount === 0) throw 'Troca não existe';

        return {error: null, result: 'Troca aceita'};
    }catch(err){
        return {error: err, result: null};
    }
};

module.exports = {
    exchangeProposal,
    userExchanges,
    getExchange,
    acceptExchange,
    rejectExchange,
    cancelExchange
}