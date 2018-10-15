import { Router } from 'express';
import { BaseRouter } from '../interfaces/baseRouter';
/**
* @class HelloController used to control  route
*/
export declare class HelloController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string;
    /**
    * @constructor
    */
    constructor();
    /**
    * Returns a configured router for the route
    * @returns Router
    */
    returnRouter(): Router;
}
