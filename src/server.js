require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const fs = require('fs');
const https = require('https');
// const privateKey = fs.readFileSync('../certificado/certificado.key');
// const certificate= fs.readFileSync('../certificado/certificado.cert');

// const credentials = {
//     key: privateKey,
//     cert: certificate
// };

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./router/index")(app);

// const httpsServer = https.createServer(credentials, app);
app.use(express.static("public"));

app.listen(8000);
// httpsServer.listen(443);
