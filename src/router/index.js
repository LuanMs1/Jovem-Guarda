const express = require('express');
const upload = require('../middleware/imgUpload');
const userImg = require('../controller/users');
module.exports = (app) => {

    const user = express.Router();

    app.use('/user', user);

    user.post('/', upload('/profile'), userImg)

}