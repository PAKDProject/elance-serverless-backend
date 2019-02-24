import { ApiGatewayManagementApi } from 'aws-sdk'
import * as TableModel from '../models/tableModel'

export class WebSocketClient {
    config: IWebSocketConfig
    client: ApiGatewayManagementApi

    constructor() {
        if (this.config === undefined) {
            this._getConfig().then(res => {
                this.client = new ApiGatewayManagementApi({ endpoint: res.data.endpoint })
                this.config = {
                    createdOn: res.data.createdOn,
                    endpoint: res.data.endpoint
                }
            }, err => {
                console.error("Error when fetching config...")
            })
        }
    }

    async _disconnectClient(userId: string, endpoint: string) {
        try {
            await this._setupClient(endpoint)

            console.log(userId)
            await TableModel.deleteDocument(userId, "fucc|connection")
        } catch (error) {
            throw new Error('Failed to disconnect user.\n' + error)
        }
    }

    async _connectClient(connectionId: string, userId: string, endpoint: string) {
        try {
            await this._setupClient(endpoint)

            await TableModel.createNewDocument({
                id: userId,
                entity: 'fucc|connection',
                connectionId
            } as TableModel.TableModel)
            return true
        } catch (error) {
            console.error(error.message)
            throw new Error('Could not connect user!\n' + error)
        }
    }

    async _send(data: any, target: string, endpoint: string) {
        try {
            await this._setupClient(endpoint)

            await this.client.postToConnection({
                ConnectionId: target,
                Data: JSON.stringify(data)
            }).promise().catch((err) => {
                console.error(err)
            })
        } catch (error) {
            console.error('Error with sending request to connection: ' + target + ' ' + error)
        }
    }

    async _setupClient(endpoint: string) {
        try {
            if (this.client === undefined && this.config === undefined) {
                try {
                    let res = await this._createConfig(endpoint)
                    this.config = {
                        endpoint: res.data.endpoint,
                        createdOn: res.data.createdOn
                    }
                    this.client = new ApiGatewayManagementApi({
                        endpoint: `https://${this.config.endpoint}`
                    })
                } catch (error) {
                    console.error(error.message)
                    throw error
                }
            }
            else if (this.client === undefined) {
                this.client = new ApiGatewayManagementApi({
                    endpoint: `https://${this.config.endpoint}`
                })
            }
        } catch (error) {
            throw error
        }
    }

    async _getMessages(endpoint: string, userId: string) {
        try {
            await this._setupClient(endpoint)

            let res = await TableModel.getMessagesForUser(userId)

            return res.data
        } catch (error) {
            throw error
        }
    }

    async _getConfig() {
        try {
            return TableModel.findDocumentById("config", "fucc|config")
        } catch (error) {
            console.error(error.message)
            throw error
        }
    }

    async _createConfig(endpoint) {
        try {
            let config = {
                id: "config",
                entity: "fucc|config",
                endpoint: endpoint,
                createdOn: Date.now()
            }

            this.config = {
                endpoint: config.endpoint,
                createdOn: config.createdOn
            }

            return TableModel.createNewDocument(config as TableModel.TableModel)
        } catch (error) {
            console.error(error.message)
            throw error
        }
    }
}

interface IWebSocketConfig {
    endpoint: string
    createdOn: number
}