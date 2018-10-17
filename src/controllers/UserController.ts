import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { postNewUser, findAllUsers, findUserByEmail, findUsersByFName, findUsersByLName } from '../models/user';
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
                const users = await findAllUsers();
                if(users.data.length !== 0) res.status(200).json({message:'Users found', users: users.data});
                else res.status(404).json({message: 'No users found'});
            }))
            .get('/:email', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                const user = await findUserByEmail(req.params.email);
                if(user.data) res.status(200).json({message: "User found", user: user.data});
                else res.status(404).json({message: "User not found"});
            }))
            .get('/fname/:fname', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                const users = await findUsersByFName(req.params.fname);
                if(users.data.length !== 0) res.status(200).json({message: 'Users found', users: users.data});
                else res.status(404).json({message: 'No users found'});
            }))
            .get('/lname/:lname', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                const users = await findUsersByLName(req.params.lname);
                if(users.data.length !== 0) res.status(200).json({message: 'Users found', users: users.data});
                else res.status(404).json({message: 'No users found'});
            }))
            .post('/', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                const user = await postNewUser(req.body);
                if(user) res.status(201).json({message:'User created',user:user.data});
                else res.status(400).json({message: 'Something went wrong. User not created'});
            }))
    }
}