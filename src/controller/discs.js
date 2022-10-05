const discs = require('../repositories/discs');
const validateData = (infos) => {
    if (!infos.album) return 'Nome de album necessário';
    if (!infos.artist) return 'Nome do artistia necessário';
}
const postDisc = async (req,res) => {
    const userId = req.user.id;
    const discInfos = req.body;


    try{

    }catch(err){
        return res.status(500).send(err);
    }

    return res.send('envio de disco');
}

module.exports = {postDisc}