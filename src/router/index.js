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
    app.use('/exchanges', exchange);
    //Fazer Login
    user.post("/login", login.loginUsuario);
    user.post("/signup", collectors.signUpCollector);
    
    //USUARIOS
    user.use(verifyToken);
    user.delete('/', collectors.deleteCollector);
    user.put('/', upload.uploadImg('/profile'), collectors.updateCollector);
    user.get('/',collectors.getCollector);
    user.post('/disc', upload.uploadImgArray('/discs'), discs.postDisc);
    user.get('/disc', discs.getUserDiscByAlbum);
    user.get('/alldiscs/:offset?', collectors.getAllUserDiscs);
    user.delete('/disc/:id', discs.deleteDisc);
    user.put('/disc/:id', discs.updateDisc);
    
    user.post('/exchanges', exchanges.proposeExchange);
    user.get('/exchanges', exchanges.userActiveExchanges);
    user.get('/exchanges/inactive', exchanges.userInactiveExchanges);
    user.put('/exchanges/accept/:id', exchanges.accept);
    user.put('/exchanges/reject/:id', exchanges.reject);
    user.put('/exchanges/cancel/:id', exchanges.cancel);
    user.post('/exchanges/complete/:id', exchanges.complete);

    //DISCOS
    disc.get('/all', discs.getAllDiscs);
    disc.get("/one/:id", discs.getDisc);
    disc.get("/filter/:offset?", discs.filter);


    //EXCHANGE
    exchange.get('/:id', exchanges.getExchange);

    //EXCHANGE
    exchange.get('/:id', exchanges.getExchange);

}