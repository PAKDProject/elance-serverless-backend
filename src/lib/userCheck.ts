import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { ICognitoRefreshResponse, IAccessToken } from '../interfaces/IAWSResponse';
import * as jwt from 'jsonwebtoken'
import { findRefreshTokenForUser, addRefreshTokenForUser, updateRefreshTokenForUser } from '../models/token';
import { AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export let LoginUser = (Username: string, Password: string) => {
    const userPool: CognitoUserPool = new CognitoUserPool({ UserPoolId: process.env.POOL_ID, ClientId: process.env.APP_CLIENT_ID })
    let auth: AuthenticationDetails = new AuthenticationDetails({
        Username,
        Password
    })
    let cognitoUser: CognitoUser = new CognitoUser({
        Username,
        Pool: userPool
    })
    return new Promise((resolve, reject) => {
        try {
            cognitoUser.authenticateUser(auth, {
                onSuccess: (result) => {
                    let access_token = result.getAccessToken().getJwtToken()
                    let id_token = result.getIdToken().getJwtToken()
                    let refresh_token = result.getRefreshToken().getToken()

                    let username = getUserIDFromAccessToken(access_token)

                    findRefreshTokenForUser(username).then(token => {
                        updateRefreshTokenForUser(username, {
                            refresh_token
                        })
                    }, rej => {
                        addRefreshTokenForUser({
                            username,
                            refresh_token
                        })
                    })

                    let tokens = {
                        access_token,
                        id_token
                    }
                    resolve(tokens)
                },
                onFailure: (result) => {
                    reject(result)
                }
            })
        }
        catch (error) {
            reject(error)
        }
    })
}

export let RegisterUser = (email: string, password: string, firstName: string, surname: string) => {
    const userPool: CognitoUserPool = new CognitoUserPool({ UserPoolId: process.env.POOL_ID, ClientId: process.env.APP_CLIENT_ID })
    let registrationAttr: CognitoUserAttribute[] = [
        new CognitoUserAttribute({
            Name: 'email',
            Value: email
        }),
        new CognitoUserAttribute({
            Name: 'name',
            Value: firstName
        }),
        new CognitoUserAttribute({
            Name: 'family_name',
            Value: surname
        })
    ]

    return new Promise((resolve, reject) => {
        userPool.signUp(email, password, registrationAttr, null, (err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })
}

export let ConfirmRegistration = (Username: string, confirmationCode: string) => {
    const userPool: CognitoUserPool = new CognitoUserPool({ UserPoolId: process.env.POOL_ID, ClientId: process.env.APP_CLIENT_ID })
    const cognitoUser: CognitoUser = new CognitoUser({
        Username,
        Pool: userPool
    })

    return new Promise((resolve, reject) => {
        cognitoUser.confirmRegistration(confirmationCode, true, (err) => {
            if (err)
                reject(err)
            else
                resolve()
        })
    })
}

export let ForgotPasswordStart = (Username: string) => {
    const userPool: CognitoUserPool = new CognitoUserPool({ UserPoolId: process.env.POOL_ID, ClientId: process.env.APP_CLIENT_ID })
    const cognitoUser: CognitoUser = new CognitoUser({
        Username,
        Pool: userPool
    })

    return new Promise((resolve, reject) => {
        cognitoUser.forgotPassword({
            onSuccess: (data) => resolve(),
            onFailure: (err) => reject(err)
        })
    })
}

export let ForgotPasswordVerify = (Username: string, newPassword: string, verificationCode: string) => {
    const userPool: CognitoUserPool = new CognitoUserPool({ UserPoolId: process.env.POOL_ID, ClientId: process.env.APP_CLIENT_ID })
    const cognitoUser: CognitoUser = new CognitoUser({
        Username,
        Pool: userPool
    })

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onSuccess: () => resolve(),
            onFailure: (err) => reject(err)
        })
    })
}

export let ResendValidationCode = (Username: string) => {
    const userPool: CognitoUserPool = new CognitoUserPool({ UserPoolId: process.env.POOL_ID, ClientId: process.env.APP_CLIENT_ID })
    const cognitoUser: CognitoUser = new CognitoUser({
        Username,
        Pool: userPool
    })

    return new Promise((resolve, reject) => {
        cognitoUser.resendConfirmationCode((err) => {
            if (err) reject(err)
            resolve()
        })
    })
}

export let ValidateToken = (tokens): boolean => {
    return true
}

export let CheckExpiry = (tokens): boolean => {
    return true
}

export let RefreshTokens = (access_token: string): Promise<AuthenticationResultType> => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = getUserIDFromAccessToken(access_token)

            let find = await findRefreshTokenForUser(username) //to be done get refresh token...
            let refreshToken = find.data.refresh_token

            if (!refreshToken) reject('Bad shit')

            let params = {
                AuthFlow: 'REFRESH_TOKEN',
                AuthParameters: {
                    REFRESH_TOKEN: refreshToken
                },
                ClientId: process.env.APP_CLIENT_ID
            }

            new CognitoIdentityServiceProvider({
                region: 'eu-west-1'
            }).initiateAuth(params, (err, data) => {
                if (err) reject(err)
                let cognitoResponse = data.AuthenticationResult as AuthenticationResultType

                console.log('data: ' + JSON.stringify(data))
                console.log('response: ' + JSON.stringify(cognitoResponse))
                updateRefreshTokenForUser(username, { refresh_token: cognitoResponse.RefreshToken })
                resolve(cognitoResponse)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const getUserIDFromAccessToken = (access_token: string) => {
    let decode = jwt.decode(access_token)

    let user = decode as IAccessToken;
    return user.username;
}