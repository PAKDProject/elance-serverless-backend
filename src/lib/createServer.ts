import * as express from 'express'
import { default as routes } from "../controllers"
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import { info } from "../helpers/logger"
import * as cors from 'cors'
import { config } from "dotenv";
import { testMethods } from '../helpers/testMethods';

export class App {
    private port: number
    private app: express.Application = express()

    constructor(port?: number) {
        this.port = port || 3000
        this.setupBodyParsing()
        this.setupCookieParsing()
        this.allowCors()
        this.setRoutes()
        config()
        testMethods() // delete for production
    }

    private setRoutes = () => {
        routes.forEach(route => {
            this.app.use(route.basePath, route.returnRouter())
        })
    }

    private setupBodyParsing = () => {
        this.app.use(bodyParser.json({ limit: '50mb' }))
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    }

    private setupCookieParsing = () => {
        this.app.use(cookieParser())
    }

    private allowCors = () => {
        this.app.use(cors({
            exposedHeaders: ['X-Auth-Tokens', 'Origin'],
            credentials: true
        }))
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