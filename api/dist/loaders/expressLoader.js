"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const routing_controllers_1 = require("routing-controllers");
const authorizationChecker_1 = require("../auth/authorizationChecker");
const currentUserChecker_1 = require("../auth/currentUserChecker");
const lusca_1 = tslib_1.__importDefault(require("lusca"));
const env_1 = require("../env");
exports.expressLoader = (settings) => {
    if (settings) {
        const connection = settings.getData('connection');
        /**
         * We create a new express server instance.
         * We could have also use useExpressServer here to attach controllers to an existing express instance.
         */
        const app = express_1.default();
        // app.use(bodyParser.json({limit: '100mb'}));
        // app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
        app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(lusca_1.default.xframe('SAMEORIGIN'));
        app.use(lusca_1.default.xssProtection(true));
        const expressApp = routing_controllers_1.useExpressServer(app, {
            cors: true,
            classTransformer: true,
            routePrefix: env_1.env.app.routePrefix,
            defaultErrorHandler: false,
            /**
             * We can add options about how routing-controllers should configure itself.
             * Here we specify what controllers should be registered in our express server.
             */
            controllers: env_1.env.app.dirs.controllers,
            middlewares: env_1.env.app.dirs.middlewares,
            interceptors: env_1.env.app.dirs.interceptors,
            /**
             * Authorization features
             */
            authorizationChecker: authorizationChecker_1.authorizationChecker(connection),
            currentUserChecker: currentUserChecker_1.currentUserChecker(connection),
        });
        // // parse application/x-www-form-urlencoded
        // expressApp.use(bodyParser.urlencoded({extended: true}));
        // expressApp.use(bodyParser.json({limit: '50mb'}));
        // Run application to listen on given port
        if (!env_1.env.isTest) {
            const server = expressApp.listen(env_1.env.app.port);
            settings.setData('express_server', server);
        }
        // Here we can set the data for other loaders
        settings.setData('express_app', expressApp);
    }
};
//# sourceMappingURL=expressLoader.js.map