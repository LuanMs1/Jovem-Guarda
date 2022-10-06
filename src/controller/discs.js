const services = require('../services/discs');

const postDisc = async (req,res) => {
    const userId = req.user.id;
    const discInfos = req.body;
    if (req.file){
        discInfos.img = req.file.filename;
    }

    try{
        // chamada de serviço, retorna um {error: , response: }
        const discRes = await services.registerUserDisc(userId, discInfos);

        // checa por erro, e manda para o catch
        if(discRes.error) throw discRes.error;
        return res.status(201).json();

    }catch(err){
        if(err === 'Nome do album necessário') return res.status(400).json({message: err});
        if(err === 'Nome do artista necessário') return res.status(400).json({message: err});
        if(err === 'Data de lançamente necessária') return res.status(400).json({message: err});

        //caso o erro não bata com nenhum erro esperado, envia erro de servidor
        return res.status(500).json({message: err});
    }

}

const getDisc = async (req, res) => {
    const discId = req.param.id;

    try{
        const discRes = await services.getDisc(discId);
        if (discRes.error) throw discRes.error;
    }catch(err){

        return res.status(500).json({message: err})
    }
}

module.exports = {postDisc, getDisc};