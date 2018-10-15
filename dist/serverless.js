"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createServer_1 = require("./lib/createServer");
const aws_serverless_express_1 = require("aws-serverless-express");
let server = aws_serverless_express_1.createServer(new createServer_1.App().getApp());
module.exports.handler = (event, context) => aws_serverless_express_1.proxy(server, event, context);
//# sourceMappingURL=serverless.js.map