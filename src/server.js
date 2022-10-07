const express = require("express");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./router/index")(app);

app.use(express.static("public"));

app.listen(8000);
