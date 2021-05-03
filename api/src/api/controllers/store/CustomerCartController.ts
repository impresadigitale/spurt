/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Post, JsonController, Res, Req, Authorized, Get, QueryParam, Body, BodyParam } from 'routing-controllers';
import { ProductService } from '../../services/ProductService';
import { CustomerCartService } from '../../services/CustomerCartService';
import { ProductImageService } from '../../services/ProductImageService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import { ProductTirePriceService } from '../../services/ProductTirePriceService';
import { CustomerCart } from '../../models/CustomerCart';
import { CreateCartRequest } from './requests/CreateCartRequest';
import { TaxService } from '../../services/TaxService';
import { SkuService } from '../../services/SkuService';
import { VarientsValueService } from '../../services/VarientsValueService';
import { ProductVarientOptionDetailService } from '../../services/ProductVarientOptionDetailService';
import { ProductVarientOptionImageService } from '../../services/ProductVarientOptionImageService';

@JsonController('/customer-cart')
export class CustomerController {
    constructor(private productService: ProductService, private taxService: TaxService, private productSpecialService: ProductSpecialService, private productDiscountService: ProductDiscountService, private skuService: SkuService,
                private customerCartService: CustomerCartService, private productImageService: ProductImageService, private productTirePriceService: ProductTirePriceService, private varientsValueService: VarientsValueService,
                private productVarientOptionDetailService: ProductVarientOptionDetailService,
                private productVarientOptionImageService: ProductVarientOptionImageService) {
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
    @Post('/add-cart')
    @Authorized('customer')
    public async addCustomerCart(@Body({ validate: true }) cartParam: CreateCartRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const product = await this.productService.findOne({
            where: {
                productId: cartParam.productId,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const customerCart = await this.customerCartService.findOne({
            where: {
                productId: cartParam.productId, customerId: request.user.id,
            },
        });
        const sku = await this.skuService.findOne({ where: { skuName: cartParam.skuName } });
        if (!sku) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid sku',
            };
            return response.status(400).send(errorResponse);
        }
        if (customerCart) {
            const findOption = await this.customerCartService.findOne({
                where: {
                    productId: cartParam.productId, customerId: request.user.id, productVarientOptionId: cartParam.productVarientOptionId,
                },
            });
            if (findOption) {
                if (cartParam.type && cartParam.type === 'new') {
                    if (cartParam.quantity === 0) {
                        await this.customerCartService.delete(findOption.id);
                        const deleteCart: any = {
                            status: 1,
                            message: 'Successfully removed from Cart',
                        };
                        return response.status(200).send(deleteCart);
                    }
                    const qty = Number(findOption.quantity) + +cartParam.quantity;
                    if (product.hasStock === 1) {
                        if (!(sku.minQuantityAllowedCart <= qty)) {
                            const minCart: any = {
                                status: 0,
                                message: 'Quantity should greater than min Quantity.',
                            };
                            return response.status(400).send(minCart);
                        } else if (!(sku.maxQuantityAllowedCart >= qty)) {
                            const maxCart: any = {
                                status: 0,
                                message: 'Quantity should lesser than max Quantity.',
                            };
                            return response.status(400).send(maxCart);
                        }
                    }
                    findOption.quantity = qty;
                } else {
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
                await this.customerCartService.createData(findOption);
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully updated cart.',
                    data: findOption,
                };
                return response.status(200).send(successResponse);
            } else {
                if (cartParam.quantity === 0) {
                    await this.customerCartService.delete(customerCart.id);
                    const deleteCart: any = {
                        status: 1,
                        message: 'Successfully removed from Cart',
                    };
                    return response.status(200).send(deleteCart);
                }
                if (product.hasStock === 1) {
                    if (!(sku.minQuantityAllowedCart <= +cartParam.quantity)) {
                        const minCart: any = {
                            status: 0,
                            message: 'Quantity should greater than min Quantity.',
                        };
                        return response.status(400).send(minCart);
                    } else if (!(sku.maxQuantityAllowedCart >= +cartParam.quantity)) {
                        const maxCart: any = {
                            status: 0,
                            message: 'Quantity should lesser than max Quantity.',
                        };
                        return response.status(400).send(maxCart);
                    }
                }
                const addCustomerCart: any = new CustomerCart();
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
                const val = await this.customerCartService.createData(addCustomerCart);
                const cart: any = {
                    status: 1,
                    message: 'Successfully added cart.',
                    data: val,
                };
                return response.status(200).send(cart);
            }
        } else {
            if (product.hasStock === 1) {
                if (!(sku.minQuantityAllowedCart <= +cartParam.quantity)) {
                    const minCart: any = {
                        status: 0,
                        message: 'Quantity should greater than min Quantity.',
                    };
                    return response.status(400).send(minCart);
                } else if (!(sku.maxQuantityAllowedCart >= +cartParam.quantity)) {
                    const maxCart: any = {
                        status: 0,
                        message: 'Quantity should lesser than max Quantity.',
                    };
                    return response.status(400).send(maxCart);
                }
            }
            const addCustomerCart: any = new CustomerCart();
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
            const val = await this.customerCartService.createData(addCustomerCart);
            const cart: any = {
                status: 1,
                message: 'Successfully added to cart.',
                data: val,
            };
            return response.status(200).send(cart);

        }
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
    @Get('/customer-cart-list')
    @Authorized('customer')
    public async customerCartList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
        const cartList = await this.customerCartService.list(limit, offset, select, relation, search, WhereConditions, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the cart count.',
                data: cartList,
            };
            return response.status(200).send(successResponse);
        }
        let grandTotal = 0;
        const findImage = cartList.map(async (value: any) => {
            const productData = await this.productService.findOne({ where: { productId: value.productId } });
            if (productData.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: productData.taxValue });
                if (tax) {
                    productData.taxValue = tax.taxPercentage;
                } else {
                    productData.taxValue = '';
                }
            }
            const temp: any = productData;
            temp.optionName = value.optionName;
            temp.quantity = value.quantity;
            temp.tirePrice = value.tirePrice;
            temp.productImage = await this.productImageService.findAll({
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
            skuValue = await this.skuService.findOne({ skuName: value.skuName });
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
                const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productData.productId, skuId, todaydate);
                const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productData.productId, skuId, todaydate);
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
                temp.productTirePrices = await this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: value.productId, skuId },
                });
            } else {
                temp.pricerefer = '';
                temp.flag = '';
                temp.productTirePrices = await this.productTirePriceService.findAll({
                    select: ['id', 'quantity', 'price'],
                    where: { productId: value.productId },
                });
            }

            temp.variantName = '';
            temp.variantId = '';
            if (value.productVarientOptionId) {
                temp.variantId = value.productVarientOptionId;
                temp.variantName = value.varientName;
                const image = await this.productVarientOptionImageService.findAll({
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
                const selectedVariant: any = {};
                const productVarientOption = await this.productVarientOptionDetailService.findAll({
                    select: ['id', 'productVarientOptionId', 'varientsValueId'],
                    where: { productVarientOptionId: value.productVarientOptionId },
                }).then((varientValue) => {
                    const varientValueList = varientValue.map(async (vv: any) => {
                        const tempValue: any = vv;
                        const varientValueData = await this.varientsValueService.findOneData({
                            select: ['id', 'valueName', 'varientsId'],
                            where: { id: vv.varientsValueId },
                        });
                        if (varientValueData !== undefined) {
                            selectedVariant[varientValueData.varientsId] = vv.varientsValueId;
                        }
                        tempValue.valueName = (varientValueData !== undefined) ? varientValueData.valueName : '';
                        return tempValue;
                    });
                    const rslt = Promise.all(varientValueList);
                    return rslt;
                });
                temp.productVarientOption = productVarientOption;
                temp.selectedVariant = selectedVariant;
            }
            if (value.hasStock === 1) {
                if (value.quantity <= value.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            return temp;
        });
        const finalResult = await Promise.all(findImage);
        if (cartList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the cart list.',
                data: { cartList: finalResult, grandTotal },
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to list cart list',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Post('/delete-cart-item')
    @Authorized('customer')
    public async deleteCartItem(@BodyParam('cartId') cartId: string, @Res() response: any, @Req() request: any): Promise<CustomerCart> {
        const productId = cartId.split(',');
        if (cartId === '') {
            const customerCart = await this.customerCartService.find({
                where: {
                    customerId: request.user.id,
                },
            });
            for (const cart of customerCart) {
                const itemId = parseInt(cart.id, 10);
                await this.customerCartService.delete(itemId);
            }
            const Response: any = {
                status: 1,
                message: 'Successfully cleared your cart',
            };
            return response.status(200).send(Response);
        }
        const err: any = [];
        for (const id of productId) {
            const itemId = parseInt(id, 10);
            const val = await this.customerCartService.findOne(itemId);
            if (!val) {
                err.push(1);
            }
        }
        if (err.length > 0) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid cart Item',
            };
            return response.status(400).send(errorResponse);
        }
        for (const id of productId) {
            const itemId = parseInt(id, 10);
            await this.customerCartService.delete(itemId);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully removed item',
        };
        return response.status(200).send(successResponse);
    }
}
