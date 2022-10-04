const express = require('express');
const upload = require('../middleware/imgUpload');
const verifyToken = require('../middleware/verifyToken');
const login = require('../controller/login');
const userImg = require('../controller/users');
const collectors = require('../controller/collectors');

module.exports = (app) => {

    const user = express.Router();

    app.use('/user', user);

    //Fazer Login
    user.post('/login', login.loginUsuario);

    //USUARIOS
    user.use(verifyToken);
    user.delete('/:email', collectors.deleteCollector);
    user.put('/:email', collectors.updateCollector);
    user.get('/:email',collectors.getCollector);
    user.post('/', upload('/profile'), userImg);
}