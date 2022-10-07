const express = require("express");
const upload = require("../middleware/imgUpload");
const verifyToken = require("../middleware/verifyToken");
const login = require("../controller/login");
const userImg = require("../controller/users");
const collectors = require("../controller/collectors");
const discs = require("../controller/discs");

module.exports = (app) => {
    const user = express.Router();
    const disc = express.Router();
    
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
    user.put('/', collectors.updateCollector);
    user.get('/',collectors.getCollector);
    user.delete('/disc/:id', discs);
    user.put('/disc/:id', discs.updateDisc);
    // user.post('/img', upload('/profile'), userImg);
    
    
    //DISCOS
    disc.get('/genre', discs.genreFilter);

}