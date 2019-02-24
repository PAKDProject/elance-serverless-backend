import { Router, Response, Request, NextFunction } from "express";
import { BaseRouter } from "../interfaces/baseRouter";
import * as TableModel from "../models/tableModel";
import { CheckAccessToken } from "../middleware/checkToken";

/**
 * @class FuccController used to control the fucc route
 */
export class FuccController implements BaseRouter {
    /**
     * @property basePath used as a base for routing related to the index
     */
    basePath: string = "/fucc";

    /**
     * @constructor
     */
    constructor() { }

    /**
     * Returns a configured router for the route
     * @returns Router
     */
    returnRouter(): Router {
        const entityType = "fucc|config";
        return Router()
            .get("/getconfig", CheckAccessToken, async (req: Request, res: Response, next: NextFunction) => {
                try {
                    let config = await TableModel.findDocumentById("config", entityType);
                    if (!config.data) res.status(404).json({ message: "No Config found in collection" });
                    res.status(200).json({ message: "Config found", config: config.data });
                } catch (error) {
                    res.status(404).json({ message: "Something went wrong. Config not found", error: error });
                    next(error);
                }
            })
    }
}
