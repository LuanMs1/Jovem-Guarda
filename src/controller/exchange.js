const services = require('../services/exchange');

async function proposeExchange(req,res) {
    const userFrom = req.user.id;
    const {discsFrom, discsTo} = req.body;

    try{
        const propose = await services.exchangeProposal(userFrom, discsFrom, discsTo);
        if (propose.error) throw propose.error;

        return res.status(201).json();
    }catch(err){
        if (err === 'Discos oferecidos não pertencente à usuario') return res.status(400).json({message:err});
        if (err === 'Discos pedidos devem pertencer ao mesmo usuário') return res.status(400).json({message: err});
        if (err === 'Disco não encontrado') return res.status(400).json({message: err});
        if (err === 'Necessário informar ID') return res.status(400).json({message: 'Necessário informar ID do disco'});
        if (err === 'Necessário propor discos') return res.status(400).json({message: err});
        if (err === 'Necessário pedir discos') return res.status(400).json({messge: err});

        // erro não esperado
        return res.status(500).json({message: err.message});
    }
}

async function userActiveExchanges(req,res){
    const userId = req.user.id;
    try{
        const exchangesRes = await services.userActiveExchanges(userId);
        if (exchangesRes.error) throw exchangesRes.error;
        
        return res.status(200).json(exchangesRes.result);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

async function userInactiveExchanges(req,res){
    const userId = req.user.id;
    try{
        const exchangesRes = await services.userInactiveExchanges(userId);
        if (exchangesRes.error) throw exchangesRes.error;
        
        return res.status(200).json(exchangesRes.result);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}
async function getExchange(req,res){
    const exchangeId = req.params.id;
    try{
        const exchangesRes = await services.getExchange(exchangeId);
        if (exchangesRes.error) throw exchangesRes.error;
        
        return res.status(200).json(exchangesRes.result);
    }catch(err){
        if (err === 'Troca não existe') return res.status(404).json({message: err});
        return res.status(500).json({message: err.message});
    }
}

async function accept(req,res){
    const exchangeId = req.params.id;
    const userId = req.user.id;
    try{
        const exchangeRes = await services.acceptExchange(exchangeId,userId);
        if (exchangeRes.error) throw exchangeRes.error;

        return res.status(201).json();
    }catch(err){
        if (err === 'Troca não existe') return res.status(404).json({message: err});
        if (err === 'Aprovação não pendente') return res.status(400).json({message: err});
        if (err === 'Usuário não é dono da troca') return res.status(400).json({message: err});

        return res.status(500).json({message: err.message});
    }
}

async function reject(req,res){
    const exchangeId = req.params.id;
    const userId = req.user.id;
    try{
        const rejectRes = await services.rejectExchange(exchangeId,userId);
        if (rejectRes.error) throw rejectRes.error;

        return res.status(201).json();
    }catch(err){
        if (err === 'Troca não existe') return res.status(404).json({message: err});
        if (err === 'Aprovação não pendente') return res.status(400).json({message: err});
        if (err === 'Usuário não é dono da troca') return res.status(400).json({message: err});

        return res.status(500).json({message: err.message});
    }
};

async function cancel(req,res){
    const exchangeId = req.params.id;
    const userId = req.user.id;
    try{
        const cancelRes = await services.cancelExchange(exchangeId, userId);
        if (cancelRes.error) throw cancelRes.error;

        return res.status(201).json();
    }catch(err){
        if (err === 'Troca não existe') return res.status(404).json({message: err});
        if (err === 'Troca não esta acontecendo') return res.status(400).json({message: err});
        if (err === 'Usuário não é dono da troca') return res.status(400).json({message: err});

        return res.status(500).json({message: err.message});
    }
};

async function complete(req,res){
    const exchangeId = req.params.id;
    const avaliations = req.body;
    const userId = req.user.id;

    try{
        const completeRes = await services.completeExchange(exchangeId,avaliations,userId);
        if (completeRes.error) throw completeRes.error;

        return res.status(201).json();
    }catch(err){
        if (err === 'Troca não esta acontecendo') res.status(404).json({message: err});
        if (err === 'Usuário não pertence à troca') res.status(403).json({message: err});
        if (err === 'Troca não está acontecento') res.status(400).json({message: err});
        if (err === 'Usuário já marcou a troca como completa') res.status(400).json({message: err});
        
        return res.status(500).json({message: err});
    }
}

module.exports = {
    proposeExchange,
    userActiveExchanges,
    userInactiveExchanges,
    getExchange,
    accept,
    reject,
    cancel,
    complete
};