import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { User, postNewUser, findAllUsers } from '../models/user';
import { USERS_TABLE } from '../lib/createDb';
import { asyncRoutes } from '../middleware/asyncRoutes';

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
            .get('/', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                let users = await findAllUsers();
                if(users.data.length > 0) res.status(200).json({message:'Users found',users:users});
                else res.status(404).json({message: 'No users found'});
            }))
            .get('/:email', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
            }))
            .post('/', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                let user = await postNewUser(req.body);
                if(user) res.status(201).json({message:'User created',user:user});
                else res.status(400).json({message: 'Something went wrong. User not created'});
            }))
    }
}