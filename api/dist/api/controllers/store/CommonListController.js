"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonListController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const BannerService_1 = require("../../services/BannerService");
const mail_services_1 = require("../../../auth/mail.services");
const class_transformer_1 = require("class-transformer");
const CategoryService_1 = require("../../services/CategoryService");
const ProductService_1 = require("../../services/ProductService");
const array_to_tree_1 = tslib_1.__importDefault(require("array-to-tree"));
const ProductRelated_1 = require("../../models/ProductRelated");
const ProductRelatedService_1 = require("../../services/ProductRelatedService");
const ProductImageService_1 = require("../../services/ProductImageService");
const CustomerWishlistService_1 = require("../../services/CustomerWishlistService");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const CountryService_1 = require("../../services/CountryService");
const ContactService_1 = require("../../services/ContactService");
const ContactRequest_1 = require("./requests/ContactRequest");
const Contact_1 = require("../../models/Contact");
const EmailTemplateService_1 = require("../../services/EmailTemplateService");
const zoneService_1 = require("../../services/zoneService");
const LanguageService_1 = require("../../services/LanguageService");
const ProductDiscountService_1 = require("../../services/ProductDiscountService");
const ProductSpecialService_1 = require("../../services/ProductSpecialService");
const ProductToCategoryService_1 = require("../../services/ProductToCategoryService");
const CategoryPathService_1 = require("../../services/CategoryPathService");
const PluginService_1 = require("../../services/PluginService");
const UserService_1 = require("../../services/UserService");
const BlogService_1 = require("../../services/BlogService");
const VendorProductService_1 = require("../../services/VendorProductService");
const VendorService_1 = require("../../services/VendorService");
const CustomerService_1 = require("../../services/CustomerService");
const OrderStatusService_1 = require("../../services/OrderStatusService");
const TaxService_1 = require("../../services/TaxService");
const BlogRelatedService_1 = require("../../services/BlogRelatedService");
const OrderProductService_1 = require("../../services/OrderProductService");
const OrderProductLogService_1 = require("../../services/OrderProductLogService");
const ProductQuestionService_1 = require("../../services/ProductQuestionService");
const ProductAnswerService_1 = require("../../services/ProductAnswerService");
const ProductAnswerLikeDislikeService_1 = require("../../services/ProductAnswerLikeDislikeService");
const SettingService_1 = require("../../services/SettingService");
const env_1 = require("../../../env");
const SkuService_1 = require("../../services/SkuService");
const ProductVarientOptionService_1 = require("../../services/ProductVarientOptionService");
const ListRequest_1 = require("./requests/ListRequest");
const SiteFilterCategoryService_1 = require("../../services/SiteFilterCategoryService");
const SiteFilterSectionService_1 = require("../../services/SiteFilterSectionService");
const SiteFilterSectionItemService_1 = require("../../services/SiteFilterSectionItemService");
const WidgetService_1 = require("../../services/WidgetService");
const WidgetItemService_1 = require("../../services/WidgetItemService");
let CommonListController = class CommonListController {
    constructor(bannerService, taxService, categoryService, productRelatedService, productService, productImageService, languageService, customerWishlistService, countryService, contactService, emailTemplateService, blogService, blogRelatedService, zoneService, productDiscountService, productSpecialService, siteFilterSectionService, siteFilterSectionItemService, siteFilterCategoryService, widgetService, widgetItemService, productToCategoryService, categoryPathService, pluginService, vendorProductService, vendorService, customerService, userService, orderStatusService, productQuestionService, productAnswerLikeService, settingsService, orderProductService, orderProductLogService, productAnswerService, productVarientOptionService, skuService) {
        this.bannerService = bannerService;
        this.taxService = taxService;
        this.categoryService = categoryService;
        this.productRelatedService = productRelatedService;
        this.productService = productService;
        this.productImageService = productImageService;
        this.languageService = languageService;
        this.customerWishlistService = customerWishlistService;
        this.countryService = countryService;
        this.contactService = contactService;
        this.emailTemplateService = emailTemplateService;
        this.blogService = blogService;
        this.blogRelatedService = blogRelatedService;
        this.zoneService = zoneService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        this.siteFilterSectionService = siteFilterSectionService;
        this.siteFilterSectionItemService = siteFilterSectionItemService;
        this.siteFilterCategoryService = siteFilterCategoryService;
        this.widgetService = widgetService;
        this.widgetItemService = widgetItemService;
        this.productToCategoryService = productToCategoryService;
        this.categoryPathService = categoryPathService;
        this.pluginService = pluginService;
        this.vendorProductService = vendorProductService;
        this.vendorService = vendorService;
        this.customerService = customerService;
        this.userService = userService;
        this.orderStatusService = orderStatusService;
        this.productQuestionService = productQuestionService;
        this.productAnswerLikeService = productAnswerLikeService;
        this.settingsService = settingsService;
        this.orderProductService = orderProductService;
        this.orderProductLogService = orderProductLogService;
        this.productAnswerService = productAnswerService;
        this.productVarientOptionService = productVarientOptionService;
        this.skuService = skuService;
    }
    // Banner List API
    /**
     * @api {get} /api/list/banner-list Banner List
     * @apiGroup Store List
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
     *      "message": "Thank you Banner list show successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/banner-list
     * @apiErrorExample {json} Banner List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Product list Function
    bannerList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['bannerId', 'title', 'image', 'imagePath', 'content', 'link', 'position', 'isActive'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                },
            ];
            const WhereConditions = [
                {
                    name: 'isActive',
                    value: 1,
                },
            ];
            const bannerList = yield this.bannerService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got banner list',
                data: bannerList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Category List Tree API
    /**
     * @api {get} /api/list/category-list Category List Tree API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit Limit
     * @apiParam (Request body) {Number} offset Offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiParamExample {json} Input
     * {
     *      "limit" : "",
     *      "offset": "",
     *      "keyorder": "",
     *      "sortOrder": "",
     *      "count": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "category list shown successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    ParentCategoryList(limit, offset, keyword, sortOrder, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'categorySlug', 'metaTagDescription', 'metaTagKeyword', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                }, {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                }, {
                    name: 'parentInt',
                    op: 'where',
                    value: 0,
                },
            ];
            const WhereConditions = [];
            const categoryData = yield this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get All category List',
                    data: categoryData,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const category = categoryData.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const tempVal = value;
                    const child = yield this.categoryService.find({
                        where: { parentInt: value.categoryId, isActive: 1 }, order: { sortOrder: 'ASC' },
                        select: ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'categorySlug'],
                    });
                    const children = child.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const data = val;
                        const subChild = yield this.categoryService.find({
                            where: { parentInt: val.categoryId, isActive: 1 }, order: { sortOrder: 'ASC' },
                            select: ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'categorySlug'],
                        });
                        if (subChild.length > 0) {
                            data.children = subChild;
                            return data;
                        }
                        return data;
                    }));
                    const childrenData = yield Promise.all(children);
                    tempVal.children = childrenData;
                    return tempVal;
                }));
                const result = yield Promise.all(category);
                if (result) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully got the list of categories.',
                        data: result,
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
    }
    // Related Product Adding API
    /**
     * @api {post} /api/list/add-related-product Add a Related Product
     * @apiGroup Store List
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {string} relatedProductId Related Product Id
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "relatedProductId": "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Product adding successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/add-related-product
     * @apiErrorExample {json} Related Product Adding error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    addRelatedProduct(productParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productId = productParam.productId;
            const relatedProductId = productParam.relatedProductId;
            const eachData = relatedProductId.split(',');
            let i;
            for (i = 0; i < eachData.length; i++) {
                const relatedProduct = new ProductRelated_1.ProductRelated();
                relatedProduct.productId = productId;
                relatedProduct.relatedProductId = eachData[i];
                yield this.productRelatedService.create(relatedProduct);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully added the related products.',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Product List API
    /**
     * @api {get} /api/list/productlist Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} manufacturerId manufacturerId
     * @apiParam (Request body) {String} categoryId categoryId
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {Number} price orderBy 0->desc 1->asc
     * @apiParam (Request body) {Number} condition  1->new 2->used
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in boolean or number
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/list/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    productList(limit, offset, keyword, manufacturerId, categoryId, priceFrom, priceTo, price, condition, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['product.productId', 'product.sku', 'product.name', 'product.quantity', 'product.description', 'product.price',
                'product.isActive AS isActive', 'product.manufacturerId AS manufacturerId', 'product.location AS location', 'product.minimumQuantity AS minimumQuantity',
                'product.taxType', 'product.taxValue', 'product.subtractStock', 'product.wishListStatus', 'product.stockStatusId', 'product.shipping', 'product.sortOrder', 'product.condition', 'product.productSlug',
                'product.dateAvailable', 'product.amount', 'product.metaTagTitle', 'product.metaTagDescription', 'product.metaTagKeyword', 'product.discount', 'product.rating', 'product.isSimplified', 'product.skuId'];
            const searchConditions = [
                {
                    name: 'product.isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'product.manufacturerId',
                    op: 'and',
                    value: manufacturerId,
                },
                {
                    name: 'product.name',
                    op: 'and',
                    value: keyword,
                },
                {
                    name: 'product.condition',
                    op: 'andWhere',
                    value: condition,
                },
            ];
            const whereConditions = [{
                    name: 'product.productId',
                    op: 'inraw',
                    value: categoryId,
                }];
            const productList = yield this.productService.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Successfully got Products count',
                    data: productList,
                };
                return response.status(200).send(Response);
            }
            const promises = productList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productToCategory = yield this.productToCategoryService.findAll({
                    select: ['categoryId', 'productId'],
                    where: { productId: result.productId },
                }).then((val) => {
                    const category = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: value.categoryId });
                        const tempValue = value;
                        tempValue.categoryName = categoryNames.name;
                        return tempValue;
                    }));
                    const results = Promise.all(category);
                    return results;
                });
                if (result.taxType === 2) {
                    const tax = yield this.taxService.findOne({ taxId: result.taxValue });
                    if (tax) {
                        result.taxValue = tax.taxPercentage;
                    }
                    else {
                        result.taxValue = '';
                    }
                }
                const productImage = yield this.productImageService.findOne({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: result.productId,
                        defaultImage: 1,
                    },
                });
                const temp = result;
                temp.Images = productImage;
                temp.Category = productToCategory;
                temp.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                if (result.isSimplified === 1) {
                    skuValue = yield this.skuService.findOne({ id: result.skuId });
                    if (skuValue) {
                        temp.price = skuValue.price;
                        temp.skuName = skuValue.skuName;
                        skuId = skuValue.id;
                    }
                }
                else {
                    skuValue = yield this.productVarientOptionService.findOne({ productId: result.productId });
                    if (skuValue) {
                        const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                        temp.price = productVarientSku.price;
                        temp.skuName = productVarientSku.skuName;
                        skuId = productVarientSku.id;
                    }
                }
                if (skuId) {
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(result.productId, skuId, todaydate);
                    const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(result.productId, skuId, todaydate);
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
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                if (result.hasStock === 1) {
                    if (result.quantity <= result.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                }
                else {
                    temp.stockStatus = 'inStock';
                }
                if (request.header('authorization')) {
                    const userId = jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true });
                    const userUniqueId = Object.keys(userId).map((key) => {
                        return [(key), userId[key]];
                    });
                    const wishStatus = yield this.customerWishlistService.findOne({
                        where: {
                            productId: result.productId,
                            customerId: userUniqueId[0][1],
                        },
                    });
                    if (wishStatus !== undefined) {
                        temp.wishListStatus = 1;
                    }
                    else {
                        temp.wishListStatus = 0;
                    }
                }
                else {
                    temp.wishListStatus = 0;
                }
                return temp;
            }));
            const finalResult = yield Promise.all(promises);
            const maximum = ['Max(product.price) As maximumProductPrice'];
            const maximumPrice = yield this.productService.productMaxPrice(maximum);
            const productPrice = maximumPrice.maximumProductPrice;
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete list of products.',
                data: {
                    maximumProductPrice: productPrice,
                    productList: finalResult,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Custom Product List API
    /**
     * @api {get} /api/list/custom-product-list Custom Product List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} manufacturerId manufacturerId
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} price ASC OR DESC
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} attribute attribute
     * @apiParam (Request body) {String} variant variant
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/list/custom-product-list
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    customProductList(params, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const variant = [];
                const attribute = [];
                const tempVariant = params.variant ? params.variant.split(',') : [];
                const tempAttribute = params.attribute ? params.attribute.split(',') : [];
                if (tempVariant && tempVariant.length > 0) {
                    tempVariant.forEach(element => {
                        const temp = {};
                        const value = element.split('~');
                        temp.name = value[0];
                        temp.value = value[1];
                        variant.push(temp);
                    });
                }
                if (tempAttribute && tempAttribute.length > 0) {
                    tempAttribute.forEach(element => {
                        const temp = {};
                        const value = element.split('~');
                        temp.name = value[0];
                        temp.value = value[1];
                        attribute.push(temp);
                    });
                }
                // const productList: any = await this.productService.customProductList(params.limit, params.offset, params.manufacturerId, params.categoryslug, params.keyword, params.priceFrom, params.priceTo, params.price, variant, attribute);
                const limit = params.limit;
                const offset = params.offset;
                const selects = ['Product.productId as productId',
                    'Product.taxType as taxType',
                    'Product.taxValue as taxValue',
                    'Product.name as name',
                    'Product.price as price',
                    'Product.taxType as taxType',
                    'Product.description as description',
                    'Product.manufacturerId as manufacturerId',
                    'Product.dateAvailable as dateAvailable',
                    'Product.sku as sku',
                    'Product.skuId as skuId',
                    'Product.isSimplified as isSimplified',
                    'Product.upc as upc',
                    'Product.quantity as quantity',
                    'Product.rating as rating',
                    'Product.isActive as isActive',
                    'Product.productSlug as productSlug',
                    'Product.metaTagTitle as metaTagTitle',
                    'Product.metaTagDescription as metaTagDescription',
                    'Product.metaTagKeyword as metaTagKeyword',
                    'Product.hasStock as hasStock',
                    'Product.outOfStockThreshold as outOfStockThreshold',
                    'Product.stockStatusId as stockStatusId',
                    'Product.createdDate as createdDate',
                    'Product.keywords as keywords',
                    'Product.attributeKeyword as attributeKeyword',
                    ' (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND ((pd2.date_start <= NOW() AND  pd2.date_end >= NOW()))' +
                        ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount',
                    '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND  ((ps.date_start <= NOW() AND ps.date_end > NOW()))' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special'];
                const whereCondition = [];
                const relations = [];
                const groupBy = [];
                if (params.categoryslug === '' || params.categoryslug === undefined) {
                    relations.push({
                        tableName: 'Product.vendorProducts',
                        op: 'left',
                        aliasName: 'vendorProducts',
                    }, {
                        tableName: 'vendorProducts.vendor',
                        op: 'left',
                        aliasName: 'vendor',
                    }, {
                        tableName: 'vendor.customer',
                        op: 'left',
                        aliasName: 'customer',
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: '((' + 'customer.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'customer.deleteFlag',
                        op: 'and',
                        value: 0 + ')',
                    }, {
                        name: 'vendor.customer_id ',
                        op: 'IS NULL',
                        value: ')',
                    });
                }
                else {
                    relations.push({
                        tableName: 'Product.productToCategory',
                        op: 'left',
                        aliasName: 'productToCategory',
                    }, {
                        tableName: 'productToCategory.category',
                        op: 'left',
                        aliasName: 'category',
                    }, {
                        tableName: 'Product.vendorProducts',
                        op: 'left',
                        aliasName: 'vendorProducts',
                    }, {
                        tableName: 'vendorProducts.vendor',
                        op: 'left',
                        aliasName: 'vendor',
                    }, {
                        tableName: 'vendor.customer',
                        op: 'left',
                        aliasName: 'customer',
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: '((' + 'customer.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'customer.deleteFlag',
                        op: 'and',
                        value: 0 + ')',
                    }, {
                        name: 'vendor.customer_id ',
                        op: 'IS NULL',
                        value: ')',
                    }, {
                        name: 'category.category_slug',
                        op: 'and',
                        value: '"' + params.categoryslug + '"',
                    });
                }
                if (params.manufacturerId) {
                    whereCondition.push({
                        name: 'Product.manufacturer_id',
                        op: 'IN',
                        value: params.manufacturerId,
                    });
                }
                const searchConditions = [];
                if (params.keyword) {
                    searchConditions.push({
                        name: ['Product.keywords', 'Product.name'],
                        value: params.keyword.toLowerCase(),
                    });
                }
                if (params.priceFrom) {
                    whereCondition.push({
                        name: '`Product`.`price`',
                        op: 'raw',
                        sign: '>=',
                        value: params.priceFrom,
                    });
                }
                if (params.priceTo) {
                    whereCondition.push({
                        name: '`Product`.`price`',
                        op: 'raw',
                        sign: '<=',
                        value: params.priceTo,
                    });
                }
                if (params.attribute) {
                    searchConditions.push({
                        name: ['Product.attribute_keyword'],
                        op: 'attribute',
                        value: attribute,
                    });
                }
                if (params.variant) {
                    whereCondition.push({
                        name: 'Product.product_id',
                        op: 'IN',
                        sign: 'variant',
                        value: variant,
                    });
                }
                const sort = [];
                if (params.price) {
                    sort.push({
                        name: '(CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE Product.price END)',
                        order: params.price,
                    });
                }
                else {
                    sort.push({
                        name: 'Product.sortOrder',
                        order: 'ASC',
                    });
                }
                const productList = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
                const promises = productList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const productImage = yield this.productImageService.findOne({
                        select: ['productId', 'image', 'containerName', 'defaultImage'],
                        where: {
                            productId: result.productId,
                            defaultImage: 1,
                        },
                    });
                    if (result.taxType === 2) {
                        const tax = yield this.taxService.findOne({ taxId: result.taxValue });
                        if (tax) {
                            result.taxValue = tax.taxPercentage;
                        }
                        else {
                            result.taxValue = '';
                        }
                    }
                    const temp = result;
                    temp.Images = productImage;
                    temp.skuName = '';
                    let skuValue = undefined;
                    let skuId = undefined;
                    if (result.isSimplified === 1) {
                        skuValue = yield this.skuService.findOne({ id: result.skuId });
                        if (skuValue) {
                            temp.price = skuValue.price;
                            temp.skuName = skuValue.skuName;
                            skuId = skuValue.id;
                        }
                    }
                    else {
                        skuValue = yield this.productVarientOptionService.findOne({ productId: result.productId, isActive: 1 });
                        if (skuValue) {
                            const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                            temp.price = productVarientSku.price;
                            temp.skuName = productVarientSku.skuName;
                            skuId = productVarientSku.id;
                        }
                        else {
                            const sku = yield this.skuService.findOne({ id: result.skuId });
                            if (sku) {
                                temp.price = sku.price;
                                temp.skuName = sku.skuName;
                                skuId = sku.id;
                            }
                        }
                    }
                    if (skuId) {
                        const nowDate = new Date();
                        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(result.productId, skuId, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(result.productId, skuId, todaydate);
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
                    }
                    else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: result.productId } });
                    if (vendorProduct) {
                        const vendor = yield this.vendorService.findOne(vendorProduct.vendorId);
                        const customer = yield this.customerService.findOne(vendor.customerId);
                        temp.vendorId = vendor ? vendor.vendorId : '';
                        temp.vendorName = customer ? customer.firstName : '';
                        temp.vendorCompanyName = customer ? customer.companyName : '';
                        temp.vendorCompanyLocation = vendor ? vendor.companyLocation : '';
                    }
                    if (result.hasStock === 1) {
                        if (result.quantity <= result.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                    if (request.header('authorization')) {
                        const userId = jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true });
                        const userUniqueId = Object.keys(userId).map((key) => {
                            return [(key), userId[key]];
                        });
                        const wishStatus = yield this.customerWishlistService.findOne({
                            where: {
                                productId: result.productId,
                                customerId: userUniqueId[0][1],
                            },
                        });
                        if (wishStatus) {
                            temp.wishListStatus = 1;
                        }
                        else {
                            temp.wishListStatus = 0;
                        }
                    }
                    else {
                        temp.wishListStatus = 0;
                    }
                    return temp;
                }));
                const finalResult = yield Promise.all(promises);
                let categoryLevel;
                if (params.categoryslug) {
                    const category = yield this.categoryService.findOne({ categorySlug: params.categoryslug, isActive: 1 });
                    if (category) {
                        const categoryLevels = yield this.categoryPathService.find({
                            select: ['level', 'pathId'],
                            where: { categoryId: category.categoryId },
                            order: { level: 'ASC' },
                        }).then((values) => {
                            const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                const categoryData = yield this.categoryService.findOne({ categoryId: val.pathId });
                                const tempVal = val;
                                tempVal.categoryName = categoryData ? categoryData.name : '';
                                tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                                tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                                tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                                tempVal.metaTagTitle = categoryData ? categoryData.metaTagTitle : '';
                                tempVal.metaTagDescription = categoryData ? categoryData.metaTagDescription : '';
                                tempVal.metaTagKeyword = categoryData ? categoryData.metaTagKeyword : '';
                                return tempVal;
                            }));
                            const results = Promise.all(categories);
                            return results;
                        });
                        categoryLevel = categoryLevels;
                    }
                    else {
                        const errorResponse = {
                            status: 0,
                            message: 'Invalid category',
                        };
                        return response.status(400).send(errorResponse);
                    }
                }
                else {
                    categoryLevel = '';
                }
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the complete list of products.',
                    data: finalResult,
                    categoryLevel,
                };
                return response.status(200).send(successResponse);
            }));
        });
    }
    // Related Product Showing API
    /**
     * @api {get} /api/list/related-product-list Related Product List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} productId Product Id
     * @apiParam (Request body) {Number} count
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Product List Showing Successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/related-product-list
     * @apiErrorExample {json} Related Product List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    relatedProductList(productid, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productid,
            });
            if (!productDetail) {
                return response.status(200).send({
                    status: 1,
                    message: 'Related product list is successfully being shown. ',
                    data: [],
                });
            }
            const selects = ['ProductRelated.relatedProductId as productId',
                'ProductRelated.id as id',
                'product.taxType as taxType',
                'product.taxValue as taxValue',
                'product.skuId as skuId',
                'product.price as price',
                'product.name as name',
                'product.isSimplified as isSimplified',
                'product.description as description',
                'product.quantity as quantity',
                'product.rating as rating',
                'product.productSlug as productSlug',
                'product.hasStock as hasStock',
                'product.outOfStockThreshold as outOfStockThreshold'];
            const whereCondition = [];
            const searchConditions = [];
            const relations = [];
            relations.push({
                tableName: 'ProductRelated.productRelated',
                aliasName: 'product',
            });
            whereCondition.push({
                name: 'ProductRelated.productId',
                op: 'and',
                value: productDetail.productId,
            }, {
                name: 'product.is_active',
                op: 'and',
                value: 1,
            });
            const groupBy = [];
            const sort = [];
            sort.push({
                name: 'ProductRelated.id',
                order: 'ASC',
            });
            if (count) {
                const relatedDataCount = yield this.productRelatedService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
                const Response = {
                    status: 1,
                    message: 'Related product list is successfully being shown. ',
                    data: relatedDataCount,
                };
                return response.status(200).send(Response);
            }
            const relatedData = yield this.productRelatedService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = relatedData.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (results.taxType === 2) {
                    const tax = yield this.taxService.findOne({ taxId: results.taxValue });
                    if (tax) {
                        results.taxValue = tax.taxPercentage;
                    }
                    else {
                        results.taxValue = '';
                    }
                }
                const Image = yield this.productImageService.findOne({ where: { productId: results.productId, defaultImage: 1 } });
                const temp = results;
                temp.productImage = Image;
                temp.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                if (results.isSimplified === 1) {
                    skuValue = yield this.skuService.findOne({ id: results.skuId });
                    if (skuValue) {
                        temp.price = skuValue.price;
                        temp.skuName = skuValue.skuName;
                        skuId = skuValue.id;
                    }
                }
                else {
                    skuValue = yield this.productVarientOptionService.findOne({ productId: results.productId, isActive: 1 });
                    if (skuValue) {
                        const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                        temp.price = productVarientSku.price;
                        temp.skuName = productVarientSku.skuName;
                        skuId = productVarientSku.id;
                    }
                    else {
                        const sku = yield this.skuService.findOne({ id: results.skuId });
                        if (sku) {
                            temp.price = sku.price;
                            temp.skuName = sku.skuName;
                            skuId = sku.id;
                        }
                    }
                }
                if (skuId) {
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(results.productId, skuId, todaydate);
                    const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(results.productId, skuId, todaydate);
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
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                if (results.hasStock === 1) {
                    if (results.quantity <= results.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                }
                else {
                    temp.stockStatus = 'inStock';
                }
                return temp;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Related product list is successfully being shown. ',
                data: class_transformer_1.classToPlain(result),
            };
            return response.status(200).send(successResponse);
        });
    }
    // Country List API
    /**
     * @api {get} /api/list/country-list Country List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get country list",
     *      "data":{
     *      "countryId"
     *      "name"
     *      "isoCode2"
     *      "isoCode3"
     *      "addressFormat"
     *      "postcodeRequired"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/country-list
     * @apiErrorExample {json} countryFront error
     * HTTP/1.1 500 Internal Server Error
     */
    countryList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['countryId', 'name', 'isoCode2', 'isoCode3', 'postcodeRequired', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const countryList = yield this.countryService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got the list of countries.',
                data: countryList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Contact Us API
    /**
     * @api {post} /api/list/contact-us  Contact Us API
     * @apiGroup Store List
     * @apiParam (Request body) {String} name Name
     * @apiParam (Request body) {String} email Email
     * @apiParam (Request body) {String} phoneNumber Phone Number
     * @apiParam (Request body) {String} message Message
     * @apiParamExample {json} Input
     * {
     *      "name" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "message" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Your mail send to admin..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/contact-us
     * @apiErrorExample {json} Contact error
     * HTTP/1.1 500 Internal Server Error
     */
    // ContactUs Function
    userContact(contactParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const contactInformation = new Contact_1.Contact();
            contactInformation.name = contactParam.name;
            contactInformation.email = contactParam.email;
            contactInformation.phoneNumber = contactParam.phoneNumber;
            contactInformation.message = contactParam.message;
            const informationData = yield this.contactService.create(contactInformation);
            const emailContent = yield this.emailTemplateService.findOne(3);
            const logo = yield this.settingsService.findOne();
            const message = emailContent.content.replace('{name}', informationData.name).replace('{email}', informationData.email).replace('{phoneNumber}', informationData.phoneNumber).replace('{message}', informationData.message);
            const adminId = [];
            const adminUser = yield this.userService.findAll({ select: ['username'], where: { userGroupId: 1 } });
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            const redirectUrl = env_1.env.storeRedirectUrl;
            const sendMailRes = mail_services_1.MAILService.contactMail(logo, message, emailContent.subject, adminId, redirectUrl);
            if (sendMailRes) {
                const successResponse = {
                    status: 1,
                    message: 'Your request Successfully send',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Mail does not send',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Zone List API
    /**
     * @api {get} /api/list/zone-list Zone List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get zone list",
     *      "data":{
     *      "countryId"
     *      "code"
     *      "name"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/zone-list
     * @apiErrorExample {json} Zone error
     * HTTP/1.1 500 Internal Server Error
     */
    zonelist(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['zoneId', 'countryId', 'code', 'name', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const relation = ['country'];
            const zoneList = yield this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
            if (zoneList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get all zone List',
                    data: class_transformer_1.classToPlain(zoneList),
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get zone List',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Language List API
    /**
     * @api {get} /api/list/language-list Language List API
     * @apiGroup Store List
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got language list",
     *      "data":{
     *      "languageId"
     *      "name"
     *      "status"
     *      "code"
     *      "sortOrder"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/language-list
     * @apiErrorExample {json} Language error
     * HTTP/1.1 500 Internal Server Error
     */
    languageList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['languageId', 'name', 'code', 'image', 'imagePath', 'isActive', 'sortOrder', 'isActive'];
            const search = [
                {
                    name: 'name',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const languageList = yield this.languageService.list(limit, offset, select, search, WhereConditions, count);
            if (languageList) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the complete language list.',
                    data: languageList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to show language list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Specific parent Category List API
    /**
     * @api {get} /api/list/specific-category-list Specific Category List
     * @apiGroup Store List
     * @apiParam (Request body) {String} categorySlug categorySlug
     * @apiParamExample {json} Input
     * {
     *      "parentInt" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Category listed successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/specific-category-list
     * @apiErrorExample {json} Category List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Category List Function
    SpecificcategoryList(categorySlugParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const categoryDataId = yield this.categoryService.findOne({
                where: {
                    categorySlug: categorySlugParam,
                },
            });
            if (categoryDataId === undefined) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid categoryId',
                };
                return response.status(400).send(errorResponse);
            }
            const categoryDetailId = yield this.categoryPathService.findOne({ categoryId: categoryDataId.categoryId, level: 0 });
            const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'categorySlug'];
            const search = [
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const categoryData = yield this.categoryService.list(0, 0, select, search, 0, 0, 0);
            const categoryList = array_to_tree_1.default(categoryData, {
                parentProperty: 'parentInt',
                customID: 'categoryId',
            });
            const mainCategoryId = categoryDetailId.pathId;
            let dataList;
            const key = 'categoryId';
            for (const data of categoryList) {
                if (data[key] === mainCategoryId) {
                    dataList = data;
                }
            }
            const successResponse = {
                status: 1,
                message: 'Successfully get the related category List',
                data: dataList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get payment setting API
    /**
     * @api {get} /api/list/get-payment-setting Get payment setting API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got payment setting",
     *      "data":{
     *      "plugin_name"
     *      "plugin_avatar"
     *      "plugin_avatar_path"
     *      "plugin_type"
     *      "plugin_status"
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/get-payment-setting
     * @apiErrorExample {json} get payment setting error
     * HTTP/1.1 500 Internal Server Error
     */
    paymentSettingList(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'pluginName', 'pluginAvatar', 'pluginAvatarPath', 'pluginType', 'pluginAdditionalInfo', 'pluginStatus'];
            const search = [
                {
                    name: 'pluginType',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'pluginStatus',
                    op: 'where',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const paymentSettingList = yield this.pluginService.list(limit, offset, select, search, WhereConditions, count);
            const successResponse = {
                status: 1,
                message: 'Successfully got payment List.',
                data: paymentSettingList,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Active product count API
    /**
     * @api {get} /api/list/product-count  Product Count API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} manufacturerId keyword for search
     * @apiParam (Request body) {String} keyword keyword for search
     * @apiParam (Request body) {String} categoryslug categoryslug
     * @apiParam (Request body) {Number} priceFrom price from you want to list
     * @apiParam (Request body) {Number} priceTo price to you want to list
     * @apiParam (Request body) {String} variant
     * @apiParam (Request body) {String} attribute
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Product Count",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/product-count
     * @apiErrorExample {json} product count error
     * HTTP/1.1 500 Internal Server Error
     */
    productCount(params, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const variant = [];
            const attribute = [];
            const tempVariant = params.variant ? params.variant.split(',') : [];
            const tempAttribute = params.attribute ? params.attribute.split(',') : [];
            if (tempVariant && tempVariant.length > 0) {
                tempVariant.forEach(element => {
                    const temp = {};
                    const value = element.split('~');
                    temp.name = value[0];
                    temp.value = value[1];
                    variant.push(temp);
                });
            }
            if (tempAttribute && tempAttribute.length > 0) {
                tempAttribute.forEach(element => {
                    const temp = {};
                    const value = element.split('~');
                    temp.name = value[0];
                    temp.value = value[1];
                    attribute.push(temp);
                });
            }
            const maximum = ['Max(product.price) As maximumProductPrice'];
            const maximumPrice = yield this.productService.productMaxPrice(maximum);
            const productPrice = maximumPrice.maximumProductPrice;
            // params.limit = 0;
            // params.offset = 0;
            // const productCount = await this.productService.productCount(params.limit, params.offset, params.manufacturerId, params.categoryslug, params.keyword, params.priceFrom, params.priceTo, params.price, variant, attribute);
            const limit = 0;
            const offset = 0;
            const selects = ['Product.productId as productId',
                'Product.taxType as taxType',
                'Product.taxValue as taxValue',
                'Product.name as name',
                'Product.price as price',
                'Product.taxType as taxType',
                'Product.description as description',
                'Product.manufacturerId as manufacturerId',
                'Product.dateAvailable as dateAvailable',
                'Product.sku as sku',
                'Product.skuId as skuId',
                'Product.isSimplified as isSimplified',
                'Product.upc as upc',
                'Product.quantity as quantity',
                'Product.rating as rating',
                'Product.isActive as isActive',
                'Product.productSlug as productSlug',
                'Product.metaTagTitle as metaTagTitle',
                'Product.metaTagDescription as metaTagDescription',
                'Product.metaTagKeyword as metaTagKeyword',
                'Product.hasStock as hasStock',
                'Product.outOfStockThreshold as outOfStockThreshold',
                'Product.stockStatusId as stockStatusId',
                'Product.createdDate as createdDate',
                'Product.keywords as keywords',
                'Product.attributeKeyword as attributeKeyword',
                ' (SELECT price FROM product_discount pd2 WHERE pd2.product_id = Product.product_id AND ((pd2.date_start <= NOW() AND  pd2.date_end >= NOW()))' +
                    ' ORDER BY pd2.priority ASC, pd2.price ASC LIMIT 1) AS discount',
                '(SELECT price FROM product_special ps WHERE ps.product_id = Product.product_id AND  ((ps.date_start <= NOW() AND ps.date_end > NOW()))' + 'ORDER BY ps.priority ASC, ps.price ASC LIMIT 1) AS special'];
            const whereCondition = [];
            const relations = [];
            const groupBy = [];
            if (params.categoryslug === '' || params.categoryslug === undefined) {
                relations.push({
                    tableName: 'Product.vendorProducts',
                    op: 'left',
                    aliasName: 'vendorProducts',
                }, {
                    tableName: 'vendorProducts.vendor',
                    op: 'left',
                    aliasName: 'vendor',
                }, {
                    tableName: 'vendor.customer',
                    op: 'left',
                    aliasName: 'customer',
                });
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: '((' + 'customer.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'customer.deleteFlag',
                    op: 'and',
                    value: 0 + ')',
                }, {
                    name: 'vendor.customer_id ',
                    op: 'IS NULL',
                    value: ')',
                });
            }
            else {
                relations.push({
                    tableName: 'Product.productToCategory',
                    op: 'left',
                    aliasName: 'productToCategory',
                }, {
                    tableName: 'productToCategory.category',
                    op: 'left',
                    aliasName: 'category',
                }, {
                    tableName: 'Product.vendorProducts',
                    op: 'left',
                    aliasName: 'vendorProducts',
                }, {
                    tableName: 'vendorProducts.vendor',
                    op: 'left',
                    aliasName: 'vendor',
                }, {
                    tableName: 'vendor.customer',
                    op: 'left',
                    aliasName: 'customer',
                });
                whereCondition.push({
                    name: 'Product.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: '((' + 'customer.isActive',
                    op: 'and',
                    value: 1,
                }, {
                    name: 'customer.deleteFlag',
                    op: 'and',
                    value: 0 + ')',
                }, {
                    name: 'vendor.customer_id ',
                    op: 'IS NULL',
                    value: ')',
                }, {
                    name: 'category.category_slug',
                    op: 'and',
                    value: '"' + params.categoryslug + '"',
                });
            }
            if (params.manufacturerId) {
                whereCondition.push({
                    name: 'Product.manufacturer_id',
                    op: 'IN',
                    value: params.manufacturerId,
                });
            }
            const searchConditions = [];
            if (params.keyword) {
                searchConditions.push({
                    name: ['Product.keywords', 'Product.name'],
                    op: '',
                    value: params.keyword.toLowerCase(),
                });
            }
            if (params.priceFrom) {
                whereCondition.push({
                    name: '`Product`.`price`',
                    op: 'raw',
                    sign: '>=',
                    value: params.priceFrom,
                });
            }
            if (params.priceTo) {
                whereCondition.push({
                    name: '`Product`.`price`',
                    op: 'raw',
                    sign: '<=',
                    value: params.priceTo,
                });
            }
            if (params.attribute) {
                searchConditions.push({
                    name: ['Product.attribute_keyword'],
                    op: 'attribute',
                    value: attribute,
                });
            }
            if (params.variant) {
                whereCondition.push({
                    name: 'Product.product_id',
                    op: 'IN',
                    sign: 'variant',
                    value: variant,
                });
            }
            const sort = [];
            if (params.price) {
                sort.push({
                    name: '(CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE Product.price END)',
                    order: params.price,
                });
            }
            else {
                sort.push({
                    name: '(CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE Product.price END)',
                    order: 'ASC',
                });
            }
            const productList = yield this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
            // let count;
            // if (productCount.length > 0) {
            //     count = productCount[0].productCount;
            // } else {
            //     count = 0;
            // }
            const successResponse = {
                status: 1,
                message: 'Successfully get Product Count',
                data: {
                    productCount: productList,
                    maximumProductPrice: productPrice,
                },
            };
            return response.status(200).send(successResponse);
        });
    }
    // Blog List API
    /**
     * @api {get} /api/list/blog/blog-list Blog List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog list",
     *      "data":{},
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-list
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogList(limit, offset, keyword, isActive, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'title', 'description', 'categoryId', 'image', 'imagePath', 'isActive', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'createdDate', 'createdBy', 'blogSlug'];
            const search = [
                {
                    name: 'title',
                    op: 'like',
                    value: keyword,
                },
                {
                    name: 'isActive',
                    op: 'like',
                    value: 1,
                },
            ];
            const WhereConditions = [];
            const getBlogList = yield this.blogService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get All Blog List',
                    data: getBlogList,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const blogList = getBlogList.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const data = val;
                    const getCategoryName = yield this.categoryService.findOne({
                        where: { categoryId: val.categoryId },
                        select: ['name'],
                    });
                    const getUser = yield this.userService.findOne({
                        where: { userId: val.createdBy },
                        select: ['firstName', 'avatar', 'avatarPath'],
                    });
                    if (getCategoryName !== undefined) {
                        data.categoryName = getCategoryName.name;
                    }
                    if (getUser !== undefined) {
                        data.createdByName = getUser.firstName;
                        data.createdByImage = getUser.avatar;
                        data.createdByImagePath = getUser.avatarPath;
                    }
                    return data;
                }));
                const results = yield Promise.all(blogList);
                if (blogList) {
                    const successResponse = {
                        status: 1,
                        message: 'Successfully get blog list',
                        data: results,
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'unable to list blog',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
        });
    }
    // get Blog Detail API
    /**
     * @api {get} /api/list/blog/blog-detail/:blogSlug Blog Detail API
     * @apiGroup Store List
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get blog Detail",
     *      "data":{
     *      "id" : "",
     *      "title" : "",
     *      "categoryId" : "",
     *      "description" : "",
     *      "image" : "",
     *      "imagePath" : "",
     *      "isActive" : "",
     *      "metaTagTitle" : "",
     *      "metaTagDescription" : "",
     *      "metaTagKeyword" : "",
     *      "status" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/blog/blog-detail/:blogSlug
     * @apiErrorExample {json} Blog error
     * HTTP/1.1 500 Internal Server Error
     */
    BlogDetail(blogSlug, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogService.findOne({
                where: {
                    blogSlug,
                },
            });
            if (!blog) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid blog id',
                };
                return response.status(400).send(errorResponse);
            }
            const blogDetails = yield this.blogService.findOne(blog);
            const getCategoryName = yield this.categoryService.findOne({
                where: { categoryId: blogDetails.categoryId },
                select: ['name'],
            });
            if (getCategoryName !== undefined) {
                blogDetails.categoryName = getCategoryName.name;
            }
            if (blogDetails) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully get blog Details',
                    data: blogDetails,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to get blog Details',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // order log List API
    /**
     * @api {get} /api/list/orderLoglist Order Log List API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} orderPrefixId orderPrefixId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get order log list",
     *      "data":{
     *      "orderStatus" : "",
     *      "createdDate" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/orderLoglist
     * @apiErrorExample {json} order log error
     * HTTP/1.1 500 Internal Server Error
     */
    listOrderLog(orderProductPrefixId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderProductData = yield this.orderProductService.findOne({
                where: {
                    orderProductPrefixId,
                },
            });
            if (!orderProductData) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid OrderProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const orderProductId = orderProductData.orderProductId;
            const select = ['orderProductId', 'orderStatusId', 'total', 'createdDate', 'modifiedDate'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'orderProductId',
                    op: 'where',
                    value: orderProductId,
                },
            ];
            const orderProductList = yield this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
            const orderStatuss = yield this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
            const orderProduct = orderStatuss.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
                const temp = value;
                if (user === undefined) {
                    temp.createdDate = '';
                }
                else {
                    temp.createdDate = user.createdDate;
                }
                return temp;
            }));
            const result = yield Promise.all(orderProduct);
            const successResponse = {
                status: 1,
                message: 'Successfully got the complete order Log list.',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Related Blog Showing API
    /**
     * @api {get} /api/list/related-blog-list Related Blog List
     * @apiGroup Store List
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} blogSlug Blog Slug
     * @apiParam (Request body) {Number} count
     * @apiParamExample {json} Input
     * {
     *      "blogSlug" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Related Blog List Showing Successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/related-blog-list
     * @apiErrorExample {json} Related Blog List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Blog List Function
    relatedBlogList(limit, offset, blogSlug, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const blogDetail = yield this.blogService.findOne({
                blogSlug,
            });
            if (!blogDetail) {
                return response.status(200).send({
                    status: 1,
                    message: 'Related blog list is successfully being shown. ',
                    data: [],
                });
            }
            const whereConditions = [
                {
                    name: 'blogId',
                    value: blogDetail.id,
                },
            ];
            const relatedData = yield this.blogRelatedService.list(limit, offset, 0, 0, whereConditions, count);
            if (count) {
                const Response = {
                    status: 1,
                    message: 'Related blog list is successfully being shown. ',
                    data: relatedData,
                };
                return response.status(200).send(Response);
            }
            const promises = relatedData.map((results) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const Id = results.relatedBlogId;
                const blog = yield this.blogService.findOne({
                    select: ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'blogSlug', 'createdDate'],
                    where: { id: Id },
                });
                const category = yield this.categoryService.findOne({ where: { categoryId: blog.categoryId } });
                const temp = blog;
                if (category !== undefined) {
                    temp.categoryName = category.name;
                }
                return temp;
            }));
            const result = yield Promise.all(promises);
            const successResponse = {
                status: 1,
                message: 'Related blog list is successfully being shown. ',
                data: result,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Question List API
    /**
     * @api {get} /api/list/question-list Question List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully get question list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/list/question-list
     * @apiErrorExample {json} question error
     * HTTP/1.1 500 Internal Server Error
     */
    questionList(limit, offset, keyword, productId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                where: { productId },
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const select = ['questionId', 'productId', 'question', 'referenceId', 'type', 'isActive'];
            const whereConditions = [];
            const search = [
                {
                    name: 'productId',
                    op: 'where',
                    value: productId,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'question',
                    op: 'like',
                    value: keyword,
                },
            ];
            const questionList = yield this.productQuestionService.list(limit, offset, select, search, whereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: questionList,
                });
            }
            const promise = questionList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const type = result.type;
                const temp = result;
                const answer = yield this.productAnswerService.findOne({
                    select: ['questionId', 'answerId', 'answer', 'referenceId', 'likes', 'dislikes', 'type', 'createdDate', 'isActive'],
                    where: { questionId: result.questionId, isActive: 1, defaultAnswer: 1 },
                });
                if (answer) {
                    if (request.header('authorization')) {
                        const userId = jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                        const userUniqueId = Object.keys(userId).map((key) => {
                            return [(key), userId[key]];
                        });
                        const likeType = yield this.productAnswerLikeService.findOne({
                            where: {
                                answerId: answer.answerId,
                                customerId: userUniqueId[0][1],
                            },
                        });
                        if (likeType) {
                            answer.likeType = likeType.type;
                        }
                        else {
                            answer.likeType = 0;
                        }
                    }
                    else {
                        answer.likeType = 0;
                    }
                }
                temp.answerList = answer;
                if (type && type === 2) {
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: result.referenceId },
                    });
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
                    }
                }
                const searchQuestion = [
                    {
                        name: 'questionId',
                        op: 'where',
                        value: result.questionId,
                    },
                    {
                        name: 'isActive',
                        op: 'where',
                        value: 1,
                    },
                ];
                const ansCount = yield this.productAnswerService.list(0, 0, [], searchQuestion, [], 1);
                temp.answerCount = ansCount;
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all question List',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Answer List API
    /**
     * @api {get} /api/list/answer-list Answer List API
     * @apiGroup Store List
     * @apiParam (Request body) {Number} questionId questionId
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *    "message": "Successfully got answer list",
     *    "data":"{}"
     *    "status": "1"
     *  }
     * @apiSampleRequest /api/list/answer-list
     * @apiErrorExample {json} answer error
     * HTTP/1.1 500 Internal Server Error
     */
    answerList(limit, offset, keyword, questionId, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const question = yield this.productQuestionService.findOne({
                where: { questionId },
            });
            if (!question) {
                const errorResponse = {
                    status: 1,
                    message: 'Invalid QuestionId',
                };
                return response.status(400).send(errorResponse);
            }
            const select = ['questionId', 'answerId', 'answer', 'referenceId', 'likes', 'dislikes', 'type', 'defaultAnswer', 'createdDate', 'isActive'];
            const whereConditions = [];
            const search = [
                {
                    name: 'questionId',
                    op: 'where',
                    value: questionId,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'answer',
                    op: 'like',
                    value: keyword,
                },
            ];
            const answerList = yield this.productAnswerService.list(limit, offset, select, search, whereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: answerList,
                });
            }
            const promise = answerList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const type = result.type;
                const temp = result;
                if (type && type === 2) {
                    const customer = yield this.customerService.findOne({
                        select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                        where: { id: result.referenceId },
                    });
                    if (customer !== undefined) {
                        temp.postedBy = customer;
                    }
                }
                else if (type && type === 1) {
                    const adminUser = yield this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: result.referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
                    }
                }
                if (request.header('authorization')) {
                    const userId = jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                    const userUniqueId = Object.keys(userId).map((key) => {
                        return [(key), userId[key]];
                    });
                    const likeType = yield this.productAnswerLikeService.findOne({
                        where: {
                            answerId: result.answerId,
                            customerId: userUniqueId[0][1],
                        },
                    });
                    if (likeType) {
                        temp.likeType = likeType.type;
                    }
                    else {
                        temp.likeType = 0;
                    }
                }
                else {
                    temp.likeType = 0;
                }
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully get all answer List',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Widget List API
    /**
     * @api {get} /api/list/widget-list Widget List
     * @apiGroup Store List
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
     *      "message": "Thank you Widget list show successfully..!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/widget-list
     * @apiErrorExample {json} Widget List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Widget list Function
    widgetList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['widgetId', 'widgetTitle', 'widgetLinkType', 'position', 'metaTagKeyword', 'metaTagDescription', 'metaTagTitle', 'widgetSlugName'];
            const search = [];
            const WhereConditions = [
                {
                    name: 'isActive',
                    value: 1,
                },
            ];
            const widgetList = yield this.widgetService.list(limit, offset, select, search, WhereConditions, count);
            if (count) {
                return response.status(200).send({
                    status: 1,
                    message: 'Successfully get count',
                    data: widgetList,
                });
            }
            const promise = widgetList.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const BannerItem = yield this.widgetItemService.find({
                    where: {
                        widgetId: result.widgetId,
                    },
                });
                const arr = [];
                for (const item of BannerItem) {
                    arr.push(item.refId);
                }
                const selects = [('DISTINCT Product.productId as productId'),
                    'Product.taxType as taxType',
                    'Product.taxValue as taxValue',
                    'Product.name as name',
                    'Product.price as price',
                    'Product.taxType as taxType',
                    'Product.description as description',
                    'Product.sku as sku',
                    'Product.skuId as skuId',
                    'Product.isSimplified as isSimplified',
                    'Product.upc as upc',
                    'Product.quantity as quantity',
                    'Product.rating as rating',
                    'Product.productSlug as productSlug',
                    'Product.metaTagTitle as metaTagTitle',
                    'Product.metaTagDescription as metaTagDescription',
                    'Product.metaTagKeyword as metaTagKeyword',
                    'Product.hasStock as hasStock',
                    'Product.outOfStockThreshold as outOfStockThreshold',
                    'Product.stockStatusId as stockStatusId',
                    'Product.createdDate as createdDate'];
                const whereCondition = [];
                const relations = [];
                const groupBy = [];
                if (result.widgetLinkType === 2) {
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'Product.product_id',
                        op: 'IN',
                        value: arr,
                    });
                }
                else {
                    relations.push({
                        tableName: 'Product.productToCategory',
                        aliasName: 'productToCategory',
                    }, {
                        tableName: 'productToCategory.category',
                        aliasName: 'category',
                    });
                    whereCondition.push({
                        name: 'Product.isActive',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'category.is_active',
                        op: 'and',
                        value: 1,
                    }, {
                        name: 'category.category_id',
                        op: 'IN',
                        value: arr,
                    });
                }
                const searchConditions = [];
                const sort = [];
                sort.push({
                    name: 'Product.createdDate',
                    order: 'DESC',
                });
                const productList = yield this.productService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
                const promises = productList.map((resultData) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const productImage = yield this.productImageService.findOne({
                        select: ['productId', 'image', 'containerName', 'defaultImage'],
                        where: {
                            productId: resultData.productId,
                            defaultImage: 1,
                        },
                    });
                    if (resultData.taxType === 2) {
                        const tax = yield this.taxService.findOne({ taxId: resultData.taxValue });
                        resultData.taxValue = tax ? tax.taxPercentage : 0;
                    }
                    const tempVal = resultData;
                    tempVal.Images = productImage;
                    if (resultData.hasStock === 1) {
                        if (resultData.quantity <= resultData.outOfStockThreshold) {
                            tempVal.stockStatus = 'outOfStock';
                        }
                        else {
                            tempVal.stockStatus = 'inStock';
                        }
                    }
                    else {
                        tempVal.stockStatus = 'inStock';
                    }
                    tempVal.skuName = '';
                    let skuValue = undefined;
                    let skuId = undefined;
                    if (resultData.isSimplified === 1) {
                        skuValue = yield this.skuService.findOne({ id: result.skuId });
                        if (skuValue) {
                            tempVal.price = skuValue.price;
                            tempVal.skuName = skuValue.skuName;
                            skuId = skuValue.id;
                        }
                    }
                    else {
                        skuValue = yield this.productVarientOptionService.findOne({ productId: result.productId, isActive: 1 });
                        if (skuValue) {
                            const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                            tempVal.price = productVarientSku.price;
                            tempVal.skuName = productVarientSku.skuName;
                            skuId = productVarientSku.id;
                        }
                        else {
                            const sku = yield this.skuService.findOne({ id: result.skuId });
                            if (sku) {
                                temp.price = sku.price;
                                temp.skuName = sku.skuName;
                                skuId = sku.id;
                            }
                        }
                    }
                    if (skuId) {
                        const nowDate = new Date();
                        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(result.productId, skuId, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(result.productId, skuId, todaydate);
                        if (productSpecial !== undefined) {
                            tempVal.pricerefer = productSpecial.price;
                            tempVal.flag = 1;
                        }
                        else if (productDiscount !== undefined) {
                            tempVal.pricerefer = productDiscount.price;
                            tempVal.flag = 0;
                        }
                        else {
                            tempVal.pricerefer = '';
                            tempVal.flag = '';
                        }
                    }
                    else {
                        tempVal.pricerefer = '';
                        tempVal.flag = '';
                    }
                    if (request.header('authorization')) {
                        const userId = jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true });
                        const userUniqueId = Object.keys(userId).map((key) => {
                            return [(key), userId[key]];
                        });
                        const wishStatus = yield this.customerWishlistService.findOne({
                            where: {
                                productId: result.productId,
                                customerId: userUniqueId[0][1],
                            },
                        });
                        if (wishStatus) {
                            tempVal.wishListStatus = 1;
                        }
                        else {
                            tempVal.wishListStatus = 0;
                        }
                    }
                    else {
                        tempVal.wishListStatus = 0;
                    }
                    return tempVal;
                }));
                temp.items = yield Promise.all(promises);
                return temp;
            }));
            const value = yield Promise.all(promise);
            const successResponse = {
                status: 1,
                message: 'Successfully got widget list',
                data: value,
            };
            return response.status(200).send(successResponse);
        });
    }
    // get filter detail API
    /**
     * @api {get} /api/list/filter-detail/:categorySlug get filter detail API
     * @apiGroup Store List
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get  Detail",
     *      "data":{
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/list/filter-detail/:categorySlug
     * @apiErrorExample {json} Store list error
     * HTTP/1.1 500 Internal Server Error
     */
    FilterDetail(categorySlug, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const category = yield this.categoryService.findOne({
                where: {
                    categorySlug,
                },
            });
            if (!category) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid category Id',
                };
                return response.status(400).send(errorResponse);
            }
            const filterCategory = yield this.siteFilterCategoryService.findOne({
                where: {
                    categoryId: category.categoryId,
                },
            });
            if (filterCategory) {
                const filterSection = yield this.siteFilterSectionService.findAll({
                    where: {
                        filterId: filterCategory.filterId,
                    },
                }).then((data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const promise = data.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const sectionItem = yield this.siteFilterSectionItemService.findAll({ where: { filterSectionId: result.id } });
                        const temp = result;
                        temp.sectionItem = sectionItem;
                        return temp;
                    }));
                    const value = yield Promise.all(promise);
                    return value;
                }));
                const successResponse = {
                    status: 1,
                    message: 'Successfully get filter Details',
                    data: filterSection,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const successRes = {
                    status: 1,
                    message: 'Successfully get filter Details',
                    data: [],
                };
                return response.status(200).send(successRes);
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/banner-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "bannerList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/category-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('sortOrder')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "ParentCategoryList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/add-related-product'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "addRelatedProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/productlist'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')),
    tslib_1.__param(3, routing_controllers_1.QueryParam('manufacturerId')), tslib_1.__param(4, routing_controllers_1.QueryParam('categoryId')), tslib_1.__param(5, routing_controllers_1.QueryParam('priceFrom')),
    tslib_1.__param(6, routing_controllers_1.QueryParam('priceTo')), tslib_1.__param(7, routing_controllers_1.QueryParam('price')), tslib_1.__param(8, routing_controllers_1.QueryParam('condition')), tslib_1.__param(9, routing_controllers_1.QueryParam('count')), tslib_1.__param(10, routing_controllers_1.Req()), tslib_1.__param(11, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, String, Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "productList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/custom-product-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParams()),
    tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ListRequest_1.ListRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "customProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/related-product-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('productId')), tslib_1.__param(1, routing_controllers_1.QueryParam('count')), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "relatedProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/country-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "countryList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/contact-us'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ContactRequest_1.ContactRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "userContact", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/zone-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "zonelist", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/language-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "languageList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/specific-category-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('categorySlug')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "SpecificcategoryList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-payment-setting'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "paymentSettingList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/product-count'),
    tslib_1.__param(0, routing_controllers_1.QueryParams()), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ListRequest_1.ListRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "productCount", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/blog/blog-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('isActive')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "BlogList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/blog/blog-detail/:blogSlug'),
    tslib_1.__param(0, routing_controllers_1.Param('blogSlug')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "BlogDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/orderLoglist'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('orderPrefixId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "listOrderLog", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/related-blog-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('blogSlug')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Req()), tslib_1.__param(5, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "relatedBlogList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/question-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('productId')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "questionList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/answer-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('questionId')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "answerList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/widget-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "widgetList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/filter-detail/:categorySlug'),
    tslib_1.__param(0, routing_controllers_1.Param('categorySlug')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CommonListController.prototype, "FilterDetail", null);
CommonListController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/list'),
    tslib_1.__metadata("design:paramtypes", [BannerService_1.BannerService,
        TaxService_1.TaxService, CategoryService_1.CategoryService, ProductRelatedService_1.ProductRelatedService,
        ProductService_1.ProductService, ProductImageService_1.ProductImageService, LanguageService_1.LanguageService,
        CustomerWishlistService_1.CustomerWishlistService, CountryService_1.CountryService, ContactService_1.ContactService,
        EmailTemplateService_1.EmailTemplateService, BlogService_1.BlogService, BlogRelatedService_1.BlogRelatedService,
        zoneService_1.ZoneService, ProductDiscountService_1.ProductDiscountService, ProductSpecialService_1.ProductSpecialService,
        SiteFilterSectionService_1.SiteFilterSectionService,
        SiteFilterSectionItemService_1.SiteFilterSectionItemService,
        SiteFilterCategoryService_1.SiteFilterCategoryService,
        WidgetService_1.WidgetService,
        WidgetItemService_1.WidgetItemService,
        ProductToCategoryService_1.ProductToCategoryService, CategoryPathService_1.CategoryPathService, PluginService_1.PluginService, VendorProductService_1.VendorProductService, VendorService_1.VendorService, CustomerService_1.CustomerService,
        UserService_1.UserService, OrderStatusService_1.OrderStatusService, ProductQuestionService_1.ProductQuestionService, ProductAnswerLikeDislikeService_1.ProductAnswerLikeService, SettingService_1.SettingService,
        OrderProductService_1.OrderProductService, OrderProductLogService_1.OrderProductLogService, ProductAnswerService_1.ProductAnswerService, ProductVarientOptionService_1.ProductVarientOptionService, SkuService_1.SkuService])
], CommonListController);
exports.CommonListController = CommonListController;
//# sourceMappingURL=CommonListController.js.map