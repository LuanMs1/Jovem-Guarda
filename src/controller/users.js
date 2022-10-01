function uploadImg(req, res){
    const submitImg = require('../services/userImgUp');
    //O nome do arquivo sem a extensão para guardar no bd
    const fileCode = req.file.filename.split('.')[0];

    //informações de usuário fornecidas pelo front
    const userInfo = req.body;

    //por codigo do arquivo ao bd para referenciamento.
    // bdRes é a resposta do banco no formato {error: , response:}
    const dbRes = submitImg(fileCode, userInfo);
    
    res.json(dbRes);
}

module.exports = uploadImg;