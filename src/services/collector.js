const collector = require('../repositories/collectors');

async function deleteCollector(email) {
    try{
        const userRes = await collector.getUser(email);
        if (userRes.error) throw userRes.error;
        const user = userRes.result;
        if (user.deleted_at) throw 'Usuário já esta deletado';

        const removeRes = await collector.remove(email);
        if (removeRes.error) throw removeRes.error;

        return {error: null, result: 'Usuário deletado'}
    }catch(err){
        return {error: err, result: null};
    }
}

async function updateCollector(email,userInfos){
    try{
        const userRes = await collector.getUser(email);
        if(userRes.error) throw userRes.error;
        const user = userRes.result;
        if (user.deleted_at) throw 'Usuário deletado';
        
        const alterRes = await collector.alter(email, userInfos);
        if (alterRes.error) throw alterRes.error;

        return {error: null, result: 'Usuário alterado'};
    }catch(err){
        return {error: err.message, result: null};
    }
}

async function getCollector(email) {
    try{
        const userRes = await collector.getUser(email);
        if(userRes.error) throw userRes.error;

        return {error: null, result: userRes.result};
    }catch(err){
        return {error: err, result: null};
    }
}
module.exports = {deleteCollector, updateCollector, getCollector};