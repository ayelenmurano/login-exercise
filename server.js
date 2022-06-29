const app = require("./app");
const server = require("http").createServer(app);

const log4js = require("./src/utils/logger");
const logger = log4js.getLogger("server");
const { port } = require("./src/utils/env");

server.listen(port, () => logger.info(`Server is listening in port ${port}`));
