const express = require('express');
const upload = require('../middleware/imgUpload');
const verifyToken = require('../middleware/verifyToken');
const login = require('../controller/login');
const userImg = require('../controller/users');
const collectors = require('../controller/collectors');
const discs = require('../controller/discs');
module.exports = (app) => {

    const user = express.Router();

    app.use('/user', user);

    //Fazer Login
    user.post('/login', login.loginUsuario);
    user.post('/signup', collectors.signUpCollector);
    //USUARIOS
    user.use(verifyToken);
    user.post('/disc', upload('/discs'), discs.postDisc);
    user.get('/disc', discs.getDiscs);
    user.delete('/:email', collectors.deleteCollector);
    user.put('/:email', collectors.updateCollector);
    user.get('/:email',collectors.getCollector);
    user.post('/', upload('/profile'), userImg);
    
}