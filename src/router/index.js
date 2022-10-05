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
    user.post('/signup', collectors.signUpCollector);
    //USUARIOS
    user.use(verifyToken);
    user.delete('/', collectors.deleteCollector);
    user.put('/', collectors.updateCollector);
    user.get('/',collectors.getCollector);
    user.post('/img', upload('/profile'), userImg);
    
}