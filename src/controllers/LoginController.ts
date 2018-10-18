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
    returnRouter(): Router {
        return Router()
            .post('/login', async (req: Request, res: Response, next: NextFunction) => {
                let { email, password } = req.body;

                try {
                    if (email === undefined || password === undefined) {
                        try {
                            let data = JSON.parse(req.body.data)
                            email = data.email
                            password = data.password
                        }
                        catch{
                            throw Error(JSON.stringify({
                                message: "Email and password are required!"
                            }))
                        }
                    }

                    let jwt = await LoginUser(email, password);
                    res.status(200).send(JSON.stringify({
                        jwt,
                        email,
                        message: 'User logged in successfully!'
                    }))
                } catch (error) {
                    let message

                    if(error.name === 'Error')
                        message = 'Internal Error! Try again later!'
                    else if(error.name === 'InvalidParameterException')
                        message = 'Email and password are required!'
                    else
                        message = error.message

                    res.status(403).send(JSON.stringify({
                        message
                    }))
                    next(error)
                }
            })
            .post('/register', async (req: Request, res: Response, next: NextFunction) => {
                let { email, name, family_name, password } = req.body

                if (email === undefined || password === undefined || name === undefined || family_name === undefined) {
                    try {
                        let data = JSON.parse(req.body.data)
                        email = data.email
                        password = data.password
                        name = data.name
                        family_name = data.family_name
                    }
                    catch{
                        throw Error(JSON.stringify({
                            message: "Data missing from request!"
                        }))
                    }
                }
                try {
                    await RegisterUser(email, password, name, family_name)
                    res.status(201).send(JSON.stringify({
                        message: 'User registered successfully!',
                        email,
                        name,
                        family_name
                    }))
                } catch (error) {
                    res.status(400).send(JSON.stringify({
                        error
                    }))
                    next(error)
                }
            })
            .post('/confirm', asyncRoutes(async (req: Request, res: Response, next: NextFunction) => {
                let { email, confirmationCode } = req.body

                if(email === undefined || confirmationCode === undefined){
                    try {
                        let data = JSON.parse(req.body.data)
                        email = data.email
                        confirmationCode = data.confirmationCode
                    }
                    catch{
                        throw Error(JSON.stringify({
                            message: "Data missing!"
                        }))
                    }
                }
                try {
                    await ConfirmRegistration(email, confirmationCode)
                    res.status(201).send(JSON.stringify({
                        message: 'User confirmed!'
                    }))
                } catch (error) {
                    res.status(400).send({
                        message: error.message
                    })
                    next(error)
                }
            }))
    }
}