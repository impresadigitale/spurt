/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    JsonController,
    Authorized,
    QueryParam,
    Res,
    Body,
    Req,
    Post,
    Param,
    Put, Delete, UploadedFile, BodyParam
} from 'routing-controllers';
import { ProductService } from '../services/ProductService';
import { ProductToCategoryService } from '../services/ProductToCategoryService';
import { ProductImageService } from '../services/ProductImageService';
import { Product } from '../models/ProductModel';
import { ProductDiscount } from '../models/ProductDiscount';
import { ProductSpecial } from '../models/ProductSpecial';
import { classToPlain } from 'class-transformer';
import { DeleteProductRequest } from './requests/DeleteProductRequest';
import { AddProductRequest } from './requests/CreateProductRequest';
import { UpdateProductRequest } from './requests/UpdateProductRequest';
import { ProductToCategory } from '../models/ProductToCategory';
import { ProductImage } from '../models/ProductImage';
import { CategoryService } from '../services/CategoryService';
import { OrderProductService } from '../services/OrderProductService';
import { OrderService } from '../services/OrderService';
import { ProductRelated } from '../models/ProductRelated';
import { ProductTirePrice } from '../models/ProductTirePrice';
import { ProductRelatedService } from '../services/ProductRelatedService';
import { UpdateTodayDealsParam } from './requests/UpdateTodayDealsParam';
import { UpdateRatingStatusRequest } from './requests/UpdateRatingStatusRequest';
import { UpdateStockRequest } from './requests/UpdateStockRequest';
import { CreateTirePriceRequest } from './requests/CreateTirePriceRequest';
import { ProductViewLogService } from '../services/ProductViewLogService';
import { ProductDiscountService } from '../services/ProductDiscountService';
import { ProductSpecialService } from '../services/ProductSpecialService';
import moment = require('moment');
import { CustomerService } from '../services/CustomerService';
import { ProductRatingService } from '../services/RatingService';
import fs = require('fs');
import { TaxService } from '../services/TaxService';
import { PaymentService } from '../services/PaymentService';
import { ProductQuestionService } from '../services/ProductQuestionService';
import { UserService } from '../services/UserService';
import * as path from 'path';
import { ImageService } from '../services/ImageService';
import { CategoryPathService } from '../services/CategoryPathService';
import { ProductTirePriceService } from '../services/ProductTirePriceService';
import { ProductAttribute } from '../models/ProductAttribute';
import { ProductAttributeService } from '../services/ProductAttributeService';
import { WidgetItemService } from '../services/WidgetItemService';
import { SkuService } from '../services/SkuService';
import { Sku } from '../models/SkuModel';
import { ProductVarientService } from '../services/ProductVarientService';
import { ProductVarient } from '../models/ProductVarient';
import { ProductVarientOptionService } from '../services/ProductVarientOptionService';
import { ProductVarientOption } from '../models/ProductVarientOption';
import { ProductVarientOptionDetailService } from '../services/ProductVarientOptionDetailService';
import { ProductVarientOptionDetail } from '../models/ProductVarientOptionDetail';
import { ProductVarientOptionImage } from '../models/ProductVarientOptionImage';
import { ProductVarientOptionImageService } from '../services/ProductVarientOptionImageService';
import { VarientsValueService } from '../services/VarientsValueService';
import { AttributeService } from '../services/AttributeService';
import { env } from '../../env';
import { S3Service } from '../services/S3Service';
import { VendorCouponProductCategoryService } from '../services/VendorCouponProductCategoryService';

@JsonController('/product')
export class ProductController {
    constructor(
        private productService: ProductService,
        private productToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        private categoryService: CategoryService,
        private orderProductService: OrderProductService,
        private orderService: OrderService,
        private productRelatedService: ProductRelatedService,
        private productViewLogService: ProductViewLogService,
        private productDiscountService: ProductDiscountService,
        private productSpecialService: ProductSpecialService,
        private productRatingService: ProductRatingService,
        private customerService: CustomerService,
        private taxService: TaxService,
        private paymentService: PaymentService,
        private productQuestionService: ProductQuestionService,
        private userService: UserService,
        private categoryPathService: CategoryPathService,
        private productTirePriceService: ProductTirePriceService,
        private productAttributeService: ProductAttributeService,
        private widgetItemService: WidgetItemService,
        private skuService: SkuService,
        private productVarientService: ProductVarientService,
        private productVarientOptionService: ProductVarientOptionService,
        private productVarientOptionDetailService: ProductVarientOptionDetailService,
        private productVarientOptionImageService: ProductVarientOptionImageService,
        private varientsValueService: VarientsValueService,
        private attributeService: AttributeService,
        private s3Service: S3Service,
        private vendorCouponProductCategoryService: VendorCouponProductCategoryService,
        private imageService: ImageService
    ) {
    }

    // Product List API
    /**
     * @api {get} /api/product/productlist Product List API
     * @apiGroup Product
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
     * @apiSampleRequest /api/product/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/productlist')
    @Authorized()
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Product> {
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
        const productLists: any = await this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const productList = productLists.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPrice(value.productId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPrice(value.productId, todaydate);
            if (productSpecial !== undefined) {
                temp.pricerefer = productSpecial.price;
                temp.flag = 1;
            } else if (productDiscount !== undefined) {
                temp.pricerefer = productDiscount.price;
                temp.flag = 0;
            }
            temp.productImage = defaultValue;
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Create Product API
    /**
     * @api {post} /api/product/add-product Add Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} hsn hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} hasTirePrice hasTirePrice
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {String} tirePrices tirePrices
     * @apiParam (Request body) {String} productAttribute productAtrribute
     * @apiParam (Request body) {String} height height
     * @apiParam (Request body) {String} weight weight
     * @apiParam (Request body) {String} length length
     * @apiParam (Request body) {String} width width
     * @apiParam (Request body) {Number} manufacturerId manufacturerId
     * @apiParam (Request body) {Number} pincodeBasedDelivery pincodeBasedDelivery
     * @apiParam (Request body) {String} productVarient productVarient
     * @apiParam (Request body) {String} productVarientOption productVarientOption
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "productSlug" : "",
     *      "upc" : "",
     *      "hsn" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "hasTirePrice" : "",
     *      "manufacturerId" : "",
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
     *      "tirePrices":[
     *      {
     *      "quantity":""
     *      "price":""
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
     *         "discountQuantity":""
     *         "discountPriority":""
     *         "discountPrice":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }]
     *      "productAttribute":[ {
     *               "attributeId":""
     *               "text":""
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/add-product
     * @apiErrorExample {json} AddProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-product')
    @Authorized()
    public async addProduct(@Body({ validate: true }) product: AddProductRequest, @Res() response: any): Promise<any> {
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
        ///// different charges//////
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        newProduct.serviceCharges = JSON.stringify(serviceCharge);
        newProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        newProduct.taxType = product.taxType ? product.taxType : 0;
        newProduct.taxValue = product.tax ? product.tax : 0;
        newProduct.stockStatusId = product.outOfStockStatus ? product.outOfStockStatus : 0;
        // saving sku //
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
        newSku.isActive = product.status;
        const saveSku = await this.skuService.create(newSku);
        // ending sku //
        newProduct.skuId = saveSku.id;
        newProduct.shipping = product.requiredShipping;
        newProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        newProduct.metaTagTitle = product.metaTagTitle;
        newProduct.metaTagDescription = product.metaTagDescription;
        newProduct.metaTagKeyword = product.metaTagKeyword;
        newProduct.isActive = product.status;
        newProduct.isFeatured = 0;
        newProduct.todayDeals = 0;
        newProduct.sortOrder = product.sortOrder ? product.sortOrder : 1;
        newProduct.manufacturerId = product.manufacturerId ? product.manufacturerId : 0;
        newProduct.height = (product && product.height) ? product.height : 0;
        newProduct.weight = (product && product.weight) ? product.weight : 0;
        newProduct.length = (product && product.length) ? product.length : 0;
        newProduct.width = (product && product.width) ? product.width : 0;
        newProduct.hasTirePrice = product.hasTirePrice ? product.hasTirePrice : 0;
        newProduct.pincodeBasedDelivery = (product && product.pincodeBasedDelivery) ? product.pincodeBasedDelivery : 0;
        // adding category name and product name in keyword field for keyword search
        const row: any = [];
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const categoryNames: any = await this.categoryService.findOne({
                    where: {
                        categoryId,
                    },
                });
                const name = '~' + categoryNames.name + '~';
                row.push(name);
            }
            row.push('~' + product.productName + '~');
        }
        const value = row.toString();
        newProduct.keywords = value;
        const saveProduct = await this.productService.create(newProduct);
        // Add related product
        if (product.relatedProductId) {
            const relatedProduct: any = product.relatedProductId;
            for (const relatedproduct of relatedProduct) {
                const newRelatedProduct: any = new ProductRelated();
                newRelatedProduct.productId = saveProduct.productId;
                newRelatedProduct.relatedProductId = relatedproduct;
                await this.productRelatedService.create(newRelatedProduct);
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
                await this.productToCategoryService.create(newProductToCategory);
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
            await this.productImageService.create(newProductImage);
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

        // Product tire price
        if (product.tirePrices) {
            const tirePrice: any = product.tirePrices;
            for (const tire of tirePrice) {
                const productTirePrice: any = new ProductTirePrice();
                productTirePrice.productId = saveProduct.productId;
                productTirePrice.quantity = tire.quantity;
                productTirePrice.price = tire.price;
                await this.productTirePriceService.create(productTirePrice);
            }
        }

        // Product Attribute
        if (product.productAttribute) {
            const attributes: any = product.productAttribute;
            const prodAttribute: any = [];
            const keyArr: any = [];
            for (const attribute of attributes) {
                const productAttribute: any = new ProductAttribute();
                productAttribute.productId = saveProduct.productId;
                productAttribute.attributeId = attribute.attributeId;
                productAttribute.text = attribute.text;
                const attributeValue = await this.attributeService.findOne({ where: { attributeId: attribute.attributeId } });
                const val = '~' + attributeValue.attributeName + '-' + attribute.text + '~';
                keyArr.push(val);
                prodAttribute.push(productAttribute);
            }
            saveProduct.attributeKeyword = keyArr.join();
            await this.productAttributeService.create(prodAttribute);
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
        } else {
            saveProduct.isSimplified = 1;
        }
        await this.productService.create(saveProduct);
        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Product',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Product API
    /**
     * @api {post} /api/product/update-product/:id Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} hsn hsn
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} quantity quantity
     * @apiParam (Request body) {String} productSlug productSlug
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} metaTagDescription metaTagDescription
     * @apiParam (Request body) {String} metaTagKeyword metaTagKeyword
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number} price price
     * @apiParam (Request body) {Number} packingCost packingCost
     * @apiParam (Request body) {Number} shippingCost shippingCost
     * @apiParam (Request body) {Number} tax tax
     * @apiParam (Request body) {Number} taxType taxType
     * @apiParam (Request body) {Number} others others
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} hasTirePrice
     * @apiParam (Request body) {String} productSpecial productSpecial
     * @apiParam (Request body) {String} productDiscount productDiscount
     * @apiParam (Request body) {String} height height
     * @apiParam (Request body) {String} weight weight
     * @apiParam (Request body) {String} length length
     * @apiParam (Request body) {String} width width
     * @apiParam (Request body) {String} tirePrices tirePrices
     * @apiParam (Request body) {String} pincodeBasedDelivery pincodeBasedDelivery
     * @apiParam (Request body) {String} productAttribute productAttribute
     * @apiParam (Request body) {String} productVarient productVarient
     * @apiParam (Request body) {String} productVarientOption productVarientOption
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "hsn" : "",
     *      "price" : "",
     *      "packingCost" : "",
     *      "shippingCost" : "",
     *      "tax" : "",
     *      "taxType" : "",
     *      "others" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "hasTirePrice" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "pincodeBasedDelivery" : "",
     *      "productVarient" : [],
     *      "productVarientOption" : [{
     *      "id":""
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
     *      "tirePrices":[
     *      {
     *      "quantity":""
     *      "price":"",
     *      "skuName":""
     *      }
     *      ]
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
     *     "skuName":""
     *     "specialPrice":""
     *     "specialDateStart":""
     *     "specialDateEnd":""
     *      }],
     *       "productDiscount":[
     *      {
     *         "discountPriority":""
     *         "discountPrice":""
     *         "skuName":""
     *         "discountDateStart":""
     *         "discountDateEnd"""
     *      }],
     *        "productAttribute":[{
     *            "attributeId":""
     *            "text":""
     *        }],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-product/:id')
    @Authorized()
    public async updateProduct(@Body({ validate: true }) product: UpdateProductRequest, @Res() response: any): Promise<any> {
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: product.productId,
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
        updateProduct.productSlug = await this.validate_slug(data, product.productId);
        updateProduct.name = product.productName;
        updateProduct.description = product.productDescription;
        updateProduct.sku = product.sku;
        updateProduct.upc = product.upc;
        updateProduct.hsn = product.hsn;
        updateProduct.quantity = product.quantity ? product.quantity : 0;
        //// special charges//////
        const serviceCharge: any = {};
        serviceCharge.productCost = product.price;
        serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
        serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
        serviceCharge.tax = 0;
        serviceCharge.others = product.others ? product.others : 0;
        updateProduct.serviceCharges = JSON.stringify(serviceCharge);
        updateProduct.price = serviceCharge.productCost + serviceCharge.packingCost + serviceCharge.shippingCost + serviceCharge.others;
        updateProduct.taxType = product.taxType ? product.taxType : 0;
        updateProduct.taxValue = product.tax ? product.tax : 0;
        // saving sku //
        let saveSku;
        const findSku = await this.skuService.findOne({ where: { skuName: updateProduct.sku } });
        if (findSku) {
            const finddSku = await this.productService.findSkuName(product.productId, product.sku, 0);
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
                findSku.isActive = product.status;
                saveSku = await this.skuService.create(findSku);
            }
        } else {
            const newSku: any = new Sku();
            newSku.skuName = updateProduct.sku;
            newSku.price = updateProduct.price;
            newSku.quantity = product.quantity;
            newSku.isActive = product.status;
            saveSku = await this.skuService.create(newSku);
        }
        // ending sku //
        updateProduct.skuId = saveSku.id;
        updateProduct.stockStatusId = product.outOfStockStatus ? product.outOfStockStatus : 0;
        updateProduct.shipping = product.requiredShipping;
        updateProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        updateProduct.metaTagTitle = product.metaTagTitle;
        updateProduct.metaTagDescription = product.metaTagDescription;
        updateProduct.metaTagKeyword = product.metaTagKeyword;
        updateProduct.isActive = product.status;
        updateProduct.sortOrder = product.sortOrder ? product.sortOrder : 1;
        updateProduct.manufacturerId = product.manufacturerId ? product.manufacturerId : updateProduct.manufacturerId;
        updateProduct.height = product.height;
        updateProduct.weight = product.weight;
        updateProduct.length = product.length;
        updateProduct.width = product.width;
        updateProduct.hasTirePrice = product.hasTirePrice;
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
                await this.productImageService.create(newProductImage);
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
                specialPriceData.priority = special.specialPriority;
                specialPriceData.price = special.specialPrice;
                specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                splArr.push(specialPriceData);
            }
            await this.productSpecialService.create(splArr);
        }

        // Product tire price
        if (product.tirePrices) {
            await this.productTirePriceService.delete({ productId: saveProduct.productId });
            const tirePrice: any = product.tirePrices;
            const tireArr: any = [];
            for (const tire of tirePrice) {
                const productTirePrice: any = new ProductTirePrice();
                productTirePrice.productId = saveProduct.productId;
                const tireSkuValue: any = await this.skuService.findOne({
                    where: {
                        skuName: tire.skuName,
                    },
                });
                if (tireSkuValue) {
                    const value: any = await this.productService.findOne({
                        where: {
                            skuId: tireSkuValue.id,
                            productId: saveProduct.productId,
                        },
                    });
                    const varientSku: any = await this.productVarientOptionService.findOne({
                        where: {
                            skuId: tireSkuValue.id,
                            productId: saveProduct.productId,
                        },
                    });
                    if (value) {
                        productTirePrice.skuId = tireSkuValue.id;
                    } else if (varientSku) {
                        productTirePrice.skuId = tireSkuValue.id;
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
                        message: 'sku does not exist tire price',
                    };
                    return response.status(400).send(errorResponse);
                }
                productTirePrice.quantity = tire.quantity;
                productTirePrice.price = tire.price;
                tireArr.push(productTirePrice);
            }
            await this.productTirePriceService.create(tireArr);
        }

        if (product.productAttribute) {
            await this.productAttributeService.delete({ productId: saveProduct.productId });
            const productAttributes: any = product.productAttribute;
            const prodAttribute: any = [];
            const keyArr: any = [];
            for (const attribute of productAttributes) {
                const productAttribute: any = new ProductAttribute();
                productAttribute.productId = saveProduct.productId;
                productAttribute.attributeId = attribute.attributeId;
                productAttribute.text = attribute.text;
                const attributeValue = await this.attributeService.findOne({ where: { attributeId: attribute.attributeId } });
                const val = '~' + attributeValue.attributeName + '-' + attribute.text + '~';
                keyArr.push(val);
                prodAttribute.push(productAttribute);
            }
            saveProduct.attributeKeyword = keyArr.join();
            await this.productAttributeService.create(prodAttribute);
        }
        const varientSimplified = product.productVarient;
        if (varientSimplified.length > 0) {
            saveProduct.isSimplified = 0;
        } else {
            saveProduct.isSimplified = 1;
        }
        await this.productService.create(saveProduct);

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Product Detail API
    /**
     * @api {get} /api/product/product-detail/:id Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-detail/:id')
    @Authorized()
    public async productDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            where: { productId: id },
        });
        const productDetails: any = classToPlain(productDetail);
        const serviceCharges = productDetails.serviceCharges;
        if (serviceCharges) {
            const specialCharge = JSON.parse(productDetails.serviceCharges);
            productDetails.productCost = specialCharge.productCost;
            productDetails.packingCost = specialCharge.packingCost;
            productDetails.shippingCost = specialCharge.shippingCost;
            productDetails.others = specialCharge.others;
        }
        if (productDetails.taxType === 2) {
            const tax = await this.taxService.findOne({ taxId: productDetails.taxValue });
            let percentToAmount;
            if (tax) {
                percentToAmount = productDetails.price * (tax.taxPercentage / 100);
            } else {
                percentToAmount = 0;
            }
            const val = +productDetails.price + percentToAmount;
            productDetails.priceWithTax = val;
        } else {
            const taxValue = (productDetails.taxValue && productDetails.taxValue > 0) ? productDetails.taxValue : 0;
            const val = +productDetails.price + taxValue;
            productDetails.priceWithTax = val;
        }
        const productSku = await this.skuService.findOne({ id: productDetails.skuId });
        productDetails.quantity = productSku ? productSku.quantity : productDetails.quantity;
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
            },
        });
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryValue = await this.categoryService.findOne({ where: { categoryId: value.categoryId } });
                const categoryLevel = await this.categoryPathService.findCategoryLevel(categoryValue.categorySlug);
                categoryValue.levels = categoryLevel.levels;
                const temp: any = categoryValue;
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        productDetails.relatedProductDetail = await this.productRelatedService.findAll({
            where: { productId: productDetail.productId }, order: {
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
            where: { productId: productDetail.productId },
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
            where: { productId: productDetail.productId },
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
        productDetails.productTirePrices = await this.productTirePriceService.findAll({
            select: ['id', 'quantity', 'price', 'skuId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const tirePrice = val.map(async (value: any) => {
                const tireSkuNames = await this.skuService.findOne({ id: value.skuId });
                const temp: any = value;
                if (tireSkuNames !== undefined) {
                    temp.skuName = tireSkuNames.skuName;
                } else {
                    temp.skuName = '';
                }
                return temp;
            });
            const results = Promise.all(tirePrice);
            return results;
        });
        productDetails.productAttribute = await this.productAttributeService.findAll({
            select: ['id', 'text', 'attributeId'],
            where: { productId: productDetail.productId },
        });

        productDetails.questionList = await this.productQuestionService.findAll({
            select: ['questionId', 'productId', 'question', 'type', 'referenceId', 'createdDate'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const user = val.map(async (value: any) => {
                const referenceId = value.referenceId;
                const type = value.type;
                const temp: any = value;
                if (type && type === 2) {
                    const customer = await this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: referenceId },
                    });
                    if (customer !== undefined) {
                        temp.customerDetail = customer;
                    }
                } else {
                    const adminUser = await this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.adminuserDetail = adminUser;
                    }
                }
                return temp;
            });
            const resultData = Promise.all(user);
            return resultData;
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

    //  Top Selling Product List API
    /**
     * @api {get} /api/product/top-selling-productlist  Top selling ProductList API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/top-selling-productlist')
    @Authorized()
    public async topSellingProductList(@Req() request: any, @Res() response: any): Promise<any> {
        const data = await this.productService.recentProductSelling(4);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'image', 'imagePath', 'price', 'name', 'description', 'productSlug'],
                where: { productId: result.product },
            });
            const temp: any = result;
            const productImage = await this.productImageService.findAll({
                select: ['productId', 'image', 'containerName'],
                where: {
                    productId: result.product,
                    defaultImage: 1,
                },
            });
            temp.product = product;
            temp.productImage = productImage;
            return temp;
        });

        const value = await Promise.all(promise);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get Top Selling Product..!',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    // Recent Selling Product List
    /**
     * @api {get} /api/product/recent-selling-product  Recent Selling Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully listed recent product selling!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/recent-selling-product
     * @apiErrorExample {json} Selling Product List error
     * HTTP/1.1 500 Internal Server Errorproduct
     */
    // Recent selling product function
    @Get('/recent-selling-product')
    @Authorized()
    public async sellingProduct(@Req() request: any, @Res() response: any): Promise<any> {
        const limit = 3;
        const orderList = await this.orderProductService.List(limit);
        const promises = orderList.map(async (result: any) => {
            const order = await this.orderService.findOrder({
                select: ['invoiceNo', 'invoicePrefix', 'orderPrefixId', 'orderId', 'orderStatusId'],
                where: { orderId: result.orderId },
            });
            const temp: any = result;
            temp.order = order;
            const product = await this.productImageService.findAll({
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            temp.productImage = product;
            return temp;
        });
        const results = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'successfully listed recently selling products..!',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // update product to Today Deals API
    /**
     * @api {put} /api/product/update-todayDeals/:id Update Today Deals API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} todayDeals TodayDeals should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "todayDeals" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product to today Deals.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-todayDeals/:id
     * @apiErrorExample {json} todayDeals error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-todayDeals/:id')
    @Authorized()
    public async updateTodayDeals(@Param('id') id: number, @Body({ validate: true }) updateTodayDealsParam: UpdateTodayDealsParam, @Res() response: any): Promise<any> {

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

        product.todayDeals = updateTodayDealsParam.todayDeals;
        const productSave = await this.productService.create(product);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'product updated successfully .',
                data: productSave,
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

    // Recent viewLog list API
    /**
     * @api {get} /api/product/viewLog-list Product View Log List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/viewLog-list
     * @apiErrorExample {json} ViewLog List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/viewLog-list')
    @Authorized()
    public async productViewLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [];
        const search = [];
        const viewLogs = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: viewLogs,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: viewLogs,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Customer product view list API
    /**
     * @api {get} /api/product/customerProductView-list/:id Customer product View List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/customerProductView-list/:id
     * @apiErrorExample {json} customerProductView List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/customerProductView-list/:id')
    @Authorized()
    public async customerProductView(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [{
            name: 'customerId',
            value: id,
        }];
        const search = [];
        const customerProductview = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: customerProductview,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: customerProductview,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Get product rating/review API
    /**
     * @api {get} /api/product/Get-Product-rating Get product Rating API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/Get-Product-rating
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/Get-Product-rating')
    @Authorized()
    public async getProductRating(@QueryParam('productId') productId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['ratingId', 'review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'orderProductId', 'isActive'];
        const relation = [];
        const WhereConditions = [
            {
                name: 'productId',
                op: 'where',
                value: productId,
            },
        ];
        const rating: any = await this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
        const promise = rating.map(async (result: any) => {
            const temp: any = result;
            const customer: any = await this.customerService.findOne({
                select: ['avatar', 'avatarPath'],
                where: { id: result.customerId },
            });
            const val = Object.assign({}, temp, customer);
            return val;
        });
        const value = await Promise.all(promise);
        if (value) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the product Rating. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get product Rating.',
            };
            return response.status(400).send(errorResponse);
        }
    }
    // Change Status rating/review API
    /**
     * @api {put} /api/product/Product-rating-status/:id Product Rating Status API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} status status should be 0-> In-Active or 1-> Active
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully updated review status.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/Product-rating-status/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/Product-rating-status/:id')
    @Authorized()
    public async productRatingStatus(@Param('id') id: number, @Body({ validate: true }) updateRatingStatus: UpdateRatingStatusRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const Rating = await this.productRatingService.findOne({ where: { ratingId: id } });
        Rating.isActive = updateRatingStatus.status;
        const updateRating = await this.productRatingService.create(Rating);
        const RatingValue: any = await this.productRatingService.consolidateRating(Rating.productId);
        const ProductData = await this.productService.findOne({ where: { productId: Rating.productId } });
        if (RatingValue.RatingCount === '0') {
            ProductData.rating = 0;
        } else {
            ProductData.rating = RatingValue.RatingSum / RatingValue.RatingCount;
        }
        await this.productService.create(ProductData);
        if (updateRating) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Updated Rating Status. ',
                data: updateRating,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to update product Rating.',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Product Details Excel Document download
    /**
     * @api {get} /api/product/product-excel-list Product Excel
     * @apiGroup Product
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/product-excel-list
     * @apiErrorExample {json} product Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/product-excel-list')
    public async excelProductView(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Detail Sheet');
        const rows = [];
        const productid = productId.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
            { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
            { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
            { header: 'Meta Tag Title', key: 'metaTagTitle', size: 16, width: 15 },
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
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            const productDescription = dataId.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            rows.push([dataId.productId, dataId.name, dataDescription.trim(), dataId.price, dataId.sku, dataId.upc, dataId.quantity, dataId.minimumQuantity, dataId.subtractStock, dataId.manufacturerId, dataId.metaTagTitle]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
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

    // ExportAllProducts
    /**
     * @api {get} /api/product/allproduct-excel-list AllProduct Excel sheet
     * @apiGroup Product
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the All Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/allproduct-excel-list
     * @apiErrorExample {json} Allproduct Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/allproduct-excel-list')
    public async ExportAllProducts(@Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('All Product Excel');
        const rows = [];
        const dataId = await this.productService.findAll();
        if (dataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Products are empty',
            };
            return response.status(400).send(errorResponse);
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
            { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
            { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
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
        const product = await this.productService.findAll();
        for (const products of product) {
            const productDescription = products.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            const related = [];
            const relatedProducts = await this.productRelatedService.findAll({ where: { productId: products.productId } });
            for (const relatedProduct of relatedProducts) {
                const productName = await this.productService.findOne({ where: { productId: relatedProduct.relatedProductId } });
                related.push(productName.name);
            }
            const relProduct = related.toString();
            rows.push([products.productId, products.name, dataDescription.trim(), products.price, products.sku, products.upc, products.quantity, products.minimumQuantity, products.subtractStock, products.manufacturerId, products.metaTagTitle, products.isFeatured, products.todaysDeals, products.condition, products.rating, relProduct, products.isActive]);
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
        const specialPrices = await this.productSpecialService.find();
        for (const specialPrice of specialPrices) {
            const productName = await this.productService.findOne({ where: { productId: specialPrice.productId } });
            special.push([specialPrice.productSpecialId, specialPrice.productId, productName.name, specialPrice.priority, specialPrice.price, specialPrice.dateStart, specialPrice.dateEnd]);
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
        const discountPrices = await this.productDiscountService.find();
        for (const discountPrice of discountPrices) {
            const productName = await this.productService.findOne({ where: { productId: discountPrice.productId } });
            discount.push([discountPrice.productDiscountId, discountPrice.productId, productName.name, discountPrice.priority, discountPrice.price, discountPrice.dateStart, discountPrice.dateEnd]);
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
        const images = await this.productImageService.find();
        for (const image of images) {
            const productName = await this.productService.findOne({ where: { productId: image.productId } });
            productimage.push([image.productId, productName.name, image.containerName, image.image, image.defaultImage]);
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
        const categories = await this.productToCategoryService.find();
        for (const category of categories) {
            const categoryName = await this.categoryService.findOne({ where: { categoryId: category.categoryId } });
            relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
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

    // Delete Product API
    /**
     * @api {delete} /api/product/delete-product/:id Delete Single Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-product/:id')
    @Authorized()
    public async deleteProduct(@Param('id') productid: number, @Res() response: any, @Req() request: any): Promise<Product> {
        const product = await this.productService.findOne(productid);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.productPaymentProcess(productid);
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'That product is ordered',
            };
            return response.status(400).send(errorResponse);
        }
        const findProductVarient = await this.productVarientOptionService.findAll({ where: { productId: product.productId } });
        for (const productVarient of findProductVarient) {
            await this.skuService.delete({ id: productVarient.skuId });
        }
        await this.skuService.delete({ id: product.skuId });
        const deleteProduct = await this.productService.delete(productid);
        const relatedProduct = await this.productRelatedService.findAll({ where: { productId: productid } });
        for (const relatedproduct of relatedProduct) {
            await this.productRelatedService.delete(relatedproduct.id);
        }
        const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: productid } });
        for (const relatedproducts of relatedProductId) {
            await this.productRelatedService.delete(relatedproducts.id);
        }
        const widgetProductItems = await this.widgetItemService.findProduct(productid);
        for (const relatedProductItem of widgetProductItems) {
            await this.widgetItemService.delete(relatedProductItem.id);
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
                message: 'Successfully deleted Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Product API

    /**
     * @api {post} /api/product/delete-product Delete Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
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
     * @apiSampleRequest /api/product/delete-product
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-product')
    @Authorized()
    public async deleteMultipleProduct(@Body({ validate: true }) productDelete: DeleteProductRequest, @Res() response: any, @Req() request: any): Promise<Product> {

        const productIdNo = productDelete.productId.toString();
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
            const orderProductId = await this.orderProductService.productPaymentProcess(+id);
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
            const findProductVarient = await this.productVarientOptionService.findAll({ where: { productId: product.productId } });
            for (const productVarient of findProductVarient) {
                await this.skuService.delete({ id: productVarient.skuId });
            }
            await this.skuService.delete({ id: product.skuId });
            const couponProducts = await this.vendorCouponProductCategoryService.findAll({
                where: {
                    referenceId: deleteProductId, type: 1,
                },
            });
            for (const couponProduct of couponProducts) {
                await this.vendorCouponProductCategoryService.delete(couponProduct.id);
            }
            await this.productService.delete(deleteProductId);
            const relatedProduct = await this.productRelatedService.findAll({ where: { productId: deleteProductId } });
            for (const relatedproduct of relatedProduct) {
                await this.productRelatedService.delete(relatedproduct.id);
            }
            const relatedProductId = await this.productRelatedService.findAll({ where: { relatedProductId: deleteProductId } });
            for (const relatedproducts of relatedProductId) {
                await this.productRelatedService.delete(relatedproducts.id);
            }
            const widgetProductItems = await this.widgetItemService.findProduct(deleteProductId);
            for (const relatedProductItem of widgetProductItems) {
                await this.widgetItemService.delete(relatedProductItem.id);
            }
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted Product',
        };
        return response.status(200).send(successResponse);
    }

    // Product Rating List API
    /**
     * @api {get} /api/product/product-rating-list Product Rating and review List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limits
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *       "status": "1"
     *      "message": "Successfully get product rating list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-rating-list
     * @apiErrorExample {json} productRatingList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-rating-list')
    @Authorized()
    public async productRatinglist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('productName') productName: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const select = ['rating.ratingId', 'rating.productId', 'rating.orderProductId', 'rating.customerId', 'rating.firstName', 'rating.lastName', 'rating.email', 'rating.rating', 'rating.review', 'rating.isActive', 'rating.createdDate'];

        const search = [];

        const WhereConditions = [
            {
                name: 'rating.productId',
                op: 'where',
                value: productName,
            },
        ];
        const productLists: any = await this.productRatingService.ratingReviewList(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const promise = productLists.map(async (result: any) => {
            const temp: any = result;
            const productData = await this.productService.findOne({
                select: ['name'],
                where: { productId: result.productId },
            });
            const imageData = await this.productImageService.findOne({
                select: ['image', 'containerName'],
                where: { productId: result.productId, defaultImage: 1 },
            });
            temp.productName = productData.name;
            temp.image = imageData.image;
            temp.imagePath = imageData.containerName;
            return temp;
        });
        const value: any = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product rating and review.',
            data: classToPlain(value),
        };
        return response.status(200).send(successResponse);

    }

    // Update Product Slug API
    /**
     * @api {put} /api/product/update-product-slug Update Product Slug API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated Product Slug.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product-slug
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-product-slug')
    public async updateSlug(@Res() response: any): Promise<Product> {
        const arr: any = [];
        const product = await this.productService.findAll();
        for (const val of product) {
            const metaTagTitle = val.metaTagTitle;
            if (metaTagTitle) {
                const dat = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\#@,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                const getProductSlug = await this.productService.slug(metaTagTitle);
                if (getProductSlug.length === 0 || getProductSlug === '' || getProductSlug === undefined) {
                    val.productSlug = data;
                } else if (getProductSlug.length === 1 && (metaTagTitle !== getProductSlug[getProductSlug.length - 1].metaTagTitle)) {
                    val.productSlug = data + '-' + 1;
                } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                    const slugVal = getProductSlug[getProductSlug.length - 1];
                    const value = slugVal.productSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.productSlug = data + '-' + (slugNumber + 1);
                }
            } else {
                const title = val.name;
                const dat = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                const data = dat.replace(/--/gi, '-');
                const getProductSlug = await this.productService.slug(title);
                if (getProductSlug === '' || getProductSlug === undefined || getProductSlug.length === 0) {
                    val.productSlug = data;
                } else if (getProductSlug.length === 1 && (title !== getProductSlug[getProductSlug.length - 1].title)) {
                    val.productSlug = data + '-' + 1;
                } else if (getProductSlug.length > 1 && getProductSlug !== undefined && getProductSlug !== '') {
                    const slugVal = getProductSlug[getProductSlug.length - 1];
                    const value = slugVal.productSlug;
                    const getSlugInt = value.substring(value.lastIndexOf('-') + 1, value.length);
                    const slugNumber = parseInt(getSlugInt, 0);
                    val.productSlug = data + '-' + (slugNumber + 1);
                }
            }
            arr.push(val);
        }
        await this.productService.create(arr);
        const successResponse: any = {
            status: 1,
            message: 'successfully update the product slug.',
        };
        return response.status(200).send(successResponse);
    }

    // Dashboard Count API
    /**
     * @api {get} /api/product/dashboard-count Dashboard Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get dashboard count",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/dashboard-count
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/dashboard-count')
    @Authorized()
    public async dashboardCount(@Res() response: any): Promise<any> {
        const dashboard: any = {};
        const select = [];
        const searchOrder = [{
            name: 'paymentProcess',
            op: 'where',
            value: 1,
        }];
        const relation = [];
        const WhereConditions = [];
        const search = [];
        const ordersCount = await this.orderService.list(0, 0, select, searchOrder, WhereConditions, relation, 1);
        const paymentsCount = await this.paymentService.list(0, 0, select, search, WhereConditions, 1);
        const productsCount = await this.productService.list(0, 0, select, relation, WhereConditions, search, 0, 1);
        const customerWhereConditions = [{
            name: 'deleteFlag',
            op: 'like',
            value: 0,
        }];
        const customersCount = await this.customerService.list(0, 0, search, customerWhereConditions, 0, 1);
        dashboard.orders = ordersCount;
        dashboard.payments = paymentsCount;
        dashboard.products = productsCount;
        dashboard.customers = customersCount;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the dashboard count.',
            data: dashboard,
        };
        return response.status(200).send(successResponse);
    }

    // Product Count API
    /**
     * @api {get} /api/product/product-count Product Count API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product count",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-count
     * @apiErrorExample {json} productCount error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-count')
    @Authorized()
    public async productCount(@Res() response: any): Promise<any> {
        const product: any = {};
        const select = [];
        const search = [];
        const relation = [];
        const WhereConditions = [];
        const allProductCount: any = await this.productService.list(0, 0, select, relation, WhereConditions, search, 0, 1);
        const whereConditionsActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 1,
            },
        ];
        const activeProductCount = await this.productService.list(0, 0, select, relation, whereConditionsActive, search, 0, 1);
        const whereConditionsInActive = [
            {
                name: 'isActive',
                op: 'like',
                value: 0,
            },
        ];
        const inActiveProductCount = await this.productService.list(0, 0, select, relation, whereConditionsInActive, search, 0, 1);
        const whereConditionsFeatured = [
            {
                name: 'isFeatured',
                op: 'like',
                value: 1,
            },
        ];
        const featuredProductCount = await this.productService.list(0, 0, select, relation, whereConditionsFeatured, search, 0, 1);
        const allCategoryCount = await this.categoryService.list(0, 0, select, search, WhereConditions, 0, 1);
        product.totalProduct = allProductCount;
        product.activeProduct = activeProductCount;
        product.inActiveProduct = inActiveProductCount;
        product.totalCategory = allCategoryCount;
        product.featuredProduct = featuredProductCount;
        const successResponse: any = {
            status: 1,
            message: 'successfully got the product count.',
            data: product,
        };
        return response.status(200).send(successResponse);
    }

    // Import Product data
    /**
     * @api {post} /api/product/import-product-data Import product Data
     * @apiGroup Product
     * @apiParam (Request body) {String} file File
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully saved imported data..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/import-data
     * @apiErrorExample {json} Import product Data
     * HTTP/1.1 500 Internal Server Error
     */

    @Post('/import-product-data')
    public async ImportProductPrice(@UploadedFile('file') files: any, @Req() request: any, @Res() response: any): Promise<any> {
        const random = Math.floor((Math.random() * 100) + 1);
        const name = files.originalname;
        const type = name.split('.')[1];
        const mainFileName = './product_' + random + '.' + type;
        await this.imageService.writeFile(mainFileName, files.buffer);
        const resolve = require('path').resolve;
        const distPath = resolve('product_' + random);
        await this.imageService.extractZip(mainFileName, distPath);
        const directoryPath = path.join(process.cwd(), 'product_' + random);
        const mainFiles = await this.readDir(directoryPath);
        const rimraf = require('rimraf');
        for (const fileName of mainFiles) {
            const fileType = fileName.split('.')[1];
            if (fileType === 'xlsx') {
                if (fileName === 'productData.xlsx') {
                    const directoryPathh = path.join(process.cwd(), 'product_' + random + '/' + fileName);
                    const result = await this.imageService.convertXlToJson(directoryPathh);
                    for (const data of result) {
                        if (data.Price === '' || data.Name === '') {
                            rimraf(path.join(process.cwd(), 'product_' + random), ((err: any) => {
                                if (err) { throw err; }
                            }));
                            fs.unlinkSync(mainFileName);
                            return response.status(400).send({
                                status: 0,
                                message: 'Product Price or Product Name should not empty',
                            });
                        }
                        const product: any = new Product();
                        product.sku = data.SKU;
                        product.upc = data.UPC;
                        product.quantity = data.Quantity;
                        const serviceCharge: any = {};
                        serviceCharge.productCost = data.Price;
                        serviceCharge.packingCost = data.packingCost ? data.packingCost : 0;
                        serviceCharge.shippingCost = data.shippingCost ? data.shippingCost : 0;
                        serviceCharge.others = product.others ? product.others : 0;
                        product.serviceCharges = JSON.stringify(serviceCharge);
                        product.price = +serviceCharge.productCost + +serviceCharge.packingCost + +serviceCharge.shippingCost + +serviceCharge.others;
                        product.price = data.Price;
                        product.dateAvailable = data.DateAvailable;
                        // saving sku //
                        const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
                        if (findSku) {
                            const errorResponse: any = {
                                status: 0,
                                message: 'duplicate sku name, give some other name',
                            };
                            return response.status(400).send(errorResponse);
                        }
                        const newSku: any = new Sku();
                        newSku.skuName = data.SKU;
                        newSku.price = data.Price;
                        newSku.quantity = data.Quantity ? Math.round(data.Quantity) : 1;
                        newSku.isActive = 1;
                        const saveSku = await this.skuService.create(newSku);
                        // ending sku //
                        product.skuId = saveSku.id;
                        product.name = data.Name;
                        product.description = data.Description;
                        product.metaTagTitle = data.MetaTagTitle;
                        product.metaTagDescription = data.MetaTagDescription;
                        product.metaTagKeyword = data.MetaTagKeyword;
                        product.shipping = 1;
                        product.stockStatusId = 1;
                        product.isFeatured = 0;
                        product.todayDeals = 0;
                        product.isActive = 0;
                        product.sortOrder = 1;
                        product.isSimplified = 1;
                        if (data.CategoryId) {
                            const categoryId = data.CategoryId;
                            const findC = categoryId.toString().includes(',');
                            if (findC === true) {
                                const categories = data.CategoryId.split(',');
                                for (const category of categories) {
                                    const findCategory = await this.categoryService.findOne({ categoryId: category });
                                    if (!findCategory) {
                                        rimraf(path.join(process.cwd(), 'product_' + random), ((err: any) => {
                                            if (err) { throw err; }
                                        }));
                                        fs.unlinkSync(mainFileName);
                                        const errResponse: any = {
                                            status: 0,
                                            message: 'InValid CategoryId',
                                        };
                                        return response.status(400).send(errResponse);
                                    }
                                }
                            } else {
                                const findCategory = await this.categoryService.findOne({ categoryId });
                                if (!findCategory) {
                                    rimraf(path.join(process.cwd(), 'product_' + random), ((err: any) => {
                                        if (err) { throw err; }
                                    }));
                                    fs.unlinkSync(mainFileName);
                                    const errResponse: any = {
                                        status: 0,
                                        message: 'InValid CategoryId',
                                    };
                                    return response.status(400).send(errResponse);
                                }
                            }
                        }
                        // adding category name and product name in keyword field for keyword search
                        const rows: any = [];
                        if (data.CategoryId) {
                            const category = data.CategoryId;
                            const findC = category.toString().includes(',');
                            if (findC === true) {
                                const categories = data.CategoryId.split(',');
                                for (const categoryId of categories) {
                                    const categoryNames: any = await this.categoryService.findOne({
                                        where: {
                                            categoryId,
                                        },
                                    });
                                    const categoryName = '~' + categoryNames.name + '~';
                                    rows.push(categoryName);
                                }
                            } else {
                                const categoryNames: any = await this.categoryService.findOne({
                                    where: {
                                        categoryId: category,
                                    },
                                });
                                const categoryName = '~' + categoryNames.name + '~';
                                rows.push(categoryName);
                            }
                        }
                        rows.push('~' + data.Name + '~');
                        const values = rows.toString();
                        product.keywords = values;
                        const metaTagTitle = data.ProductSlug;
                        if (metaTagTitle) {
                            const datas = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                            const getBlogSlug = await this.productService.slugData(metaTagTitle);
                            if (getBlogSlug.length === 0) {
                                product.productSlug = datas;
                            } else if (getBlogSlug.length === 1 && (datas === getBlogSlug[0].productSlug)) {
                                product.productSlug = datas + '-' + 1;
                            } else {
                                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                                const val = slugVal.productSlug;
                                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                                const slugNumber = parseInt(getSlugInt, 0);
                                product.productSlug = datas + '-' + (slugNumber + 1);
                            }
                        } else {
                            const title = data.Name;
                            const datas = title.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
                            const getBlogSlug = await this.productService.slugData(title);
                            if (getBlogSlug.length === 0) {
                                product.productSlug = datas;
                            } else if (getBlogSlug.length === 1 && (datas === getBlogSlug[0].productSlug)) {
                                product.productSlug = datas + '-' + 1;
                            } else {
                                const slugVal = getBlogSlug[getBlogSlug.length - 1];
                                const val = slugVal.productSlug;
                                const getSlugInt = val.substring(val.lastIndexOf('-') + 1, val.length);
                                const slugNumber = parseInt(getSlugInt, 0);
                                product.productSlug = datas + '-' + (slugNumber + 1);
                            }
                        }
                        const savedProduct = await this.productService.create(product);
                        if (data.Images) {
                            const images = data.Images;
                            const findI = images.toString().includes(',');
                            if (findI === true) {
                                const image = data.Images.split(',');
                                for (const img of image) {
                                    const productImage = new ProductImage();
                                    productImage.image = img;
                                    productImage.containerName = '';
                                    productImage.productId = savedProduct.productId;
                                    await this.productImageService.create(productImage);
                                }
                            } else {
                                const productImage = new ProductImage();
                                productImage.image = images;
                                productImage.containerName = '';
                                productImage.productId = savedProduct.productId;
                                await this.productImageService.create(productImage);
                            }
                            const findImage = await this.productImageService.findOne({ productId: savedProduct.productId });
                            findImage.defaultImage = 1;
                            await this.productImageService.create(findImage);
                        }
                        if (data.CategoryId) {
                            const categoryId = data.CategoryId;
                            const findC = categoryId.toString().includes(',');
                            if (findC === true) {
                                const categories = data.CategoryId.split(',');
                                for (const category of categories) {
                                    const newProductToCategory: any = new ProductToCategory();
                                    newProductToCategory.productId = savedProduct.productId;
                                    newProductToCategory.categoryId = category;
                                    newProductToCategory.isActive = 1;
                                    this.productToCategoryService.create(newProductToCategory);
                                }
                            } else {
                                const newProductToCategory: any = new ProductToCategory();
                                newProductToCategory.productId = savedProduct.productId;
                                newProductToCategory.categoryId = categoryId;
                                newProductToCategory.isActive = 1;
                                this.productToCategoryService.create(newProductToCategory);
                            }
                        }
                        // Add related product
                        if (data.RelatedProductId) {
                            const relatedProductId = data.RelatedProductId;
                            const findP = relatedProductId.toString().includes(',');
                            if (findP === true) {
                                const relatedProduct = data.RelatedProductId.split(',');
                                for (const relatedproduct of relatedProduct) {
                                    const newRelatedProduct: any = new ProductRelated();
                                    newRelatedProduct.productId = savedProduct.productId;
                                    newRelatedProduct.relatedProductId = relatedproduct;
                                    await this.productRelatedService.create(newRelatedProduct);
                                }
                            } else {
                                const newRelatedProduct: any = new ProductRelated();
                                newRelatedProduct.productId = savedProduct.productId;
                                newRelatedProduct.relatedProductId = relatedProductId;
                                await this.productRelatedService.create(newRelatedProduct);
                            }
                        }
                    }
                }
            } else if (fileName === 'image.zip') {
                const directPath = path.join(process.cwd(), 'product_' + random + '/' + fileName);
                await this.imageService.extractZip(directPath, distPath);
                const directoryPat = path.join(process.cwd(), 'product_' + random + '/' + 'image');
                const filesss = await this.readDir(directoryPat);
                for (const fileNme of filesss) {
                    const image2base64 = require('image-to-base64');
                    const imagePath = directoryPat + '/' + fileNme;
                    const imageType = fileNme.split('.')[1];
                    image2base64(imagePath)
                        .then(async (responsee) => {
                            const base64Data = new Buffer(responsee, 'base64');
                            if (env.imageserver === 's3') {
                                await this.s3Service.imageUpload((fileNme), base64Data, imageType);
                            } else {
                                await this.imageService.imageUpload((fileNme), base64Data);
                            }
                        }
                        )
                        .catch(
                            (error) => {
                                throw error;
                            }
                        );
                }
            } else {
                rimraf(path.join(process.cwd(), 'product_' + random), ((err: any) => {
                    if (err) {
                        throw err;
                    }
                }));
                fs.unlinkSync(mainFileName);
                return response.status(400).send({
                    status: 0,
                    message: 'Only xlsx and zip file are accepted',
                });
            }
        }
        rimraf(path.join(process.cwd(), 'product_' + random), ((err: any) => {
            if (err) {
                throw err;
            }
        }));
        fs.unlinkSync(mainFileName);
        const successResponse: any = {
            status: 1,
            message: 'Product Imported Successfully',
        };
        return response.status(200).send(successResponse);
    }

    // Download sample zip for product import
    /**
     * @api {get} /api/product/download-product-sample Download Product Import Sample Zip
     * @apiGroup Product
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the file..!!",
     *      "status": "1",
     * }
     * @apiSampleRequest /api/product/download-product-sample
     * @apiErrorExample {json} Download Data
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/download-product-sample')
    public async downloadSample(@Res() response: any): Promise<any> {
        const excel = require('exceljs');
        // product list excel
        const productWorkbook = new excel.Workbook();
        const productWorksheet = productWorkbook.addWorksheet('product List');
        const products = [];
        // Excel sheet column define
        productWorksheet.columns = [
            { header: 'productId', key: 'id', size: 16, width: 15 },
            { header: 'ProductName', key: 'first_name', size: 16, width: 15 },
        ];
        productWorksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        productWorksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const product = await this.productService.find({ select: ['productId', 'name'] });
        for (const prod of product) {
            products.push([prod.productId, prod.name]);
        }
        products.push(['If you want to map multiple related Product to product,you have to give relatedProductId splitted with commas (,) ']);
        productWorksheet.addRows(products);
        const productFileName = './demo/Productlist.xlsx';
        await productWorkbook.xlsx.writeFile(productFileName);
        // for category excel
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Category List');
        const rows = [];
        // Excel sheet column define
        worksheet.columns = [
            { header: 'CategoryId', key: 'id', size: 16, width: 15 },
            { header: 'Levels', key: 'first_name', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        const select = [
            'CategoryPath.categoryId as categoryId',
            'category.name as name',
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
        const searchConditions = [];
        const sort = [];
        const vendorCategoryList: any = await this.categoryPathService.listByQueryBuilder(0, 0, select, whereConditions, searchConditions, relations, groupBy, sort, false, true);
        for (const id of vendorCategoryList) {
            rows.push([id.categoryId, id.levels]);
        }
        rows.push(['If you want to map multiple category to product,you have to give categoryId splitted with commas (,) ']);
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './demo/Category.xlsx';
        await workbook.xlsx.writeFile(fileName);
        const zipfolder = require('zip-a-folder');
        await zipfolder.zip(path.join(process.cwd(), 'demo'), path.join(process.cwd(), 'demo.zip'));
        const file = path.basename('/demo.zip');
        return new Promise(() => {
            response.download(file, 'demo.zip');
        });
    }

    public async readDir(pathfile: string): Promise<any> {
        return new Promise<any>((subresolve, subreject) => {
            fs.readdir(pathfile, (error, files) => {
                if (error) {
                    subreject(error);
                }
                subresolve(files);
            });
        });
    }

    // update stock  API
    /**
     * @api {post} /api/product/update-stock Update Stock API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} hasStock send 0 or 1
     * @apiParam (Request body) {object} productStock
     * @apiParam (Request body) {number} productStock.skuId skuId
     * @apiParam (Request body) {number} productStock.outOfStockThreshold for setting out of stock threshold
     * @apiParam (Request body) {number} productStock.notifyMinQuantity notifyMinQuantity
     * @apiParam (Request body) {number} productStock.minQuantityAllowedCart  minQuantityAllowedCart
     * @apiParam (Request body) {number} productStock.maxQuantityAllowedCart maxQuantityAllowedCart
     * @apiParam (Request body) {number} productStock.enableBackOrders enableBackOrders
     * @apiParamExample {json} Input
     * {
     *      "hasStock" : "",
     *      "productId" : "",
     *      "productStock": [{
     *      "skuId" : "",
     *      "outOfStockThreshold" : "",
     *      "notifyMinQuantity" : "",
     *      "minQuantityAllowedCart" : "",
     *      "maxQuantityAllowedCart" : "",
     *      "enableBackOrders" : "",
     *      }]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product stock.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-stock
     * @apiErrorExample {json} stock error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-stock')
    @Authorized()
    public async manageStock(@Body({ validate: true }) updateStock: UpdateStockRequest, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({
            where: {
                productId: updateStock.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }

        product.hasStock = updateStock.hasStock;
        const productValue = await this.productService.create(product);
        const productStock = updateStock.productStock;
        const valArr: any = [];
        for (const value of productStock) {
            const sku = await this.skuService.findOne({
                where: {
                    id: value.skuId,
                },
            });
            if (!sku) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid skuId',
                };
                return response.status(400).send(errorResponse);
            }
            sku.outOfStockThreshold = value.outOfStockThreshold ? value.outOfStockThreshold : sku.outOfStockThreshold;
            sku.notifyMinQuantity = value.notifyMinQuantity ? value.notifyMinQuantity : sku.notifyMinQuantity;
            sku.minQuantityAllowedCart = value.minQuantityAllowedCart ? value.minQuantityAllowedCart : sku.minQuantityAllowedCart;
            sku.maxQuantityAllowedCart = value.maxQuantityAllowedCart ? value.maxQuantityAllowedCart : sku.maxQuantityAllowedCart;
            sku.enableBackOrders = value.enableBackOrders ? value.enableBackOrders : sku.enableBackOrders;
            valArr.push(sku);
        }
        await this.skuService.create(valArr);
        if (productValue) {
            const successResponse: any = {
                status: 1,
                message: 'successfully updated stock .',
                data: productValue,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // add tire price  API
    /**
     * @api {post} /api/product/add-tire-price Add tire price API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} hasTirePrice send 0 or 1
     * @apiParam (Request body) {number} productId productId
     * @apiParam (Request body) {number} quantity
     * @apiParam (Request body) {number} price price
     * @apiParamExample {json} Input
     * {
     *      "hasTirePrice" : "",
     *      "productId" : "",
     *      "price" : "",
     *      "quantity" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added tire price.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/add-tire-price
     * @apiErrorExample {json} tire price error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-tire-price')
    @Authorized()
    public async addTirePrice(@Body({ validate: true }) tirePrice: CreateTirePriceRequest, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({
            where: {
                productId: tirePrice.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        if (tirePrice.hasTirePrice) {
            product.hasTirePrice = tirePrice.hasTirePrice;
            await this.productService.create(product);
        }
        const tirePrices = new ProductTirePrice();
        tirePrices.productId = tirePrice.productId;
        tirePrices.quantity = tirePrice.quantity;
        tirePrices.price = tirePrice.price;
        const productSave = await this.productTirePriceService.create(tirePrices);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'successfully added tire price for this product.',
                data: productSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to add',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete tire price API
    /**
     * @api {delete} /api/product/delete-tire-price/:id Delete Product Tire Price API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-tire-price/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-tire-price/:id')
    @Authorized()
    public async delete(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {

        const tire = await this.productTirePriceService.findOne({
            where: {
                id,
            },
        });
        if (!tire) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid Id',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteTirePrice = await this.productTirePriceService.delete(id);
        if (deleteTirePrice) {
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

    //   Get Product Price List API
    /**
     * @api {get} /api/product/get-product-tire-price-list Get product tire price list API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} count count
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get tire price list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/get-product-tire-price-list
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/get-product-tire-price-list')
    @Authorized('')
    public async getCustomerAddress(@QueryParam('productId') productId: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const WhereConditions = [
            {
                name: 'productId',
                value: productId,
            },
        ];
        const tire = await this.productTirePriceService.list(limit, offset, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully Get product tire price',
            data: tire,
        };
        return response.status(200).send(successResponse);
    }

    // Inventory Product List API
    /**
     * @api {get} /api/product/inventory-product-list Invendory Product List API
     * @apiGroup Product
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
     * @apiSampleRequest /api/product/inventory-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/inventory-product-list')
    @Authorized()
    public async inventoryProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<Product> {
        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'productSlug', 'isActive', 'hasStock', 'hasTirePrice', 'outOfStockThreshold', 'notifyMinQuantity', 'minQuantityAllowedCart', 'maxQuantityAllowedCart', 'maxQuantityAllowedCart', 'enableBackOrders', 'modifiedDate', 'isSimplified', 'skuId'];

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
        const productLists: any = await this.productService.list(limit, offset, select, relation, WhereConditions, 0, price, count);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const promise = productLists.map(async (result: any) => {
            let skuValue = undefined;
            if (result.isSimplified === 0) {
                skuValue = await this.productService.findSkuForProductVarient(result.productId);
            } else {
                skuValue = await this.skuService.findAll({ where: { id: result.skuId } });
            }
            const temp: any = result;
            temp.skuValue = skuValue;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: value,
        };
        return response.status(200).send(successResponse);
    }

    //  Update sku for product API
    /**
     * @api {post} /api/product/update-sku   update sku API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated sku.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-sku
     * @apiErrorExample {json} product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-sku')
    @Authorized()
    public async updateOrderProductShippingInformation(@BodyParam('limit') limit: number, @BodyParam('offset') offset: number, @Res() response: any): Promise<any> {
        const products = await this.productService.find({
            take: limit,
            skip: offset,
        });
        for (const product of products) {
            const updateProduct = await this.productService.findOne({ where: { productId: product.productId } });
            let saveSku;
            const findSku = await this.skuService.findOne({ where: { skuName: product.sku } });
            if (findSku) {
                const finddSku = await this.productService.findSkuName(updateProduct.productId, updateProduct.sku, 0);
                if (finddSku) {
                    const errorResponse: any = {
                        status: 0,
                        message: 'duplicate sku name, give some other name',
                    };
                    return response.status(400).send(errorResponse);
                } else {
                    findSku.skuName = updateProduct.sku;
                    findSku.price = updateProduct.price;
                    findSku.quantity = updateProduct.quantity;
                    findSku.isActive = updateProduct.isActive;
                    saveSku = await this.skuService.create(findSku);
                }
            } else {
                const newSku: any = new Sku();
                newSku.skuName = updateProduct.sku;
                newSku.price = updateProduct.price;
                newSku.quantity = updateProduct.quantity;
                newSku.isActive = updateProduct.isActive;
                saveSku = await this.skuService.create(newSku);
            }
            // ending sku //
            updateProduct.skuId = saveSku.id;
            updateProduct.isSimplified = 1;
            await this.productService.create(updateProduct);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully updated Sku',
        };
        return response.status(200).send(successResponse);
    }

    // Delete Product Varient Option API
    /**
     * @api {delete} /api/product/delete-product-varient-option/:id Delete Product Varient Option API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully deleted.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product-varient-option/:id
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-product-varient-option/:id')
    @Authorized()
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
