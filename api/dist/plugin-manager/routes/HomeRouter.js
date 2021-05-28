"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRoute = void 0;
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const HomeController_1 = require("../controller/HomeController");
const homeController = new HomeController_1.HomeController();
exports.HomeRoute = express.Router()
    .get('/', homeController.home);
//# sourceMappingURL=HomeRouter.js.map