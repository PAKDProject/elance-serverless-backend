import * as express from 'express'
import { default as routes } from "../controllers"
import * as bodyParser from 'body-parser'
import { info } from "../helpers/logger"
import * as cors from 'cors'
import { config } from "dotenv";

export class App {
    private port: number
    private app: express.Application = express()

    constructor(port?:number){
        this.port = port || 3000
        this.setupBodyParsing()
        this.allowCors()
        this.setRoutes()
        config()
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

    private allowCors = () => {
        this.app.use(cors())
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