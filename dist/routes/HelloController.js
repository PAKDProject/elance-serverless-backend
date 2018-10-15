"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
/**
* @class HelloController used to control  route
*/
class HelloController {
    /**
    * @constructor
    */
    constructor() {
        /**
        * @property basePath used as a base for routing related to the index
        */
        this.basePath = '/';
    }
    /**
    * Returns a configured router for the route
    * @returns Router
    */
    returnRouter() {
        return express_1.Router()
            .get('', (req, res) => {
            res.send('Hello World!');
        });
    }
}
exports.HelloController = HelloController;
//# sourceMappingURL=HelloController.js.map