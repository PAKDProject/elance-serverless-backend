import { Router, Response, Request, NextFunction } from 'express'
import { BaseRouter } from '../interfaces/baseRouter'
import { LoginUser, RegisterUser, ConfirmRegistration, ForgotPasswordStart, ForgotPasswordVerify, ResendValidationCode, RefreshTokens } from '../lib/userCheck';
import { Encode, Decode, ValidateToken, TokenTypes } from '../lib/tokenFunc';

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
                let tokens
                try {
                    if (Object.keys(req.cookies).length === 0 || req.cookies.inf_check === {}) {
                        let { email, password } = req.body;

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
                        tokens = await LoginUser(email, password)
                    }
                    else {
                        let decodedCookie = await Decode(req.cookies.inf_check)
                        let cookieToken = JSON.parse(decodedCookie)
                        if (ValidateToken(cookieToken, TokenTypes.ACCESS_TOKEN)) {
                            let res = await RefreshTokens(cookieToken).catch(err => { throw new Error(err) })
                            tokens = {
                                access_token: res.AccessToken,
                                id_token: res.IdToken
                            }

                            if (tokens === undefined) throw new Error('Can\'t refresh token!')
                        }

                        else {
                            throw new Error('Invalid tokens!')
                        }
                    }

                    //Here - save random string to db for comparison!
                    res.status(200)
                        .cookie('inf_check', await Encode(JSON.stringify(tokens.access_token)), {
                            httpOnly: true,
                            domain: '.elance.site',
                            path: '/',
                            secure: true
                        })
                        .send(JSON.stringify({
                            tokens,
                            message: 'User logged in successfully!'
                        })).end()
                } catch (error) {
                    let message

                    if (error.name === 'Error')
                        message = 'Internal Error! Try again later!'
                    else if (error.name === 'InvalidParameterException')
                        message = 'Email and password are required!'
                    else
                        message = error.message

                    res.status(403).send(JSON.stringify({
                        message,
                        code: error.code
                    }))
                    next(error)
                }
            })
            .post('/register', async (req: Request, res: Response, next: NextFunction) => {
                let { email, name, family_name, password } = req.body

                try {
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
                    await RegisterUser(email, password, name, family_name)
                    res.status(201).send(JSON.stringify({
                        message: 'User registered successfully!',
                        email,
                        name,
                        family_name
                    }))
                } catch (error) {
                    res.status(400).send(JSON.stringify({
                        message: error.message
                    }))
                    next(JSON.stringify(error))
                }
            })
            .post('/confirm', async (req: Request, res: Response, next: NextFunction) => {
                let { email, confirmationCode } = req.body

                try {
                    if (email === undefined || confirmationCode === undefined) {
                        try {
                            let data = JSON.parse(req.body.data)
                            email = data.email
                            confirmationCode = data.confirmationCode
                        }
                        catch{
                            throw Error(JSON.stringify({
                                message: "Data missing from request!"
                            }))
                        }
                    }

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
            })
            .post('/forgot/start', async (req: Request, res: Response, next: NextFunction) => {
                let { email } = req.body

                try {
                    if (email === undefined) {
                        try {
                            let data = JSON.parse(req.body.data)
                            email = data.email

                            if (email === undefined)
                                throw Error()
                        } catch (error) {
                            throw Error(JSON.stringify({
                                message: "Email is missing!"
                            }))
                        }
                    }

                    await ForgotPasswordStart(email)
                    res.status(200).send({
                        message: "Forgot password procedure started."
                    })
                } catch (error) {
                    res.status(400).send({
                        message: error.message
                    })
                    next(error)
                }
            })
            .post('/forgot/verify', async (req: Request, res: Response, next: NextFunction) => {
                let { email, newPassword, confirmCode } = req.body

                try {
                    if (email === undefined || newPassword === undefined || confirmCode === undefined) {
                        try {
                            let data = JSON.parse(req.body.data)
                            email = data.email
                            newPassword = data.newPassword
                            confirmCode = data.confirmCode
                        }
                        catch (error) {
                            throw Error(JSON.stringify({
                                message: "A field is missing"
                            }))
                        }
                    }
                    await ForgotPasswordVerify(email, newPassword, confirmCode)
                    res.status(201).send({
                        message: "Password changed succesfully"
                    })
                }
                catch (error) {
                    res.status(400).send({
                        message: error.message
                    })
                    next(error)
                }
            })
            .post('/revalidate', async (req: Request, res: Response, next: NextFunction) => {
                let { email } = req.body

                try {
                    if (email === undefined) {
                        try {
                            let data = JSON.parse(req.body.data)
                            email = data.email
                        }
                        catch (error) {
                            throw Error(JSON.stringify({
                                message: "Email is missing!"
                            }))
                        }
                    }
                    await ResendValidationCode(email)
                    res.status(200).send({
                        message: "Verification email sent!"
                    })
                } catch (error) {
                    res.status(403).send({
                        message: error.message
                    })
                    next(error)
                }
            })
            .post('/validatetoken', async (req: Request, res: Response, next: NextFunction) => {
                let { tokens } = req.body

                try {
                    if (tokens === undefined) {
                        try {
                            let data = JSON.parse(req.body.data)
                            tokens = data.tokens
                        } catch (error) {
                            throw Error(JSON.stringify({
                                message: "JWT missing in the request!"
                            }))
                        }
                    }

                    if ((tokens as string[]).length === 0) {
                        throw Error('Tokens sent in incorrect format!')
                    }

                    let isValid
                    isValid = ValidateToken(tokens[0], TokenTypes.ACCESS_TOKEN)

                    if (!isValid) {
                        res.send({ isValid })
                    }
                    else {
                        isValid = ValidateToken(tokens[1], TokenTypes.ID_TOKEN)

                        if (isValid) {
                            res.send({ isValid })
                        }
                        else {
                            res.status(403).send(JSON.stringify({
                                message: 'Incorrect token!'
                            }))
                        }
                    }
                }
                catch (error) {
                    console.error(error)
                    res.status(400).send(JSON.stringify({
                        message: error
                    }))
                }
            })
    }
}