export interface ICognitoRefreshResponse {
    "AuthenticationResult": {
        "AccessToken": string,
        "ExpiresIn": number,
        "IdToken": string,
        "RefreshToken": string,
        "TokenType": string
    }
}

export interface IAccessToken extends IToken {
    username: string
}

export interface IToken {
    scope: string
    token_use: string
    iss: string
    exp: number
    aud: string
}

export interface IIDToken extends IToken { }