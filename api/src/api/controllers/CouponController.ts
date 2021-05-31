/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post,
    Body,
    JsonController,
    Authorized,
    Req,
    Res,
    Get,
    QueryParam,
    Param,
    Put,
    Delete,
} from 'routing-controllers';
import { Not } from 'typeorm';
import { VendorCouponService } from '../services/VendorCouponService';
import { VendorCoupon } from '../models/VendorCoupon';
import { VendorCouponProductCategoryService } from '../services/VendorCouponProductCategoryService';
import { VendorCouponProductCategory } from '../models/VendorCouponProductCategory';
import { CreateCouponRequest } from './requests/CreateCouponRequest';
import { ProductService } from '../services/ProductService';
import { CouponUsageProductService } from '../services/CouponUsageProductService';
import { UpdateCouponRequest } from './requests/UpdateCouponRequest';
import { CouponUsageService } from '../services/CouponUsageService';
import { ProductImageService } from '../services/ProductImageService';
import { ProductSpecialService } from '../services/ProductSpecialService';
import { ProductDiscountService } from '../services/ProductDiscountService';

@JsonController('/admin-coupon')
export class CouponController {
    constructor(private vendorCouponService: VendorCouponService,
                private vendorCouponProductCategoryService: VendorCouponProductCategoryService,
                private couponUsageProductService: CouponUsageProductService,
                private productService: ProductService,
                private couponUsageService: CouponUsageService,
                private productSpecialService: ProductSpecialService,
                private productDiscountService: ProductDiscountService,
                private productImageService: ProductImageService
    ) {
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
    @Post('/add-coupon')
    @Authorized('')
    public async createCoupon(@Body({ validate: true }) couponParam: CreateCouponRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const error: any = [];
        const orderProducts: any = couponParam.productType;
        for (const val of orderProducts) {
            // let product = [];
            const product: any = val.referenceId;
            for (const productId of product) {
                const value = await this.productService.findOne({ where: { productId } });
                if (couponParam.couponType === 2) {
                    if (+value.price < couponParam.discount) {
                        error.push(1);
                    }
                }
            }
        }
        if (error.length > 0) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Product, Product price is less than discount',
            };
            return response.status(400).send(errResponse);
        }
        const vendorCouponCode = await this.vendorCouponService.findOne({ where: { couponCode: couponParam.couponCode } });
        if (vendorCouponCode) {
            const errorResponse: any = {
                status: 1,
                message: 'Already there is a coupon with this code.',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorCoupon: any = new VendorCoupon();
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
        const createVendorCoupon = await this.vendorCouponService.create(vendorCoupon);
        let reference: any = [];
        reference = couponParam.productType;
        for (const record of reference) {
            let productId = [];
            productId = record.referenceId;
            for (const rec of productId) {
                const vendorCouponProductCategory: any = new VendorCouponProductCategory();
                vendorCouponProductCategory.type = record.type;
                vendorCouponProductCategory.vendorCouponId = createVendorCoupon.vendorCouponId;
                vendorCouponProductCategory.referenceId = rec;
                await this.vendorCouponProductCategoryService.create(vendorCouponProductCategory);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Coupon Created Successfully.',
        };
        return response.status(200).send(successResponse);
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
    @Get('/admin-coupon-list')
    @Authorized(' ')
    public async listVendorCoupon(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
        const listVendorCoupon: any = await this.vendorCouponService.list(limit, offset, select, search, WhereConditions, count);
        if (listVendorCoupon.length >= 0) {
            const list = listVendorCoupon.map(async (value: any) => {
                const temp: any = value;
                const couponUsage = await this.couponUsageService.findAll({
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
                } else {
                    temp.leftDays = 'Expired';
                }
                return temp;
            });
            const results = await Promise.all(list);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got vendor Coupon list',
                data: results,
            };
            return response.status(200).send(successResponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got vendor Coupon list',
                data: listVendorCoupon,
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/coupon-usage-list')
    @Authorized('')
    public async CouponUsageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('couponId') couponId: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
            const listCouponCount: any = await this.couponUsageProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, true, true);
            const countResponse: any = {
                status: 1,
                message: 'Successfully got Coupon Usage count',
                data: listCouponCount,
            };
            return response.status(200).send(countResponse);
        }

        const listVendorCoupon: any = await this.couponUsageProductService.listByQueryBuilder(limit, offset, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        const list = listVendorCoupon.map(async (value: any) => {
            const temp: any = value;
            temp.discountedPrice = value.amount - (+value.discountAmount);
            return temp;
        });
        const results = await Promise.all(list);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got coupon Usage list',
            data: results,
        };
        return response.status(200).send(successResponse);
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
    @Get('/coupon-detail')
    @Authorized(' ')
    public async couponDetail(@QueryParam('vendorCouponId') vendorCouponId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const coupon = await this.vendorCouponService.findOne({
            where: {
                vendorCouponId,
            },
        });
        if (!coupon) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid VendorCouponId',
            };
            return response.status(400).send(errorResponse);
        }
        const couponProduct = await this.vendorCouponProductCategoryService.findAll({
            where: {
                vendorCouponId,
            },
        });
        const applicableProduct: any = [];
        // type 1 applicable product
        for (const data of couponProduct) {
            const obj: any = {};
            if (data.type === 1) {
                const product = await this.productService.findOne({
                    select: ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'isFeatured', 'todayDeals','carPark', 'productSlug', 'isActive'],
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
                    obj.carParkDeals = product.carPark;
                    obj.productSlug = product.productSlug;
                    obj.isActive = product.isActive;
                    const defaultValue = await this.productImageService.findOne({
                        where: {
                            productId: product.productId,
                            defaultImage: 1,
                        },
                    });
                    obj.productImage = defaultValue;
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPrice(product.productId, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPrice(product.productId, todaydate);
                    if (productSpecial !== undefined) {
                        obj.pricerefer = productSpecial.price;
                        obj.flag = 1;
                    } else if (productDiscount !== undefined) {
                        obj.pricerefer = productDiscount.price;
                        obj.flag = 0;
                    }
                    applicableProduct.push(obj);
                }
            }
        }
        coupon.applicableProduct = applicableProduct;
        const successResponse: any = {
            status: 1,
            message: 'successfully got Vendor Coupon Detail. ',
            data: coupon,
        };
        return response.status(200).send(successResponse);
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
    @Put('/update-coupon/:vendorCouponId')
    @Authorized('')
    public async updateCoupon(@Body({ validate: true }) couponParam: UpdateCouponRequest, @Param('vendorCouponId') vendorCouponId: number, @Req() request: any, @Res() response: any): Promise<any> {
        const error: any = [];
        const orderProducts: any = couponParam.productType;
        for (const val of orderProducts) {
            const product: any = val.referenceId;
            for (const productId of product) {
                const value = await this.productService.findOne({ where: { productId } });
                if (couponParam.couponType === 2) {
                    if (+value.price < couponParam.discount) {
                        error.push(1);
                    }
                }
            }
        }
        if (error.length > 0) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Product, Product price is less than discount',
            };
            return response.status(400).send(errResponse);
        }
        const vendorCoupon = await this.vendorCouponService.findOne({ where: { vendorCouponId } });
        if (!vendorCoupon) {
            const errorResponse: any = {
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
        const vendorCouponCode = await this.vendorCouponService.findOne({
            where: {
                couponCode: couponParam.couponCode,
                vendorCouponId: Not(vendorCouponId),
            },
        });
        if (vendorCouponCode) {
            const errorResponse: any = {
                status: 1,
                message: 'Already there is a coupon with this code.',
            };
            return response.status(400).send(errorResponse);
        }
        const createVendorCoupon = await this.vendorCouponService.update(vendorCoupon.vendorCouponId, vendorCoupon);
        const couponProduct = await this.vendorCouponProductCategoryService.findAll({
            where: {
                vendorCouponId,
            },
        });
        if (!couponProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Vendor Coupon Id',
            };
            return response.status(400).send(errorResponse);
        }
        await this.vendorCouponProductCategoryService.delete(couponProduct);
        let reference: any = [];
        reference = couponParam.productType;
        for (const record of reference) {
            let productId = [];
            productId = record.referenceId;
            for (const rec of productId) {
                const vendorCouponProductCategory: any = new VendorCouponProductCategory();
                vendorCouponProductCategory.type = record.type;
                vendorCouponProductCategory.vendorCouponId = createVendorCoupon.vendorCouponId;
                vendorCouponProductCategory.referenceId = rec;
                await this.vendorCouponProductCategoryService.create(vendorCouponProductCategory);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Coupon Updated Successfully.',
        };
        return response.status(200).send(successResponse);
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
    @Delete('/delete-coupon/:vendorCouponId')
    @Authorized('')
    public async deleteVendorCoupon(@Param('vendorCouponId') vendorCouponId: number, @Res() response: any): Promise<any> {
        const vendorCoupon = await this.vendorCouponService.findOne({
            where: {
                vendorCouponId,
            },
        });
        if (!vendorCoupon) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Vendor Coupon Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteVendorCoupon = await this.vendorCouponService.delete(vendorCoupon);
        if (deleteVendorCoupon) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Coupon',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete Coupon',
            };
            return response.status(400).send(errorResponse);
        }
    }
}
