"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
const env_1 = require("../../env");
// import { lstatSync, readdirSync } from 'fs';
const fs = tslib_1.__importStar(require("fs"));
const path = tslib_1.__importStar(require("path"));
class HomeController {
    constructor() {
        // ---
    }
    home(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const directoryPath = path.join(process.cwd(), 'plugins' + '/');
            const directoryList = yield fs.readdirSync(directoryPath);
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginList = yield pluginRepository.find();
            for (const directory of directoryList) {
                const index = pluginList.findIndex(p => p.pluginName.toLowerCase() === directory.toLowerCase());
                if (index === -1) {
                    const plugin = new Plugin_1.Plugins();
                    plugin.pluginName = directory;
                    plugin.pluginStatus = 0;
                    pluginList.push(plugin);
                }
            }
            res.render('pages/home', {
                data: pluginList,
                path: '../home',
                baseUrl: env_1.env.app.schema + '://' + env_1.env.app.host + (env_1.env.app.port ? ':' + env_1.env.app.port : '') + env_1.env.app.routePrefix,
                title: 'Home Page',
            });
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=HomeController.js.map