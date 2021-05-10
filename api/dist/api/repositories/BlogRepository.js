"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRepository = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Blog_1 = require("../models/Blog");
let BlogRepository = class BlogRepository extends typeorm_1.Repository {
    blogSlug(data) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Blog_1.Blog, 'blog');
            query.where('blog.metaTagTitle = :value OR blog.title = :value', { value: data });
            return query.getMany();
        });
    }
};
BlogRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Blog_1.Blog)
], BlogRepository);
exports.BlogRepository = BlogRepository;
//# sourceMappingURL=BlogRepository.js.map