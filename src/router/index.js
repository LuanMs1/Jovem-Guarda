const express = require("express");
const upload = require("../middleware/imgUpload");
const verifyToken = require("../middleware/verifyToken");
const login = require("../controller/login");
const collectors = require("../controller/collectors");
const discs = require("../controller/discs");
const exchanges = require('../controller/exchange');

module.exports = (app) => {
    const user = express.Router();
    const disc = express.Router();
    const exchange = express.Router();
    
    app.use('/disc', disc);
    app.use('/user', user);
    //Fazer Login
    user.post("/login", login.loginUsuario);
    user.post("/signup", collectors.signUpCollector);
    //USUARIOS
    user.use(verifyToken);
    user.post('/disc', upload('/discs'), discs.postDisc);
    user.get('/alldiscs', collectors.getUserDiscs);
    user.delete('/', collectors.deleteCollector);
    user.put('/', upload('/profile'), collectors.updateCollector);
    user.get('/',collectors.getCollector);
    user.delete('/disc/:id', discs.deleteDisc);
    user.put('/disc/:id', discs.updateDisc);
    user.post('/exchange', exchanges.proposeExchange);
    user.get('/exchange', exchanges.userExchanges);
    user.get('/exchange/:id', exchanges.getExchange);
    user.put('/exchange/accept/:id', exchanges.accept);
    user.put('/exchange/reject/:id', exchanges.reject);
    user.put('/exchange/cancel/:id', exchanges.cancel);
    
    //DISCOS
    disc.get('/filter', discs.filter);

}