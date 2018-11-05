export interface ICognitoRefreshResponse {
    "AuthenticationResult": {
        "AccessToken": string,
        "ExpiresIn": number,
        "IdToken": string,
        "RefreshToken": string,
        "TokenType": string
    }
}

export interface IAccessToken {
    username: string,
    scope: string,
    token_use: string,
    iss: string,
    exp: number
}