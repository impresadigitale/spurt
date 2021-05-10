/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    JsonController,
    Res,
    Req,
    Param,
    Get,
    QueryParam,
} from 'routing-controllers';
import { CountryService } from '../../services/CountryService';
import { VendorService } from '../../services/VendorService';
import { VendorProductService } from '../../services/VendorProductService';
import { ProductImageService } from '../../services/ProductImageService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import jwt from 'jsonwebtoken';
import { CustomerWishlistService } from '../../services/CustomerWishlistService';
import { ProductService } from '../../services/ProductService';
import { DeliveryLocationService } from '../../services/DeliveryLocationService';
import { TaxService } from '../../services/TaxService';
import { ProductRatingService } from '../../services/RatingService';
import { SkuService } from '../../services/SkuService';
import { ProductVarientOptionService } from '../../services/ProductVarientOptionService';

@JsonController('/vendor-store')
export class VendorStoreController {
    constructor(private vendorService: VendorService,
                private vendorProductService: VendorProductService,
                private countryService: CountryService,
                private productSpecialService: ProductSpecialService,
                private productDiscountService: ProductDiscountService,
                private customerWishlistService: CustomerWishlistService,
                private productService: ProductService,
                private deliveryLocationService: DeliveryLocationService,
                private taxService: TaxService,
                private productRatingService: ProductRatingService,
                private skuService: SkuService,
                private productVarientOptionService: ProductVarientOptionService,
                private productImageService: ProductImageService
    ) {
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
    @Get('/vendor-details/:vendorPrefixId')
    public async storeVendorDetails(@Param('vendorPrefixId') vendorPrefixId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const vendor = await this.vendorService.findOne({
            select: ['vendorId', 'vendorPrefixId', 'companyLogo', 'companyLogoPath', 'companyCoverImage', 'companyCoverImagePath', 'companyName',
                'companyDescription', 'companyAddress1', 'companyAddress2', 'companyCity', 'companyState', 'companyCountryId',
                'pincode', 'companyEmailId', 'companyWebsite', 'vendorSlugName'],
            where: { vendorPrefixId },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'InValid vendor ',
                data: vendor,
            };
            return response.status(400).send(errorResponse);
        }
        const country = await this.countryService.findOne({
            select: ['name'],
            where: { countryId: vendor.companyCountryId },
        });
        if (country) {
            vendor.countryName = country.name;
        } else {
            vendor.countryName = '';
        }
        const products = await this.vendorProductService.findVendorActiveProduct(vendor.vendorId, 0, 0);
        const rating = await this.productRatingService.consolidateRatingForVendor(vendor.vendorId);
        if (rating.RatingCount === '0') {
            vendor.rating = 0;
        } else {
            const overAllRating = rating.RatingSum / rating.RatingCount;
            vendor.rating = overAllRating.toFixed(2);
        }
        vendor.productCount = products.length;
        const successResponse: any = {
            status: 1,
            message: 'successfully got Vendor details. ',
            data: vendor,
        };
        return response.status(200).send(successResponse);

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
    @Get('/vendor-product-list/:id')
    public async storeVendorProductList(@Param('id') Id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const products = await this.vendorProductService.findVendorActiveProduct(Id, limit, offset);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'successfully got Vendor Product List. ',
                data: products.length,
            });
        }
        const productList = [];
        for (const product of products) {
            const obj: any = {};
            const productDetail = await this.productService.findOne({
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
            const productImage = await this.productImageService.findOne({
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
                const tax = await this.taxService.findOne({ taxId: productDetail.taxValue });
                obj.taxValue = tax.taxPercentage;
            } else {
                obj.taxValue = productDetail.taxValue;
            }
            obj.skuName = '';
            let skuValue = undefined;
            let skuId = undefined;
            if (productDetail.isSimplified === 1) {
                skuValue = await this.skuService.findOne({ id: productDetail.skuId });
                if (skuValue) {
                    obj.price = skuValue.price;
                    obj.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                    if (productDetail.hasStock === 1) {
                        if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                            obj.stockStatus = 'outOfStock';
                        } else {
                            obj.stockStatus = 'inStock';
                        }
                    } else {
                        obj.stockStatus = 'inStock';
                    }
                }
            } else {
                skuValue = await this.productVarientOptionService.findOne({ productId: productDetail.productId, isActive: 1 });
                if (skuValue) {
                    const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                    obj.price = productVarientSku.price;
                    obj.skuName = productVarientSku.skuName;
                    skuId = productVarientSku.id;
                    if (productDetail.hasStock === 1) {
                        if (productVarientSku.quantity <= productVarientSku.outOfStockThreshold) {
                            obj.stockStatus = 'outOfStock';
                        } else {
                            obj.stockStatus = 'inStock';
                        }
                    } else {
                        obj.stockStatus = 'inStock';
                    }
                } else {
                    const sku = await this.skuService.findOne({ id: productDetail.skuId });
                    if (sku) {
                        obj.price = sku.price;
                        obj.skuName = sku.skuName;
                        skuId = sku.id;
                        if (productDetail.hasStock === 1) {
                            if (sku.quantity <= sku.outOfStockThreshold) {
                                obj.stockStatus = 'outOfStock';
                            } else {
                                obj.stockStatus = 'inStock';
                            }
                        } else {
                            obj.stockStatus = 'inStock';
                        }
                    }
                }
            }
            if (skuId) {
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
                const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
                if (productSpecial !== undefined) {
                    obj.pricerefer = productSpecial.price;
                    obj.flag = 1;
                } else if (productDiscount !== undefined) {
                    obj.pricerefer = productDiscount.price;
                    obj.flag = 0;
                } else {
                    obj.pricerefer = '';
                    obj.flag = '';
                }
            } else {
                obj.pricerefer = '';
                obj.flag = '';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: product.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    obj.wishListStatus = 1;
                } else {
                    obj.wishListStatus = 0;
                }
            } else {
                obj.wishListStatus = 0;
            }
            productList.push(obj);
        }
        const successResponse: any = {
            status: 1,
            message: 'successfully got Vendor Product List. ',
            data: productList,
        };
        return response.status(200).send(successResponse);

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
    @Get('/check-pincode-availability')
    public async checkAvailability(@QueryParam('productId') productId: number, @QueryParam('pincode') pincode: number, @Res() response: any): Promise<any> {
        const productData = await this.productService.findOne({ where: { productId } });
        if (!productData) {
            return response.status(400).send({
                status: 0,
                message: 'Invalid ProductId',
            });
        }
        let deliveryLocation;
        const orderData = await this.vendorProductService.findOne({ where: { productId } });
        if (orderData) {
            deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: pincode, vendorId: orderData.vendorId } });
        } else {
            deliveryLocation = await this.deliveryLocationService.findOne({ where: { zipCode: pincode, vendorId: 0 } });
        }
        if (deliveryLocation) {
            const successResponse: any = {
                status: 1,
                message: 'Available',
            };
            return response.status(200).send(successResponse);
        } else {
            const successResponse: any = {
                status: 0,
                message: 'Not Available',
            };
            return response.status(400).send(successResponse);
        }
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
    @Get('/vendor-product-review-list')
    public async vendorProductRatingList(@QueryParam('vendorId') vendorId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorDetail: any = await this.vendorService.findOne({
            vendorId,
        });
        if (!vendorDetail) {
            const errorResponse: any = {
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
        },
            {
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
            const ratingCountList: any = await this.productRatingService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
            const countResponse: any = {
                status: 1,
                message: 'Successfully Got count',
                data: ratingCountList,
            };
            return response.status(200).send(countResponse);
        }
        const ratingList: any = await this.productRatingService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got rating list',
            data: ratingList,
        };
        return response.status(200).send(successResponse);
    }
}
