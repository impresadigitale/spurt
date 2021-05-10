"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PageService_1 = require("../../services/PageService");
const PageGroupService_1 = require("../../services/PageGroupService");
let PageController = class PageController {
    constructor(pageService, pageGroupService) {
        this.pageService = pageService;
        this.pageGroupService = pageGroupService;
    }
    // Page List API
    /**
     * @api {get} /api/pages/pagelist Page List API
     * @apiGroup Store
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page list",
     *      "data":{
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "active" : "",
     *      "metaTagTitle" : "",
     *      "metaTagContent" : "",
     *      "metaTagKeyword" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/pagelist
     * @apiErrorExample {json} pageFront error
     * HTTP/1.1 500 Internal Server Error
     */
    pageList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['groupId', 'groupName', 'isActive'];
            const search = [];
            const WhereConditions = [{
                    name: 'isActive',
                    value: 1,
                }];
            const relations = [];
            const pageGroupList = yield this.pageGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
            const promise = pageGroupList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const data = yield this.pageService.find({ where: { pageGroupId: result.groupId, isActive: 1 } });
                const temp = result;
                temp.page = data;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got the group list.',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get Page Detail API
    /**
     * @api {get} /api/pages/get_pagedetails/:slugName Page Details API
     * @apiGroup Store
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Details",
     *      "data":{
     *      "pageId" : "",
     *      "title" : "",
     *      "content" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/pages/get_pagedetails/:slugName
     * @apiErrorExample {json} page error
     * HTTP/1.1 500 Internal Server Error
     */
    pageDetails(slugName, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageService.findOne({
                where: {
                    slugName,
                },
            });
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid page id',
                };
                return response.status(400).send(errorResponse);
            }
            const pageDetails = yield this.pageService.findOne(page);
            if (pageDetails) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get page Details',
                    data: pageDetails,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get page Details',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/pagelist'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "pageList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get_pagedetails/:slugName'),
    tslib_1.__param(0, routing_controllers_1.Param('slugName')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "pageDetails", null);
PageController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/pages'),
    tslib_1.__metadata("design:paramtypes", [PageService_1.PageService, PageGroupService_1.PageGroupService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=PageController.js.map