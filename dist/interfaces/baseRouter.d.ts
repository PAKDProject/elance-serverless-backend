import { Router } from "express";
/**
 * @interface BaseRouter interface used as a template for controllers
 */
export interface BaseRouter {
    basePath: string;
    returnRouter(): Router;
}
