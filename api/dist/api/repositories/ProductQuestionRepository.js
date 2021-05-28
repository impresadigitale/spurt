"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuestionRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const ProductQuestion_1 = require("../models/ProductQuestion");
let ProductQuestionRepository = class ProductQuestionRepository extends typeorm_1.Repository {
};
ProductQuestionRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(ProductQuestion_1.ProductQuestion)
], ProductQuestionRepository);
exports.ProductQuestionRepository = ProductQuestionRepository;
//# sourceMappingURL=ProductQuestionRepository.js.map