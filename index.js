const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./src/utils/db/conn/mongoAtlas.js").connect();

const log4js = require("./src/utils/logger");
const logger = log4js.getLogger("server");
const { port } = require("./src/utils/env");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const { loginRouter } = require("./src/routes");

app.use("/", loginRouter);

http.listen(port, () => logger.info(`Server is listening in port ${port}`));
