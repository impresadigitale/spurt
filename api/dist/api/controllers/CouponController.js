"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typeorm_1 = require("typeorm");
const VendorCouponService_1 = require("../services/VendorCouponService");
const VendorCoupon_1 = require("../models/VendorCoupon");
const VendorCouponProductCategoryService_1 = require("../services/VendorCouponProductCategoryService");
const VendorCouponProductCategory_1 = require("../models/VendorCouponProductCategory");
const CreateCouponRequest_1 = require("./requests/CreateCouponRequest");
const ProductService_1 = require("../services/ProductService");
const CouponUsageProductService_1 = require("../services/CouponUsageProductService");
const UpdateCouponRequest_1 = require("./requests/UpdateCouponRequest");
const CouponUsageService_1 = require("../services/CouponUsageService");
const ProductImageService_1 = require("../services/ProductImageService");
const ProductSpecialService_1 = require("../services/ProductSpecialService");
const ProductDiscountService_1 = require("../services/ProductDiscountService");
let CouponController = class CouponController {
    constructor(vendorCouponService, vendorCouponProductCategoryService, couponUsageProductService, productService, couponUsageService, productSpecialService, productDiscountService, productImageService) {
        this.vendorCouponService = vendorCouponService;
        this.vendorCouponProductCategoryService = vendorCouponProductCategoryService;
        this.couponUsageProductService = couponUsageProductService;
        this.productService = productService;
        this.couponUsageService = couponUsageService;
        this.productSpecialService = productSpecialService;
        this.productDiscountService = productDiscountService;
        this.productImageService = productImageService;
    }
    // Create Coupon
    /**
     * @api {post} /api/admin-coupon/add-coupon Add Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} couponName couponName
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {String} couponType couponType 1-> percentage 2 -> amount
     * @apiParam (Request body) {Number} discount discount
     * @apiParam (Request body) {Number} minimumPurchaseAmount minimumPurchaseAmount
     * @apiParam (Request body) {Number} maximumPurchaseAmount maximumPurchaseAmount
     * @apiParam (Request body) {Number} couponConjunction couponConjunction 1->yes 0->no
     * @apiParam (Request body) {Number} couponAppliesSales couponAppliesSales 1->yes 0->no
     * @apiParam (Request body) {String} emailRestrictions emailRestrictions
     * @apiParam (Request body) {Number} applicableFor applicableFor 1-> loginUser
     * @apiParam (Request body) {Number} freeShipping freeShipping 1-> yes 0 -> no
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {Number} maxUserPerCoupon maximumUserPerCoupon
     * @apiParam (Request body) {Number} noOfTimeCouponValidPerUser noOfTimeCouponValidPerUser
     * @apiParam (Request body) {Number} allQualifyingItemsApply allQualifyingItemsApply
     * @apiParam (Request body) {Number} appliedCartItemsCount appliedCartItemsCount
     * @apiParam (Request body) {Number} productType productType
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "couponName" : "",
     *      "couponCode" : "",
     *      "couponType" : "",
     *      "discount" : "",
     *      "minimumPurchaseAmount" : "",
     *      "maximumPurchaseAmount" : "",
     *      "couponConjunction" : "",
     *      "couponAppliesSales" : "",
     *      "emailRestrictions" : "",
     *      "applicableFor" : "",
     *      "freeShipping" : "",
     *      "startDate" : "",
     *      "endDate" : "",
     *      "maxUserPerCoupon" : "",
     *      "noOfTimeCouponValidPerUser" : "",
     *      "allQualifyingItemsApply" : "",
     *      "appliedCartItemsCount" : "",
     *      "productType" : [
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *              ],
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Coupon created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/add-coupon
     * @apiErrorExample {json} Coupon error
     * HTTP/1.1 500 Internal Server Error
     */
    createCoupon(couponParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const error = [];
            const orderProducts = couponParam.productType;
            for (const val of orderProducts) {
                // let product = [];
                const product = val.referenceId;
                for (const productId of product) {
                    const value = yield this.productService.findOne({ where: { productId } });
                    if (couponParam.couponType === 2) {
                        if (+value.price < couponParam.discount) {
                            error.push(1);
                        }
                    }
                }
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Product, Product price is less than discount',
                };
                return response.status(400).send(errResponse);
            }
            const vendorCouponCode = yield this.vendorCouponService.findOne({ where: { couponCode: couponParam.couponCode } });
            if (vendorCouponCode) {
                const errorResponse = {
                    status: 1,
                    message: 'Already there is a coupon with this code.',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorCoupon = new VendorCoupon_1.VendorCoupon();
            vendorCoupon.vendorId = 0;
            vendorCoupon.couponName = couponParam.couponName;
            vendorCoupon.couponCode = couponParam.couponCode;
            vendorCoupon.couponType = couponParam.couponType ? couponParam.couponType : 1;
            vendorCoupon.discount = couponParam.discount;
            vendorCoupon.minimumPurchaseAmount = couponParam.minimumPurchaseAmount;
            vendorCoupon.maximumPurchaseAmount = couponParam.maximumPurchaseAmount;
            vendorCoupon.couponConjunction = couponParam.couponConjunction;
            vendorCoupon.couponAppliesSales = couponParam.couponAppliesSales;
            vendorCoupon.isActive = couponParam.status;
            vendorCoupon.emailRestrictions = couponParam.emailRestrictions;
            vendorCoupon.freeShipping = couponParam.freeShipping ? couponParam.freeShipping : 0;
            vendorCoupon.startDate = couponParam.startDate;
            vendorCoupon.endDate = couponParam.endDate;
            vendorCoupon.maxUserPerCoupon = couponParam.maxUserPerCoupon;
            vendorCoupon.noOfTimeCouponValidUser = couponParam.noOfTimeCouponValidPerUser;
            vendorCoupon.allQualifyingItemsApply = couponParam.allQualifyingItemsApply ? couponParam.appliedCartItemsCount : 0;
            vendorCoupon.appliedCartItemsCount = couponParam.appliedCartItemsCount ? couponParam.appliedCartItemsCount : 0;
            const createVendorCoupon = yield this.vendorCouponService.create(vendorCoupon);
            let reference = [];
            reference = couponParam.productType;
            for (const record of reference) {
                let productId = [];
                productId = record.referenceId;
                for (const rec of productId) {
                    const vendorCouponProductCategory = new VendorCouponProductCategory_1.VendorCouponProductCategory();
                    vendorCouponProductCategory.type = record.type;
                    vendorCouponProductCategory.vendorCouponId = createVendorCoupon.vendorCouponId;
                    vendorCouponProductCategory.referenceId = rec;
                    yield this.vendorCouponProductCategoryService.create(vendorCouponProductCategory);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Coupon Created Successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Coupon List API
    /**
     * @api {get} /api/admin-coupon/admin-coupon-list Admin Vendor Coupon List API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword Enter Coupon Name
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "keyword" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Vendor Coupon List Successfully"
     *      "data" : "{ }"
     * }
     * @apiSampleRequest /api/admin-coupon/admin-coupon-list
     * @apiErrorExample {json}  Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    listVendorCoupon(limit, offset, keyword, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['vendorCouponId', 'vendorId', 'couponName', 'couponCode', 'couponType', 'discount', 'startDate', 'endDate', 'isActive'];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: 0,
                },
            ];
            const search = [
                {
                    name: 'couponName',
                    op: 'like',
                    value: keyword,
                },
            ];
            const listVendorCoupon = yield this.vendorCouponService.list(limit, offset, select, search, WhereConditions, count);
            if (listVendorCoupon.length >= 0) {
                const list = listVendorCoupon.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const couponUsage = yield this.couponUsageService.findAll({
                        select: ['couponUsageId'],
                        where: {
                            couponId: value.vendorCouponId,
                        },
                    });
                    temp.orders = couponUsage.length;
                    const date2 = new Date(temp.endDate);
                    const nowDate = new Date();
                    const days = date2.getTime() - nowDate.getTime();
                    const daysDifference = days / (1000 * 3600 * 24);
                    if (temp.endDate >= nowDate) {
                        temp.leftDays = Math.round(daysDifference);
                    }
                    else {
                        temp.leftDays = 'Expired';
                    }
                    return temp;
                }));
                const results = yield Promise.all(list);
                const successResponse = {
                    status: 1,
                    message: 'Successfully got vendor Coupon list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got vendor Coupon list',
                    data: listVendorCoupon,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Coupon Usage List API
    /**
     * @api {get} /api/admin-coupon/coupon-usage-list Coupon Usage list API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} couponId couponId
     * @apiParam (Request body) {Number} count Count should be number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset" : "",
     *      "couponId" : "",
     *      "count" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "coupon usage List Successfully"
     *      "data" : "{ }"
     * }
     * @apiSampleRequest /api/admin-coupon/coupon-usage-list
     * @apiErrorExample {json} Vendor Coupon List API error
     * HTTP/1.1 500 Internal Server Error
     */
    CouponUsageList(limit, offset, couponId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = [
                'CouponUsageProduct.couponUsageId as couponUsageId',
                'CouponUsageProduct.orderId as orderId',
                'CouponUsageProduct.customerId as customerId',
                'CouponUsageProduct.orderProductId as orderProductId',
                'CouponUsageProduct.quantity as quantity',
                'CouponUsageProduct.amount as amount',
                'CouponUsageProduct.discountAmount as discountAmount',
                'orderProduct.name as productName',
                'orderProduct.orderProductId as orderProductId',
                'orderProduct.orderProductPrefixId as orderProductPrefixId',
                'order.orderId as orderId',
                'order.shippingFirstname as shippingFirstName',
            ];
            const relations = [
                {
                    tableName: 'CouponUsageProduct.orderProduct',
                    aliasName: 'orderProduct',
                },
                {
                    tableName: 'CouponUsageProduct.couponUsage',
                    aliasName: 'couponUsage',
                },
                {
                    tableName: 'CouponUsageProduct.order',
                    aliasName: 'order',
                },
            ];
            const groupBy = [];
            const whereConditions = [];
            whereConditions.push({
                name: 'couponUsage.couponId',
                op: 'and',
                value: couponId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'CouponUsageProduct.createdDate',
                order: 'DESC',
            });
            if (count) {
                const listCouponCount = yield this.couponUsageProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
                const countResponse = {
                    status: 1,
                    message: 'Successfully got Coupon Usage count',
                    data: listCouponCount,
                };
                return response.status(200).send(countResponse);
            }
            const listVendorCoupon = yield this.couponUsageProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
            const list = listVendorCoupon.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = value;
                temp.discountedPrice = value.amount - (+value.discountAmount);
                return temp;
            }));
            const results = yield Promise.all(list);
            const successResponse = {
                status: 1,
                message: 'Successfully got coupon Usage list',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Vendor Coupon Detail API
    /**
     * @api {get} /api/admin-coupon/coupon-detail Coupon Detail API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} vendorCouponId VendorCouponId
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1",
     *      "message": "Successfully got vendor coupon detail",
     *      "data" : "{ }"
     * }
     * @apiSampleRequest /api/admin-coupon/coupon-detail
     * @apiErrorExample {json} Vendor Coupon Detail API error
     * HTTP/1.1 500 Internal Server Error
     */
    couponDetail(vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const coupon = yield this.vendorCouponService.findOne({
                where: {
                    vendorCouponId,
                },
            });
            if (!coupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid VendorCouponId',
                };
                return response.status(400).send(errorResponse);
            }
            const couponProduct = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    vendorCouponId,
                },
            });
            const applicableProduct = [];
            // type 1 applicable product
            for (const data of couponProduct) {
                const obj = {};
                if (data.type === 1) {
                    const product = yield this.productService.findOne({
                        select: ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isFeatured', 'todayDeals', 'productSlug', 'isActive'],
                        where: {
                            productId: data.referenceId,
                        },
                    });
                    if (product) {
                        obj.productId = product.productId;
                        obj.sku = product.sku;
                        obj.name = product.name;
                        obj.quantity = product.quantity;
                        obj.price = product.price;
                        obj.image = product.image;
                        obj.imagePath = product.imagePath;
                        obj.isFeatured = product.isFeatured;
                        obj.todayDeals = product.todayDeals;
                        obj.productSlug = product.productSlug;
                        obj.isActive = product.isActive;
                        const defaultValue = yield this.productImageService.findOne({
                            where: {
                                productId: product.productId,
                                defaultImage: 1,
                            },
                        });
                        obj.productImage = defaultValue;
                        const nowDate = new Date();
                        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPrice(product.productId, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPrice(product.productId, todaydate);
                        if (productSpecial !== undefined) {
                            obj.pricerefer = productSpecial.price;
                            obj.flag = 1;
                        }
                        else if (productDiscount !== undefined) {
                            obj.pricerefer = productDiscount.price;
                            obj.flag = 0;
                        }
                        applicableProduct.push(obj);
                    }
                }
            }
            coupon.applicableProduct = applicableProduct;
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor Coupon Detail. ',
                data: coupon,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Update Vendor Coupon
    /**
     * @api {put} /api/admin-coupon/update-coupon/:vendorCouponId Edit Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} couponName couponName
     * @apiParam (Request body) {String} couponCode couponCode
     * @apiParam (Request body) {String} couponType couponType 1-> percentage 2 -> amount
     * @apiParam (Request body) {Number} discount discount
     * @apiParam (Request body) {Number} minimumPurchaseAmount minimumPurchaseAmount
     * @apiParam (Request body) {Number} maximumPurchaseAmount maximumPurchaseAmount
     * @apiParam (Request body) {Number} couponConjunction couponConjunction 1->yes 0->no
     * @apiParam (Request body) {Number} couponAppliesSales couponAppliesSales 1->yes 0->no
     * @apiParam (Request body) {String} emailRestrictions emailRestrictions
     * @apiParam (Request body) {Number} applicableFor applicableFor 1-> loginUser
     * @apiParam (Request body) {Number} freeShipping freeShipping 1-> yes 0 -> no
     * @apiParam (Request body) {String} startDate startDate
     * @apiParam (Request body) {String} endDate endDate
     * @apiParam (Request body) {Number} maxUserPerCoupon maximumUserPerCoupon
     * @apiParam (Request body) {Number} noOfTimeCouponValidPerUser noOfTimeCouponValidPerUser
     * @apiParam (Request body) {Number} allQualifyingItemsApply allQualifyingItemsApply
     * @apiParam (Request body) {Number} appliedCartItemsCount appliedCartItemsCount
     * @apiParam (Request body) {Number} productType productType
     * @apiParam (Request body) {Number} status status
     * @apiParamExample {json} Input
     * {
     *      "couponName" : "",
     *      "couponCode" : "",
     *      "couponType" : "",
     *      "discount" : "",
     *      "minimumPurchaseAmount" : "",
     *      "maximumPurchaseAmount" : "",
     *      "couponConjunction" : "",
     *      "couponAppliesSales" : "",
     *      "emailRestrictions" : "",
     *      "applicableFor" : "",
     *      "freeShipping" : "",
     *      "startDate" : "",
     *      "endDate" : "",
     *      "maxUserPerCoupon" : "",
     *      "noOfTimeCouponValidPerUser" : "",
     *      "allQualifyingItemsApply" : "",
     *      "appliedCartItemsCount" : "",
     *      "productType" : [
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *                {"type": "","referenceId":["",""]},
     *              ],
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Coupon updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/update-coupon/:vendorCouponId
     * @apiErrorExample {json} Coupon error
     * HTTP/1.1 500 Internal Server Error
     */
    updateCoupon(couponParam, vendorCouponId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const error = [];
            const orderProducts = couponParam.productType;
            for (const val of orderProducts) {
                const product = val.referenceId;
                for (const productId of product) {
                    const value = yield this.productService.findOne({ where: { productId } });
                    if (couponParam.couponType === 2) {
                        if (+value.price < couponParam.discount) {
                            error.push(1);
                        }
                    }
                }
            }
            if (error.length > 0) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid Product, Product price is less than discount',
                };
                return response.status(400).send(errResponse);
            }
            const vendorCoupon = yield this.vendorCouponService.findOne({ where: { vendorCouponId } });
            if (!vendorCoupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id',
                };
                return response.status(400).send(errorResponse);
            }
            vendorCoupon.vendorId = 0;
            vendorCoupon.couponName = couponParam.couponName;
            vendorCoupon.couponCode = couponParam.couponCode;
            vendorCoupon.couponType = couponParam.couponType ? couponParam.couponType : 1;
            vendorCoupon.discount = couponParam.discount;
            vendorCoupon.minimumPurchaseAmount = couponParam.minimumPurchaseAmount;
            vendorCoupon.maximumPurchaseAmount = couponParam.maximumPurchaseAmount;
            vendorCoupon.couponConjunction = couponParam.couponConjunction;
            vendorCoupon.couponAppliesSales = couponParam.couponAppliesSales;
            vendorCoupon.isActive = couponParam.status;
            vendorCoupon.emailRestrictions = couponParam.emailRestrictions;
            vendorCoupon.freeShipping = couponParam.freeShipping ? couponParam.freeShipping : 0;
            vendorCoupon.startDate = couponParam.startDate;
            vendorCoupon.endDate = couponParam.endDate;
            vendorCoupon.maxUserPerCoupon = couponParam.maxUserPerCoupon;
            vendorCoupon.noOfTimeCouponValidUser = couponParam.noOfTimeCouponValidPerUser;
            vendorCoupon.allQualifyingItemsApply = couponParam.allQualifyingItemsApply ? couponParam.allQualifyingItemsApply : 0;
            vendorCoupon.appliedCartItemsCount = couponParam.appliedCartItemsCount ? couponParam.appliedCartItemsCount : 0;
            const vendorCouponCode = yield this.vendorCouponService.findOne({
                where: {
                    couponCode: couponParam.couponCode,
                    vendorCouponId: typeorm_1.Not(vendorCouponId),
                },
            });
            if (vendorCouponCode) {
                const errorResponse = {
                    status: 1,
                    message: 'Already there is a coupon with this code.',
                };
                return response.status(400).send(errorResponse);
            }
            const createVendorCoupon = yield this.vendorCouponService.update(vendorCoupon.vendorCouponId, vendorCoupon);
            const couponProduct = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    vendorCouponId,
                },
            });
            if (!couponProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.vendorCouponProductCategoryService.delete(couponProduct);
            let reference = [];
            reference = couponParam.productType;
            for (const record of reference) {
                let productId = [];
                productId = record.referenceId;
                for (const rec of productId) {
                    const vendorCouponProductCategory = new VendorCouponProductCategory_1.VendorCouponProductCategory();
                    vendorCouponProductCategory.type = record.type;
                    vendorCouponProductCategory.vendorCouponId = createVendorCoupon.vendorCouponId;
                    vendorCouponProductCategory.referenceId = rec;
                    yield this.vendorCouponProductCategoryService.create(vendorCouponProductCategory);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Coupon Updated Successfully.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Delete Vendor Coupon API
    /**
     * @api {delete} /api/admin-coupon/delete-coupon/:vendorCouponId Delete Vendor Coupon API
     * @apiGroup Admin Coupon
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendorCouponId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted vendor coupon.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/admin-coupon/delete-coupon/:vendorCouponId
     * @apiErrorExample {json} Delete Vendor Coupon API error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteVendorCoupon(vendorCouponId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorCoupon = yield this.vendorCouponService.findOne({
                where: {
                    vendorCouponId,
                },
            });
            if (!vendorCoupon) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Vendor Coupon Id',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteVendorCoupon = yield this.vendorCouponService.delete(vendorCoupon);
            if (deleteVendorCoupon) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted Coupon',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete Coupon',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-coupon'),
    routing_controllers_1.Authorized(''),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCouponRequest_1.CreateCouponRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "createCoupon", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/admin-coupon-list'),
    routing_controllers_1.Authorized(' '),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "listVendorCoupon", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/coupon-usage-list'),
    routing_controllers_1.Authorized(''),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('couponId')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "CouponUsageList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/coupon-detail'),
    routing_controllers_1.Authorized(' '),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorCouponId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "couponDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-coupon/:vendorCouponId'),
    routing_controllers_1.Authorized(''),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Param('vendorCouponId')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UpdateCouponRequest_1.UpdateCouponRequest, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "updateCoupon", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-coupon/:vendorCouponId'),
    routing_controllers_1.Authorized(''),
    tslib_1.__param(0, routing_controllers_1.Param('vendorCouponId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CouponController.prototype, "deleteVendorCoupon", null);
CouponController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/admin-coupon'),
    tslib_1.__metadata("design:paramtypes", [VendorCouponService_1.VendorCouponService,
        VendorCouponProductCategoryService_1.VendorCouponProductCategoryService,
        CouponUsageProductService_1.CouponUsageProductService,
        ProductService_1.ProductService,
        CouponUsageService_1.CouponUsageService,
        ProductSpecialService_1.ProductSpecialService,
        ProductDiscountService_1.ProductDiscountService,
        ProductImageService_1.ProductImageService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=CouponController.js.map