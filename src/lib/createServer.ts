import { Request, Response } from "express";
import * as express from 'express';
import { default as routes } from "../routes";

let app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
})

routes.forEach(element => {
    app.use(element.basePath, element.returnRouter())
})

export let App = app