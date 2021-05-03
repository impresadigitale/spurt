import { Response, NextFunction } from 'express';
import express from 'express';
import {env} from '../../env';
/**
 * GET /
 * Home page.
 */
export let index = (req: express.Request, res: Response, next: NextFunction) => {
    const globalEnv = {
        node: env.node,
        isProduction: env.isProduction,
        isTest: env.isTest,
        isDevelopment: env.isDevelopment,
        app: {
            name: env.app.name,
            version: env.app.version,
            description: env.app.description,
            host: env.app.host,
            schema: env.app.schema,
            routePrefix: env.app.routePrefix,
            port: env.app.port,
        },
        appHost: env.app.schema + '://' + env.app.host + ':' + env.app.port + env.app.routePrefix,
    };
    console.log(globalEnv.appHost);
    // req.environment = globalEnv;
    next();
};
