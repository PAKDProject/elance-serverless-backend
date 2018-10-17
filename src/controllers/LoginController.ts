import { Router, Response, Request } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { LoginUser, RegisterUser, ConfirmRegistration } from '../lib/userCheck';
import { asyncRoutes } from '../middleware/asyncRoutes';
import { NextFunction } from 'connect';

/**
* @class LoginController used to control login route
*/
export class LoginController implements BaseRouter {
    /**
    * @property basePath used as a base for routing related to the index
    */
    basePath: string = '/auth'

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
            .post('/login', asyncRoutes(async(req: Request, res: Response, next: NextFunction) => {
                let { email, password } = req.body;

                let jwt = await LoginUser(email, password);
                if(jwt === null)
                    res.status(403).send(JSON.stringify({
                        message: 'User failed to login!'
                    }))
                else {
                    res.status(200).send(JSON.stringify({
                        jwt,
                        email,
                        message: 'User logged in successfully!'
                    }))
                }
            }))
            .post('/register', (req: Request, res: Response) => {
                let { email, name, family_name, password } = req.body
                
                console.log(email, name, family_name, password)
                let response = RegisterUser(email, password, name, family_name)

                if(response === undefined){
                    res.status(201).send(JSON.stringify({
                        message: 'User registered successfully!',
                        email
                    }))
                }
                else
                    res.status(400).send(process.env.NODE_ENV == 'development' ? response.stack : 'Failed to register')
            })
            .post('/confirm', (req: Request, res: Response) => {
                let { email, confirmationCode } = req.body

                let result = ConfirmRegistration(email, confirmationCode)

                console.log(result)
                if(result === undefined)
                    res.status(201).send(JSON.stringify({
                        message: 'User confirmed!'
                    }))
                else{
                    res.status(400).send({
                        message: 'User not confirmed! Wrong confirmation code entered!'
                    })
                }
            })
    }
}