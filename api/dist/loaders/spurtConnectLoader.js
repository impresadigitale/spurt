"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.spurtConnectLoader = void 0;
const tslib_1 = require("tslib");
const path = tslib_1.__importStar(require("path"));
const routes_1 = require("../plugin-manager/routes");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const express_validator_1 = tslib_1.__importDefault(require("express-validator"));
const env_1 = require("../env");
// import * as expressEjsLayout from 'express-ejs-layouts';
exports.spurtConnectLoader = (settings) => {
    if (settings) {
        const expressEjsLayout = require('express-ejs-layouts');
        const passport = require('passport');
        const flash = require('express-flash');
        const MySQLStore = require('express-mysql-session')(express_session_1.default);
        const expressApp = settings.getData('express_app');
        const options = {
            host: env_1.env.db.host,
            port: env_1.env.db.port,
            user: env_1.env.db.username,
            password: env_1.env.db.password,
            database: env_1.env.db.database,
        };
        const sessionStore = new MySQLStore(options);
        expressApp
            // view engine setup
            .set('views', path.join(__dirname, '../../', 'views'))
            .set('view engine', 'ejs')
            .use(expressEjsLayout)
            .set('layout', 'pages/layouts/common')
            .use(express_session_1.default({
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
            secret: '$$secret*&*((',
        }))
            .use(passport.initialize())
            .use(passport.session())
            .use(express_validator_1.default())
            .use((req, res, next) => {
            res.locals.user = req.user;
            next();
        })
            .use(flash());
        for (const route of routes_1.ROUTER) {
            expressApp.use(route.path, route.middleware, route.handler);
        }
    }
};
//# sourceMappingURL=spurtConnectLoader.js.map