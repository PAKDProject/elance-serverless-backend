import { Router, Response, Request } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'

/**
* @class HelloController used to control hello route
*/
export class HelloController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string = '/hello'

    /**
    * @constructor
    */
    constructor() {

    }

    /**
    * Returns a configured router for the route
    * @returns Router
    */
    returnRouter() : Router {
        return Router()
            .get('/', (req: Request, res: Response) => {
                res.send(JSON.stringify({
                    message: "I fucking made it!"
                })).status(200)
            })
    }
}