"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.iocLoader = void 0;
const class_validator_1 = require("class-validator");
const routing_controllers_1 = require("routing-controllers");
// import { useContainer as typeGraphQLUseContainer } from 'type-graphql';
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
exports.iocLoader = (settings) => {
    /**
     * Setup routing-controllers to use typedi container.
     */
    routing_controllers_1.useContainer(typedi_1.Container);
    typeorm_1.useContainer(typedi_1.Container);
    class_validator_1.useContainer(typedi_1.Container);
    // typeGraphQLUseContainer(Container);
};
//# sourceMappingURL=iocLoader.js.map