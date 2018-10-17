import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
<<<<<<< HEAD
import { User } from '../models/user';
import { USERS_TABLE } from '../lib/createDb';
=======
import { postNewUser, findAllUsers, findUserByEmail, findUsersByFName, findUsersByLName } from '../models/user';
>>>>>>> 20e004520a3187646b44e919c62ba82b53ed1fb0
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
<<<<<<< HEAD
            .get('/:email', (req: Request, res: Response) => {
                const params = {
                    TableName: USERS_TABLE,
                    Key: {
                        email: req.params.email
                    }
                }
                // dynamoDb.get(params, (error, result) => {
                //     if (error){
                //         console.log(error)
                //         res.status(400).json({error: 'Could not retrieve user'})
                //     }
                //     if (result.Item) {
                //         const {email, name} = result.Item
                //         res.status(200).json({message:'User found', user:{email, name}})
                //     } else {
                //         res.status(404).json({error: 'User not found'})
                //     }
                // })
            })
            .post('/', (req: Request, res: Response) => {
                const {email, name} = req.body
                if (typeof email !== 'string') {
                    res.status(400).json({error: '"email" must be of type "string"'})
                } else if (typeof name !== 'string') {
                    res.status(400).json({error: '"name" must be of type "string"'})
                }
                const params = {
                    TableName: USERS_TABLE,
                    Item: {
                        email: email,
                        name: name
                    }
                }
                // dynamoDb.put(params, (error) => {
                //     if (error) {
                //         console.log(error)
                //         res.status(400).json({error: 'Could not create user'})
                //     }
                //     res.status(201).json({message: "User created",user:{email: email, name:name}})
                // })
            })
=======
>>>>>>> 20e004520a3187646b44e919c62ba82b53ed1fb0
    }
}