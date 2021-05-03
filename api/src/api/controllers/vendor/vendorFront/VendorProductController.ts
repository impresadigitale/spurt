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
    Authorized,
    Res,
    Body,
    Post,
    Req,
    Put,
    Param,
    Get,
    QueryParam,
    Delete,
    BodyParam
} from 'routing-controllers';
import { ProductService } from '../../../services/ProductService';
import { ProductToCategoryService } from '../../../services/ProductToCategoryService';
import { ProductImageService } from '../../../services/ProductImageService';
import { Product } from '../../../models/ProductModel';
import { ProductDiscount } from '../../../models/ProductDiscount';
import { ProductSpecial } from '../../../models/ProductSpecial';
import { VendorProducts } from '../../../models/VendorProducts';
import { VendorProductRequest } from './requests/VendorProductRequest';
import { ProductToCategory } from '../../../models/ProductToCategory';
import { ProductImage } from '../../../models/ProductImage';
import { CategoryService } from '../../../services/CategoryService';
import { ProductRelated } from '../../../models/ProductRelated';
import { VendorProductService } from '../../../services/VendorProductService';
import { OrderProductService } from '../../../services/OrderProductService';
import { ProductRelatedService } from '../../../services/ProductRelatedService';
import { ProductDiscountService } from '../../../services/ProductDiscountService';
import { ProductSpecialService } from '../../../services/ProductSpecialService';
import { VendorService } from '../../../services/VendorService';
import { CustomerService } from '../../../services/CustomerService';
import moment = require('moment');
import { classToPlain } from 'class-transformer';
import fs = require('fs');
import { Sku } from '../../../models/SkuModel';
import { ProductVarientService } from '../../../services/ProductVarientService';
import { ProductVarient } from '../../../models/ProductVarient';
import { ProductVarientOptionService } from '../../../services/ProductVarientOptionService';
import { ProductVarientOption } from '../../../models/ProductVarientOption';
import { ProductVarientOptionDetailService } from '../../../services/ProductVarientOptionDetailService';
import { ProductVarientOptionDetail } from '../../../models/ProductVarientOptionDetail';
import { ProductVarientOptionImage } from '../../../models/ProductVarientOptionImage';
import { ProductVarientOptionImageService } from '../../../services/ProductVarientOptionImageService';
import { VarientsValueService } from '../../../services/VarientsValueService';
import { SkuService } from '../../../services/SkuService';
import { VendorCouponProductCategoryService } from '../../../services/VendorCouponProductCategoryService';

@JsonController('/vendor-product')
export class VendorProductController {
    constructor(private productService: ProductService,
                private productToCategoryService: ProductToCategoryService,
                private productImageService: ProductImageService,
                private categoryService: CategoryService,
                private productRelatedService: ProductRelatedService,
                private productDiscountService: ProductDiscountService,
                private productSpecialService: ProductSpecialService,
                private orderProductService: OrderProductService,
                private customerService: CustomerService,
                private vendorService: VendorService,
                private skuService: SkuService,
                private productVarientService: ProductVarientService,
                private productVarientOptionService: ProductVarientOptionService,
                private productVarientOptionDetailService: ProductVarientOptionDetailService,
                private productVarientOptionImageService: ProductVarientOptionImageService,
                private varientsValueService: VarientsValueService,
                private vendorCouponProductCategoryService: VendorCouponProductCategoryService,
                private vendorProductService: VendorProductService
    ) {
    }

    // Create Vendor Product API
    /**
     * @api {post} /api/vendor-product/create-vendor-product Create Vendor Product API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} hsn hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {Number} pincodeBasedDelivery send 0 or 1
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {Number} manufacturerId manufacturerId
     * @apiParam (Request body) {String} productVarient productVarient
     * @apiParam (Request body) {String} productVarientOption productVarientOption
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "hsn" : "",
     *      "image" : "",
     *      "productSlug" : "",
     *      "pincodeBasedDelivery" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "manufacturerId" : "",
     *      "upc" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "others" : "",
     *      "productSlug" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "productVarient" : [],
     *      "productVarientOption" : [{
     *      "varientName":""
     *      "price":"",
     *      "sku":"",
     *      "quantity":,
     *      "isActive":,
     *      "optionValue":[],
     *      "optionImage":[{
     *      "image":"",
     *      "containerName": "",
     *      "defaultImage": "",
     *       }]
     *       }],
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ]
     *     "relatedProductId":[ ]
     *     "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }]
     *     "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new Vendor product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/create-vendor-product
     * @apiErrorExample {json} Vendor Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/create-vendor-product')
    @Authorized('vendor')
    public async createProduct(@Body({ validate: true }) product: VendorProductRequest, @Req() req: any, @Res() response: any): Promise<any> {
        const newProduct: any = new Product();
        newProduct.name = product.productName;
        newProduct.description = product.productDescription;
        const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
        const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        newProduct.productSlug = await this.validate_slug(data);
        newProduct.sku = product.sku;
        newProduct.upc = product.upc;
        newProduct.hsn = product.hsn;
        newProduct.quantity = product.quantity ? product.quantity : 1;
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        newProduct.serviceCharges = JSON.stringify(serviceCharge);
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        newProduct.quantity = product.quantity;
        newProduct.taxType = product.taxType ? product.taxType : 0;
        newProduct.taxValue = product.tax ? product.tax : 0;
        newProduct.stockStatusId = product.outOfStockStatus ? product.outOfStockStatus : 1;
        newProduct.shipping = product.requiredShipping;
        const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
        if (findSku) {
            const errorResponse: any = {
                status: 0,
                message: 'duplicate sku name, give some other name',
            };
            return response.status(400).send(errorResponse);
        }
        const newSku: any = new Sku();
        newSku.skuName = product.sku;
        newSku.price = newProduct.price;
        newSku.quantity = product.quantity ? product.quantity : 1;
        newSku.isActive = 1;
        const saveSku = await this.skuService.create(newSku);
        newProduct.skuId = saveSku.id;
        newProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        newProduct.metaTagTitle = product.metaTagTitle;
        newProduct.metaTagDescription = product.metaTagDescription;
        newProduct.metaTagKeyword = product.metaTagKeyword;
        newProduct.isActive = 0;
        newProduct.isFeatured = 0;
        newProduct.todayDeals = 0;
        newProduct.sortOrder = product.sortOrder;
        newProduct.manufacturerId = product.manufacturerId ? product.manufacturerId : 0;
        newProduct.pincodeBasedDelivery = product.pincodeBasedDelivery;
        // adding category name and product name in keyword field for keyword search
        const rows: any = [];
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                const name = '~' + categoryNames.name + '~';
                rows.push(name);
            }
            rows.push('~' + product.productName + '~');
        }
        const value = rows.toString();
        newProduct.keywords = value;
        const saveProduct = await this.productService.create(newProduct);
        // Add related product
        if (product.relatedProductId) {
            const relatedProduct: any = product.relatedProductId;
            for (const relatedproduct of relatedProduct) {
                const newRelatedProduct: any = new ProductRelated();
                newRelatedProduct.productId = saveProduct.productId;
                newRelatedProduct.relatedProductId = relatedproduct;
                this.productRelatedService.create(newRelatedProduct);
            }
        }

        // save category
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        // Save products Image
        const productImage: any = product.image;
        for (const imageRow of productImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newProductImage = new ProductImage();
            newProductImage.productId = saveProduct.productId;
            newProductImage.image = imageResult.image;
            newProductImage.containerName = imageResult.containerName;
            newProductImage.defaultImage = imageResult.defaultImage;
            this.productImageService.create(newProductImage);
        }

        // save product Varient
        if (product.productVarient) {
            const varients = product.productVarient;
            const productVarient: any = [];
            for (const varient of varients) {
                const newProductVarient: any = new ProductVarient();
                newProductVarient.productId = saveProduct.productId;
                newProductVarient.varientsId = varient;
                newProductVarient.isActive = 1;
                productVarient.push(newProductVarient);
            }
            await this.productVarientService.create(productVarient);
        }

        // save product Varient
        if (product.productVarientOption) {
            const varientOptions = product.productVarientOption;
            for (const varientOption of varientOptions) {
                const newSkus: any = new Sku();
                const find = await this.skuService.findOne({ where: { skuName: varientOption.sku } });
                if (find) {
                    const prod = await this.productService.findOne({ where: { productId: saveProduct.productId } });
                    await this.skuService.delete({ id: prod.skuId });
                    await this.productService.delete(saveProduct.productId);
                    await this.skuService.delete({ skuName: varientOption.sku });
                    const errorResponse: any = {
                        status: 0,
                        message: 'duplicate sku name, give some other name for varient',
                    };
                    return response.status(400).send(errorResponse);
                }
                newSkus.skuName = varientOption.sku;
                newSkus.price = varientOption.price;
                newSkus.quantity = varientOption.quantity;
                newSkus.isActive = varientOption.isActive;
                const saveSkus = await this.skuService.create(newSkus);
                const newProductVarientOption: any = new ProductVarientOption();
                newProductVarientOption.productId = saveProduct.productId;
                newProductVarientOption.skuId = saveSkus.id;
                newProductVarientOption.varientName = varientOption.varientName;
                newProductVarientOption.isActive = varientOption.isActive;
                const val = await this.productVarientOptionService.create(newProductVarientOption);
                const varientOptionsValues = varientOption.optionValue;
                const optionValues: any = [];
                for (const varientOptionsValue of varientOptionsValues) {
                    const newProductVarientOptionDetail: any = new ProductVarientOptionDetail();
                    newProductVarientOptionDetail.productVarientOptionId = val.id;
                    newProductVarientOptionDetail.varientsValueId = varientOptionsValue;
                    optionValues.push(newProductVarientOptionDetail);
                }
                await this.productVarientOptionDetailService.create(optionValues);
                const varientOptionsImages = varientOption.optionImage;
                const image: any = [];
                for (const varientOptionsImage of varientOptionsImages) {
                    const newProductVarientOptionImage: any = new ProductVarientOptionImage();
                    newProductVarientOptionImage.productVarientOptionId = val.id;
                    newProductVarientOptionImage.image = varientOptionsImage.image;
                    newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                    newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                    image.push(newProductVarientOptionImage);
                }
                await this.productVarientOptionImageService.create(image);
            }
        }
        const varientSimplified = product.productVarient;
        if (varientSimplified.length > 0) {
            saveProduct.isSimplified = 0;
            await this.productService.create(saveProduct);
        } else {
            saveProduct.isSimplified = 1;
            await this.productService.create(saveProduct);
        }

        // Product Discount
        if (product.productDiscount) {
            const productDiscount: any = product.productDiscount;
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                discountData.quantity = 1;
                discountData.priority = discount.discountPriority;
                discountData.price = discount.discountPrice;
                discountData.dateStart = moment(discount.discountDateStart).toISOString();
                discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                await this.productDiscountService.create(discountData);
            }
        }

        // Product Special
        if (product.productSpecial) {
            const productSpecial: any[] = product.productSpecial;
            for (const special of productSpecial) {
                const specialPriceData: any = new ProductSpecial();
                specialPriceData.productId = saveProduct.productId;
                specialPriceData.priority = special.specialPriority;
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                await this.productSpecialService.create(specialPriceData);
            }
        }

        const vendorProducts: any = new VendorProducts();
        vendorProducts.productId = saveProduct.productId;
        vendorProducts.vendorId = req.user.vendorId;
        vendorProducts.pincodeBasedDelivery = product.pincodeBasedDelivery;
        vendorProducts.approvalFlag = 0;
        vendorProducts.approvedBy = 0;
        vendorProducts.approvedDate = undefined;
        await this.vendorProductService.create(vendorProducts);
        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Vendor Product',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create Vendor Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Update Vendor Product API
    /**
     * @api {put} /api/vendor-product/update-vendor-product/:id Update Vendor Product API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} hsn hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {Number} pincodeBasedDelivery send 0 OR 1
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {Number} manufacturerId manufacturerId
     * @apiParam (Request body) {String} productVarient productVarient
     * @apiParam (Request body) {String} productVarientOption productVarientOption
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "hsn" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "pincodeBasedDelivery" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "productVarient" : [],
     *      "productVarientOption" : [{
     *      "varientName":""
     *      "price":"",
     *      "sku":"",
     *      "quantity":""
     *      "optionValue":[],
     *      "optionImage":[{
     *      "image":"",
     *      "containerName": "",
     *      "defaultImage": "",
     *       }]
     *       }],
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "manufacturerId" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ],
     *       "relatedProductId":[ "", ""],
     *      "productSpecial":[
     *      {
     *     "customerGroupId":""
     *     "specialPriority":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }],
     *       "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated vendor products.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/update-vendor-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-vendor-product/:id')
    @Authorized('vendor')
    public async updateProduct(@Param('id') id: number, @Body({ validate: true }) product: VendorProductRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
        const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
        updateProduct.productSlug = await this.validate_slug(data, id);
        updateProduct.name = product.productName;
        updateProduct.description = product.productDescription;
        updateProduct.sku = product.sku;
        updateProduct.upc = product.upc;
        updateProduct.hsn = product.hsn;
        updateProduct.quantity = product.quantity ? product.quantity : 1;
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        // saving sku //
        let saveSku;
        const findSku = await this.skuService.findOne({ where: { skuName: updateProduct.sku } });
        if (findSku) {
            const finddSku = await this.productService.findSkuName(updateProduct.productId, product.sku, 0);
            if (finddSku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'duplicate sku name, give some other name',
                };
                return response.status(400).send(errorResponse);
            } else {
                findSku.skuName = updateProduct.sku;
                findSku.price = updateProduct.price;
                findSku.quantity = product.quantity;
                findSku.isActive = 1;
                saveSku = await this.skuService.create(findSku);
            }
        } else {
            const newSku: any = new Sku();
            newSku.skuName = updateProduct.sku;
            newSku.price = updateProduct.price;
            newSku.quantity = product.quantity;
            newSku.isActive = 1;
            saveSku = await this.skuService.create(newSku);
        }
        // ending sku //
        updateProduct.skuId = saveSku.id;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        updateProduct.serviceCharges = JSON.stringify(serviceCharge);
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        updateProduct.stockStatusId = product.outOfStockStatus;
        updateProduct.shipping = product.requiredShipping;
        updateProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        updateProduct.metaTagTitle = product.metaTagTitle;
        updateProduct.metaTagDescription = product.metaTagDescription;
        updateProduct.taxType = product.taxType ? product.taxType : 0;
        updateProduct.taxValue = product.tax ? product.tax : 0;
        updateProduct.metaTagKeyword = product.metaTagKeyword;
        updateProduct.sortOrder = product.sortOrder;
        updateProduct.manufacturerId = product.manufacturerId ? product.manufacturerId : updateProduct.manufacturerId;
        updateProduct.pincodeBasedDelivery = product.pincodeBasedDelivery;
        // adding category name and product name in keyword field for keyword search
        const rows: any = [];
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                const name = '~' + categoryNames.name + '~';
                rows.push(name);
            }
            rows.push('~' + product.productName + '~');
        }
        const values = rows.toString();
        updateProduct.keywords = values;
        const saveProduct = await this.productService.create(updateProduct);

        // delete previous category
        this.productToCategoryService.delete({ productId: saveProduct.productId });

        // save category
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        const findProduct: any = await this.productRelatedService.findOne({
            where: {
                productId: saveProduct.productId,
            },
        });

        if (findProduct) {

            // delete previous related product
            this.productRelatedService.delete({ productId: saveProduct.productId });

            // update related product
            if (product.relatedProductId) {
                const relatedProduct: any = product.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct: any = new ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    await this.productRelatedService.create(newRelatedProduct);
                }
            }
        } else {

            // update related product
            if (product.relatedProductId) {
                const relatedProduct: any = product.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct: any = new ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    await this.productRelatedService.create(newRelatedProduct);
                }
            }

        }

        // Delete previous images
        this.productImageService.delete({ productId: saveProduct.productId });
        // Save products Image
        if (product.image) {
            const productImage: any = product.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                newProductImage.defaultImage = imageResult.defaultImage;
                this.productImageService.create(newProductImage);
            }
        }

        // update product Varient
        const varients = product.productVarient;
        if (varients.length > 0) {
            await this.productVarientService.delete({ productId: saveProduct.productId });
            const productVarient: any = [];
            for (const varient of varients) {
                const newProductVarient: any = new ProductVarient();
                newProductVarient.productId = saveProduct.productId;
                newProductVarient.varientsId = varient;
                newProductVarient.isActive = 1;
                productVarient.push(newProductVarient);
            }
            await this.productVarientService.create(productVarient);
        }

        // update product Varient option
        const varientOptions = product.productVarientOption;
        if (varientOptions.length > 0) {
            for (const varientOption of varientOptions) {
                if (varientOption.id) {
                    const pdtVarientOption = await this.productVarientOptionService.findOne({ where: { id: varientOption.id } });
                    if (pdtVarientOption) {
                        const sku = await this.skuService.findOne({ where: { id: pdtVarientOption.skuId } });
                        if (sku) {
                            sku.skuName = varientOption.sku;
                            sku.price = varientOption.price;
                            sku.quantity = varientOption.quantity;
                            sku.isActive = varientOption.isActive;
                            await this.skuService.create(sku);
                        }
                        pdtVarientOption.isActive = varientOption.isActive;
                        await this.productVarientOptionService.create(pdtVarientOption);
                        if (varientOption.optionImage) {
                            await this.productVarientOptionImageService.delete({ productVarientOptionId: varientOption.id });
                            const varientOptionsImages = varientOption.optionImage;
                            const image: any = [];
                            for (const varientOptionsImage of varientOptionsImages) {
                                const newProductVarientOptionImage: any = new ProductVarientOptionImage();
                                newProductVarientOptionImage.productVarientOptionId = varientOption.id;
                                newProductVarientOptionImage.image = varientOptionsImage.image;
                                newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                                newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                                image.push(newProductVarientOptionImage);
                            }
                            await this.productVarientOptionImageService.create(image);
                        }

                    } else {
                        const errorResponse: any = {
                            status: 0,
                            message: 'invalid productVarientOptionId',
                        };
                        return response.status(400).send(errorResponse);
                    }
                } else {
                    const newSkus: any = new Sku();
                    const find = await this.skuService.findOne({ where: { skuName: varientOption.sku } });
                    if (find) {
                        const errorResponse: any = {
                            status: 0,
                            message: 'duplicate sku name, give some other name for varient',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    newSkus.skuName = varientOption.sku;
                    newSkus.price = varientOption.price;
                    newSkus.quantity = varientOption.quantity ? varientOption.quantity : 1;
                    newSkus.isActive = varientOption.isActive;
                    const saveSkus = await this.skuService.create(newSkus);
                    const newProductVarientOption: any = new ProductVarientOption();
                    newProductVarientOption.productId = saveProduct.productId;
                    newProductVarientOption.skuId = saveSkus.id;
                    newProductVarientOption.varientName = varientOption.varientName;
                    newProductVarientOption.isActive = varientOption.isActive;
                    const val = await this.productVarientOptionService.create(newProductVarientOption);
                    const varientOptionsValues = varientOption.optionValue;
                    const varientValue: any = [];
                    for (const varientOptionsValue of varientOptionsValues) {
                        const newProductVarientOptionDetail: any = new ProductVarientOptionDetail();
                        newProductVarientOptionDetail.productVarientOptionId = val.id;
                        newProductVarientOptionDetail.varientsValueId = varientOptionsValue;
                        varientValue.push(newProductVarientOptionDetail);
                    }
                    await this.productVarientOptionDetailService.create(varientValue);
                    const varientOptionsImages = varientOption.optionImage;
                    const image: any = [];
                    for (const varientOptionsImage of varientOptionsImages) {
                        const newProductVarientOptionImage: any = new ProductVarientOptionImage();
                        newProductVarientOptionImage.productVarientOptionId = val.id;
                        newProductVarientOptionImage.image = varientOptionsImage.image;
                        newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                        newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                        image.push(newProductVarientOptionImage);
                    }
                    await this.productVarientOptionImageService.create(image);
                }
            }
        }

        const varientSimplified = product.productVarient;
        if (varientSimplified.length > 0) {
            saveProduct.isSimplified = 0;
            await this.productService.create(saveProduct);
        } else {
            saveProduct.isSimplified = 1;
            await this.productService.create(saveProduct);
        }

        // Product Discount
        if (product.productDiscount) {
            // Delete the product discount
            this.productDiscountService.delete({ productId: saveProduct.productId });
            const productDiscount: any = product.productDiscount;
            const distArr: any = [];
            for (const discount of productDiscount) {
                const discountData: any = new ProductDiscount();
                discountData.productId = saveProduct.productId;
                discountData.quantity = 1;
                const skuValue: any = await this.skuService.findOne({
                    where: {
                        skuName: discount.skuName,
                    },
                });
                if (skuValue) {
                    const value: any = await this.productService.findOne({
                        where: {
                            skuId: skuValue.id,
                            productId: saveProduct.productId,
                        },
                    });
                    const varientSku: any = await this.productVarientOptionService.findOne({
                        where: {
                            skuId: skuValue.id,
                            productId: saveProduct.productId,
                        },
                    });
                    if (value) {
                        discountData.skuId = skuValue.id;
                    } else if (varientSku) {
                        discountData.skuId = skuValue.id;
                    } else {
                        const errorResponse: any = {
                            status: 0,
                            message: 'Invalid sku for this product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'sku does not exist in discount price',
                    };
                    return response.status(400).send(errorResponse);
                }
                discountData.priority = discount.discountPriority;
                discountData.price = discount.discountPrice;
                discountData.dateStart = moment(discount.discountDateStart).toISOString();
                discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                distArr.push(discountData);
            }
            await this.productDiscountService.create(distArr);
        }

        // Product Special
        if (product.productSpecial) {
            this.productSpecialService.delete({ productId: saveProduct.productId });
            const productSpecial: any = product.productSpecial;
            const splArr: any = [];
            for (const special of productSpecial) {
                const specialPriceData: any = new ProductSpecial();
                specialPriceData.productId = saveProduct.productId;
                specialPriceData.customerGroupId = special.customerGroupId;
                specialPriceData.priority = special.specialPriority;
                const specialSkuValue: any = await this.skuService.findOne({
                    where: {
                        skuName: special.skuName,
                    },
                });
                if (specialSkuValue) {
                    const value: any = await this.productService.findOne({
                        where: {
                            skuId: specialSkuValue.id,
                            productId: saveProduct.productId,
                        },
                    });
                    const varientSku: any = await this.productVarientOptionService.findOne({
                        where: {
                            skuId: specialSkuValue.id,
                            productId: saveProduct.productId,
                        },
                    });
                    if (value) {
                        specialPriceData.skuId = specialSkuValue.id;
                    } else if (varientSku) {
                        specialPriceData.skuId = specialSkuValue.id;
                    } else {
                        const errorResponse: any = {
                            status: 0,
                            message: 'Invalid sku for this product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'sku does not exist in special price',
                    };
                    return response.status(400).send(errorResponse);
                }
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                splArr.push(specialPriceData);
            }
            await this.productSpecialService.create(splArr);
        }

        const vendorProduct: any = await this.vendorProductService.findOne({
            where: {
                productId: id,
            },
        });
        vendorProduct.pincodeBasedDelivery = product.pincodeBasedDelivery;
        await this.vendorProductService.create(vendorProduct);

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated your product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated your Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Vendor Product List API
    /**
     * @api {get} /api/vendor-product/vendor-product-list Vendor Product List API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} status 0->inactive 1-> active
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} count count
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get your product list",
     *      "data":{
     *      "vendorId" : "",
     *      "vendorName" : "",
     *      "productName" : "",
     *      "sku" : "",
     *      "model" : "",
     *      "price" : "",
     *      "quantity" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/vendor-product-list
     * @apiErrorExample {json} vendor error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-product-list')
    @Authorized('vendor')
    public async vendorProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('status') status: number, @QueryParam('keyword') keyword: string, @QueryParam('price') price: string, @QueryParam('count') count: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorId = request.user.vendorId;
        const selects = ['VendorProducts.vendorProductId as vendorProductId',
            'VendorProducts.vendorProductCommission as vendorProductCommission',
            'VendorProducts.quotationAvailable as quotationAvailable',
            'VendorProducts.approvalFlag as approvalFlag',
            'vendor.vendorId as vendorId',
            'product.productId as productId',
            'product.pincodeBasedDelivery as pincodeBasedDelivery',
            'product.name as name',
            'product.sku as sku',
            'product.price as productprice',
            'product.quantity as quantity',
            'customer.firstName as vendorName',
            'product.sortOrder as sortOrder',
            'product.isActive as isActive',
            'product.productSlug as productSlug',
            'VendorProducts.createdDate as createdDate',
            'product.keywords as keywords',
            'product.attributeKeyword as attributeKeyword'];
        const whereCondition = [];
        const relations = [];
        const groupBy = [];
        relations.push({
                tableName: 'VendorProducts.product',
                aliasName: 'product',
            },

            {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            },
            {
                tableName: 'vendor.customer',
                aliasName: 'customer',
            });
        if (status !== undefined) {
            whereCondition.push({
                name: 'product.isActive',
                op: 'and',
                value: status,
            });
        }
        whereCondition.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: vendorId,
        });
        const searchConditions = [];
        if (keyword) {
            searchConditions.push({
                name: ['product.keywords', 'product.name', 'customer.first_name'],
                value: keyword.toLowerCase(),
            });
        }
        const sort = [];
        sort.push({
            name: 'VendorProducts.createdDate',
            order: 'DESC',
        });

        if (count) {
            const vendorProductListCount: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
            const sucResponse: any = {
                status: 1,
                message: 'Successfully got Vendor Product list.',
                data: vendorProductListCount,
            };
            return response.status(200).send(sucResponse);
        }
        const vendorProductList: any = await this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
        const productList = vendorProductList.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const categories = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: value.productId },
            }).then((val) => {
                const category = val.map(async (values: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: values.categoryId });
                    const tempp: any = values;
                    if (categoryNames !== undefined) {
                        tempp.categoryName = categoryNames.name;
                    } else {
                        tempp.categoryName = '';
                    }
                    return tempp;
                });
                const result = Promise.all(category);
                return result;
            });
            temp.vendorCategory = categories;
            const productSpecial = await this.productSpecialService.findSpecialPrice(value.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(value.productId, todaydate);
            if (productSpecial !== undefined) {
                temp.pricerefer = productSpecial.price;
                temp.flag = 1;
            } else if (productDiscount !== undefined) {
                temp.pricerefer = productDiscount.price;
                temp.flag = 0;
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            temp.productImage = defaultValue;
            const orderProduct = await this.orderProductService.getEarnings(value.productId);
            if (orderProduct) {
                temp.earnings = orderProduct.productPriceTotal;
            } else {
                temp.earnings = '';
            }
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got your product list.',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // Delete Product API
    /**
     * @api {delete} /api/vendor-product/delete-product/:id Delete Single Product API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted your product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/delete-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-product/:id')
    @Authorized('vendor')
    public async deleteProduct(@Param('id') productid: number, @Res() response: any, @Req() request: any): Promise<Product> {
        const product = await this.productService.findOne(productid);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.findOne({ where: { productId: productid } });
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'That product is ordered',
            };
            return response.status(400).send(errorResponse);
        }
        await this.skuService.delete({ id: product.skuId });
        const deleteProduct = await this.productService.delete(productid);
        const relatedProduct = await this.productRelatedService.findAll({ where: { productId: productid } });
        for (const relatedproduct of relatedProduct) {
            await this.productService.delete(relatedproduct.id);
        }
        const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: productid } });
        for (const relatedproducts of relatedProductId) {
            await this.productService.delete(relatedproducts.id);
        }
        const couponProducts = await this.vendorCouponProductCategoryService.findAll({
            where: {
                referenceId: productid, type: 1,
            },
        });
        for (const couponProduct of couponProducts) {
            await this.vendorCouponProductCategoryService.delete(couponProduct.id);
        }
        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted your product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete your product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Product API

    /**
     * @api {post} /api/vendor-product/delete-product Delete Multiple Products API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productId productId
     * @apiParamExample {json} Input
     * {
     * "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/delete-product
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-product')
    @Authorized('vendor')
    public async deleteMultipleProduct(@Req() request: any, @Res() response: any): Promise<Product> {
        const productIdNo = request.body.productId;
        const productid = productIdNo.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a product for delete',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const orderProductId = await this.orderProductService.findOne({ where: { productId: id } });
            if (orderProductId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'That product is ordered',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const deleteProductId = parseInt(id, 10);
            const product = await this.productService.findOne(id);
            await this.skuService.delete({ id: product.skuId });
            await this.productService.delete(deleteProductId);
            const relatedProduct = await this.productRelatedService.findAll({ where: { productId: deleteProductId } });
            for (const relatedproduct of relatedProduct) {
                await this.productService.delete(relatedproduct.id);
            }
            const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: deleteProductId } });
            for (const relatedproducts of relatedProductId) {
                await this.productService.delete(relatedproducts.id);
            }
            const couponProducts = await this.vendorCouponProductCategoryService.findAll({
                where: {
                    referenceId: deleteProductId, type: 1,
                },
            });
            for (const couponProduct of couponProducts) {
                await this.vendorCouponProductCategoryService.delete(couponProduct.id);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted Product',
        };
        return response.status(200).send(successResponse);
    }

    // Vendor Product Detail API
    /**
     * @api {get} /api/vendor-product/vendor-product-detail/:id Vendor Product Detail API
     * @apiGroup  Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/vendor-product/vendor-product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/vendor-product-detail/:id')
    @Authorized('vendor')
    public async vendorProductDetail(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
        const vendorProductDetail = await this.vendorProductService.find({ where: { productId: id, vendorId: request.user.vendorId } });
        if (vendorProductDetail.length === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const productDetail: any = await this.productService.findOne({
            productId: id,
        });
        const productDetails: any = classToPlain(productDetail);
        const specialCharges = productDetails.serviceCharges;
        if (specialCharges) {
            const specialCharge = JSON.parse(productDetails.serviceCharges);
            productDetails.productCost = specialCharge.productCost;
            productDetails.packingCost = specialCharge.packingCost;
            productDetails.shippingCost = specialCharge.shippingCost;
            productDetails.tax = specialCharge.tax;
            productDetails.others = specialCharge.others;
        }
        const productSku = await this.skuService.findOne({ id: productDetails.skuId });
        productDetails.quantity = productSku ? productSku.quantity : productDetails.quantity;
        const vendorProduct = await this.vendorProductService.findOne({
            select: ['vendorId', 'productId', 'approvalFlag'],
            where: { productId: id },
        });
        const vendor = await this.vendorService.findOne({
            select: ['customerId'],
            where: { vendorId: vendorProduct.vendorId },
        });
        const customer = await this.customerService.findOne({
            select: ['firstName'],
            where: { id: vendor.customerId },
        });
        productDetails.approvalflag = vendorProduct.approvalFlag;
        productDetails.vendorId = vendorProduct.vendorId;
        productDetails.vendorName = customer.firstName;
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: id,
            },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: id },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                const temp: any = value;
                if (categoryNames !== undefined) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        productDetails.relatedProductDetail = await this.productRelatedService.findAll({
            where: { productId: id }, order: {
                id: 'ASC',
            },
        }).then((val) => {
            const relatedProduct = val.map(async (value: any) => {
                const productId = value.relatedProductId;
                const product = await this.productService.findOne({
                    select: ['productId', 'name', 'sku'],
                    where: { productId },
                    relations: ['productImage'],
                });
                return classToPlain(product);
            });
            const resultData = Promise.all(relatedProduct);
            return resultData;
        });
        productDetails.productSpecialPrice = await this.productSpecialService.findAll({
            select: ['productSpecialId', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
            where: { productId: id },
            order: {
                priority: 'ASC',
            },
        }).then((val) => {
            const special = val.map(async (value: any) => {
                const skuNames = await this.skuService.findOne({ id: value.skuId });
                const temp: any = value;
                if (skuNames !== undefined) {
                    temp.skuName = skuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(special);
            return results;
        });
        productDetails.productDiscountData = await this.productDiscountService.findAll({
            select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
            where: { productId: id },
            order: {
                priority: 'ASC',
            },
        }).then((val) => {
            const discount = val.map(async (value: any) => {
                const discountSkuNames = await this.skuService.findOne({ id: value.skuId });
                const temp: any = value;
                if (discountSkuNames !== undefined) {
                    temp.skuName = discountSkuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(discount);
            return results;
        });
        productDetails.productVarient = await this.productVarientService.findAll({
            select: ['id', 'varientsId', 'productId'],
            where: { productId: productDetail.productId },
        });
        productDetails.productvarientList = await this.productVarientOptionService.findAll({
            select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const productVarList = val.map(async (value: any) => {
                const temp: any = value;
                const sku = await this.skuService.findOne({
                    select: ['id', 'skuName', 'price', 'isActive', 'quantity'],
                    where: { id: value.skuId },
                });
                const image = await this.productVarientOptionImageService.findAll({
                    select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                    where: { productVarientOptionId: value.id },
                });
                const productVarientOption = await this.productVarientOptionDetailService.findAll({
                    select: ['id', 'productVarientOptionId', 'varientsValueId'],
                    where: { productVarientOptionId: value.id },
                }).then((varientValue) => {
                    const varientValueList = varientValue.map(async (vv: any) => {
                        const tempValue: any = vv;
                        const varientValueData = await this.varientsValueService.findOneData({
                            select: ['id', 'valueName'],
                            where: { id: vv.varientsValueId },
                        });
                        tempValue.valueName = (varientValueData !== undefined) ? varientValueData.valueName : '';
                        return tempValue;
                    });
                    const rslt = Promise.all(varientValueList);
                    return rslt;
                });
                temp.skuName = sku.skuName;
                temp.price = sku.price;
                temp.quantity = sku.quantity;
                temp.optionImage = image;
                temp.productVarientOption = productVarientOption;
                return temp;
            });
            const resultData = Promise.all(productVarList);
            return resultData;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }

    // Adding Status for vendors product  API
    /**
     * @api {put} /api/vendor-product/add-vendor-product-status/:id Add Vendor Product Status API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} status either should be 1 or 0
     * @apiParamExample {json} Input
     * {
     *      "status" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated status.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/add-vendor-product-status/:id
     * @apiErrorExample {json} product approval error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/add-vendor-product-status/:id')
    @Authorized('vendor')
    public async addProductStatus(@Param('id') id: number, @BodyParam('status') status: number, @Req() request: any, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const vendorProduct = await this.vendorProductService.findOne({
            where: {
                productId: id,
            },
        });

        if (vendorProduct.approvalFlag === 0) {
            const errorResponse: any = {
                status: 0,
                message: 'This product is not approved, so you cannot change status.',
            };
            return response.status(400).send(errorResponse);
        }

        product.isActive = status;
        const vendorProductSave = await this.productService.create(product);
        if (vendorProductSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Status . ',
                data: vendorProductSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // ExportProductsById
    /**
     * @api {get} /api/vendor-product/vendor-product-excel-list Vendor Product Excel sheet
     * @apiGroup Admin Vendor Product
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Vendor Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/vendor-product/vendor-product-excel-list
     * @apiErrorExample {json} Allproduct Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/vendor-product-excel-list')
    public async ExportAllProductsById(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Vendor Id', key: 'vendorId', size: 16, width: 15 },
            { header: 'Vendor Name', key: 'VendorName', size: 16, width: 15 },
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'Meta Tag Title', key: 'metaTagTitle', size: 16, width: 15 },
            { header: 'is featured', key: 'isFeatured', size: 16, width: 15 },
            { header: 'Total deals', key: 'todayDeals', size: 16, width: 15 },
            { header: 'Condition', key: 'condition', size: 16, width: 15 },
            { header: 'Rating', key: 'Rating', size: 16, width: 15 },
            { header: 'Related Products', key: 'relatedProducts', size: 16, width: 15 },
            { header: 'IsActive', key: 'isActive', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('L1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('M1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('N1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('O1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('P1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('Q1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('R1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const productsid: any = productId.split(',');
        for (const id of productsid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const product of productsid) {
            const data = await this.productService.findOne(product);
            const productDescription = data.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            const related = [];
            const relatedProducts = await this.productRelatedService.findAll({ where: { productId: data.productId } });
            for (const relatedProduct of relatedProducts) {
                const productName = await this.productService.findOne({ where: { productId: relatedProduct.relatedProductId } });
                related.push(productName.name);
            }
            const relProduct = related.toString();
            const vendorProduct = await this.vendorProductService.findOne({ select: ['vendorId'], where: { productId: data.productId } });
            const vendors = await this.vendorService.findOne({ select: ['customerId'], where: { vendorId: vendorProduct.vendorId } });
            const customer = await this.customerService.findOne({ select: ['firstName'], where: { id: vendors.customerId } });
            rows.push([vendorProduct.vendorId, customer.firstName, data.productId, data.name, dataDescription.trim(), data.price, data.sku, data.upc, data.quantity, data.metaTagTitle, data.isFeatured, data.todaysDeals, data.condition, data.rating, relProduct, data.isActive]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const worksheet1 = workbook.addWorksheet('special price');
        worksheet1.columns = [
            { header: 'product Special Id', key: 'productSpecialId', size: 16, width: 30 },
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product Name', key: 'productName', size: 16, width: 15 },
            { header: 'priority', key: 'priority', size: 16, width: 15 },
            { header: 'price', key: 'price', size: 16, width: 30 },
            { header: 'start date', key: 'startDate', size: 16, width: 15 },
            { header: 'end date', key: 'endDate', size: 16, width: 15 },
        ];
        worksheet1.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet1.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const special = [];
        const productid: any = productId.split(',');
        for (const products of productid) {
            const specialPrices = await this.productSpecialService.findAll({ where: { productId: products } });
            for (const specialPrice of specialPrices) {
                const productName = await this.productService.findOne({ where: { productId: specialPrice.productId } });
                special.push([specialPrice.productSpecialId, specialPrice.productId, productName.name, specialPrice.priority, specialPrice.price, specialPrice.dateStart, specialPrice.dateEnd]);
            }
        }
        // Add all rows data in sheet
        worksheet1.addRows(special);
        const worksheet2 = workbook.addWorksheet('discount price');
        worksheet2.columns = [
            { header: 'product dicount Id', key: 'productDiscountId', size: 16, width: 30 },
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product name', key: 'productName', size: 16, width: 30 },
            { header: 'priority', key: 'priority', size: 16, width: 15 },
            { header: 'price', key: 'price', size: 16, width: 30 },
            { header: 'start date', key: 'startDate', size: 16, width: 15 },
            { header: 'end date', key: 'endDate', size: 16, width: 15 },
        ];
        worksheet2.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet2.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const discount = [];
        const disproductsid: any = productId.split(',');
        for (const products of disproductsid) {
            const discountPrices = await this.productDiscountService.findAll({ where: { productId: products } });
            for (const discountPrice of discountPrices) {
                const productName = await this.productService.findOne({ where: { productId: discountPrice.productId } });
                discount.push([discountPrice.productDiscountId, discountPrice.productId, productName.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
            }
        }
        // Add all rows data in sheet
        worksheet2.addRows(discount);
        const worksheet3 = workbook.addWorksheet('Images');
        worksheet3.columns = [
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'product Name', key: 'productName', size: 16, width: 15 },
            { header: 'Image Path', key: 'imagePath', size: 16, width: 15 },
            { header: 'Image', key: 'image', size: 16, width: 30 },
            { header: 'Default Image', key: 'defaultImage', size: 16, width: 30 },
        ];
        worksheet3.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet3.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const productimage = [];
        const imageProductId: any = productId.split(',');
        for (const products of imageProductId) {
            const images = await this.productImageService.findAll({ where: { productId: products } });
            for (const image of images) {
                const productName = await this.productService.findOne({ where: { productId: image.productId } });
                productimage.push([image.productId, productName.name, image.containerName, image.image, image.defaultImage]);
            }
        }
        // Add all rows data in sheet
        worksheet3.addRows(productimage);
        const worksheet6 = workbook.addWorksheet('Related Category');
        worksheet6.columns = [
            { header: 'product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Category Id', key: 'categoryId', size: 16, width: 15 },
            { header: 'Category Name', key: 'CategoryName', size: 16, width: 30 },
        ];
        worksheet6.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet6.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet6.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const relatedCategory = [];
        const relatedProductId: any = productId.split(',');
        for (const products of relatedProductId) {
            const categories = await this.productToCategoryService.findAll({ where: { productId: products } });
            for (const category of categories) {
                const categoryName = await this.categoryService.findOne({ where: { categoryId: category.categoryId } });
                if (categoryName) {
                    relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
                }
            }
        }
        // Add all rows data in sheet
        worksheet6.addRows(relatedCategory);
        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Product Counts
    /**
     * @api {get} /api/vendor-product/product-counts order counts
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Today order count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/product-counts
     * @apiErrorExample {json} order error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-counts')
    @Authorized('vendor')
    public async productCounts(@Req() request: any, @Res() response: any): Promise<any> {
        const whereCondition: any = [];
        const relations: any = [];
        relations.push({
            tableName: 'VendorProducts.product',
            aliasName: 'product',
        }, {
            tableName: 'VendorProducts.vendor',
            aliasName: 'vendor',
        }, {
            tableName: 'vendor.customer',
            aliasName: 'customer',
        });
        whereCondition.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: request.user.vendorId,
        }, {
            name: 'product.isActive',
            op: 'and',
            value: 1,
        });
        const vendorActiveProductListCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, [], whereCondition, [], relations , [], [], true, true);
        const inactiveWhereCondition: any = [];
        inactiveWhereCondition.push({
            name: 'vendor.vendorId',
            op: 'and',
            value: request.user.vendorId,
        }, {
            name: 'product.isActive',
            op: 'and',
            value: 0,
        });
        const vendorInactiveProductListCount: any = await this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations , [], [], true, true);
        const select = [];
        const relation = [];
        const WhereConditions = [
            {
                name: 'vendorId',
                op: 'where',
                value: request.user.vendorId,
            },
        ];
        const totalProductCount = await this.vendorProductService.list(0, 0, select, relation, WhereConditions, '', 0);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Today Product count',
            data: {
                inActiveVendorProductList: vendorInactiveProductListCount,
                activeProductCount: vendorActiveProductListCount,
                TotalProductCount: totalProductCount.length,
            },
        };
        return response.status(200).send(successResponse);

    }

    // update Quotation Available status API
    /**
     * @api {put} /api/vendor-product/update-quotation-available/:id Update Quotation Available API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} quotationAvailable quotationAvailable should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "quotationAvailable" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product for Quotation Available.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/update-quotation-available/:id
     * @apiErrorExample {json} quotation available error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-quotation-available/:id')
    @Authorized('vendor')
    public async updateQuotationAvailable(@Param('id') id: number, @BodyParam('quotationAvailable') quotationAvailable: number, @Req() request: any, @Res() response: any): Promise<any> {
        const product = await this.vendorProductService.findOne({
            where: {
                productId: id, vendorId: request.user.vendorId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        product.quotationAvailable = quotationAvailable;
        const productSave = await this.vendorProductService.create(product);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'quotation status updated successfully .',
                data: productSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update successfully',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Product Varient Option API
    /**
     * @api {delete} /api/vendor-product/delete-product-varient-option/:id Delete Product Varient Option API
     * @apiGroup Vendor Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/vendor-product/delete-product-varient-option/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-product-varient-option/:id')
    @Authorized('vendor')
    public async deleteProductVarientOption(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const productVarientOptionId = await this.productVarientOptionService.findOne({
            where: {
                id,
            },
        });
        if (!productVarientOptionId) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Id',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.productVarientPaymentProcess(id);
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'This product varient is ordered',
            };
            return response.status(400).send(errorResponse);
        }
        await this.skuService.delete({ id: productVarientOptionId.skuId });
        const productVarientOption = await this.productVarientOptionService.delete(id);
        if (productVarientOption) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete',
            };
            return response.status(400).send(errorResponse);
        }
    }
    public async validate_slug($slug: string, $id: number = 0, $count: number = 0): Promise<string> {
        const slugCount = await this.productService.checkSlug($slug, $id, $count);
        if (slugCount) {
            if (!$count) {
                $count = 1;
            } else {
                $count++;
            }
            return await this.validate_slug($slug, $id, $count);
        } else {
            if ($count > 0) {
                $slug = $slug + $count;
            }
            return $slug;
        }
    }

}
