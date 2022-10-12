require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');
// const https = require('https');
// const privateKey = fs.readFileSync('./certs/key.pem');
// const certificate= fs.readFileSync('./certs/cert.pem');

// const credentials = {
//     key: privateKey,
//     cert: certificate
// };

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("./router/index")(app);

// const httpsServer = https.createServer(credentials, app);
app.use(express.static("public"));

app.listen(8000);
// httpsServer.listen(443);
