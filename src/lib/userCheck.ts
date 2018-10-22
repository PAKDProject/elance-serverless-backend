import { CognitoUserPool, AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { verify, decode } from 'jsonwebtoken'

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
        cognitoUser.authenticateUser(auth, {
            onSuccess: (result) => {
                let token = result.getIdToken().getJwtToken()
                resolve(token)
            },
            onFailure: (result) => {
                reject(result)
            }
        })
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

export let ValidateToken = (token: string) => {
    return decode(token)
}