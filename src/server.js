const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
require('./router/index')(app);

app.use(express.static('public'));

app.listen(8000);