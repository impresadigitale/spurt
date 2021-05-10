"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../../services/ProductService");
const ProductToCategoryService_1 = require("../../../services/ProductToCategoryService");
const ProductImageService_1 = require("../../../services/ProductImageService");
const ProductModel_1 = require("../../../models/ProductModel");
const ProductDiscount_1 = require("../../../models/ProductDiscount");
const ProductSpecial_1 = require("../../../models/ProductSpecial");
const VendorProducts_1 = require("../../../models/VendorProducts");
const VendorProductRequest_1 = require("./requests/VendorProductRequest");
const ProductToCategory_1 = require("../../../models/ProductToCategory");
const ProductImage_1 = require("../../../models/ProductImage");
const CategoryService_1 = require("../../../services/CategoryService");
const ProductRelated_1 = require("../../../models/ProductRelated");
const VendorProductService_1 = require("../../../services/VendorProductService");
const OrderProductService_1 = require("../../../services/OrderProductService");
const ProductRelatedService_1 = require("../../../services/ProductRelatedService");
const ProductDiscountService_1 = require("../../../services/ProductDiscountService");
const ProductSpecialService_1 = require("../../../services/ProductSpecialService");
const VendorService_1 = require("../../../services/VendorService");
const CustomerService_1 = require("../../../services/CustomerService");
const moment = require("moment");
const class_transformer_1 = require("class-transformer");
const fs = require("fs");
const SkuModel_1 = require("../../../models/SkuModel");
const ProductVarientService_1 = require("../../../services/ProductVarientService");
const ProductVarient_1 = require("../../../models/ProductVarient");
const ProductVarientOptionService_1 = require("../../../services/ProductVarientOptionService");
const ProductVarientOption_1 = require("../../../models/ProductVarientOption");
const ProductVarientOptionDetailService_1 = require("../../../services/ProductVarientOptionDetailService");
const ProductVarientOptionDetail_1 = require("../../../models/ProductVarientOptionDetail");
const ProductVarientOptionImage_1 = require("../../../models/ProductVarientOptionImage");
const ProductVarientOptionImageService_1 = require("../../../services/ProductVarientOptionImageService");
const VarientsValueService_1 = require("../../../services/VarientsValueService");
const SkuService_1 = require("../../../services/SkuService");
const VendorCouponProductCategoryService_1 = require("../../../services/VendorCouponProductCategoryService");
let VendorProductController = class VendorProductController {
    constructor(productService, productToCategoryService, productImageService, categoryService, productRelatedService, productDiscountService, productSpecialService, orderProductService, customerService, vendorService, skuService, productVarientService, productVarientOptionService, productVarientOptionDetailService, productVarientOptionImageService, varientsValueService, vendorCouponProductCategoryService, vendorProductService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.productImageService = productImageService;
        this.categoryService = categoryService;
        this.productRelatedService = productRelatedService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        this.orderProductService = orderProductService;
        this.customerService = customerService;
        this.vendorService = vendorService;
        this.skuService = skuService;
        this.productVarientService = productVarientService;
        this.productVarientOptionService = productVarientOptionService;
        this.productVarientOptionDetailService = productVarientOptionDetailService;
        this.productVarientOptionImageService = productVarientOptionImageService;
        this.varientsValueService = varientsValueService;
        this.vendorCouponProductCategoryService = vendorCouponProductCategoryService;
        this.vendorProductService = vendorProductService;
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
    createProduct(product, req, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newProduct = new ProductModel_1.Product();
            newProduct.name = product.productName;
            newProduct.description = product.productDescription;
            const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            newProduct.productSlug = yield this.validate_slug(data);
            newProduct.sku = product.sku;
            newProduct.upc = product.upc;
            newProduct.hsn = product.hsn;
            newProduct.quantity = product.quantity ? product.quantity : 1;
            const serviceCharge = {};
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
            const findSku = yield this.skuService.findOne({ where: { skuName: product.sku } });
            if (findSku) {
                const errorResponse = {
                    status: 0,
                    message: 'duplicate sku name, give some other name',
                };
                return response.status(400).send(errorResponse);
            }
            const newSku = new SkuModel_1.Sku();
            newSku.skuName = product.sku;
            newSku.price = newProduct.price;
            newSku.quantity = product.quantity ? product.quantity : 1;
            newSku.isActive = 1;
            const saveSku = yield this.skuService.create(newSku);
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
            const rows = [];
            if (product.categoryId) {
                const category = product.categoryId;
                for (const categoryId of category) {
                    const categoryNames = yield this.categoryService.findOne({
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
            const saveProduct = yield this.productService.create(newProduct);
            // Add related product
            if (product.relatedProductId) {
                const relatedProduct = product.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct = new ProductRelated_1.ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    this.productRelatedService.create(newRelatedProduct);
                }
            }
            // save category
            if (product.categoryId) {
                const category = product.categoryId;
                for (const categoryId of category) {
                    const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                    newProductToCategory.productId = saveProduct.productId;
                    newProductToCategory.categoryId = categoryId;
                    newProductToCategory.isActive = 1;
                    this.productToCategoryService.create(newProductToCategory);
                }
            }
            // Save products Image
            const productImage = product.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage_1.ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                newProductImage.defaultImage = imageResult.defaultImage;
                this.productImageService.create(newProductImage);
            }
            // save product Varient
            if (product.productVarient) {
                const varients = product.productVarient;
                const productVarient = [];
                for (const varient of varients) {
                    const newProductVarient = new ProductVarient_1.ProductVarient();
                    newProductVarient.productId = saveProduct.productId;
                    newProductVarient.varientsId = varient;
                    newProductVarient.isActive = 1;
                    productVarient.push(newProductVarient);
                }
                yield this.productVarientService.create(productVarient);
            }
            // save product Varient
            if (product.productVarientOption) {
                const varientOptions = product.productVarientOption;
                for (const varientOption of varientOptions) {
                    const newSkus = new SkuModel_1.Sku();
                    const find = yield this.skuService.findOne({ where: { skuName: varientOption.sku } });
                    if (find) {
                        const prod = yield this.productService.findOne({ where: { productId: saveProduct.productId } });
                        yield this.skuService.delete({ id: prod.skuId });
                        yield this.productService.delete(saveProduct.productId);
                        yield this.skuService.delete({ skuName: varientOption.sku });
                        const errorResponse = {
                            status: 0,
                            message: 'duplicate sku name, give some other name for varient',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    newSkus.skuName = varientOption.sku;
                    newSkus.price = varientOption.price;
                    newSkus.quantity = varientOption.quantity;
                    newSkus.isActive = varientOption.isActive;
                    const saveSkus = yield this.skuService.create(newSkus);
                    const newProductVarientOption = new ProductVarientOption_1.ProductVarientOption();
                    newProductVarientOption.productId = saveProduct.productId;
                    newProductVarientOption.skuId = saveSkus.id;
                    newProductVarientOption.varientName = varientOption.varientName;
                    newProductVarientOption.isActive = varientOption.isActive;
                    const val = yield this.productVarientOptionService.create(newProductVarientOption);
                    const varientOptionsValues = varientOption.optionValue;
                    const optionValues = [];
                    for (const varientOptionsValue of varientOptionsValues) {
                        const newProductVarientOptionDetail = new ProductVarientOptionDetail_1.ProductVarientOptionDetail();
                        newProductVarientOptionDetail.productVarientOptionId = val.id;
                        newProductVarientOptionDetail.varientsValueId = varientOptionsValue;
                        optionValues.push(newProductVarientOptionDetail);
                    }
                    yield this.productVarientOptionDetailService.create(optionValues);
                    const varientOptionsImages = varientOption.optionImage;
                    const image = [];
                    for (const varientOptionsImage of varientOptionsImages) {
                        const newProductVarientOptionImage = new ProductVarientOptionImage_1.ProductVarientOptionImage();
                        newProductVarientOptionImage.productVarientOptionId = val.id;
                        newProductVarientOptionImage.image = varientOptionsImage.image;
                        newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                        newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                        image.push(newProductVarientOptionImage);
                    }
                    yield this.productVarientOptionImageService.create(image);
                }
            }
            const varientSimplified = product.productVarient;
            if (varientSimplified.length > 0) {
                saveProduct.isSimplified = 0;
                yield this.productService.create(saveProduct);
            }
            else {
                saveProduct.isSimplified = 1;
                yield this.productService.create(saveProduct);
            }
            // Product Discount
            if (product.productDiscount) {
                const productDiscount = product.productDiscount;
                for (const discount of productDiscount) {
                    const discountData = new ProductDiscount_1.ProductDiscount();
                    discountData.productId = saveProduct.productId;
                    discountData.quantity = 1;
                    discountData.priority = discount.discountPriority;
                    discountData.price = discount.discountPrice;
                    discountData.dateStart = moment(discount.discountDateStart).toISOString();
                    discountData.dateEnd = moment(discount.discountDateEnd).toISOString();
                    yield this.productDiscountService.create(discountData);
                }
            }
            // Product Special
            if (product.productSpecial) {
                const productSpecial = product.productSpecial;
                for (const special of productSpecial) {
                    const specialPriceData = new ProductSpecial_1.ProductSpecial();
                    specialPriceData.productId = saveProduct.productId;
                    specialPriceData.priority = special.specialPriority;
                    specialPriceData.price = special.specialPrice;
                    specialPriceData.dateStart = moment(special.specialDateStart).toISOString();
                    specialPriceData.dateEnd = moment(special.specialDateEnd).toISOString();
                    yield this.productSpecialService.create(specialPriceData);
                }
            }
            const vendorProducts = new VendorProducts_1.VendorProducts();
            vendorProducts.productId = saveProduct.productId;
            vendorProducts.vendorId = req.user.vendorId;
            vendorProducts.pincodeBasedDelivery = product.pincodeBasedDelivery;
            vendorProducts.approvalFlag = 0;
            vendorProducts.approvedBy = 0;
            vendorProducts.approvedDate = undefined;
            yield this.vendorProductService.create(vendorProducts);
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully created Vendor Product',
                    data: saveProduct,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to create Vendor Product',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    updateProduct(id, product, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updateProduct = yield this.productService.findOne({
                where: {
                    productId: id,
                },
            });
            if (!updateProduct) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const metaTagTitle = product.productSlug ? product.productSlug : product.productName;
            const data = metaTagTitle.replace(/\s+/g, '-').replace(/[&\/\\@#,+()$~%.'":*?<>{}]/g, '').toLowerCase();
            updateProduct.productSlug = yield this.validate_slug(data, id);
            updateProduct.name = product.productName;
            updateProduct.description = product.productDescription;
            updateProduct.sku = product.sku;
            updateProduct.upc = product.upc;
            updateProduct.hsn = product.hsn;
            updateProduct.quantity = product.quantity ? product.quantity : 1;
            const serviceCharge = {};
            serviceCharge.productCost = product.price;
            serviceCharge.packingCost = product.packingCost ? product.packingCost : 0;
            serviceCharge.shippingCost = product.shippingCost ? product.shippingCost : 0;
            // saving sku //
            let saveSku;
            const findSku = yield this.skuService.findOne({ where: { skuName: updateProduct.sku } });
            if (findSku) {
                const finddSku = yield this.productService.findSkuName(updateProduct.productId, product.sku, 0);
                if (finddSku) {
                    const errorResponse = {
                        status: 0,
                        message: 'duplicate sku name, give some other name',
                    };
                    return response.status(400).send(errorResponse);
                }
                else {
                    findSku.skuName = updateProduct.sku;
                    findSku.price = updateProduct.price;
                    findSku.quantity = product.quantity;
                    findSku.isActive = 1;
                    saveSku = yield this.skuService.create(findSku);
                }
            }
            else {
                const newSku = new SkuModel_1.Sku();
                newSku.skuName = updateProduct.sku;
                newSku.price = updateProduct.price;
                newSku.quantity = product.quantity;
                newSku.isActive = 1;
                saveSku = yield this.skuService.create(newSku);
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
            const rows = [];
            if (product.categoryId) {
                const category = product.categoryId;
                for (const categoryId of category) {
                    const categoryNames = yield this.categoryService.findOne({
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
            const saveProduct = yield this.productService.create(updateProduct);
            // delete previous category
            this.productToCategoryService.delete({ productId: saveProduct.productId });
            // save category
            if (product.categoryId) {
                const category = product.categoryId;
                for (const categoryId of category) {
                    const newProductToCategory = new ProductToCategory_1.ProductToCategory();
                    newProductToCategory.productId = saveProduct.productId;
                    newProductToCategory.categoryId = categoryId;
                    newProductToCategory.isActive = 1;
                    this.productToCategoryService.create(newProductToCategory);
                }
            }
            const findProduct = yield this.productRelatedService.findOne({
                where: {
                    productId: saveProduct.productId,
                },
            });
            if (findProduct) {
                // delete previous related product
                this.productRelatedService.delete({ productId: saveProduct.productId });
                // update related product
                if (product.relatedProductId) {
                    const relatedProduct = product.relatedProductId;
                    for (const relatedproduct of relatedProduct) {
                        const newRelatedProduct = new ProductRelated_1.ProductRelated();
                        newRelatedProduct.productId = saveProduct.productId;
                        newRelatedProduct.relatedProductId = relatedproduct;
                        yield this.productRelatedService.create(newRelatedProduct);
                    }
                }
            }
            else {
                // update related product
                if (product.relatedProductId) {
                    const relatedProduct = product.relatedProductId;
                    for (const relatedproduct of relatedProduct) {
                        const newRelatedProduct = new ProductRelated_1.ProductRelated();
                        newRelatedProduct.productId = saveProduct.productId;
                        newRelatedProduct.relatedProductId = relatedproduct;
                        yield this.productRelatedService.create(newRelatedProduct);
                    }
                }
            }
            // Delete previous images
            this.productImageService.delete({ productId: saveProduct.productId });
            // Save products Image
            if (product.image) {
                const productImage = product.image;
                for (const imageRow of productImage) {
                    const imageData = JSON.stringify(imageRow);
                    const imageResult = JSON.parse(imageData);
                    const newProductImage = new ProductImage_1.ProductImage();
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
                yield this.productVarientService.delete({ productId: saveProduct.productId });
                const productVarient = [];
                for (const varient of varients) {
                    const newProductVarient = new ProductVarient_1.ProductVarient();
                    newProductVarient.productId = saveProduct.productId;
                    newProductVarient.varientsId = varient;
                    newProductVarient.isActive = 1;
                    productVarient.push(newProductVarient);
                }
                yield this.productVarientService.create(productVarient);
            }
            // update product Varient option
            const varientOptions = product.productVarientOption;
            if (varientOptions.length > 0) {
                for (const varientOption of varientOptions) {
                    if (varientOption.id) {
                        const pdtVarientOption = yield this.productVarientOptionService.findOne({ where: { id: varientOption.id } });
                        if (pdtVarientOption) {
                            const sku = yield this.skuService.findOne({ where: { id: pdtVarientOption.skuId } });
                            if (sku) {
                                sku.skuName = varientOption.sku;
                                sku.price = varientOption.price;
                                sku.quantity = varientOption.quantity;
                                sku.isActive = varientOption.isActive;
                                yield this.skuService.create(sku);
                            }
                            pdtVarientOption.isActive = varientOption.isActive;
                            yield this.productVarientOptionService.create(pdtVarientOption);
                            if (varientOption.optionImage) {
                                yield this.productVarientOptionImageService.delete({ productVarientOptionId: varientOption.id });
                                const varientOptionsImages = varientOption.optionImage;
                                const image = [];
                                for (const varientOptionsImage of varientOptionsImages) {
                                    const newProductVarientOptionImage = new ProductVarientOptionImage_1.ProductVarientOptionImage();
                                    newProductVarientOptionImage.productVarientOptionId = varientOption.id;
                                    newProductVarientOptionImage.image = varientOptionsImage.image;
                                    newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                                    newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                                    image.push(newProductVarientOptionImage);
                                }
                                yield this.productVarientOptionImageService.create(image);
                            }
                        }
                        else {
                            const errorResponse = {
                                status: 0,
                                message: 'invalid productVarientOptionId',
                            };
                            return response.status(400).send(errorResponse);
                        }
                    }
                    else {
                        const newSkus = new SkuModel_1.Sku();
                        const find = yield this.skuService.findOne({ where: { skuName: varientOption.sku } });
                        if (find) {
                            const errorResponse = {
                                status: 0,
                                message: 'duplicate sku name, give some other name for varient',
                            };
                            return response.status(400).send(errorResponse);
                        }
                        newSkus.skuName = varientOption.sku;
                        newSkus.price = varientOption.price;
                        newSkus.quantity = varientOption.quantity ? varientOption.quantity : 1;
                        newSkus.isActive = varientOption.isActive;
                        const saveSkus = yield this.skuService.create(newSkus);
                        const newProductVarientOption = new ProductVarientOption_1.ProductVarientOption();
                        newProductVarientOption.productId = saveProduct.productId;
                        newProductVarientOption.skuId = saveSkus.id;
                        newProductVarientOption.varientName = varientOption.varientName;
                        newProductVarientOption.isActive = varientOption.isActive;
                        const val = yield this.productVarientOptionService.create(newProductVarientOption);
                        const varientOptionsValues = varientOption.optionValue;
                        const varientValue = [];
                        for (const varientOptionsValue of varientOptionsValues) {
                            const newProductVarientOptionDetail = new ProductVarientOptionDetail_1.ProductVarientOptionDetail();
                            newProductVarientOptionDetail.productVarientOptionId = val.id;
                            newProductVarientOptionDetail.varientsValueId = varientOptionsValue;
                            varientValue.push(newProductVarientOptionDetail);
                        }
                        yield this.productVarientOptionDetailService.create(varientValue);
                        const varientOptionsImages = varientOption.optionImage;
                        const image = [];
                        for (const varientOptionsImage of varientOptionsImages) {
                            const newProductVarientOptionImage = new ProductVarientOptionImage_1.ProductVarientOptionImage();
                            newProductVarientOptionImage.productVarientOptionId = val.id;
                            newProductVarientOptionImage.image = varientOptionsImage.image;
                            newProductVarientOptionImage.containerName = varientOptionsImage.containerName;
                            newProductVarientOptionImage.defaultImage = varientOptionsImage.defaultImage;
                            image.push(newProductVarientOptionImage);
                        }
                        yield this.productVarientOptionImageService.create(image);
                    }
                }
            }
            const varientSimplified = product.productVarient;
            if (varientSimplified.length > 0) {
                saveProduct.isSimplified = 0;
                yield this.productService.create(saveProduct);
            }
            else {
                saveProduct.isSimplified = 1;
                yield this.productService.create(saveProduct);
            }
            // Product Discount
            if (product.productDiscount) {
                // Delete the product discount
                this.productDiscountService.delete({ productId: saveProduct.productId });
                const productDiscount = product.productDiscount;
                const distArr = [];
                for (const discount of productDiscount) {
                    const discountData = new ProductDiscount_1.ProductDiscount();
                    discountData.productId = saveProduct.productId;
                    discountData.quantity = 1;
                    const skuValue = yield this.skuService.findOne({
                        where: {
                            skuName: discount.skuName,
                        },
                    });
                    if (skuValue) {
                        const value = yield this.productService.findOne({
                            where: {
                                skuId: skuValue.id,
                                productId: saveProduct.productId,
                            },
                        });
                        const varientSku = yield this.productVarientOptionService.findOne({
                            where: {
                                skuId: skuValue.id,
                                productId: saveProduct.productId,
                            },
                        });
                        if (value) {
                            discountData.skuId = skuValue.id;
                        }
                        else if (varientSku) {
                            discountData.skuId = skuValue.id;
                        }
                        else {
                            const errorResponse = {
                                status: 0,
                                message: 'Invalid sku for this product',
                            };
                            return response.status(400).send(errorResponse);
                        }
                    }
                    else {
                        const errorResponse = {
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
                yield this.productDiscountService.create(distArr);
            }
            // Product Special
            if (product.productSpecial) {
                this.productSpecialService.delete({ productId: saveProduct.productId });
                const productSpecial = product.productSpecial;
                const splArr = [];
                for (const special of productSpecial) {
                    const specialPriceData = new ProductSpecial_1.ProductSpecial();
                    specialPriceData.productId = saveProduct.productId;
                    specialPriceData.customerGroupId = special.customerGroupId;
                    specialPriceData.priority = special.specialPriority;
                    const specialSkuValue = yield this.skuService.findOne({
                        where: {
                            skuName: special.skuName,
                        },
                    });
                    if (specialSkuValue) {
                        const value = yield this.productService.findOne({
                            where: {
                                skuId: specialSkuValue.id,
                                productId: saveProduct.productId,
                            },
                        });
                        const varientSku = yield this.productVarientOptionService.findOne({
                            where: {
                                skuId: specialSkuValue.id,
                                productId: saveProduct.productId,
                            },
                        });
                        if (value) {
                            specialPriceData.skuId = specialSkuValue.id;
                        }
                        else if (varientSku) {
                            specialPriceData.skuId = specialSkuValue.id;
                        }
                        else {
                            const errorResponse = {
                                status: 0,
                                message: 'Invalid sku for this product',
                            };
                            return response.status(400).send(errorResponse);
                        }
                    }
                    else {
                        const errorResponse = {
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
                yield this.productSpecialService.create(splArr);
            }
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: id,
                },
            });
            vendorProduct.pincodeBasedDelivery = product.pincodeBasedDelivery;
            yield this.vendorProductService.create(vendorProduct);
            if (saveProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated your product',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to updated your Product',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    vendorProductList(limit, offset, status, keyword, price, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            }, {
                tableName: 'VendorProducts.vendor',
                aliasName: 'vendor',
            }, {
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
                const vendorProductListCount = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const sucResponse = {
                    status: 1,
                    message: 'Successfully got Vendor Product list.',
                    data: vendorProductListCount,
                };
                return response.status(200).send(sucResponse);
            }
            const vendorProductList = yield this.vendorProductService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const productList = vendorProductList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const defaultValue = yield this.productImageService.findOne({
                    select: ['image', 'containerName'],
                    where: {
                        productId: value.productId,
                        defaultImage: 1,
                    },
                });
                const temp = value;
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const categories = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: value.productId },
                }).then((val) => {
                    const category = val.map((values) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: values.categoryId });
                        const tempp = values;
                        if (categoryNames !== undefined) {
                            tempp.categoryName = categoryNames.name;
                        }
                        else {
                            tempp.categoryName = '';
                        }
                        return tempp;
                    }));
                    const result = Promise.all(category);
                    return result;
                });
                temp.vendorCategory = categories;
                const productSpecial = yield this.productSpecialService.findSpecialPrice(value.productId, todaydate);
                const productDiscount = yield this.productDiscountService.findDiscountPrice(value.productId, todaydate);
                if (productSpecial !== undefined) {
                    temp.pricerefer = productSpecial.price;
                    temp.flag = 1;
                }
                else if (productDiscount !== undefined) {
                    temp.pricerefer = productDiscount.price;
                    temp.flag = 0;
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                temp.productImage = defaultValue;
                const orderProduct = yield this.orderProductService.getEarnings(value.productId);
                if (orderProduct) {
                    temp.earnings = orderProduct.productPriceTotal;
                }
                else {
                    temp.earnings = '';
                }
                return temp;
            }));
            const results = yield Promise.all(productList);
            const successResponse = {
                status: 1,
                message: 'Successfully got your product list.',
                data: results,
            };
            return response.status(200).send(successResponse);
        });
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
    deleteProduct(productid, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne(productid);
            if (product === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductId = yield this.orderProductService.findOne({ where: { productId: productid } });
            if (orderProductId) {
                const errorResponse = {
                    status: 0,
                    message: 'That product is ordered',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.skuService.delete({ id: product.skuId });
            const deleteProduct = yield this.productService.delete(productid);
            const relatedProduct = yield this.productRelatedService.findAll({ where: { productId: productid } });
            for (const relatedproduct of relatedProduct) {
                yield this.productService.delete(relatedproduct.id);
            }
            const relatedProductId = yield this.productRelatedService.findAll({ where: { relatedProductId: productid } });
            for (const relatedproducts of relatedProductId) {
                yield this.productService.delete(relatedproducts.id);
            }
            const couponProducts = yield this.vendorCouponProductCategoryService.findAll({
                where: {
                    referenceId: productid, type: 1,
                },
            });
            for (const couponProduct of couponProducts) {
                yield this.vendorCouponProductCategoryService.delete(couponProduct.id);
            }
            if (deleteProduct) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted your product',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to delete your product',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteMultipleProduct(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productIdNo = request.body.productId;
            const productid = productIdNo.split(',');
            for (const id of productid) {
                const dataId = yield this.productService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Please choose a product for delete',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of productid) {
                const orderProductId = yield this.orderProductService.findOne({ where: { productId: id } });
                if (orderProductId) {
                    const errorResponse = {
                        status: 0,
                        message: 'That product is ordered',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const id of productid) {
                const deleteProductId = parseInt(id, 10);
                const product = yield this.productService.findOne(id);
                yield this.skuService.delete({ id: product.skuId });
                yield this.productService.delete(deleteProductId);
                const relatedProduct = yield this.productRelatedService.findAll({ where: { productId: deleteProductId } });
                for (const relatedproduct of relatedProduct) {
                    yield this.productService.delete(relatedproduct.id);
                }
                const relatedProductId = yield this.productRelatedService.findAll({ where: { relatedProductId: deleteProductId } });
                for (const relatedproducts of relatedProductId) {
                    yield this.productService.delete(relatedproducts.id);
                }
                const couponProducts = yield this.vendorCouponProductCategoryService.findAll({
                    where: {
                        referenceId: deleteProductId, type: 1,
                    },
                });
                for (const couponProduct of couponProducts) {
                    yield this.vendorCouponProductCategoryService.delete(couponProduct.id);
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully deleted Product',
            };
            return response.status(200).send(successResponse);
        });
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
    vendorProductDetail(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendorProductDetail = yield this.vendorProductService.find({ where: { productId: id, vendorId: request.user.vendorId } });
            if (vendorProductDetail.length === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const productDetail = yield this.productService.findOne({
                productId: id,
            });
            const productDetails = class_transformer_1.classToPlain(productDetail);
            const specialCharges = productDetails.serviceCharges;
            if (specialCharges) {
                const specialCharge = JSON.parse(productDetails.serviceCharges);
                productDetails.productCost = specialCharge.productCost;
                productDetails.packingCost = specialCharge.packingCost;
                productDetails.shippingCost = specialCharge.shippingCost;
                productDetails.tax = specialCharge.tax;
                productDetails.others = specialCharge.others;
            }
            const productSku = yield this.skuService.findOne({ id: productDetails.skuId });
            productDetails.quantity = productSku ? productSku.quantity : productDetails.quantity;
            const vendorProduct = yield this.vendorProductService.findOne({
                select: ['vendorId', 'productId', 'approvalFlag'],
                where: { productId: id },
            });
            const vendor = yield this.vendorService.findOne({
                select: ['customerId'],
                where: { vendorId: vendorProduct.vendorId },
            });
            const customer = yield this.customerService.findOne({
                select: ['firstName'],
                where: { id: vendor.customerId },
            });
            productDetails.approvalflag = vendorProduct.approvalFlag;
            productDetails.vendorId = vendorProduct.vendorId;
            productDetails.vendorName = customer.firstName;
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: id,
                },
            });
            productDetails.Category = yield this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: id },
            }).then((val) => {
                const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const categoryNames = yield this.categoryService.findOne({ categoryId: value.categoryId });
                    const temp = value;
                    if (categoryNames !== undefined) {
                        temp.categoryName = categoryNames.name;
                    }
                    else {
                        temp.categoryName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(category);
                return results;
            });
            productDetails.relatedProductDetail = yield this.productRelatedService.findAll({
                where: { productId: id }, order: {
                    id: 'ASC',
                },
            }).then((val) => {
                const relatedProduct = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const productId = value.relatedProductId;
                    const product = yield this.productService.findOne({
                        select: ['productId', 'name', 'sku'],
                        where: { productId },
                        relations: ['productImage'],
                    });
                    return class_transformer_1.classToPlain(product);
                }));
                const resultData = Promise.all(relatedProduct);
                return resultData;
            });
            productDetails.productSpecialPrice = yield this.productSpecialService.findAll({
                select: ['productSpecialId', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
                where: { productId: id },
                order: {
                    priority: 'ASC',
                },
            }).then((val) => {
                const special = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const skuNames = yield this.skuService.findOne({ id: value.skuId });
                    const temp = value;
                    if (skuNames !== undefined) {
                        temp.skuName = skuNames.skuName;
                    }
                    else {
                        temp.skuName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(special);
                return results;
            });
            productDetails.productDiscountData = yield this.productDiscountService.findAll({
                select: ['productDiscountId', 'quantity', 'priority', 'price', 'dateStart', 'dateEnd', 'skuId'],
                where: { productId: id },
                order: {
                    priority: 'ASC',
                },
            }).then((val) => {
                const discount = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const discountSkuNames = yield this.skuService.findOne({ id: value.skuId });
                    const temp = value;
                    if (discountSkuNames !== undefined) {
                        temp.skuName = discountSkuNames.skuName;
                    }
                    else {
                        temp.skuName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(discount);
                return results;
            });
            productDetails.productVarient = yield this.productVarientService.findAll({
                select: ['id', 'varientsId', 'productId'],
                where: { productId: productDetail.productId },
            });
            productDetails.productvarientList = yield this.productVarientOptionService.findAll({
                select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const productVarList = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const sku = yield this.skuService.findOne({
                        select: ['id', 'skuName', 'price', 'isActive', 'quantity'],
                        where: { id: value.skuId },
                    });
                    const image = yield this.productVarientOptionImageService.findAll({
                        select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                        where: { productVarientOptionId: value.id },
                    });
                    const productVarientOption = yield this.productVarientOptionDetailService.findAll({
                        select: ['id', 'productVarientOptionId', 'varientsValueId'],
                        where: { productVarientOptionId: value.id },
                    }).then((varientValue) => {
                        const varientValueList = varientValue.map((vv) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const tempValue = vv;
                            const varientValueData = yield this.varientsValueService.findOneData({
                                select: ['id', 'valueName'],
                                where: { id: vv.varientsValueId },
                            });
                            tempValue.valueName = (varientValueData !== undefined) ? varientValueData.valueName : '';
                            return tempValue;
                        }));
                        const rslt = Promise.all(varientValueList);
                        return rslt;
                    });
                    temp.skuName = sku.skuName;
                    temp.price = sku.price;
                    temp.quantity = sku.quantity;
                    temp.optionImage = image;
                    temp.productVarientOption = productVarientOption;
                    return temp;
                }));
                const resultData = Promise.all(productVarList);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully get productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
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
    addProductStatus(id, status, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: id,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            const vendorProduct = yield this.vendorProductService.findOne({
                where: {
                    productId: id,
                },
            });
            if (vendorProduct.approvalFlag === 0) {
                const errorResponse = {
                    status: 0,
                    message: 'This product is not approved, so you cannot change status.',
                };
                return response.status(400).send(errorResponse);
            }
            product.isActive = status;
            const vendorProductSave = yield this.productService.create(product);
            if (vendorProductSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Updated Status . ',
                    data: vendorProductSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update product',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    ExportAllProductsById(productId, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const productsid = productId.split(',');
            for (const id of productsid) {
                const dataId = yield this.productService.findOne(id);
                if (dataId === undefined) {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid productId',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            for (const product of productsid) {
                const data = yield this.productService.findOne(product);
                const productDescription = data.description;
                const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
                const related = [];
                const relatedProducts = yield this.productRelatedService.findAll({ where: { productId: data.productId } });
                for (const relatedProduct of relatedProducts) {
                    const productName = yield this.productService.findOne({ where: { productId: relatedProduct.relatedProductId } });
                    related.push(productName.name);
                }
                const relProduct = related.toString();
                const vendorProduct = yield this.vendorProductService.findOne({ select: ['vendorId'], where: { productId: data.productId } });
                const vendors = yield this.vendorService.findOne({ select: ['customerId'], where: { vendorId: vendorProduct.vendorId } });
                const customer = yield this.customerService.findOne({ select: ['firstName'], where: { id: vendors.customerId } });
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
            const productid = productId.split(',');
            for (const products of productid) {
                const specialPrices = yield this.productSpecialService.findAll({ where: { productId: products } });
                for (const specialPrice of specialPrices) {
                    const productName = yield this.productService.findOne({ where: { productId: specialPrice.productId } });
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
            const disproductsid = productId.split(',');
            for (const products of disproductsid) {
                const discountPrices = yield this.productDiscountService.findAll({ where: { productId: products } });
                for (const discountPrice of discountPrices) {
                    const productName = yield this.productService.findOne({ where: { productId: discountPrice.productId } });
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
            const imageProductId = productId.split(',');
            for (const products of imageProductId) {
                const images = yield this.productImageService.findAll({ where: { productId: products } });
                for (const image of images) {
                    const productName = yield this.productService.findOne({ where: { productId: image.productId } });
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
            const relatedProductId = productId.split(',');
            for (const products of relatedProductId) {
                const categories = yield this.productToCategoryService.findAll({ where: { productId: products } });
                for (const category of categories) {
                    const categoryName = yield this.categoryService.findOne({ where: { categoryId: category.categoryId } });
                    if (categoryName) {
                        relatedCategory.push([category.productId, category.categoryId, categoryName.name]);
                    }
                }
            }
            // Add all rows data in sheet
            worksheet6.addRows(relatedCategory);
            const fileName = './ProductExcel_' + Date.now() + '.xlsx';
            yield workbook.xlsx.writeFile(fileName);
            return new Promise((resolve, reject) => {
                response.download(fileName, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        fs.unlinkSync(fileName);
                        return response.end();
                    }
                });
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
    productCounts(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const whereCondition = [];
            const relations = [];
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
            const vendorActiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], whereCondition, [], relations, [], [], true, true);
            const inactiveWhereCondition = [];
            inactiveWhereCondition.push({
                name: 'vendor.vendorId',
                op: 'and',
                value: request.user.vendorId,
            }, {
                name: 'product.isActive',
                op: 'and',
                value: 0,
            });
            const vendorInactiveProductListCount = yield this.vendorProductService.listByQueryBuilder(0, 0, [], inactiveWhereCondition, [], relations, [], [], true, true);
            const select = [];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'vendorId',
                    op: 'where',
                    value: request.user.vendorId,
                },
            ];
            const totalProductCount = yield this.vendorProductService.list(0, 0, select, relation, WhereConditions, '', 0);
            const successResponse = {
                status: 1,
                message: 'Successfully get Today Product count',
                data: {
                    inActiveVendorProductList: vendorInactiveProductListCount,
                    activeProductCount: vendorActiveProductListCount,
                    TotalProductCount: totalProductCount.length,
                },
            };
            return response.status(200).send(successResponse);
        });
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
    updateQuotationAvailable(id, quotationAvailable, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.vendorProductService.findOne({
                where: {
                    productId: id, vendorId: request.user.vendorId,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            product.quotationAvailable = quotationAvailable;
            const productSave = yield this.vendorProductService.create(product);
            if (productSave) {
                const successResponse = {
                    status: 1,
                    message: 'quotation status updated successfully .',
                    data: productSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to update successfully',
                };
                return response.status(400).send(errorResponse);
            }
        });
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
    deleteProductVarientOption(id, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productVarientOptionId = yield this.productVarientOptionService.findOne({
                where: {
                    id,
                },
            });
            if (!productVarientOptionId) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid Id',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductId = yield this.orderProductService.productVarientPaymentProcess(id);
            if (orderProductId) {
                const errorResponse = {
                    status: 0,
                    message: 'This product varient is ordered',
                };
                return response.status(400).send(errorResponse);
            }
            yield this.skuService.delete({ id: productVarientOptionId.skuId });
            const productVarientOption = yield this.productVarientOptionService.delete(id);
            if (productVarientOption) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully deleted.',
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
    validate_slug($slug, $id = 0, $count = 0) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const slugCount = yield this.productService.checkSlug($slug, $id, $count);
            if (slugCount) {
                if (!$count) {
                    $count = 1;
                }
                else {
                    $count++;
                }
                return yield this.validate_slug($slug, $id, $count);
            }
            else {
                if ($count > 0) {
                    $slug = $slug + $count;
                }
                return $slug;
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/create-vendor-product'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [VendorProductRequest_1.VendorProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "createProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-vendor-product/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, VendorProductRequest_1.VendorProductRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-product-list'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('status')), tslib_1.__param(3, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(4, routing_controllers_1.QueryParam('price')), tslib_1.__param(5, routing_controllers_1.QueryParam('count')), tslib_1.__param(6, routing_controllers_1.Req()), tslib_1.__param(7, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Number, String, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "vendorProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-product/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "deleteProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/delete-product'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "deleteMultipleProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-product-detail/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "vendorProductDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/add-vendor-product-status/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.BodyParam('status')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "addProductStatus", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-product-excel-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('productId')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "ExportAllProductsById", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/product-counts'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "productCounts", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-quotation-available/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.BodyParam('quotationAvailable')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "updateQuotationAvailable", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-product-varient-option/:id'),
    routing_controllers_1.Authorized('vendor'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorProductController.prototype, "deleteProductVarientOption", null);
VendorProductController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/vendor-product'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        ProductImageService_1.ProductImageService,
        CategoryService_1.CategoryService,
        ProductRelatedService_1.ProductRelatedService,
        ProductDiscountService_1.ProductDiscountService,
        ProductSpecialService_1.ProductSpecialService,
        OrderProductService_1.OrderProductService,
        CustomerService_1.CustomerService,
        VendorService_1.VendorService,
        SkuService_1.SkuService,
        ProductVarientService_1.ProductVarientService,
        ProductVarientOptionService_1.ProductVarientOptionService,
        ProductVarientOptionDetailService_1.ProductVarientOptionDetailService,
        ProductVarientOptionImageService_1.ProductVarientOptionImageService,
        VarientsValueService_1.VarientsValueService,
        VendorCouponProductCategoryService_1.VendorCouponProductCategoryService,
        VendorProductService_1.VendorProductService])
], VendorProductController);
exports.VendorProductController = VendorProductController;
//# sourceMappingURL=VendorProductController.js.map