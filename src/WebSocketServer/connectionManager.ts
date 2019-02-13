import { ApiGatewayManagementApi } from 'aws-sdk'
import * as TableModel from '../models/tableModel'

export class WebSocketClient {
    client: ApiGatewayManagementApi

    constructor(config) {
        if (config) {
            this._setupClient(config)
        }
    }

    async _setupClient(config: any) {
        if (typeof (config) !== 'object' && !this.client) {
            let dbConfig = await TableModel.findDocumentById('config', 'fucc|config')
            config = dbConfig.data
            config.fromDb = true
        }

        if (!this.client) {
            if (config.requestContext.apiId) {
                config.requestContext.domainName = `${config.requestContext.apiId}.execute-api.${process.env.API_REGION}.amazonaws.com`
            }

            this.client = new ApiGatewayManagementApi({
                apiVersion: "2018-11-29",
                endpoint: `https://${config.requestContext.domainName}/${config.requestContext.stage}`
            });

            if (config.fromDb !== true) {
                let dbConfig = {
                    id: 'config',
                    entity: 'fucc|config',
                    requestContext: {
                        domainName: config.requestContext.domainName,
                        stage: config
                    }
                }
                await TableModel.createNewDocument(dbConfig as TableModel.TableModel)
            }
        }
    }

    async _disconnectClient(userId: string) {
        try {
            await TableModel.deleteDocument(userId, "fucc|connection")
            return true
        } catch (error) {
            throw new Error('Failed to disconnect user.')
        }
    }

    async _connectClient(userId: string) {
        try {
            await TableModel.createNewDocument({
                id: userId,
                entity: 'fucc|connection'
            } as TableModel.TableModel)
            return true
        } catch (error) {
            throw new Error('Could not connect user')
        }
    }

    async _broadcast(data: any, targets: string[]) {
        targets.forEach(target => {
            return this.client.postToConnection({
                ConnectionId: target,
                Data: data
            }).promise().catch(async err => {
                console.log('Connection not found!')
                throw new Error('No connection present!')
                // await TableModel.deleteDocument()
            })
        })
    }
}