const express = require('express');
const upload = require('../middleware/imgUpload');
const verifyToken = require('./middleware/verifyToken');
const login = require('./controllers/login');
const collectors = require('../controller/collectors');
const discs = require('../controller/discs');
const userImg = require('../controller/users');

module.exports = (app) => {

    const user = express.Router();

    app.use('/user', user);

    //Fazer Login
    user.post('/login', login.loginUsuario);

    //USUARIOS - COLLECTORS
    //Cadastrar Usuário
    user.post('/signup', collectors.signUpCollector);
    //Detalhar Usuário
    user.use(verifyToken);
    user.get('/user', collectors.getUserDetails);
    //Editar Usuário (FALTA IMPLEMENTAR!!!!)
    //Upload foto do perfil
    user.post('/', upload('/profile'), userImg)

    //DISCOS
    //Cadastrar disco
    //Listar todos os discos
    user.get('/discs', discs.getAllDiscs);
    //Listar meus discos
    user.get('/mydiscs', discs.getMyDiscs);
    //Listar discos de outro usuário
    user.get('/discs/:user_id', discs.getUserDiscs);
    //Listar discos por estilo
    user.get('/discs/:genre', discs.getDiscsByGenre);
    //Listar discos por artista
    user.get('/discs/:artist', discs.getDiscsByArtist);
    //Detalhes de um disco selecionado
    user.get('/disc/:id', discs.getDiscDetails);
    //Editar disco

    //TROCAS
    //Cadastrar solicitação de troca
    //Listar trocas
    //Aprovar troca
    //Rejeitar troca
    //Cancelar troca
    //Concluir troca: Remover disco de um usuário e cadastrar para outro


    //AVALIAÇÕES
    //Cadastrar avaliação
    //Listar avaliações

}