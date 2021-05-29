"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const ProductToCategoryService_1 = require("../../services/ProductToCategoryService");
const ProductService_1 = require("../../services/ProductService");
const CategoryService_1 = require("../../services/CategoryService");
const UpdateFeatureProductRequest_1 = require("./requests/UpdateFeatureProductRequest");
const ProductImageService_1 = require("../../services/ProductImageService");
const CustomerActivityService_1 = require("../../services/CustomerActivityService");
const productViewLog_1 = require("../../models/productViewLog");
const CustomerActivity_1 = require("../../models/CustomerActivity");
const ProductViewLogService_1 = require("../../services/ProductViewLogService");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const CustomerService_1 = require("../../services/CustomerService");
const ProductDiscountService_1 = require("../../services/ProductDiscountService");
const ProductSpecialService_1 = require("../../services/ProductSpecialService");
const CategoryPathService_1 = require("../../services/CategoryPathService");
const RatingService_1 = require("../../services/RatingService");
const CustomerWishlistService_1 = require("../../services/CustomerWishlistService");
const VendorService_1 = require("../../services/VendorService");
const VendorProductService_1 = require("../../services/VendorProductService");
const TaxService_1 = require("../../services/TaxService");
const ProductQuestionService_1 = require("../../services/ProductQuestionService");
const UserService_1 = require("../../services/UserService");
const OrderProductService_1 = require("../../services/OrderProductService");
const ProductTirePriceService_1 = require("../../services/ProductTirePriceService");
const ProductAttributeService_1 = require("../../services/ProductAttributeService");
const AttributeService_1 = require("../../services/AttributeService");
const AttributeGroupService_1 = require("../../services/AttributeGroupService");
const SkuService_1 = require("../../services/SkuService");
const ProductVarientOptionService_1 = require("../../services/ProductVarientOptionService");
const ProductVarientService_1 = require("../../services/ProductVarientService");
const ProductVarientOptionDetailService_1 = require("../../services/ProductVarientOptionDetailService");
const ProductVarientOptionImageService_1 = require("../../services/ProductVarientOptionImageService");
const VarientsService_1 = require("../../services/VarientsService");
const VarientsValueService_1 = require("../../services/VarientsValueService");
const ManufacturerService_1 = require("../../services/ManufacturerService");
let ProductController = class ProductController {
    constructor(productService, productToCategoryService, categoryService, productImageService, customerService, productViewLogService, customerActivityService, taxService, userService, productQuestionService, orderProductService, productTirePriceService, productAttributeService, attributeService, attributeGroupService, productVarientOptionService, productVarientOptionDetailService, productVarientOptionImageService, productVarientService, varientsService, varientsValueService, skuService, manufacturerService, productDiscountService, productSpecialService, vendorService, vendorProductService, categoryPathService, productRatingService, customerWishlistService) {
        this.productService = productService;
        this.productToCategoryService = productToCategoryService;
        this.categoryService = categoryService;
        this.productImageService = productImageService;
        this.customerService = customerService;
        this.productViewLogService = productViewLogService;
        this.customerActivityService = customerActivityService;
        this.taxService = taxService;
        this.userService = userService;
        this.productQuestionService = productQuestionService;
        this.orderProductService = orderProductService;
        this.productTirePriceService = productTirePriceService;
        this.productAttributeService = productAttributeService;
        this.attributeService = attributeService;
        this.attributeGroupService = attributeGroupService;
        this.productVarientOptionService = productVarientOptionService;
        this.productVarientOptionDetailService = productVarientOptionDetailService;
        this.productVarientOptionImageService = productVarientOptionImageService;
        this.productVarientService = productVarientService;
        this.varientsService = varientsService;
        this.varientsValueService = varientsValueService;
        this.skuService = skuService;
        this.manufacturerService = manufacturerService;
        this.productDiscountService = productDiscountService;
        this.productSpecialService = productSpecialService;
        this.vendorService = vendorService;
        this.vendorProductService = vendorProductService;
        this.categoryPathService = categoryPathService;
        this.productRatingService = productRatingService;
        this.customerWishlistService = customerWishlistService;
    }
    // Product Details API
    /**
     * @api {get} /api/product-store/productdetail/:productslug Product Detail API
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product-store/productdetail/:productslug
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    productDetail(productslug, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productslug, isActive: 1,
            });
            if (!productDetail) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid product',
                };
                return response.status(400).send(errResponse);
            }
            const productDetails = class_transformer_1.classToPlain(productDetail);
            if (productDetails.taxType === 2) {
                const tax = yield this.taxService.findOne({ taxId: productDetails.taxValue });
                if (tax) {
                    productDetails.taxValue = tax.taxPercentage;
                }
                else {
                    productDetails.taxValue = '';
                }
            }
            const manufacturer = yield this.manufacturerService.findOne({ manufacturerId: productDetails.manufacturerId });
            productDetails.manufacturerName = manufacturer ? manufacturer.name : '';
            productDetails.manufacturerImage = (manufacturer && manufacturer.image) ? manufacturer.image : '';
            productDetails.manufacturerImagePath = (manufacturer && manufacturer.imagePath) ? manufacturer.imagePath : '';
            productDetails.productImage = yield this.productImageService.findAll({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: productDetail.productId,
                },
            });
            productDetails.productOriginalImage = productDetails.productImage.slice();
            productDetails.Category = yield this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: productDetail.productId },
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
            productDetails.productOption = [];
            productDetails.skuName = '';
            productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
            productDetails.variantName = '';
            productDetails.variantId = '';
            let skuValue = undefined;
            let skuId = undefined;
            if (productDetails.isSimplified === 1) {
                skuValue = yield this.skuService.findOne({ id: productDetails.skuId });
                if (skuValue) {
                    productDetails.price = skuValue.price;
                    productDetails.skuName = skuValue.skuName;
                    productDetails.skuId = skuValue.skuId;
                    productDetails.outOfStockThreshold = skuValue.outOfStockThreshold;
                    productDetails.notifyMinQuantity = skuValue.notifyMinQuantity;
                    productDetails.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                    productDetails.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                    productDetails.enableBackOrders = skuValue.enableBackOrders;
                    if (productDetails.hasStock === 1) {
                        if (skuValue.quantity <= skuValue.outOfStockThreshold) {
                            productDetails.stockStatus = 'outOfStock';
                        }
                        else {
                            productDetails.stockStatus = 'inStock';
                        }
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                    skuId = skuValue.id;
                }
            }
            else {
                skuValue = yield this.productVarientOptionService.findOne({ productId: productDetail.productId, isActive: 1 });
                if (skuValue) {
                    productDetails.variantName = skuValue.varientName;
                    productDetails.variantId = skuValue.id;
                    const image = yield this.productVarientOptionImageService.findAll({
                        select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                        where: { productVarientOptionId: skuValue.id },
                    });
                    if (image && image.length > 0) {
                        const tempImage = productDetails.productImage.map(element => {
                            return Object.assign({}, element, {
                                defaultImage: 0,
                            });
                        });
                        image[0].defaultImage = 1;
                        tempImage.unshift(image[0]);
                        productDetails.productImage = tempImage;
                    }
                    const selectedVariant = {};
                    const productVarientOption = yield this.productVarientOptionDetailService.findAll({
                        select: ['id', 'productVarientOptionId', 'varientsValueId'],
                        where: { productVarientOptionId: skuValue.id },
                    }).then((varientValue) => {
                        const varientValueList = varientValue.map((vv) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const tempValue = vv;
                            const varientValueData = yield this.varientsValueService.findOneData({
                                select: ['id', 'valueName', 'varientsId'],
                                where: { id: vv.varientsValueId },
                            });
                            if (varientValueData !== undefined) {
                                selectedVariant[varientValueData.varientsId] = vv.varientsValueId;
                            }
                            tempValue.valueName = (varientValueData !== undefined) ? varientValueData.valueName : '';
                            return tempValue;
                        }));
                        const rslt = Promise.all(varientValueList);
                        return rslt;
                    });
                    const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                    productDetails.price = productVarientSku.price;
                    productDetails.skuName = productVarientSku.skuName;
                    productDetails.skuId = productVarientSku.skuId;
                    productDetails.productVarientOption = productVarientOption;
                    productDetails.selectedVariant = selectedVariant;
                    productDetails.outOfStockThreshold = productVarientSku.outOfStockThreshold;
                    productDetails.notifyMinQuantity = productVarientSku.notifyMinQuantity;
                    productDetails.minQuantityAllowedCart = productVarientSku.minQuantityAllowedCart;
                    productDetails.maxQuantityAllowedCart = productVarientSku.maxQuantityAllowedCart;
                    productDetails.enableBackOrders = productVarientSku.enableBackOrders;
                    if (productDetails.hasStock === 1) {
                        if (productVarientSku.quantity <= productVarientSku.outOfStockThreshold) {
                            productDetails.stockStatus = 'outOfStock';
                        }
                        else {
                            productDetails.stockStatus = 'inStock';
                        }
                    }
                    else {
                        productDetails.stockStatus = 'inStock';
                    }
                    skuId = productVarientSku.id;
                }
            }
            if (skuId) {
                const nowDate = new Date();
                const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
                const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
                if (productSpecial !== undefined) {
                    productDetails.pricerefer = productSpecial.price;
                    productDetails.flag = 1;
                }
                else if (productDiscount !== undefined) {
                    productDetails.pricerefer = productDiscount.price;
                    productDetails.flag = 0;
                }
                else {
                    productDetails.pricerefer = '';
                    productDetails.flag = '';
                }
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId, skuId },
                });
            }
            else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
                productDetails.productTirePrices = yield this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: productDetail.productId },
                });
            }
            const vendorProduct = yield this.vendorProductService.findOne({ where: { productId: productDetail.productId } });
            if (vendorProduct) {
                const vendor = yield this.vendorService.findOne(vendorProduct.vendorId);
                const customer = yield this.customerService.findOne(vendor.customerId);
                productDetails.vendorId = vendor.vendorId;
                productDetails.vendorName = customer.firstName;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorPrefixId = vendor.vendorPrefixId;
                productDetails.companyLogo = vendor.companyLogo;
                productDetails.companyLogoPath = vendor.companyLogoPath;
                productDetails.vendorCompanyName = vendor.companyName;
                productDetails.vendorCompanyCity = vendor.companyCity;
                productDetails.vendorCompanyState = vendor.companyState;
                productDetails.vendorSlugName = vendor.vendorSlugName;
                productDetails.quotationAvailable = vendorProduct.quotationAvailable;
            }
            if (request.header('authorization')) {
                let customerId;
                jsonwebtoken_1.default.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true }, (err, decoded) => {
                    if (err) {
                        throw err;
                    }
                    customerId = decoded.id;
                });
                const wishStatus = yield this.customerWishlistService.findOne({
                    where: {
                        productId: productDetail.productId,
                        customerId,
                    },
                });
                const orderProduct = yield this.orderProductService.buyedCount(productDetail.productId, customerId);
                if (orderProduct.length > 0) {
                    productDetails.buyed = 1;
                }
                else {
                    productDetails.buyed = 0;
                }
                if (wishStatus) {
                    productDetails.wishListStatus = 1;
                }
                else {
                    productDetails.wishListStatus = 0;
                }
                const customerDetail = yield this.customerService.findOne({ where: { id: customerId } });
                const customerActivity = new CustomerActivity_1.CustomerActivity();
                customerActivity.customerId = customerId;
                customerActivity.activityId = 2;
                customerActivity.description = 'productviewed';
                customerActivity.productId = productDetail.productId;
                yield this.customerActivityService.create(customerActivity);
                const viewLog = new productViewLog_1.ProductViewLog();
                viewLog.productId = productDetail.productId;
                viewLog.customerId = customerDetail.id;
                viewLog.firstName = customerDetail.firstName;
                viewLog.lastName = customerDetail.lastName;
                viewLog.username = customerDetail.username;
                viewLog.email = customerDetail.email;
                viewLog.mobileNumber = customerDetail.mobileNumber;
                viewLog.address = customerDetail.address;
                yield this.productViewLogService.create(viewLog);
            }
            else {
                productDetails.wishListStatus = 0;
                productDetails.buyed = 0;
            }
            productDetails.questionList = yield this.productQuestionService.findAll({
                select: ['questionId', 'productId', 'question', 'type', 'referenceId', 'createdDate'],
                where: { productId: productDetail.productId, isActive: 1 },
                limit: 4,
            }).then((val) => {
                const user = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const referenceId = value.referenceId;
                    const type = value.type;
                    const temp = value;
                    if (type && type === 2) {
                        const customer = yield this.customerService.findOne({
                            select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                            where: { id: referenceId },
                        });
                        if (customer !== undefined) {
                            temp.postedBy = customer;
                        }
                    }
                    else {
                        const adminUser = yield this.userService.findOne({
                            select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                            where: { userId: referenceId },
                        });
                        if (adminUser !== undefined) {
                            temp.postedBy = adminUser;
                        }
                    }
                    return temp;
                }));
                const resultData = Promise.all(user);
                return resultData;
            });
            productDetails.productAttributes = yield this.productAttributeService.findAll({
                select: ['id', 'attributeId', 'text'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const attribute = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const attributes = yield this.attributeService.findOne({ attributeId: value.attributeId });
                    const attributeGroup = yield this.attributeGroupService.findOne({ groupId: attributes.groupId });
                    const temp = value;
                    if (attributes !== undefined && attributeGroup !== undefined) {
                        temp.attributeName = attributes.attributeName;
                        temp.attributeGroupName = attributeGroup.attributeGroupName;
                    }
                    else {
                        temp.attributeName = '';
                    }
                    return temp;
                }));
                const results = Promise.all(attribute);
                return results;
            });
            productDetails.productVarient = yield this.productVarientService.findAll({
                select: ['id', 'varientsId', 'productId'],
                where: { productId: productDetail.productId },
            }).then((val) => {
                const varientDetail = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const varients = yield this.varientsService.findOne({ where: { id: value.varientsId } });
                    if (varients) {
                        varients.varientsValue = yield this.varientsValueService.find({ where: { varientsId: varients.id } });
                        const temp = varients;
                        return temp;
                    }
                }));
                const results = Promise.all(varientDetail);
                return results;
            });
            productDetails.productvarientList = yield this.productVarientOptionService.findAll({
                select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
                where: { productId: productDetail.productId, isActive: 1 },
            }).then((val) => {
                const productVarList = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const temp = value;
                    const sku = yield this.skuService.findOne({
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
                            return vv.varientsValueId;
                        }));
                        const rslt = Promise.all(varientValueList);
                        return rslt;
                    });
                    temp.skuName = sku.skuName;
                    temp.skuId = sku.id;
                    temp.price = sku.price;
                    temp.quantity = sku.quantity;
                    temp.optionImage = image;
                    temp.productVarientOption = productVarientOption;
                    temp.outOfStockThreshold = sku.outOfStockThreshold;
                    temp.hasStock = sku.hasStock;
                    temp.notifyMinQuantity = sku.notifyMinQuantity;
                    temp.minQuantityAllowedCart = sku.minQuantityAllowedCart;
                    temp.maxQuantityAllowedCart = sku.maxQuantityAllowedCart;
                    temp.enableBackOrders = sku.enableBackOrders;
                    if (productDetails.hasStock === 1) {
                        if (sku.quantity <= sku.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                    if (sku) {
                        const nowDate = new Date();
                        const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, sku.id, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productDetail.productId, sku.id, todaydate);
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
                        temp.productTirePrices = yield this.productTirePriceService.findAll({
                            select: ['id', 'quantity', 'price'],
                            where: { productId: productDetail.productId, skuId: sku.id },
                        });
                    }
                    else {
                        temp.pricerefer = '';
                        temp.flag = '';
                        temp.productTirePrices = yield this.productTirePriceService.findAll({
                            select: ['id', 'quantity', 'price'],
                            where: { productId: productDetail.productId },
                        });
                    }
                    return temp;
                }));
                const resultData = Promise.all(productVarList);
                return resultData;
            });
            const successResponse = {
                status: 1,
                message: 'Successfully got productDetail',
                data: productDetails,
            };
            return response.status(200).send(successResponse);
        });
    }
    // update Feature Product API
    /**
     * @api {put} /api/product-store/update-featureproduct/:id Update Feature Product API
     * @apiGroup Store
     * @apiParam (Request body) {number} isFeature product isFeature should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "isFeature" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated feature Product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/update-featureproduct/:id
     * @apiErrorExample {json} isFeature error
     * HTTP/1.1 500 Internal Server Error
     */
    updateFeatureProduct(id, updateFeatureProductParam, response) {
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
            product.isFeatured = updateFeatureProductParam.isFeature;
            const productSave = yield this.productService.create(product);
            if (productSave) {
                const successResponse = {
                    status: 1,
                    message: 'product updated successfully.',
                    data: productSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to updated product',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Featured Product List API
    /**
     * @api {get} /api/product-store/featureproduct-list Feature Product List
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} keyword keyword search by name
     * @apiParam (Request body) {Number} sku search by sku
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get feature product List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/featureproduct-list
     * @apiErrorExample {json} FeatureProduct List error
     * HTTP/1.1 500 Internal Server Error
     */
    featureProductList(limit, offset, keyword, sku, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['taxType', 'taxValue', 'productId', 'name', 'skuId', 'isSimplified', 'quantity', 'rating', 'description', 'sortOrder', 'price', 'productSlug', 'isActive', 'hasStock', 'outOfStockThreshold', 'manufacturerId'];
            const whereConditions = [
                {
                    name: 'deleteFlag',
                    op: 'where',
                    value: 0,
                },
                {
                    name: 'isFeatured',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const search = [];
            const featureProduct = yield this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
            if (count) {
                const successresponse = {
                    status: 1,
                    message: 'Successfully get feature product count',
                    data: featureProduct,
                };
                return response.status(200).send(successresponse);
            }
            const promises = featureProduct.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                const manufacturer = yield this.manufacturerService.findOne({ manufacturerId: result.manufacturerId });
                const temp = result;
                temp.skuName = '';
                let skuValue = undefined;
                temp.Images = productImage;
                temp.manufacturerName = manufacturer ? manufacturer.name : '';
                temp.manufacturerImage = (manufacturer && manufacturer.image) ? manufacturer.image : '';
                temp.manufacturerImagePath = (manufacturer && manufacturer.imagePath) ? manufacturer.imagePath : '';
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
                        const skuDetail = yield this.skuService.findOne({ id: result.skuId });
                        if (skuDetail) {
                            temp.price = skuDetail.price;
                            temp.skuName = skuDetail.skuName;
                            skuId = skuDetail.id;
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
            const successResponse = {
                status: 1,
                message: 'Successfully get feature product List',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Today Deals Product List API
    /**
     * @api {get} /api/product-store/todayDeals-list Today Deals List
     * @apiGroup Store
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword search by name
     * @apiParam (Request body) {String} sku search by sku
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get today deals product List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/todayDeals-list
     * @apiErrorExample {json} TodayDeals List error
     * HTTP/1.1 500 Internal Server Error
     */
    todayDealsList(limit, offset, keyword, sku, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['taxType', 'taxValue', 'productId', 'name', 'rating', 'description', 'location',
                'metaTagTitle', 'todayDeals', 'hasStock', 'outOfStockThreshold', 'quantity', 'skuId', 'isSimplified',
                'price', 'isActive', 'productSlug', 'manufacturerId'];
            const whereConditions = [
                {
                    name: 'deleteFlag',
                    op: 'where',
                    value: 0,
                },
                {
                    name: 'todayDeals',
                    op: 'where',
                    value: 1,
                },
                {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const search = [];
            const todayDeals = yield this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
            if (count) {
                const successresponse = {
                    status: 1,
                    message: 'Successfully got today deals count',
                    data: todayDeals,
                };
                return response.status(200).send(successresponse);
            }
            const promises = todayDeals.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
                temp.skuName = '';
                let skuValue = undefined;
                temp.Images = productImage;
                let skuId = undefined;
                const manufacturer = yield this.manufacturerService.findOne({ manufacturerId: result.manufacturerId });
                temp.manufacturerName = manufacturer ? manufacturer.name : '';
                temp.manufacturerImage = (manufacturer && manufacturer.image) ? manufacturer.image : '';
                temp.manufacturerImagePath = (manufacturer && manufacturer.imagePath) ? manufacturer.imagePath : '';
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
                        const skuDetail = yield this.skuService.findOne({ id: result.skuId });
                        if (skuDetail) {
                            temp.price = skuDetail.price;
                            temp.skuName = skuDetail.skuName;
                            skuId = skuDetail.id;
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
            const successResponse = {
                status: 1,
                message: 'Successfully got today deals List',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }
    // Get Category API
    /**
     * @api {get} /api/product-store/Get-Category Get Category API
     * @apiGroup Store
     * @apiParam (Request body) {Number} CategoryId categoryId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the category.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/Get-Category
     * @apiErrorExample {json} Category error
     * HTTP/1.1 500 Internal Server Error
     */
    getCategory(CategoryId, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
            const search = [];
            const WhereConditions = [{
                    name: 'categoryId',
                    value: CategoryId,
                }];
            const category = yield this.categoryService.list(0, 0, select, search, WhereConditions, 0, 0);
            const promise = category.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const categoryLevel = yield this.categoryPathService.find({
                    select: ['level', 'pathId'],
                    where: { categoryId: result.categoryId },
                    order: { level: 'ASC' },
                }).then((values) => {
                    const categories = values.map((val) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                        const categoryNames = yield this.categoryService.findOne({ categoryId: val.pathId });
                        const tempVal = val;
                        tempVal.categoryName = categoryNames.name;
                        return tempVal;
                    }));
                    const results = Promise.all(categories);
                    return results;
                });
                temp.levels = categoryLevel;
                return temp;
            }));
            const value = yield Promise.all(promise);
            if (category) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the category. ',
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Get product rating/review API
    /**
     * @api {get} /api/product-store/Get-Product-rating Get product Rating API
     * @apiGroup Store
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
     * @apiSampleRequest /api/product-store/Get-Product-rating
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    getProductRating(productId, limit, offset, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productDetail = yield this.productService.findOne({
                productSlug: productId,
            });
            if (!productDetail) {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get product Rating.',
                };
                return response.status(400).send(errorResponse);
            }
            const select = ['review', 'rating', 'createdDate', 'firstName', 'lastName', 'productId', 'customerId', 'isActive'];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'productId',
                    op: 'where',
                    value: productDetail.productId,
                }, {
                    name: 'isActive',
                    op: 'where',
                    value: 1,
                },
            ];
            const rating = yield this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
            const promise = rating.map((result) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const temp = result;
                const customer = yield this.customerService.findOne({
                    select: ['firstName', 'avatar', 'avatarPath'],
                    where: { id: result.customerId },
                });
                const val = Object.assign({}, temp, customer);
                return val;
            }));
            const value = yield Promise.all(promise);
            if (value) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the product Rating. ',
                    data: value,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 1,
                    message: 'unable to get product Rating.',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Get product rating/review  countAPI
    /**
     * @api {get} /api/product-store/get-rating-statistics Get Rating Statistics API
     * @apiGroup Store
     * @apiParam (Request body) {Number} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully got the product rating and review statistics.",
     *      "data":"{ }"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product-store/get-rating-statistics
     * @apiErrorExample {json} Product error
     * HTTP/1.1 500 Internal Server Error
     */
    getRatingStatistics(id, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const ratings = [];
            for (let stars = 1; stars <= 5; stars++) {
                const WhereConditions = [
                    {
                        name: 'rating',
                        op: 'where',
                        value: stars,
                    }, {
                        name: 'productId',
                        op: 'where',
                        value: id,
                    },
                ];
                const count = 1;
                const star = yield this.productRatingService.list(0, 0, 0, 0, WhereConditions, count);
                ratings.push(star);
            }
            const totalRatingReview = yield this.productRatingService.ratingStatistics(id);
            const starsCount = { oneStar: ratings[0], twoStar: ratings[1], threeStar: ratings[2], fourStar: ratings[3], fiveStar: ratings[4] };
            if (starsCount) {
                const successResponse = {
                    status: 1,
                    message: 'successfully got the product ratings & review count.',
                    data: { starsCount, totalRatingReview },
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Product Compare API
    /**
     * @api {get} /api/product-store/product-compare Product Compare API
     * @apiGroup Store
     * @apiParam (Request body) {String} productId productId
     * @apiParam (Request body) {String} data data
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Product Compared",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product-store/product-compare
     * @apiErrorExample {json} product compare error
     * HTTP/1.1 500 Internal Server Error
     */
    productCompare(productId, data, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productid = productId.split(',');
            if (productid.length === 0) {
                return response.status(200).send({
                    status: 1,
                    data: [],
                });
            }
            if (productid.length === 1) {
                if (data === '0') {
                    const Response = {
                        status: 1,
                        message: 'Product Compared Successfully ',
                    };
                    return response.status(200).send(Response);
                }
                else {
                    const Detail = [];
                    const List = yield this.productService.findOne({ where: { productId: productid } });
                    const defaultValue = yield this.productImageService.findOne({
                        where: {
                            productId: List.productId,
                            defaultImage: 1,
                        },
                    });
                    const temp = List;
                    const manufacturer = yield this.manufacturerService.findOne({ manufacturerId: List.manufacturerId });
                    temp.manufacturerName = manufacturer ? manufacturer.name : '';
                    temp.skuName = '';
                    let skuValue = undefined;
                    let skuId = undefined;
                    if (List.isSimplified === 1) {
                        skuValue = yield this.skuService.findOne({ id: List.skuId });
                        if (skuValue) {
                            temp.price = skuValue.price;
                            temp.skuName = skuValue.skuName;
                            skuId = skuValue.id;
                        }
                    }
                    else {
                        skuValue = yield this.productVarientOptionService.findOne({ productId: List.productId, isActive: 1 });
                        if (skuValue) {
                            const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                            temp.price = productVarientSku.price;
                            temp.skuName = productVarientSku.skuName;
                            skuId = productVarientSku.id;
                        }
                        else {
                            const sku = yield this.skuService.findOne({ id: List.skuId });
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
                        const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(List.productId, skuId, todaydate);
                        const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(List.productId, skuId, todaydate);
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
                    if (List.taxType === 2) {
                        const tax = yield this.taxService.findOne({ taxId: List.taxValue });
                        if (tax) {
                            temp.taxValue = tax.taxPercentage;
                        }
                        else {
                            temp.taxValue = '';
                        }
                    }
                    temp.productImage = defaultValue;
                    temp.productAttributes = yield this.productAttributeService.findAll({
                        select: ['id', 'attributeId', 'text'],
                        where: { productId: List.productId },
                    }).then((val) => {
                        const attribute = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                            const attributes = yield this.attributeService.findOne({ attributeId: value.attributeId });
                            const attributeGroup = yield this.attributeGroupService.findOne({ groupId: attributes.groupId });
                            const tempVal = value;
                            if (attributes !== undefined && attributeGroup !== undefined) {
                                tempVal.attributeName = attributes.attributeName;
                                tempVal.attributeGroupName = attributeGroup.attributeGroupName;
                            }
                            else {
                                tempVal.attributeName = '';
                                tempVal.attributeGroupName = '';
                            }
                            return tempVal;
                        }));
                        const results = Promise.all(attribute);
                        return results;
                    });
                    if (List.hasStock === 1) {
                        if (List.quantity <= List.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                    }
                    else {
                        temp.stockStatus = 'inStock';
                    }
                    Detail.push(temp);
                    const Response = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: Detail,
                    };
                    return response.status(200).send(Response);
                }
            }
            else {
                if (data === '0') {
                    const categoryDataDetail = [];
                    // product find the which category
                    for (const id of productid) {
                        const categoryId = yield this.productToCategoryService.findAll({ where: { productId: id } });
                        const categoryDataValue = categoryId.map((item) => {
                            return item.categoryId;
                        });
                        categoryDataDetail.push(categoryDataValue);
                    }
                    let categoryData;
                    if (categoryDataDetail.length === 2) {
                        categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    }
                    else {
                        const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                        categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                    }
                    if (categoryData.length === 0) {
                        const errorResponse = {
                            status: 1,
                            message: 'please choose same category product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Product Compared Successfully',
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const productDataDetail = [];
                    const categoryDataDetail = [];
                    // product find the which category
                    for (const id of productid) {
                        const categoryId = yield this.productToCategoryService.findAll({ where: { productId: id } });
                        const categoryDataValue = categoryId.map((item) => {
                            return item.categoryId;
                        });
                        categoryDataDetail.push(categoryDataValue);
                    }
                    let categoryData;
                    if (categoryDataDetail.length === 2) {
                        categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    }
                    else {
                        const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                        categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                    }
                    if (categoryData.length === 0) {
                        const errorResponse = {
                            status: 1,
                            message: 'please choose same category product',
                        };
                        return response.status(400).send(errorResponse);
                    }
                    let productListData;
                    // find the product to compare
                    for (const id of productid) {
                        productListData = yield this.productService.findOne(id);
                        const defaultValue = yield this.productImageService.findOne({
                            where: {
                                productId: productListData.productId,
                                defaultImage: 1,
                            },
                        });
                        const temp = productListData;
                        const manufacturer = yield this.manufacturerService.findOne({ manufacturerId: productListData.manufacturerId });
                        temp.manufacturerName = manufacturer ? manufacturer.name : '';
                        temp.skuName = '';
                        let skuValue = undefined;
                        let skuId = undefined;
                        if (productListData.isSimplified === 1) {
                            if (skuValue) {
                                skuValue = yield this.skuService.findOne({ id: productListData.skuId });
                                temp.price = skuValue.price;
                                temp.skuName = skuValue.skuName;
                                skuId = skuValue.id;
                            }
                        }
                        else {
                            skuValue = yield this.productVarientOptionService.findOne({ productId: productListData.productId, isActive: 1 });
                            const productVarientSku = yield this.skuService.findOne({ id: skuValue.skuId });
                            if (skuValue) {
                                temp.price = productVarientSku.price;
                                temp.skuName = productVarientSku.skuName;
                                skuId = productVarientSku.id;
                            }
                            else {
                                const sku = yield this.skuService.findOne({ id: productListData.skuId });
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
                            const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productListData.productId, skuId, todaydate);
                            const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productListData.productId, skuId, todaydate);
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
                        if (productListData.taxType === 2) {
                            const tax = yield this.taxService.findOne({ taxId: productListData.taxValue });
                            if (tax) {
                                temp.taxValue = tax.taxPercentage;
                            }
                            else {
                                temp.taxValue = '';
                            }
                        }
                        temp.productImage = defaultValue;
                        temp.productAttributes = yield this.productAttributeService.findAll({
                            select: ['id', 'attributeId', 'text'],
                            where: { productId: productListData.productId },
                        }).then((val) => {
                            const attribute = val.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                                const attributes = yield this.attributeService.findOne({ attributeId: value.attributeId });
                                const attributeGroup = yield this.attributeGroupService.findOne({ groupId: attributes.groupId });
                                const tempVal = value;
                                if (attributes !== undefined && attributeGroup !== undefined) {
                                    tempVal.attributeName = attributes.attributeName;
                                    tempVal.attributeGroupName = attributeGroup.attributeGroupName;
                                }
                                else {
                                    tempVal.attributeName = '';
                                    tempVal.attributeGroupName = '';
                                }
                                return tempVal;
                            }));
                            const results = Promise.all(attribute);
                            return results;
                        });
                        if (productListData.hasStock === 1) {
                            if (productListData.quantity <= productListData.outOfStockThreshold) {
                                temp.stockStatus = 'outOfStock';
                            }
                            else {
                                temp.stockStatus = 'inStock';
                            }
                        }
                        else {
                            temp.stockStatus = 'inStock';
                        }
                        productDataDetail.push(temp);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Product Compared Successfully',
                        data: productDataDetail,
                    };
                    return response.status(200).send(successResponse);
                }
            }
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Get('/productdetail/:productslug'),
    tslib_1.__param(0, routing_controllers_1.Param('productslug')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productDetail", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-featureproduct/:id'),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, UpdateFeatureProductRequest_1.UpdateFeatureProduct, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateFeatureProduct", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/featureproduct-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('sku')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "featureProductList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/todayDeals-list'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('sku')), tslib_1.__param(4, routing_controllers_1.QueryParam('count')), tslib_1.__param(5, routing_controllers_1.Req()), tslib_1.__param(6, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "todayDealsList", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/Get-Category'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('CategoryId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getCategory", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/Get-Product-rating'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('productId')), tslib_1.__param(1, routing_controllers_1.QueryParam('limit')), tslib_1.__param(2, routing_controllers_1.QueryParam('offset')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getProductRating", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/get-rating-statistics'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('productId')), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getRatingStatistics", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/Product-Compare'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('productId')), tslib_1.__param(1, routing_controllers_1.QueryParam('data')), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "productCompare", null);
ProductController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/product-store'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService,
        ProductToCategoryService_1.ProductToCategoryService,
        CategoryService_1.CategoryService,
        ProductImageService_1.ProductImageService,
        CustomerService_1.CustomerService,
        ProductViewLogService_1.ProductViewLogService,
        CustomerActivityService_1.CustomerActivityService,
        TaxService_1.TaxService,
        UserService_1.UserService,
        ProductQuestionService_1.ProductQuestionService,
        OrderProductService_1.OrderProductService,
        ProductTirePriceService_1.ProductTirePriceService,
        ProductAttributeService_1.ProductAttributeService,
        AttributeService_1.AttributeService,
        AttributeGroupService_1.AttributeGroupService,
        ProductVarientOptionService_1.ProductVarientOptionService,
        ProductVarientOptionDetailService_1.ProductVarientOptionDetailService,
        ProductVarientOptionImageService_1.ProductVarientOptionImageService,
        ProductVarientService_1.ProductVarientService,
        VarientsService_1.VarientsService,
        VarientsValueService_1.VarientsValueService,
        SkuService_1.SkuService,
        ManufacturerService_1.ManufacturerService,
        ProductDiscountService_1.ProductDiscountService, ProductSpecialService_1.ProductSpecialService, VendorService_1.VendorService, VendorProductService_1.VendorProductService,
        CategoryPathService_1.CategoryPathService, RatingService_1.ProductRatingService, CustomerWishlistService_1.CustomerWishlistService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map