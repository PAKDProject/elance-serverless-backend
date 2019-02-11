import { ApiGatewayManagementApi } from 'aws-sdk'
import * as TableModel from '../models/tableModel'

export class WebSocketClient {
    client: any

    constructor(config) {
        if (config) {
            this._setupClient(config)
        }
    }

    async _setupClient(config: any) {
        if (typeof (config) !== 'object' && !this.client) {
            let dbConfig = await TableModel.findDocumentById('fucc', 'config')
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
                    id: 'fucc',
                    entity: 'config',
                    requestContext: {
                        domainName: config.requestContext.domainName,
                        stage: config
                    }
                }
                await TableModel.createNewDocument(dbConfig)
            }
        }
    }
}