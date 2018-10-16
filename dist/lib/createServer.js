"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controllers_1 = require("../controllers");
const bodyParser = require("body-parser");
const logger_1 = require("../helpers/logger");
class App {
    constructor(port) {
        this.app = express();
        this.setRoutes = () => {
            controllers_1.default.forEach(route => {
                this.app.use(route.basePath, route.returnRouter());
            });
        };
        this.setupBodyParsing = () => {
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
        };
        this.getApp = () => {
            return this.app;
        };
        this.startLocal = () => {
            this.app.listen(this.port, () => {
                logger_1.info(`Server listening on port ${this.port}`);
            });
        };
        this.port = port || 3000;
        this.setupBodyParsing();
        this.setRoutes();
    }
}
exports.App = App;
//# sourceMappingURL=createServer.js.map