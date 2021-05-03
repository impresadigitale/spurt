/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { JsonController, Post, Req, Res } from 'routing-controllers';
import { VendorCouponProductCategoryService } from '../../services/VendorCouponProductCategoryService';
import { VendorCouponService } from '../../services/VendorCouponService';
import { CouponUsageService } from '../../services/CouponUsageService';
import { CustomerService } from '../../services/CustomerService';
import { ProductService } from '../../services/ProductService';

@JsonController('/customer-coupon')
export class CustomerCouponController {
    constructor(private couponUsageService: CouponUsageService,
                private couponProductCategoryService: VendorCouponProductCategoryService,
                private customerService: CustomerService,
                private productService: ProductService,
                private vendorCouponService: VendorCouponService) {
    }

    // apply coupon API
    /**
     * @api {post} /api/customer-coupon/apply-coupon Apply Coupon API
     * @apiGroup Customer Coupon
     * @apiParam (Request body) {Number} couponCode
     * @apiParam (Request body) {String} emailId
     * @apiParam (Request body) {object} productDetail
     * @apiParam (Request body) {Number} productDetail.productId
     * @apiParam (Request body) {Number} productDetail.skuName
     * @apiParam (Request body) {Number} productDetail.productPrice
     * @apiParam (Request body) {Number} productDetail.quantity
     * @apiParam (Request body) {Number} productDetail.total
     * @apiParamExample {json} Input
     * {
     *      "couponCode":"";
     *      "emailId":"";
     *      "productDetail" : [
     *      {
     *      "productId" : "",
     *      "productPrice" : "",
     *      "skuName" : "",
     *      "quantity" : "",
     *      "total" : "",
     *      }
     *      ],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added product to cart",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-coupon/apply-coupon
     * @apiErrorExample {json} customer coupon  error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/apply-coupon')
    public async applyCoupon(@Req() request: any, @Res() response: any): Promise<any> {
        const crypto = require('crypto');
        const ENCRYPTION_KEY = '@##90kdu(**^$!!hj((&$2jhn^5$%9@q'; // Must be 256 bits (32 characters)
        const IV_LENGTH = 16; // For AES, this is always 16
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        const couponCode = request.body.couponCode;
        const emailId = request.body.emailId;
        const nowDate = new Date();
        const today = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
        const validCode = await this.vendorCouponService.activeCoupon(today, couponCode);
        if (!validCode) {
            const errResponse: any = {
                status: 0,
                message: 'Coupon Expired',
            };
            return response.status(400).send(errResponse);
        }
        const validEmail = validCode.emailRestrictions;
        if (validEmail) {
            const arr = [];
            const email = validEmail.split(',');
            for (const val of email) {
                if (val === emailId) {
                    arr.push(1);
                }
            }
            if (arr.length === 0) {
                const errResponse: any = {
                    status: 0,
                    message: 'Invalid coupon code',
                };
                return response.status(400).send(errResponse);
            }
        }
        const whereConditionCoupon: any = [
            {
                name: 'couponId',
                value: validCode.vendorCouponId,
            },
        ];
        const couponUsage = await this.couponUsageService.list(0, 0, [], [], whereConditionCoupon, 1);
        if (validCode.maxUserPerValidCoupon < couponUsage) {
            const errResponse: any = {
                status: 0,
                message: 'Maximum usage of this coupon exceeded',
            };
            return response.status(400).send(errResponse);
        }
        const validCustomer = await this.customerService.findOne({ where: { email: emailId } });
        if (validCustomer) {
            const whereConditions: any = [
                {
                    name: 'couponId',
                    value: validCode.vendorCouponId,
                },
                {
                    name: 'customerId',
                    value: validCustomer.id,
                },
            ];
            const customerUsagePerCoupon = await this.couponUsageService.list(0, 0, [], [], whereConditions, 1);
            if (validCode.noOfTimeCouponValidUser < customerUsagePerCoupon) {
                const errResponse: any = {
                    status: 0,
                    message: 'Maximum usage of this coupon for this user exceeded',
                };
                return response.status(400).send(errResponse);
            }
        }
        const select: any = ['referenceId'];
        const whereCondition: any = [
            {
                name: 'vendorCouponId',
                value: validCode.vendorCouponId,
            },
            {
                name: 'type',
                value: 1,
            },
        ];
        const couponProductList = await this.couponProductCategoryService.list(0, 0, select, [], whereCondition, 0);
        const cartProductList = request.body.productDetail;
        const couponProductIds = [];
        if (couponProductList.length > 0) {
            for (const product of couponProductList) {
                couponProductIds.push(product.referenceId);
            }
        }
        let eligibleProducts: any = cartProductList;
        if (couponProductIds.length > 0) {
            eligibleProducts = cartProductList.filter(e => {
                if (couponProductIds.indexOf(Number(e.productId)) > -1) {
                    return true;
                }
                return false;
            });
        }
        if (eligibleProducts.length === 0) {
            const inValidProduct: any = {
                status: 0,
                message: 'Invalid coupon for this products',
            };
            return response.status(400).send(inValidProduct);
        }
        const error: any = [];
        let grandTotal = 0;
        for (const val of eligibleProducts) {
            grandTotal += +val.total;
            if (validCode.couponType === 2) {
                if (+val.total < validCode.discount) {
                    error.push(1);
                }
            }
        }
        if (error.length > 0) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid Product, Product price is less than coupon discount price',
            };
            return response.status(400).send(errResponse);
        }
        const validAmount = await this.vendorCouponService.validAmount(grandTotal, couponCode);
        if (!validAmount) {
            const inValidAmount: any = {
                status: 0,
                message: 'Amount range does not satisfy coupon amount',
            };
            return response.status(400).send(inValidAmount);
        }

        if (validCode.allQualifyingItemsApply === 1) {
            let grandDiscountAmount = 0;
            const appliedProducts: any = [];
            for (const val of eligibleProducts) {
                let discountAmount = 0;
                if (validCode.couponType === 1) {
                    discountAmount = val.total * (validCode.discount / 100);
                } else {
                    discountAmount = validCode.discount;
                }
                const obj: any = {};
                obj.productId = val.productId;
                const product = await this.productService.findOne({
                    where: {
                        productId: val.productId,
                    },
                });
                obj.productName = product ? product.name : 0;
                obj.actualAmount = val.total;
                obj.quantity = val.quantity;
                obj.skuName = val.skuName;
                obj.discountAmount = discountAmount;
                grandDiscountAmount += +discountAmount;
                appliedProducts.push(obj);
            }

            let encrypted = cipher.update(JSON.stringify(appliedProducts));
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            const successResponse: any = {
                status: 1,
                message: 'Coupon applied Successfully',
                data: {
                    vendorCouponId: validCode.vendorCouponId,
                    couponCode: validCode.couponCode,
                    grandDiscountAmount,
                    appliedProducts,
                },
                couponData: iv.toString('hex') + ':' + encrypted.toString('hex'),
            };
            return response.status(200).send(successResponse);

        } else {
            let grandDiscountAmount = 0;
            const appliedProducts: any = [];
            if (validCode.appliedCartItemsCount < eligibleProducts.length) {
                const reducedCount = eligibleProducts.length - validCode.appliedCartItemsCount;
                eligibleProducts.length -= reducedCount;
                for (const val of eligibleProducts) {
                    let discountAmount = 0;
                    if (validCode.couponType === 1) {
                        discountAmount = val.total * (validCode.discount / 100);
                    } else {
                        discountAmount = validCode.discount;
                    }
                    const obj: any = {};
                    obj.productId = val.productId;
                    const product = await this.productService.findOne({
                        where: {
                            productId: val.productId,
                        },
                    });
                    obj.productName = product ? product.name : '';
                    obj.actualAmount = val.total;
                    obj.quantity = val.quantity;
                    obj.skuName = val.skuName;
                    obj.discountAmount = discountAmount;
                    grandDiscountAmount += +discountAmount;
                    appliedProducts.push(obj);
                }
            } else {
                for (const val of eligibleProducts) {
                    let discountAmount = 0;
                    if (validCode.couponType === 1) {
                        discountAmount = val.total * (validCode.discount / 100);
                    } else {
                        discountAmount = validCode.discount;
                    }
                    const obj: any = {};
                    obj.productId = val.productId;
                    const product = await this.productService.findOne({
                        where: {
                            productId: val.productId,
                        },
                    });
                    obj.productName = product ? product.name : '';
                    obj.actualAmount = val.total;
                    obj.quantity = val.quantity;
                    obj.skuName = val.skuName;
                    obj.discountAmount = discountAmount;
                    grandDiscountAmount += +discountAmount;
                    appliedProducts.push(obj);
                }
            }

            let encrypted = cipher.update(JSON.stringify(appliedProducts));
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            const cartResponse: any = {
                status: 1,
                message: 'Coupon applied Successfully',
                data: {
                    vendorCouponId: validCode.vendorCouponId,
                    couponCode: validCode.couponCode,
                    grandDiscountAmount,
                    appliedProducts,
                },
                couponData: iv.toString('hex') + ':' + encrypted.toString('hex'),
            };
            return response.status(200).send(cartResponse);
        }
    }
}
