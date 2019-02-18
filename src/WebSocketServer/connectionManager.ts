import { ApiGatewayManagementApi } from 'aws-sdk'
import * as TableModel from '../models/tableModel'

export class WebSocketClient {
    client: ApiGatewayManagementApi

    // async _setupClient() {
    //         this.client = new ApiGatewayManagementApi({
    //             apiVersion: "2018-11-29",
    //             endpoint: `https://${config.requestContext.domainName}/${config.requestContext.stage}`
    //         });
    //     }
    // }

    async _disconnectClient(connectionId: string) {
        try {
            await TableModel.deleteDocument(connectionId, "fucc|connection")
        } catch (error) {
            throw new Error('Failed to disconnect user.\n' + error)
        }
    }

    async _connectClient(connection: string, userId: string) {
        try {
            await TableModel.createNewDocument({
                id: connection,
                entity: 'fucc|connection',
                userId
            } as TableModel.TableModel)
            return true
        } catch (error) {
            throw new Error('Could not connect user!\n' + error)
        }
    }

    async _broadcast(data: any, targets: string[]) {
        targets.forEach(target => {
            return this.client.postToConnection({
                ConnectionId: target,
                Data: data
            }).promise().catch(async err => {
                console.log('Connection not found! ' + target)
                // await TableModel.deleteDocument()
            })
        })
    }
}