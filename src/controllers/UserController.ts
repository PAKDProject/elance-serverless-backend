import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { User } from '../models/user';
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
                res.send('lol not working yet')
                // let users = await User.findAllUsers()
                // if (users.length === 0) res.status(404).json({message: 'No users found'})
                // else res.status(200).json({message: "Users found", users})
            }))
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
    }
}