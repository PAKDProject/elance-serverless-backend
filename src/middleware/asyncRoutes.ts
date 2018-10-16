import { Request, Response, NextFunction } from "express";

/**
 * Async wrapper to be used with routes which need async
 * @param fn - function that is async
 */
export let asyncRoutes = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}