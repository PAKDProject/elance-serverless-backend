import { Router, Response, Request } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { User } from '../models/user';
import { USERS_TABLE, dynamoDb } from '../lib/createDb';

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
                // const user = new User()
                // let users = user.findAllUsers()
                let users = []
                users.push([
                    {
                        id: "1",
                        firstName: "Alan",
                        lastName: "test"
                    },
                    {
                        id: "2",
                        firstName: "Bob",
                        lastName: "Dylan"
                    }
                ])
                //if (users.length === 0) res.status(404).send('No users found.')
                res.status(200).json({msg: "Users found.", users})
            })
            .post('/', (req: Request, res: Response) => {
                let newUser = req.body
                const params = {
                    TableName: USERS_TABLE,
                    Item: {
                        email: newUser
                    }
                }
                dynamoDb.put(params, (error) => {
                    if (error) {
                        console.log(error)
                        res.status(400).json({error: 'Could not create user'})
                    }
                    res.status(201).json({message: 'User created', user: newUser})
                })
            })
    }
}