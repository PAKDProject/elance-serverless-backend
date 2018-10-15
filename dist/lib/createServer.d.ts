import * as express from 'express';
export declare class App {
    private port;
    private app;
    constructor(port?: number);
    private setRoutes;
    private setupBodyParsing;
    getApp: () => express.Application;
    startLocal: () => void;
}
