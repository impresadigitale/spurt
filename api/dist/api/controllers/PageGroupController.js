"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageGroupController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const PageGroup_1 = require("../models/PageGroup");
const PageGroupService_1 = require("../services/PageGroupService");
const PageService_1 = require("../services/PageService");
let PageGroupController = class PageGroupController {
    constructor(pageGroupService, pageService) {
        this.pageGroupService = pageGroupService;
        this.pageService = pageService;
    }
    // Create Page Group API
    /**
     * @api {post} /api/page-group/add-page-group Add Page group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageGroupName
     * @apiParam (Request body) {Number} status
     * @apiParamExample {json} Input
     * {
     *      "pageGroupName" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/add-page-group
     * @apiErrorExample {json} Page group error
     * HTTP/1.1 500 Internal Server Error
     */
    addAttributeGroup(pageGroupName, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newPageGroup = new PageGroup_1.PageGroup();
            newPageGroup.groupName = pageGroupName;
            newPageGroup.isActive = status;
            const PageGroupSaved = yield this.pageGroupService.create(newPageGroup);
            if (PageGroupSaved) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully added Page Group.',
                    data: PageGroupSaved,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Page Group List API
    /**
     * @api {get} /api/page-group/PageGrouplist Page Group list API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Page Group list API",
     *      "data":{
     *       "groupId" : "",
     *       "pageGroupName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/PageGrouplist
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    PageGrouplist(limit, offset, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['groupId', 'groupName', 'isActive'];
            const search = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const relations = [];
            const pageGroupList = yield this.pageGroupService.list(limit, offset, select, search, relations, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the group list.',
                data: pageGroupList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Attribute Group
    /**
     * @api {put} /api/page-group/update-page-group/:id Update Page Group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} pageGroupName pageGroupName
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "pageGroupName" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/update-page-group/:id
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    updatePageGroup(id, pageGroupName, status, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const group = yield this.pageGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!group) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid groupId',
                };
                return response.status(400).send(errorResponse);
            }
            group.groupName = pageGroupName;
            group.isActive = status;
            const groupSave = yield this.pageGroupService.create(group);
            if (groupSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated Page Group.',
                    data: groupSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update Page Group',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // delete Page Group API
    /**
     * @api {delete} /api/page-group/delete-page-group/:id Delete Page group API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Page group.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/delete-page-group/:id
     * @apiErrorExample {json} Page error
     * HTTP/1.1 500 Internal Server Error
     */
    deletePageGroup(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pageGroup = yield this.pageGroupService.findOne({
                where: {
                    groupId: id,
                },
            });
            if (!pageGroup) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid pageId',
                };
                return response.status(400).send(errorResponse);
            }
            const page = yield this.pageService.findOne({
                where: {
                    pageGroupId: id,
                },
            });
            if (page) {
                const errorResponse = {
                    status: 0,
                    message: 'pages are mapped for group, so you cannot delete',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteGroup = yield this.pageGroupService.delete(id);
            if (deleteGroup) {
                const successResponse = {
                    status: 1,
                    message: 'Successfullly deleted group.',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    //   Get Page Group API
    /**
     * @api {get} /api/page-group/get-page-group/:id Get Page Group  API
     * @apiGroup Page Group
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get page Group",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/page-group/get-page-group/:id
     * @apiErrorExample {json} Page Group error
     * HTTP/1.1 500 Internal Server Error
     */
    getPageGroup(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const page = yield this.pageGroupService.findOne({ where: { groupId: id } });
            if (!page) {
                const errorResponse = {
                    status: 0,
                    message: ' invalid group Id',
                };
                return response.status(400).send(errorResponse);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully Got page group',
                data: page,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-page-group'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.BodyParam('pageGroupName')), tslib_1.__param(1, routing_controllers_1.BodyParam('status')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupController.prototype, "addAttributeGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/PageGrouplist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('status')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupController.prototype, "PageGrouplist", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-page-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.BodyParam('pageGroupName')), tslib_1.__param(2, routing_controllers_1.BodyParam('status')), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, String, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupController.prototype, "updatePageGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-page-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupController.prototype, "deletePageGroup", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-page-group/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageGroupController.prototype, "getPageGroup", null);
PageGroupController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/page-group'),
    tslib_1.__metadata("design:paramtypes", [PageGroupService_1.PageGroupService, PageService_1.PageService])
], PageGroupController);
exports.PageGroupController = PageGroupController;
//# sourceMappingURL=PageGroupController.js.map