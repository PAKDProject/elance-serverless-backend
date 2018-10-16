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
                res.status(200).send('Hello World!')
            })
            .get('/:name', (req: Request, res: Response) => {
                res.status(200).send('Hello ' + req.params.name)
            })
    }
}