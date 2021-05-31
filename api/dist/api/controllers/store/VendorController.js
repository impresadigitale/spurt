"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorStoreController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const CountryService_1 = require("../../services/CountryService");
const VendorService_1 = require("../../services/VendorService");
const VendorProductService_1 = require("../../services/VendorProductService");
const ProductImageService_1 = require("../../services/ProductImageService");
const ProductSpecialService_1 = require("../../services/ProductSpecialService");
const ProductDiscountService_1 = require("../../services/ProductDiscountService");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const CustomerWishlistService_1 = require("../../services/CustomerWishlistService");
const ProductService_1 = require("../../services/ProductService");
const DeliveryLocationService_1 = require("../../services/DeliveryLocationService");
const TaxService_1 = require("../../services/TaxService");
const RatingService_1 = require("../../services/RatingService");
const SkuService_1 = require("../../services/SkuService");
const ProductVarientOptionService_1 = require("../../services/ProductVarientOptionService");
let VendorStoreController = class VendorStoreController {
    constructor(vendorService, vendorProductService, countryService, productSpecialService, productDiscountService, customerWishlistService, productService, deliveryLocationService, taxService, productRatingService, skuService, productVarientOptionService, productImageService) {
        this.vendorService = vendorService;
        this.vendorProductService = vendorProductService;
        this.countryService = countryService;
        this.productSpecialService = productSpecialService;
        this.productDiscountService = productDiscountService;
        this.customerWishlistService = customerWishlistService;
        this.productService = productService;
        this.deliveryLocationService = deliveryLocationService;
        this.taxService = taxService;
        this.productRatingService = productRatingService;
        this.skuService = skuService;
        this.productVarientOptionService = productVarientOptionService;
        this.productImageService = productImageService;
    }
    // Get vendor Detail API
    /**
     * @api {get} /api/vendor-store/vendor-details/:vendorPrefixId Vendor Details API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor Details",
     * "data":{
     * "vendorId" : "",
     * "firstName" : "",
     * "lastName" : "",
     * "email" : "",
     * "mobileNumber" : "",
     * "avatar" : "",
     * "avatarPath" : "",
     * "commission" : "",
     * "status" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-details/:vendorPrefixId
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    storeVendorDetails(vendorPrefixId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.vendorService.findOne({
                select: ['vendorId', 'vendorPrefixId', 'companyLogo', 'companyLogoPath', 'companyCoverImage', 'companyCoverImagePath', 'companyName',
                    'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId',
                    'pincode', 'companyEmailId', 'companyWebsite', 'vendorSlugName'],
                where: { vendorPrefixId },
            });
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'InValid vendor ',
                    data: vendor,
                };
                return response.status(400).send(errorResponse);
            }
            const country = yield this.countryService.findOne({
                select: ['name'],
                where: { countryId: vendor.companyCountryId },
            });
            if (country) {
                vendor.countryName = country.name;
            }
            else {
                vendor.countryName = '';
            }
            const products = yield this.vendorProductService.findVendorActiveProduct(vendor.vendorId, 0, 0);
            const rating = yield this.productRatingService.consolidateRatingForVendor(vendor.vendorId);
            if (rating.RatingCount === '0') {
                vendor.rating = 0;
            }
            else {
                const overAllRating = rating.RatingSum / rating.RatingCount;
                vendor.rating = overAllRating.toFixed(2);
            }
            vendor.productCount = products.length;
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor details. ',
                data: vendor,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get vendor Product list API
    /**
     * @api {get} /api/vendor-store/vendor-product-list/:id Vendor Product list API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiParam {Number} limit
     * @apiParam {Number} offset
     * @apiParam {Count} count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully get vendor product list",
     * "data":{
     * "productId" : "",
     * "name" : "",
     * }
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-product-list/:id
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    storeVendorProductList(Id, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield this.vendorProductService.findVendorActiveProduct(Id, limit, offset);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'successfully got Vendor Product List. ',
                    data: products.length,
                });
            }
            const productList = [];
            for (const product of products) {
                const obj = {};
                const productDetail = yield this.productService.findOne({
                    select: ['productId', 'name', 'description', 'productSlug', 'rating', 'quantity', 'price', 'taxType', 'taxValue', 'hasStock', 'outOfStockThreshold', 'metaTagTitle', 'isSimplified', 'skuId',
                        'metaTagDescription', 'metaTagKeyword', 'keywords', 'isActive', 'upc', 'sku', 'sortOrder', 'manufacturerId', 'stockStatusId'],
                    where: {
                        productId: product.productId,
                    },
                });
                obj.productId = productDetail.productId;
                obj.name = productDetail.name;
                obj.description = productDetail.description;
                obj.price = productDetail.price;
                obj.rating = productDetail.rating;
                const productImage = yield this.productImageService.findOne({
                    where: {
                        productId: product.productId,
                        defaultImage: 1,
                    },
                });
                obj.Images = productImage;
                obj.productSlug = productDetail.productSlug;
                obj.quantity = productDetail.quantity;
                obj.metaTagDescription = productDetail.metaTagDescription;
                obj.metaTagKeyword = productDetail.metaTagKeyword;
                obj.keywords = productDetail.keywords;
                obj.isActive = productDetail.isActive;
                obj.metaTagTitle = productDetail.metaTagTitle;
                obj.upc = productDetail.upc;
                obj.sku = productDetail.sku;
                obj.sortOrder = productDetail.sortOrder;
                obj.manufacturerId = productDetail.manufacturerId;
                obj.stockStatusId = productDetail.stockStatusId;
                obj.isSimplified = productDetail.isSimplified;
                obj.taxType = productDetail.taxType;
                if (productDetail.taxType === 2) {
                    const tax = yield this.taxService.findOne({ taxId: productDetail.taxValue });
                    obj.taxValue = tax.taxPercentage;
                }
                else {
                    obj.taxValue = productDetail.taxValue;
                }
                obj.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                if (productDetail.isSimplified === 1) {
                    skuValue = yield this.skuService.findOne({ id: productDetail.skuId });
                    if (skuValue) {
                        obj.price = skuValue.price;
                        obj.skuName = skuValue.skuName;
                        skuId = skuValue.id;
                        if (productDetail.hasStock === 1) {
                            if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                                obj.stockStatus = 'outOfStock';
                            }
                            else {
                                obj.stockStatus = 'inStock';
                            }
                        }
                        else {
                            obj.stockStatus = 'inStock';
                        }
                    }
                }
                else {
                    skuValue = yield this.productVarientOptionService.findOne({ productId: productDetail.productId, isActive: 1 });
                    if (skuValue) {
                        const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                        obj.price = productVarientSku.price;
                        obj.skuName = productVarientSku.skuName;
                        skuId = productVarientSku.id;
                        if (productDetail.hasStock === 1) {
                            if (productVarientSku.quantity <= productVarientSku.outOfStockThreshold) {
                                obj.stockStatus = 'outOfStock';
                            }
                            else {
                                obj.stockStatus = 'inStock';
                            }
                        }
                        else {
                            obj.stockStatus = 'inStock';
                        }
                    }
                    else {
                        const sku = yield this.skuService.findOne({ id: productDetail.skuId });
                        if (sku) {
                            obj.price = sku.price;
                            obj.skuName = sku.skuName;
                            skuId = sku.id;
                            if (productDetail.hasStock === 1) {
                                if (sku.quantity <= sku.outOfStockThreshold) {
                                    obj.stockStatus = 'outOfStock';
                                }
                                else {
                                    obj.stockStatus = 'inStock';
                                }
                            }
                            else {
                                obj.stockStatus = 'inStock';
                            }
                        }
                    }
                }
                if (skuId) {
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
                    const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
                    if (productSpecial !== undefined) {
                        obj.pricerefer = productSpecial.price;
                        obj.flag = 1;
                    }
                    else if (productDiscount !== undefined) {
                        obj.pricerefer = productDiscount.price;
                        obj.flag = 0;
                    }
                    else {
                        obj.pricerefer = '';
                        obj.flag = '';
                    }
                }
                else {
                    obj.pricerefer = '';
                    obj.flag = '';
                }
                if (request.header('authorization')) {
                    const userId = jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                    const userUniqueId = Object.keys(userId).map((key) => {
                        return [(key), userId[key]];
                    });
                    const wishStatus = yield this.customerWishlistService.findOne({
                        where: {
                            productId: product.productId,
                            customerId: userUniqueId[0][1],
                        },
                    });
                    if (wishStatus) {
                        obj.wishListStatus = 1;
                    }
                    else {
                        obj.wishListStatus = 0;
                    }
                }
                else {
                    obj.wishListStatus = 0;
                }
                productList.push(obj);
            }
            const successResponse = {
                status: 1,
                message: 'successfully got Vendor Product List. ',
                data: productList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // check pincode availability API
    /**
     * @api {get} /api/vendor-store/check-pincode-availability check pincode availability API
     * @apiGroup vendor store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} pincode pincode
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully checked availability",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/check-pincode-availability
     * @apiErrorExample {json} check pincode availability error
     * HTTP/1.1 500 Internal Server Error
     */
    checkAvailability(productId, pincode, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productData = yield this.productService.findOne({ where: { productId } });
            if (!productData) {
                return response.status(400).send({
                    status: 0,
                    message: 'Invalid ProductId',
                });
            }
            let deliveryLocation;
            const orderData = yield this.vendorProductService.findOne({ where: { productId } });
            if (orderData) {
                deliveryLocation = yield this.deliveryLocationService.findOne({ where: { zipCode: pincode, vendorId: orderData.vendorId } });
            }
            else {
                deliveryLocation = yield this.deliveryLocationService.findOne({ where: { zipCode: pincode, vendorId: 0 } });
            }
            if (deliveryLocation) {
                const successResponse = {
                    status: 1,
                    message: 'Available',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successResponse = {
                    status: 0,
                    message: 'Not Available',
                };
                return response.status(400).send(successResponse);
            }
        });
    }
    // Vendor Product Review list API
    /**
     * @api {get} /api/vendor-store/vendor-product-review-list vendor product review List
     * @apiGroup vendor store
     * @apiParam (Request body) {Number} vendorId vendorId
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you Vendor Product Review list show successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-store/vendor-product-review-list
     * @apiErrorExample {json} Vendor Product Review List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Vendor Product Review list Function
    vendorProductRatingList(vendorId, limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorDetail = yield this.vendorService.findOne({
                vendorId,
            });
            if (!vendorDetail) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid vendorId.',
                };
                return response.status(400).send(errorResponse);
            }
            const selects = ['ProductRating.review as review',
                'ProductRating.rating as rating',
                'ProductRating.productId as productId',
                'ProductRating.createdDate as createdDate',
                'ProductRating.firstName as firstName',
                'ProductRating.lastName as lastName',
                'ProductRating.customerId as customerId',
                'ProductRating.isActive as isActive',
                'customer.avatar as avatar',
                'customer.avatarPath as avatarPath',
            ];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            relations.push({
                tableName: 'ProductRating.product',
                aliasName: 'product',
            }, {
                tableName: 'product.vendorProducts',
                aliasName: 'vendorProducts',
            }, {
                tableName: 'ProductRating.customer',
                aliasName: 'customer',
            });
            whereCondition.push({
                name: 'ProductRating.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'product.isActive',
                op: 'and',
                value: 1,
            }, {
                name: 'vendorProducts.vendorId',
                op: 'and',
                value: vendorId,
            });
            const searchConditions = [];
            const sort = [];
            sort.push({
                name: 'ProductRating.createdDate',
                order: 'DESC',
            });
            if (count) {
                const ratingCountList = yield this.productRatingService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const countResponse = {
                    status: 1,
                    message: 'Successfully Got count',
                    data: ratingCountList,
                };
                return response.status(200).send(countResponse);
            }
            const ratingList = yield this.productRatingService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const successResponse = {
                status: 1,
                message: 'Successfully got rating list',
                data: ratingList,
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-details/:vendorPrefixId'),
    tslib_1.__param(0, routing_controllers_1.Param('vendorPrefixId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "storeVendorDetails", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-product-list/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.QueryParam('limit')), tslib_1.__param(2, routing_controllers_1.QueryParam('offset')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "storeVendorProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/check-pincode-availability'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('productId')), tslib_1.__param(1, routing_controllers_1.QueryParam('pincode')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "checkAvailability", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-product-review-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('vendorId')), tslib_1.__param(1, routing_controllers_1.QueryParam('limit')), tslib_1.__param(2, routing_controllers_1.QueryParam('offset')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorStoreController.prototype, "vendorProductRatingList", null);
VendorStoreController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/vendor-store'),
    tslib_1.__metadata("design:paramtypes", [VendorService_1.VendorService,
        VendorProductService_1.VendorProductService,
        CountryService_1.CountryService,
        ProductSpecialService_1.ProductSpecialService,
        ProductDiscountService_1.ProductDiscountService,
        CustomerWishlistService_1.CustomerWishlistService,
        ProductService_1.ProductService,
        DeliveryLocationService_1.DeliveryLocationService,
        TaxService_1.TaxService,
        RatingService_1.ProductRatingService,
        SkuService_1.SkuService,
        ProductVarientOptionService_1.ProductVarientOptionService,
        ProductImageService_1.ProductImageService])
], VendorStoreController);
exports.VendorStoreController = VendorStoreController;
//# sourceMappingURL=VendorController.js.map