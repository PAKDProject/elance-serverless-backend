import * as CryptoJS from 'crypto-js'
import { JWKS } from '../config/jwks';
import * as JWKToPem from 'jwk-to-pem'
import * as jwt from 'jsonwebtoken'
import { IToken } from '../interfaces/IAWSResponse';

export const Encode = async (value: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            const key = process.env.CIP_KEY

            let encrypted = CryptoJS.AES.encrypt(value, key)
            resolve(encrypted.toString())
        } catch (error) {
            reject(error)
        }
    })
}

export const Decode = async (value: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        try {
            const key = process.env.CIP_KEY

            let decrypted = CryptoJS.AES.decrypt(value, key)
            resolve(decrypted.toString(CryptoJS.enc.Utf8))
        } catch (error) {
            reject(error)
        }
    })
}

export let ValidateToken = (token: string, tokenType: TokenTypes): boolean => {
    const jwtk = JWKS;
    const decodedJWKS = CryptoJS.AES.decrypt(jwtk, process.env.JWT_KEY).toString(CryptoJS.enc.Utf8)
    const objectifiedJWKS = JSON.parse(decodedJWKS)
    let pem

    if (tokenType === TokenTypes.ACCESS_TOKEN) pem = JWKToPem(objectifiedJWKS.keys[1])
    else if (tokenType === TokenTypes.ID_TOKEN) pem = JWKToPem(objectifiedJWKS.keys[0])

    let isValid = true

    jwt.verify(token, pem, { algorithms: ['RS256'] }, (err) => {
        if (err) {
            isValid = false
        }
    })
    let tokenParsed = jwt.decode(token) as IToken
    if (tokenParsed.aud !== process.env.APP_CLIENT_ID && tokenType === TokenTypes.ID_TOKEN) {
        isValid = false
    } else if (tokenParsed.iss !== process.env.JWT_ISS) {
        isValid = false
    } else if (tokenType === TokenTypes.ACCESS_TOKEN) {
        if (tokenParsed.token_use !== 'access') isValid = false
    }
    else if (tokenType === TokenTypes.ID_TOKEN) {
        if (tokenParsed.token_use !== 'id') isValid = false
    }

    if (!isValid) return false
    else return true
}

export let CheckExpiry = (token): boolean => {
    let decoded = jwt.decode(token)
    let convertedToken = decoded as IToken;

    if (convertedToken.exp < (Date.now() / 1000))
        return false
    else return true
}

export let GetExpiryFromToken = (token): number => {
    let decoded = jwt.decode(token)
    let convertedToken = decoded as IToken;

    return convertedToken.exp
}
export enum TokenTypes {
    'ACCESS_TOKEN',
    'ID_TOKEN'
}