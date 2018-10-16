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
            .get('/:userId', (req: Request, res: Response) => {
                const params = {
                    TableName: USERS_TABLE,
                    Key: {
                        userId: req.params.userId
                    }
                }
                dynamoDb.get(params, (error, result) => {
                    if (error){
                        console.log(error)
                        res.status(400).json({error: 'Could not retrieve user'})
                    }
                    if (result.Item) {
                        const {userId, name} = result.Item
                        res.status(200).json({userId, name})
                    } else {
                        res.status(404).json({error: 'User not found'})
                    }
                })
            })
            .post('/', (req: Request, res: Response) => {
                const {userId, name} = req.body
                if (typeof userId !== 'string') {
                    res.status(400).json({error: '"userId" must be of type "string"'})
                } else if (typeof name !== 'string') {
                    res.status(400).json({error: '"name" must be of type "string"'})
                }
                const params = {
                    TableName: USERS_TABLE,
                    Item: {
                        userId: userId,
                        name: name
                    }
                }
                dynamoDb.put(params, (error) => {
                    if (error) {
                        console.log(error)
                        res.status(400).json({error: 'Could not create user'})
                    }
                    res.status(201).json({userId, name})
                })
            })
    }
}