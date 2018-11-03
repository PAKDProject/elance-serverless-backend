import { typeDynamo } from "../lib/createDb";

class TokenStore {
    username: string
    refresh_token: string
}

const TokenRepo = typeDynamo.define(TokenStore, {
    tableName: 'tokens-table-dev',
    partitionKey: 'username'
}).getInstance()

export const findRefreshTokenForUser = async (username: string) => await TokenRepo.find({ username }).execute()

export const updateRefreshTokenForUser = async (username: string, tokenChanges: Partial<TokenStore>) => await TokenRepo.update({ username, ...tokenChanges }).execute()

export const addRefreshTokenForUser = async (userTokenStore: TokenStore) => await TokenRepo.save(userTokenStore).execute()

export const deleteUserFromTokenExistence = async (username: string) => await TokenRepo.delete({ username }).execute()