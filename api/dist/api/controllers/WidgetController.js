"use strict";
/*
 * Spurtcommerce PRO
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionalBannerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const WidgetService_1 = require("../services/WidgetService");
const Widget_1 = require("../models/Widget");
const CreateWidgetRequest_1 = require("./requests/CreateWidgetRequest");
const ProductService_1 = require("../services/ProductService");
const WidgetItemService_1 = require("../services/WidgetItemService");
const WidgetItem_1 = require("../models/WidgetItem");
const CategoryPathService_1 = require("../services/CategoryPathService");
let PromotionalBannerController = class PromotionalBannerController {
    constructor(widgetService, widgetItemService, productService, categoryPathService) {
        this.widgetService = widgetService;
        this.widgetItemService = widgetItemService;
        this.productService = productService;
        this.categoryPathService = categoryPathService;
    }
    // Create Banner
    /**
     * @api {post} /api/widget/add-widget Add Widget API
     * @apiGroup Widget
     * @apiParam (Request body) {String} title title
     * @apiParam (Request body) {String} content content
     * @apiParam (Request body) {String} widgetLinkType widgetLinkType 1-> catgeory 2-> product
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {String} refId refId
     * @apiParam (Request body) {String} position position
     * @apiParam (Request body) {Number} status status
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "widgetLinkType" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "position" : "",
     *      "refId" : [],
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Widget is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/add-widget
     * @apiErrorExample {json} Banner error
     * HTTP/1.1 500 Internal Server Error
     */
    createWidget(widgetParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newWidget = new Widget_1.Widget();
            const widgetName = widgetParam.title;
            if (widgetName) {
                const data = widgetName.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const getCustomerSlug = yield this.widgetService.slugData(widgetName, 0);
                if (getCustomerSlug.length === 0) {
                    newWidget.widgetSlugName = data;
                }
                else if (getCustomerSlug.length === 1) {
                    newWidget.widgetSlugName = data + '-' + 1;
                }
                else {
                    const slugVal = getCustomerSlug[getCustomerSlug.length - 1];
                    const value = slugVal.widgetSlugName;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    newWidget.widgetSlugName = data + '-' + (slugNumber + 1);
                }
            }
            newWidget.widgetTitle = widgetParam.title;
            newWidget.widgetDescription = widgetParam.content;
            newWidget.widgetLinkType = widgetParam.widgetLinkType;
            newWidget.metaTagTitle = widgetParam.metaTagTitle;
            newWidget.metaTagKeyword = widgetParam.metaTagKeyword;
            newWidget.metaTagDescription = widgetParam.metaTagDescription;
            newWidget.position = widgetParam.position;
            newWidget.isActive = widgetParam.status;
            const widgetSave = yield this.widgetService.create(newWidget);
            // Add ref item
            if (widgetParam.refId) {
                const relatedItems = widgetParam.refId;
                for (const relatedItem of relatedItems) {
                    const newItem = new WidgetItem_1.WidgetItem();
                    newItem.widgetId = widgetSave.widgetId;
                    newItem.refId = relatedItem;
                    yield this.widgetItemService.create(newItem);
                }
            }
            if (widgetSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created Widget.',
                    data: widgetSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to create ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Widget List
    /**
     * @api {get} /api/widget/widget-list Widget List API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Widget list",
     *      "data":"{
     *      "widgetId": "",
     *      "title": "",
     *      "content": "",
     *      "metaTagTitle": "",
     *      "metaTagDescription": "",
     *      "metaTagKeyword": "",
     *      "widgetlinkType": "",
     *      "position": "",
     *      }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/widget-list
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    widgetList(limit, offset, keyword, status, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['widgetId', 'widgetTitle', 'widgetDescription', 'widgetLinkType', 'position', 'isActive'];
            const search = [
                {
                    name: 'widgetTitle',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const WhereConditions = [];
            const widgetList = yield this.widgetService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got widget count',
                    data: widgetList,
                };
                return response.status(200).send(successRes);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got Widget list',
                data: widgetList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete widget
    /**
     * @api {delete} /api/widget/delete-widget/:id Delete widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "widgetId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted Widget.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/delete-widget/:id
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteWidget(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widget = yield this.widgetService.findOne({
                where: {
                    widgetId: id,
                },
            });
            if (!widget) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid WidgetId',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteWidget = yield this.widgetService.delete(widget);
            if (deleteWidget) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted',
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
    // Update widget
    /**
     * @api {put} /api/widget/update-widget/:id Update widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} title widget title
     * @apiParam (Request body) {String} content widget content
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagkeyword
     * @apiParam (Request body) {String} widgetLinkType widgetLinkType
     * @apiParam (Request body) {Number} position widget position
     * @apiParam (Request body) {String} refId refId
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "title" : "",
     *      "content" : "",
     *      "widgetLinkType" : "",
     *      "metaTagTitle" : "",
     *      "metaTagKeyword" : "",
     *      "metaTagDescription" : "",
     *      "position" : "",
     *      "refId" : "",
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated widget.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/update-widget/:id
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    updateWidget(id, widgetParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widget = yield this.widgetService.findOne({
                where: {
                    widgetId: id,
                },
            });
            if (!widget) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid widgetId',
                };
                return response.status(400).send(errorResponse);
            }
            widget.widgetTitle = widgetParam.title;
            widget.widgetDescription = widgetParam.content;
            widget.widgetLinkType = widgetParam.widgetLinkType;
            widget.position = widgetParam.position;
            widget.metaTagTitle = widgetParam.metaTagTitle;
            widget.metaTagDescription = widgetParam.metaTagDescription;
            widget.metaTagKeyword = widgetParam.metaTagKeyword;
            widget.isActive = widgetParam.status;
            const title = widgetParam.title;
            const data = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            const getWidgetSlug = yield this.widgetService.slugData(title, widget.widgetId);
            if (getWidgetSlug === '' || getWidgetSlug === undefined || getWidgetSlug.length === 0) {
                widget.widgetSlugName = data;
            }
            else if (getWidgetSlug.length === 1 && (title !== getWidgetSlug[getWidgetSlug.length - 1].name)) {
                widget.widgetSlugName = data + '-' + 1;
            }
            else if (getWidgetSlug.length > 1 && getWidgetSlug !== undefined && getWidgetSlug !== '') {
                const slugVal = getWidgetSlug[getWidgetSlug.length - 1];
                const val = slugVal.widgetSlugName;
                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                const slugNumber = parseInt(getSlugInt, 0);
                widget.widgetSlugName = data + '-' + (slugNumber + 1);
            }
            const widgetSave = yield this.widgetService.create(widget);
            // Add ref item
            if (widgetParam.refId) {
                const findProduct = yield this.widgetItemService.findOne({
                    where: {
                        widgetId: widgetSave.widgetId,
                    },
                });
                if (findProduct) {
                    // delete previous related product
                    yield this.widgetItemService.delete({ widgetId: widgetSave.widgetId });
                    const relatedItems = widgetParam.refId;
                    for (const relatedItem of relatedItems) {
                        const newItem = new WidgetItem_1.WidgetItem();
                        newItem.widgetId = widgetSave.widgetId;
                        newItem.refId = relatedItem;
                        yield this.widgetItemService.create(newItem);
                    }
                }
                else {
                    const relatedItems = widgetParam.refId;
                    for (const relatedItem of relatedItems) {
                        const newItem = new WidgetItem_1.WidgetItem();
                        newItem.widgetId = widgetSave.widgetId;
                        newItem.refId = relatedItem;
                        yield this.widgetItemService.create(newItem);
                    }
                }
            }
            if (widgetSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated widget.',
                    data: widgetSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update. ',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Widget Count API
    /**
     * @api {get} /api/widget/widget-count Widget Count API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got widget count",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/widget-count
     * @apiErrorExample {json} widget error
     * HTTP/1.1 500 Internal Server Error
     */
    widgetCount(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const banner = {};
            const select = [];
            const search = [];
            const WhereConditions = [];
            const allWidgetCount = yield this.widgetService.list(0, 0, select, search, WhereConditions, 1);
            const whereConditionsActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const activeWidgetCount = yield this.widgetService.list(0, 0, select, search, whereConditionsActive, 1);
            const whereConditionsInActive = [
                {
                    name: 'isActive',
                    op: 'like',
                    value: 0,
                },
            ];
            const inActiveWidgetCount = yield this.widgetService.list(0, 0, select, search, whereConditionsInActive, 1);
            banner.totalWidget = allWidgetCount;
            banner.activeWidget = activeWidgetCount;
            banner.inActiveWidget = inActiveWidgetCount;
            const successResponse = {
                status: 1,
                message: 'Successfully got count',
                data: banner,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Widget Detail
    /**
     * @api {get} /api/widget/widget-detail Widget Detail API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} widgetId widgetId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got widget detail",
     *      "data": "{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/widget/widget-detail
     * @apiErrorExample {json} widget Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    WidgetDetail(widgetId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const widget = yield this.widgetService.findOne({
                where: {
                    widgetId,
                },
            });
            if (!widget) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid widget Id',
                };
                return response.status(400).send(errorResponse);
            }
            const value = yield this.widgetItemService.find({
                where: {
                    widgetId,
                },
            });
            const arr = [];
            if (widget.widgetLinkType === 2) {
                for (const val of value) {
                    const product = yield this.productService.findOne({
                        select: ['productId', 'sku', 'name', 'quantity', 'price', 'productSlug', 'isActive'],
                        where: {
                            productId: val.refId,
                        },
                    });
                    arr.push(product);
                }
            }
            else {
                for (const val of value) {
                    const select = [
                        'CategoryPath.categoryId as categoryId',
                        'category.sortOrder as sortOrder',
                        'category.parentInt as parentInt',
                        'category.name as name',
                        'category.image as image',
                        'category.imagePath as imagePath',
                        'category.metaTagTitle as metaTagTitle',
                        'category.metaTagDescription as metaTagDescription',
                        'category.metaTagKeyword as metaTagKeyword',
                        'category.isActive as isActive',
                        'category.createdDate as createdDate',
                        'GROUP_CONCAT' + '(' + 'path.name' + ' ' + 'ORDER BY' + ' ' + 'CategoryPath.level' + ' ' + 'SEPARATOR' + " ' " + '>' + " ' " + ')' + ' ' + 'as' + ' ' + 'levels',
                    ];
                    const relations = [
                        {
                            tableName: 'CategoryPath.category',
                            aliasName: 'category',
                        },
                        {
                            tableName: 'CategoryPath.path',
                            aliasName: 'path',
                        },
                    ];
                    const groupBy = [
                        {
                            name: 'CategoryPath.category_id',
                        },
                    ];
                    const whereConditions = [];
                    whereConditions.push({
                        name: 'CategoryPath.categoryId',
                        op: 'or',
                        value: val.refId,
                    });
                    const searchConditions = [];
                    const sort = [];
                    const vendorCategoryList = yield this.categoryPathService.listByQueryBuilder(1, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
                    arr.push(vendorCategoryList[0]);
                }
            }
            widget.refId = arr;
            const successResponse = {
                status: 1,
                message: 'Successfully got widget detail',
                data: widget,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product List for widget API
    /**
     * @api {get} /api/widget/productlist Product List for widget API
     * @apiGroup Widget
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/widget/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    productList(limit, offset, keyword, sku, status, price, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isFeatured', 'todayDeals', 'productSlug', 'isActive'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'sku',
                    op: 'like',
                    value: sku,
                }, {
                    name: 'isActive',
                    op: 'like',
                    value: status,
                },
            ];
            const productLists = yield this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
            if (count) {
                const successRes = {
                    status: 1,
                    message: 'Successfully got count ',
                    data: productLists,
                };
                return response.status(200).send(successRes);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete product list. ',
                data: productLists,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-widget'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateWidgetRequest_1.CreateWidget, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "createWidget", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/widget-list'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('status')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "widgetList", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-widget/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "deleteWidget", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-widget/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Res()), tslib_1.__param(3, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, CreateWidgetRequest_1.CreateWidget, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "updateWidget", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/widget-count'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "widgetCount", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/widget-detail'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('widgetId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "WidgetDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/productlist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('sku')), tslib_1.__param(4, routing_controllers_1.QueryParam('status')), tslib_1.__param(5, routing_controllers_1.QueryParam('price')), tslib_1.__param(6, routing_controllers_1.QueryParam('count')), tslib_1.__param(7, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PromotionalBannerController.prototype, "productList", null);
PromotionalBannerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/widget'),
    tslib_1.__metadata("design:paramtypes", [WidgetService_1.WidgetService, WidgetItemService_1.WidgetItemService, ProductService_1.ProductService,
        CategoryPathService_1.CategoryPathService])
], PromotionalBannerController);
exports.PromotionalBannerController = PromotionalBannerController;
//# sourceMappingURL=WidgetController.js.map