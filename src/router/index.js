const express = require('express');
const upload = require('../middleware/imgUpload');
const verifyToken = require('./middleware/verifyToken');
const login = require('./controllers/login');
const userImg = require('../controller/users');

module.exports = (app) => {

    const user = express.Router();

    app.use('/user', user);

    //Fazer Login
    user.post('/login', login.loginUsuario);

    //USUARIOS
    user.use(verifyToken);
    user.post('/', upload('/profile'), userImg)
}