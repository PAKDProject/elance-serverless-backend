import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoRefreshToken } from 'amazon-cognito-identity-js';
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { IAccessToken } from '../interfaces/IAWSResponse';
import * as jwt from 'jsonwebtoken'
import { AuthenticationResultType } from 'aws-sdk/clients/cognitoidentityserviceprovider';
import * as TableModel from '../models/tableModel';
import { Encode, Decode, CheckExpiry, GetExpiryFromToken } from './tokenFunc';
import uuid = require('uuid');

const entityType = 'token';
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
                onSuccess: async (result) => {
                    let access_token = result.getAccessToken().getJwtToken()
                    let id_token = result.getIdToken().getJwtToken()
                    let refresh_token = result.getRefreshToken().getToken()

                    let username = getUserIDFromAccessToken(access_token)
                    await TableModel.findDocumentById(username, entityType).then(async () => {
                        try {
                            refresh_token = await Encode(refresh_token)
                            await TableModel.updateDocument(username, entityType, { refresh_token } as TableModel.TableModel)
                        } catch (error) {
                            console.log(error);
                        }
                    }, async () => {
                        refresh_token = await Encode(refresh_token)
                        const newToken = {
                            id: username,
                            entity: entityType,
                            refresh_token
                        }
                        await TableModel.createNewDocument(newToken as TableModel.TableModel)
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

export let RefreshTokens = (access_token: string): Promise<AuthenticationResultType> => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = getUserIDFromAccessToken(access_token)
            let find = await TableModel.findDocumentById(username, entityType) //to be done get refresh token...
            let refreshToken = find.data.refresh_token
            if (!refreshToken) reject('No refresh token present in db')

            else {
                //refreshToken = Decode(refreshToken)
                Decode(refreshToken).then((res) => {
                    refreshToken = res
                })
                let params = {
                    AuthFlow: 'REFRESH_TOKEN',
                    AuthParameters: {
                        REFRESH_TOKEN: refreshToken
                    },
                    ClientId: process.env.APP_CLIENT_ID
                }

                new CognitoIdentityServiceProvider({
                    region: 'eu-west-1'
                }).initiateAuth(params, async (err, data) => {
                    if (err) reject(err)
                    console.log(data)
                    let cognitoResponse = data.AuthenticationResult as AuthenticationResultType

                    if (cognitoResponse.RefreshToken !== undefined) {
                        await TableModel.updateDocument(username, entityType, { refresh_token: cognitoResponse.RefreshToken } as TableModel.TableModel)
                    }
                    resolve(cognitoResponse)
                })
            }
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

export const blacklistAccessToken = async (access_token: string) => {
    try {
        let userId = getUserIDFromAccessToken(access_token)
        let exp = GetExpiryFromToken(access_token)
        const btoken = {
            id: uuid.v4(),
            entity: "blacklisted-token",
            userId: userId,
            token: access_token,
            expiryDate: exp
        } 
        await TableModel.createNewDocument(btoken as TableModel.TableModel)
    } catch (error) {
        throw new Error(error)
    }
}

export const isBlacklisted = async (access_token: string): Promise<boolean> => {
    try {
        let value = await TableModel.findDocumentsByType("blacklisted-token")
        let blackListedArray = value.data as TableModel.IBlacklistToken[];
        let arrayWithToken = blackListedArray.findIndex((value) => {
            if (value.token == access_token)
                return true;
            else
                return false;
        })

        if (arrayWithToken === -1) {
            return Promise.resolve(false)
        }
        else {
            return Promise.resolve(true)
        }
    } catch (error) {
        throw error
    }
}