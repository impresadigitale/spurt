"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerController = void 0;
const tslib_1 = require("tslib");
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const ProductService_1 = require("../../services/ProductService");
const CustomerCartService_1 = require("../../services/CustomerCartService");
const ProductImageService_1 = require("../../services/ProductImageService");
const ProductSpecialService_1 = require("../../services/ProductSpecialService");
const ProductDiscountService_1 = require("../../services/ProductDiscountService");
const ProductTirePriceService_1 = require("../../services/ProductTirePriceService");
const CustomerCart_1 = require("../../models/CustomerCart");
const CreateCartRequest_1 = require("./requests/CreateCartRequest");
const TaxService_1 = require("../../services/TaxService");
const SkuService_1 = require("../../services/SkuService");
const VarientsValueService_1 = require("../../services/VarientsValueService");
const ProductVarientOptionDetailService_1 = require("../../services/ProductVarientOptionDetailService");
const ProductVarientOptionImageService_1 = require("../../services/ProductVarientOptionImageService");
let CustomerController = class CustomerController {
    constructor(productService, taxService, productSpecialService, productDiscountService, skuService, customerCartService, productImageService, productTirePriceService, varientsValueService, productVarientOptionDetailService, productVarientOptionImageService) {
        this.productService = productService;
        this.taxService = taxService;
        this.productSpecialService = productSpecialService;
        this.productDiscountService = productDiscountService;
        this.skuService = skuService;
        this.customerCartService = customerCartService;
        this.productImageService = productImageService;
        this.productTirePriceService = productTirePriceService;
        this.varientsValueService = varientsValueService;
        this.productVarientOptionDetailService = productVarientOptionDetailService;
        this.productVarientOptionImageService = productVarientOptionImageService;
    }
    // create and update customer cart API
    /**
     * @api {post} /api/customer-cart/add-cart Add to cart API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {Number} productPrice productPrice
     * @apiParam (Request body) {Number} tirePrice tirePrice
     * @apiParam (Request body) {Number} quantity quantity
     * @apiParam (Request body) {String} optionName optionName
     * @apiParam (Request body) {String} optionValueName optionValueName
     * @apiParam (Request body) {String} varientName VarientName
     * @apiParam (Request body) {String} productVarientOptionId productVarientOptionId
     * @apiParam (Request body) {String} skuName skuName
     * @apiParam (Request body) {string} type type
     * @apiParamExample {json} Input
     * {
     *      "productId" : "",
     *      "productPrice" : "",
     *      "tirePrice" : "",
     *      "quantity" : "",
     *      "optionName" : "",
     *      "optionValueName" : "",
     *      "varientName" : "",
     *      "productVarientOptionId" : "",
     *      "skuName" : "",
     *      "type" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully added product to cart",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/add-cart
     * @apiErrorExample {json} vendor category  error
     * HTTP/1.1 500 Internal Server Error
     */
    addCustomerCart(cartParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productService.findOne({
                where: {
                    productId: cartParam.productId,
                },
            });
            if (!product) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid ProductId',
                };
                return response.status(400).send(errorResponse);
            }
            const customerCart = yield this.customerCartService.findOne({
                where: {
                    productId: cartParam.productId, customerId: request.user.id,
                },
            });
            const sku = yield this.skuService.findOne({ where: { skuName: cartParam.skuName } });
            if (!sku) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid sku',
                };
                return response.status(400).send(errorResponse);
            }
            if (customerCart) {
                const findOption = yield this.customerCartService.findOne({
                    where: {
                        productId: cartParam.productId, customerId: request.user.id, productVarientOptionId: cartParam.productVarientOptionId,
                    },
                });
                if (findOption) {
                    if (cartParam.type && cartParam.type === 'new') {
                        if (cartParam.quantity === 0) {
                            yield this.customerCartService.delete(findOption.id);
                            const deleteCart = {
                                status: 1,
                                message: 'Successfully removed from Cart',
                            };
                            return response.status(200).send(deleteCart);
                        }
                        const qty = Number(findOption.quantity) + +cartParam.quantity;
                        if (product.hasStock === 1) {
                            if (!(sku.minQuantityAllowedCart <= qty)) {
                                const minCart = {
                                    status: 0,
                                    message: 'Quantity should greater than min Quantity.',
                                };
                                return response.status(400).send(minCart);
                            }
                            else if (!(sku.maxQuantityAllowedCart >= qty)) {
                                const maxCart = {
                                    status: 0,
                                    message: 'Quantity should lesser than max Quantity.',
                                };
                                return response.status(400).send(maxCart);
                            }
                        }
                        findOption.quantity = qty;
                    }
                    else {
                        findOption.quantity = cartParam.quantity;
                    }
                    findOption.productPrice = cartParam.productPrice;
                    findOption.total = +cartParam.quantity * +cartParam.productPrice;
                    findOption.optionName = cartParam.optionName;
                    findOption.optionValueName = cartParam.optionValueName;
                    findOption.tirePrice = cartParam.tirePrice;
                    findOption.productVarientOptionId = cartParam.productVarientOptionId;
                    findOption.skuName = cartParam.skuName;
                    findOption.varientName = cartParam.varientName;
                    yield this.customerCartService.createData(findOption);
                    const successResponse = {
                        status: 1,
                        message: 'Successfully updated cart.',
                        data: findOption,
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    if (cartParam.quantity === 0) {
                        yield this.customerCartService.delete(customerCart.id);
                        const deleteCart = {
                            status: 1,
                            message: 'Successfully removed from Cart',
                        };
                        return response.status(200).send(deleteCart);
                    }
                    if (product.hasStock === 1) {
                        if (!(sku.minQuantityAllowedCart <= +cartParam.quantity)) {
                            const minCart = {
                                status: 0,
                                message: 'Quantity should greater than min Quantity.',
                            };
                            return response.status(400).send(minCart);
                        }
                        else if (!(sku.maxQuantityAllowedCart >= +cartParam.quantity)) {
                            const maxCart = {
                                status: 0,
                                message: 'Quantity should lesser than max Quantity.',
                            };
                            return response.status(400).send(maxCart);
                        }
                    }
                    const addCustomerCart = new CustomerCart_1.CustomerCart();
                    addCustomerCart.productId = cartParam.productId,
                        addCustomerCart.name = product.name,
                        addCustomerCart.customerId = request.user.id,
                        addCustomerCart.quantity = cartParam.quantity,
                        addCustomerCart.productPrice = cartParam.productPrice,
                        addCustomerCart.tirePrice = cartParam.tirePrice,
                        addCustomerCart.total = +cartParam.quantity * +cartParam.productPrice,
                        addCustomerCart.optionName = cartParam.optionName;
                    addCustomerCart.optionValueName = cartParam.optionValueName;
                    addCustomerCart.productVarientOptionId = cartParam.productVarientOptionId;
                    addCustomerCart.skuName = cartParam.skuName;
                    addCustomerCart.varientName = cartParam.varientName;
                    const val = yield this.customerCartService.createData(addCustomerCart);
                    const cart = {
                        status: 1,
                        message: 'Successfully added cart.',
                        data: val,
                    };
                    return response.status(200).send(cart);
                }
            }
            else {
                if (product.hasStock === 1) {
                    if (!(sku.minQuantityAllowedCart <= +cartParam.quantity)) {
                        const minCart = {
                            status: 0,
                            message: 'Quantity should greater than min Quantity.',
                        };
                        return response.status(400).send(minCart);
                    }
                    else if (!(sku.maxQuantityAllowedCart >= +cartParam.quantity)) {
                        const maxCart = {
                            status: 0,
                            message: 'Quantity should lesser than max Quantity.',
                        };
                        return response.status(400).send(maxCart);
                    }
                }
                const addCustomerCart = new CustomerCart_1.CustomerCart();
                addCustomerCart.productId = cartParam.productId,
                    addCustomerCart.name = product.name,
                    addCustomerCart.customerId = request.user.id,
                    addCustomerCart.quantity = cartParam.quantity,
                    addCustomerCart.productPrice = cartParam.productPrice,
                    addCustomerCart.tirePrice = cartParam.tirePrice,
                    addCustomerCart.total = +cartParam.quantity * +cartParam.productPrice,
                    addCustomerCart.optionName = cartParam.optionName;
                addCustomerCart.optionValueName = cartParam.optionValueName;
                addCustomerCart.productVarientOptionId = cartParam.productVarientOptionId;
                addCustomerCart.skuName = cartParam.skuName;
                addCustomerCart.varientName = cartParam.varientName;
                const val = yield this.customerCartService.createData(addCustomerCart);
                const cart = {
                    status: 1,
                    message: 'Successfully added to cart.',
                    data: val,
                };
                return response.status(200).send(cart);
            }
        });
    }
    // Customer Cart List API
    /**
     * @api {get} /api/customer-cart/customer-cart-list  Customer Cart List API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Boolean} count count should be number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get Customer Cart List",
     *      "data":{
     *       "productId" : "",
     *       "name" : "",
     *       "quantity" : "",
     *       "productPrice" : "",
     *       "total" : "",
     *       "image" : "",
     *       "containerName" : "",
     *       "optionName" : "",
     *       "optionValueName" : "",
     *      }
     *      "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/customer-cart-list
     * @apiErrorExample {json} Customer Cart error
     * HTTP/1.1 500 Internal Server Error
     */
    customerCartList(limit, offset, count, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const select = ['id', 'productId', 'name', 'quantity', 'productPrice', 'tirePrice', 'total', 'optionName', 'optionValueName', 'varientName', 'skuName', 'productVarientOptionId'];
            const search = [];
            const relation = [];
            const WhereConditions = [
                {
                    name: 'customerId',
                    op: 'where',
                    value: request.user.id,
                },
            ];
            const cartList = yield this.customerCartService.list(limit, offset, select, relation, search, WhereConditions, count);
            if (count) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the cart count.',
                    data: cartList,
                };
                return response.status(200).send(successResponse);
            }
            let grandTotal = 0;
            const findImage = cartList.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productData = yield this.productService.findOne({ where: { productId: value.productId } });
                if (productData.taxType === 2) {
                    const tax = yield this.taxService.findOne({ taxId: productData.taxValue });
                    if (tax) {
                        productData.taxValue = tax.taxPercentage;
                    }
                    else {
                        productData.taxValue = '';
                    }
                }
                const temp = productData;
                temp.optionName = value.optionName;
                temp.quantity = value.quantity;
                temp.tirePrice = value.tirePrice;
                temp.productImage = yield this.productImageService.findAll({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: temp.productId,
                    },
                });
                temp.productOriginalImage = temp.productImage.slice();
                grandTotal = 0;
                temp.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                skuValue = yield this.skuService.findOne({ skuName: value.skuName });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                    temp.outOfStockThreshold = skuValue.outOfStockThreshold;
                    temp.notifyMinQuantity = skuValue.notifyMinQuantity;
                    temp.minQuantityAllowedCart = skuValue.minQuantityAllowedCart;
                    temp.maxQuantityAllowedCart = skuValue.maxQuantityAllowedCart;
                    temp.enableBackOrders = skuValue.enableBackOrders;
                }
                if (skuId) {
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = yield this.productSpecialService.findSpecialPriceWithSku(productData.productId, skuId, todaydate);
                    const productDiscount = yield this.productDiscountService.findDiscountPricewithSku(productData.productId, skuId, todaydate);
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
                        where: { productId: value.productId, skuId },
                    });
                }
                else {
                    temp.pricerefer = '';
                    temp.flag = '';
                    temp.productTirePrices = yield this.productTirePriceService.findAll({
                        select: ['id', 'quantity', 'price'],
                        where: { productId: value.productId },
                    });
                }
                temp.variantName = '';
                temp.variantId = '';
                if (value.productVarientOptionId) {
                    temp.variantId = value.productVarientOptionId;
                    temp.variantName = value.varientName;
                    const image = yield this.productVarientOptionImageService.findAll({
                        select: ['id', 'image', 'containerName', 'defaultImage', 'productVarientOptionId'],
                        where: { productVarientOptionId: value.productVarientOptionId },
                    });
                    if (image && image.length > 0) {
                        const tempImage = temp.productImage.map(element => {
                            return Object.assign({}, element, {
                                defaultImage: 0,
                            });
                        });
                        image[0].defaultImage = 1;
                        tempImage.unshift(image[0]);
                        temp.productImage = tempImage;
                    }
                    const selectedVariant = {};
                    const productVarientOption = yield this.productVarientOptionDetailService.findAll({
                        select: ['id', 'productVarientOptionId', 'varientsValueId'],
                        where: { productVarientOptionId: value.productVarientOptionId },
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
                    temp.productVarientOption = productVarientOption;
                    temp.selectedVariant = selectedVariant;
                }
                if (value.hasStock === 1) {
                    if (value.quantity <= value.outOfStockThreshold) {
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
            const finalResult = yield Promise.all(findImage);
            if (cartList) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully got the cart list.',
                    data: { cartList: finalResult, grandTotal },
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to list cart list',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete cart items API
    /**
     * @api {post} /api/customer-cart/delete-cart-item Delete Cart items API
     * @apiGroup Customer Cart
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} cartId cartId
     * @apiParamExample {json} Input
     * {
     * "cartId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted items.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/customer-cart/delete-cart-item
     * @apiErrorExample {json} cartDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    deleteCartItem(cartId, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const productId = cartId.split(',');
            if (cartId === '') {
                const customerCart = yield this.customerCartService.find({
                    where: {
                        customerId: request.user.id,
                    },
                });
                for (const cart of customerCart) {
                    const itemId = parseInt(cart.id, 10);
                    yield this.customerCartService.delete(itemId);
                }
                const Response = {
                    status: 1,
                    message: 'Successfully cleared your cart',
                };
                return response.status(200).send(Response);
            }
            const err = [];
            for (const id of productId) {
                const itemId = parseInt(id, 10);
                const val = yield this.customerCartService.findOne(itemId);
                if (!val) {
                    err.push(1);
                }
            }
            if (err.length > 0) {
                const errorResponse = {
                    status: 0,
                    message: 'invalid cart Item',
                };
                return response.status(400).send(errorResponse);
            }
            for (const id of productId) {
                const itemId = parseInt(id, 10);
                yield this.customerCartService.delete(itemId);
            }
            const successResponse = {
                status: 1,
                message: 'Successfully removed item',
            };
            return response.status(200).send(successResponse);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/add-cart'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateCartRequest_1.CreateCartRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "addCustomerCart", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/customer-cart-list'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('count')), tslib_1.__param(3, routing_controllers_1.Req()), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "customerCartList", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/delete-cart-item'),
    routing_controllers_1.Authorized('customer'),
    tslib_1.__param(0, routing_controllers_1.BodyParam('cartId')), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CustomerController.prototype, "deleteCartItem", null);
CustomerController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/customer-cart'),
    tslib_1.__metadata("design:paramtypes", [ProductService_1.ProductService, TaxService_1.TaxService, ProductSpecialService_1.ProductSpecialService, ProductDiscountService_1.ProductDiscountService, SkuService_1.SkuService,
        CustomerCartService_1.CustomerCartService, ProductImageService_1.ProductImageService, ProductTirePriceService_1.ProductTirePriceService, VarientsValueService_1.VarientsValueService,
        ProductVarientOptionDetailService_1.ProductVarientOptionDetailService,
        ProductVarientOptionImageService_1.ProductVarientOptionImageService])
], CustomerController);
exports.CustomerController = CustomerController;
//# sourceMappingURL=CustomerCartController.js.map