import * as express from 'express'
import { default as routes } from "../controllers"
import * as bodyParser from 'body-parser'
import { info } from "../helpers/logger"

export class App {
    private port: number
    private app: express.Application = express()

    constructor(port?:number){
        this.port = port || 3000
        this.setupBodyParsing()
        this.setRoutes()
    }

    private setRoutes = () => {
        routes.forEach(route => {
            this.app.use(route.basePath, route.returnRouter())
        })
    }

    private setupBodyParsing = () => {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
    }

    public getApp = () => {
        return this.app
    }

    public startLocal = () => {
        this.app.listen(this.port, () => {
            info(`Server listening on port ${this.port}`)
        })
    }
}