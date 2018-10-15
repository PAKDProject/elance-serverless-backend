import { Router, Response, Request } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { User } from '../models/user';

/**
* @class UserController used to control the user route
*/
export class UserController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string = '/users'

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
                const user = new User()
                let users = user.findAllUsers()
                //if (users.length === 0) res.status(404).send('No users found.')
                res.status(200).json({msg: "Users found.", users})
            })
    }
}