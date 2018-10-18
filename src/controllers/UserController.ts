import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { postNewUser, findAllUsers, findUserByEmail, findUsersByFName, findUsersByLName, updateUser, deleteUser } from '../models/user';
import { asyncRoutes } from '../middleware/asyncRoutes';
import { attributeNotExists } from 'type-dynamo';

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
            .get('/', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let users = await findAllUsers();
                    res.status(200).json({message:'Users found', users: users.data});
                } catch (error) {
                    res.status(404).json({message: 'Something went wrong. Users not found', error: error});
                    next(error);
                }
            })
            .get('/:email', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await findUserByEmail(req.params.email);
                    if(user.data) res.status(200).json({message: "User found", user: user.data});
                } catch (error) {
                    res.status(404).json({message: 'Something went wrong. User not found', error: error});
                    next(error);
                }
            })
            .get('/fname/:fname', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const users = await findUsersByFName(req.params.fname);
                    res.status(200).json({message: 'Users found', users: users.data});
                } catch (error) {
                    res.status(404).json({message: 'Something went wrong. User not found', error: error});
                    next(error);
                }
            })
            .get('/lname/:lname', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const users = await findUsersByLName(req.params.lname);
                    res.status(200).json({message: 'Users found', users: users.data});
                } catch (error) {
                    res.status(404).json({message: 'Something went wrong. User not found', error: error});
                    next(error);
                }
            })
            .post('/', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await postNewUser(req.body);
                    res.status(201).json({message:'User created',user:user.data});
                } catch (error) {
                    res.status(400).json({message: 'Something went wrong. User not created', error:error});
                    next(error);
                }
            })
            .put('/:email', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await updateUser(req.params.email, req.body)
                    res.status(200).json({message: 'User updated', user: user.data})
                } catch (error) {
                    res.status(400).json({message: 'Something went wrong. User not updated', error:error})
                    next(error)
                }
            })
            .delete('/:email', async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const user = await deleteUser(req.params.email);
                    res.status(200).json({message:'User deleted', user: user.data})
                } catch (error) {
                    res.status(400).json({message: 'Something went wrong. User not deleted', error:error})
                }
            })
    }
}