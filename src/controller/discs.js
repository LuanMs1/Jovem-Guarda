const { json } = require('express');
const services = require('../services/discs');

const postDisc = async (req,res) => {
    const userId = req.user.id;
    const discInfos = req.body;
    //discGenres 
    const discGenres = discInfos.genre;

    if (req.file){
        discInfos.img = req.file.filename;
    }

    try{
        // chamada de serviço, retorna um {error: , response: }
        const discRes = await services.registerUserDisc(userId, discInfos);
        // checa por erro, e manda para o catch
        if(discRes.error) throw discRes.error;
        
        if (discGenres) {
            const discId = discRes.result[0].id;
            const genreRes = await services.setDiscGenre(discId, discGenres);
            if(genreRes.error) throw genreRes.error;
        }

        return res.status(201).json();

    }catch(err){
        // pesquisar middleware para tratamento de erros do nodejs
        // https://masteringjs.io/tutorials/express/error-handling
        if(err === 'Nome do album necessário') return res.status(400).json({message: err});
        if(err === 'Nome do artista necessário') return res.status(400).json({message: err});
        if(err === 'Data de lançamente necessária') return res.status(400).json({message: err});

        //caso o erro não bata com nenhum erro esperado, envia erro de servidor
        console.log(err);
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

const updateDisc = async (req, res) => {
    const discId = req.params.id;
    const discInfos = req.body;
    const discGenres = discInfos.genre;

    try{
        const discRes = await services.putDisc(discInfos, discId);
        if (discRes.error) throw discRes.error;

        if (discGenres) {
            const discId = discRes.result[0].id;
            const genreRes = await services.setDiscGenre(discId, discGenres);
            if(genreRes.error) throw genreRes.error;
        }

        return res.status(200).json({message: 'disco alterado'});

    }catch(err){
        if(err === 'Nome do album necessário') return res.status(400).json({message: err});
        if(err === 'Nome do artista necessário') return res.status(400).json({message: err});
        if(err === 'Data de lançamente necessária') return res.status(400).json({message: err});

        // caso nenhum erro previsto ocorra
        console.log(res);
        return res.status(500).json({message: err});
        
    }
}

const genreFilter = async (req, res) => {
    const genre = req.body.genre;

    try{
        const filterRes = await services.filterByGenre(genre);
        if (filterRes.error) throw filterRes.error;

        return res.status(200).json(filterRes.result);
    }catch(err){
        if (err === 'Necessário designar generos') return res.status(400).json({message: err});

        console.log(err);
        return res.status(500).json({message: err})
    }

}

module.exports = {postDisc, getDisc, updateDisc, genreFilter};