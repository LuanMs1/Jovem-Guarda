const express = require('express');

const app = express();

app.use(express.json());

require('./router/index')(app);

app.listen(8000);