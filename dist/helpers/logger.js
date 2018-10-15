"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors = require("colors/safe");
exports.error = (message) => { console.log(colors.red(message)); };
exports.warning = (message) => { console.log(colors.yellow(message)); };
exports.info = (message) => { console.log(colors.white(message)); };
exports.success = (message) => { console.log(colors.green(message)); };
exports.secret = (message) => { console.log(colors.bgBlack(message)); };
//# sourceMappingURL=logger.js.map