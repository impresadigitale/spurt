/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, Body, QueryParam, Put, JsonController, Res, Req, Param } from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import { ProductToCategoryService } from '../../services/ProductToCategoryService';
import { ProductService } from '../../services/ProductService';
import { CategoryService } from '../../services/CategoryService';
import { UpdateFeatureProduct } from './requests/UpdateFeatureProductRequest';
import { ProductImageService } from '../../services/ProductImageService';
import { CustomerActivityService } from '../../services/CustomerActivityService';
import { ProductViewLog } from '../../models/productViewLog';
import { CustomerActivity } from '../../models/CustomerActivity';
import { ProductViewLogService } from '../../services/ProductViewLogService';
import jwt from 'jsonwebtoken';
import { CustomerService } from '../../services/CustomerService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { CategoryPathService } from '../../services/CategoryPathService';
import { ProductRatingService } from '../../services/RatingService';
import { CustomerWishlistService } from '../../services/CustomerWishlistService';
import { VendorService } from '../../services/VendorService';
import { VendorProductService } from '../../services/VendorProductService';
import { TaxService } from '../../services/TaxService';
import { ProductQuestionService } from '../../services/ProductQuestionService';
import { UserService } from '../../services/UserService';
import { OrderProductService } from '../../services/OrderProductService';
import { ProductTirePriceService } from '../../services/ProductTirePriceService';
import { ProductAttributeService } from '../../services/ProductAttributeService';
import { AttributeService } from '../../services/AttributeService';
import { AttributeGroupService } from '../../services/AttributeGroupService';
import { SkuService } from '../../services/SkuService';
import { ProductVarientOptionService } from '../../services/ProductVarientOptionService';
import { ProductVarientService } from '../../services/ProductVarientService';
import { ProductVarientOptionDetailService } from '../../services/ProductVarientOptionDetailService';
import { ProductVarientOptionImageService } from '../../services/ProductVarientOptionImageService';
import { VarientsService } from '../../services/VarientsService';
import { VarientsValueService } from '../../services/VarientsValueService';
import { ManufacturerService } from '../../services/ManufacturerService';

@JsonController('/product-store')
export class ProductController {
    constructor(private productService: ProductService,
                private productToCategoryService: ProductToCategoryService,
                private categoryService: CategoryService,
                private productImageService: ProductImageService,
                private customerService: CustomerService,
                private productViewLogService: ProductViewLogService,
                private customerActivityService: CustomerActivityService,
                private taxService: TaxService,
                private userService: UserService,
                private productQuestionService: ProductQuestionService,
                private orderProductService: OrderProductService,
                private productTirePriceService: ProductTirePriceService,
                private productAttributeService: ProductAttributeService,
                private attributeService: AttributeService,
                private attributeGroupService: AttributeGroupService,
                private productVarientOptionService: ProductVarientOptionService,
                private productVarientOptionDetailService: ProductVarientOptionDetailService,
                private productVarientOptionImageService: ProductVarientOptionImageService,
                private productVarientService: ProductVarientService,
                private varientsService: VarientsService,
                private varientsValueService: VarientsValueService,
                private skuService: SkuService,
                private manufacturerService: ManufacturerService,
                private productDiscountService: ProductDiscountService, private productSpecialService: ProductSpecialService, private vendorService: VendorService, private vendorProductService: VendorProductService,
                private categoryPathService: CategoryPathService, private productRatingService: ProductRatingService, private customerWishlistService: CustomerWishlistService) {
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
    @Get('/productdetail/:productslug')
    public async productDetail(@Param('productslug') productslug: string, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productSlug: productslug, isActive: 1,
        });
        if (!productDetail) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid product',
            };
            return response.status(400).send(errResponse);
        }
        const productDetails: any = classToPlain(productDetail);
        if (productDetails.taxType === 2) {
            const tax = await this.taxService.findOne({ taxId: productDetails.taxValue });
            if (tax) {
                productDetails.taxValue = tax.taxPercentage;
            } else {
                productDetails.taxValue = '';
            }
        }
        const manufacturer = await this.manufacturerService.findOne({ manufacturerId: productDetails.manufacturerId });
        productDetails.manufacturerName = manufacturer ? manufacturer.name : '';
        productDetails.manufacturerImage = (manufacturer && manufacturer.image) ? manufacturer.image : '';
        productDetails.manufacturerImagePath = (manufacturer && manufacturer.imagePath) ? manufacturer.imagePath : '';
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: productDetail.productId,
            },
        });
        productDetails.productOriginalImage = productDetails.productImage.slice();
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: productDetail.productId },
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
        productDetails.productOption = [];
        productDetails.skuName = '';
        productDetails.skuId = productDetails.skuId ? productDetails.skuId : '';
        productDetails.variantName = '';
        productDetails.variantId = '';
        let skuValue = undefined;
        let skuId = undefined;
        if (productDetails.isSimplified === 1) {
            skuValue = await this.skuService.findOne({ id: productDetails.skuId });
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
                    } else {
                        productDetails.stockStatus = 'inStock';
                    }
                } else {
                    productDetails.stockStatus = 'inStock';
                }
                skuId = skuValue.id;
            }
        } else {
            skuValue = await this.productVarientOptionService.findOne({ productId: productDetail.productId, isActive: 1 });
            if (skuValue) {
                productDetails.variantName = skuValue.varientName;
                productDetails.variantId = skuValue.id;
                const image = await this.productVarientOptionImageService.findAll({
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
                const selectedVariant: any = {};
                const productVarientOption = await this.productVarientOptionDetailService.findAll({
                    select: ['id', 'productVarientOptionId', 'varientsValueId'],
                    where: { productVarientOptionId: skuValue.id },
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
                const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
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
                    } else {
                        productDetails.stockStatus = 'inStock';
                    }
                } else {
                    productDetails.stockStatus = 'inStock';
                }
                skuId = productVarientSku.id;
            }
        }
        if (skuId) {
            const nowDate = new Date();
            const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
            const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, skuId, todaydate);
            const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productDetail.productId, skuId, todaydate);
            if (productSpecial !== undefined) {
                productDetails.pricerefer = productSpecial.price;
                productDetails.flag = 1;
            } else if (productDiscount !== undefined) {
                productDetails.pricerefer = productDiscount.price;
                productDetails.flag = 0;
            } else {
                productDetails.pricerefer = '';
                productDetails.flag = '';
            }
            productDetails.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: productDetail.productId, skuId },
            });
        } else {
            productDetails.pricerefer = '';
            productDetails.flag = '';
            productDetails.productTirePrices = await this.productTirePriceService.findAll({
                select: ['id', 'quantity', 'price'],
                where: { productId: productDetail.productId },
            });
        }
        const vendorProduct = await this.vendorProductService.findOne({ where: { productId: productDetail.productId } });
        if (vendorProduct) {
            const vendor = await this.vendorService.findOne(vendorProduct.vendorId);
            const customer = await this.customerService.findOne(vendor.customerId);
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
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true }, (err, decoded) => {
                if (err) {
                    throw err;
                }
                customerId = decoded.id;
            });

            const wishStatus = await this.customerWishlistService.findOne({
                where: {
                    productId: productDetail.productId,
                    customerId,
                },
            });
            const orderProduct = await this.orderProductService.buyedCount(productDetail.productId, customerId);
            if (orderProduct.length > 0) {
                productDetails.buyed = 1;
            } else {
                productDetails.buyed = 0;
            }
            if (wishStatus) {
                productDetails.wishListStatus = 1;
            } else {
                productDetails.wishListStatus = 0;
            }
            const customerDetail = await this.customerService.findOne({ where: { id: customerId } });
            const customerActivity = new CustomerActivity();
            customerActivity.customerId = customerId;
            customerActivity.activityId = 2;
            customerActivity.description = 'productviewed';
            customerActivity.productId = productDetail.productId;
            await this.customerActivityService.create(customerActivity);
            const viewLog: any = new ProductViewLog();
            viewLog.productId = productDetail.productId;
            viewLog.customerId = customerDetail.id;
            viewLog.firstName = customerDetail.firstName;
            viewLog.lastName = customerDetail.lastName;
            viewLog.username = customerDetail.username;
            viewLog.email = customerDetail.email;
            viewLog.mobileNumber = customerDetail.mobileNumber;
            viewLog.address = customerDetail.address;
            await this.productViewLogService.create(viewLog);
        } else {
            productDetails.wishListStatus = 0;
            productDetails.buyed = 0;
        }
        productDetails.questionList = await this.productQuestionService.findAll({
            select: ['questionId', 'productId', 'question', 'type', 'referenceId', 'createdDate'],
            where: { productId: productDetail.productId, isActive: 1 },
            limit: 4,
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
                        temp.postedBy = customer;
                    }
                } else {
                    const adminUser = await this.userService.findOne({
                        select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                        where: { userId: referenceId },
                    });
                    if (adminUser !== undefined) {
                        temp.postedBy = adminUser;
                    }
                }
                return temp;
            });
            const resultData = Promise.all(user);
            return resultData;
        });
        productDetails.productAttributes = await this.productAttributeService.findAll({
            select: ['id', 'attributeId', 'text'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const attribute = val.map(async (value: any) => {
                const attributes = await this.attributeService.findOne({ attributeId: value.attributeId });
                const attributeGroup = await this.attributeGroupService.findOne({ groupId: attributes.groupId });
                const temp: any = value;
                if (attributes !== undefined && attributeGroup !== undefined) {
                    temp.attributeName = attributes.attributeName;
                    temp.attributeGroupName = attributeGroup.attributeGroupName;
                } else {
                    temp.attributeName = '';
                }
                return temp;
            });
            const results = Promise.all(attribute);
            return results;
        });
        productDetails.productVarient = await this.productVarientService.findAll({
            select: ['id', 'varientsId', 'productId'],
            where: { productId: productDetail.productId },
        }).then((val) => {
            const varientDetail = val.map(async (value: any) => {
                const varients = await this.varientsService.findOne({ where: { id: value.varientsId } });
                if (varients) {
                    varients.varientsValue = await this.varientsValueService.find({ where: { varientsId: varients.id } });
                    const temp: any = varients;
                    return temp;
                }
            });
            const results = Promise.all(varientDetail);
            return results;
        });
        productDetails.productvarientList = await this.productVarientOptionService.findAll({
            select: ['id', 'productId', 'skuId', 'varientName', 'isActive', 'createdDate'],
            where: { productId: productDetail.productId, isActive: 1 },
        }).then((val) => {
            const productVarList = val.map(async (value: any) => {
                const temp: any = value;
                const sku = await this.skuService.findOne({
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
                        return vv.varientsValueId;
                    });
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
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                } else {
                    temp.stockStatus = 'inStock';
                }
                if (sku) {
                    const nowDate = new Date();
                    const todaydate = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productDetail.productId, sku.id, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productDetail.productId, sku.id, todaydate);
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
                        where: { productId: productDetail.productId, skuId: sku.id },
                    });
                } else {
                    temp.pricerefer = '';
                    temp.flag = '';
                    temp.productTirePrices = await this.productTirePriceService.findAll({
                        select: ['id', 'quantity', 'price'],
                        where: { productId: productDetail.productId },
                    });
                }
                return temp;
            });
            const resultData = Promise.all(productVarList);
            return resultData;
        });
        const successResponse: any = {
            status: 1,
            message: 'Successfully got productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
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
    @Put('/update-featureproduct/:id')
    public async updateFeatureProduct(@Param('id') id: number, @Body({ validate: true }) updateFeatureProductParam: UpdateFeatureProduct, @Res() response: any): Promise<any> {

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
        product.isFeatured = updateFeatureProductParam.isFeature;
        const productSave = await this.productService.create(product);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'product updated successfully.',
                data: productSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated product',
            };
            return response.status(400).send(errorResponse);
        }
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

    @Get('/featureproduct-list')
    public async featureProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {

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
        const featureProduct = await this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully get feature product count',
                data: featureProduct,
            };
            return response.status(200).send(successresponse);
        }
        const promises = featureProduct.map(async (result: any) => {
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            if (result.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: result.taxValue });
                if (tax) {
                    result.taxValue = tax.taxPercentage;
                } else {
                    result.taxValue = '';
                }
            }
            const manufacturer = await this.manufacturerService.findOne({ manufacturerId: result.manufacturerId });
            const temp: any = result;
            temp.skuName = '';
            let skuValue = undefined;
            temp.Images = productImage;
            temp.manufacturerName = manufacturer ? manufacturer.name : '';
            temp.manufacturerImage = (manufacturer && manufacturer.image) ? manufacturer.image : '';
            temp.manufacturerImagePath = (manufacturer && manufacturer.imagePath) ? manufacturer.imagePath : '';
            let skuId = undefined;
            if (result.isSimplified === 1) {
                skuValue = await this.skuService.findOne({ id: result.skuId });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                }
            } else {
                skuValue = await this.productVarientOptionService.findOne({ productId: result.productId, isActive: 1 });
                if (skuValue) {
                    const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                    temp.price = productVarientSku.price;
                    temp.skuName = productVarientSku.skuName;
                    skuId = productVarientSku.id;
                } else {
                    const skuDetail = await this.skuService.findOne({ id: result.skuId });
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
                const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(result.productId, skuId, todaydate);
                const productDiscount = await this.productDiscountService.findDiscountPricewithSku(result.productId, skuId, todaydate);
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
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            if (result.hasStock === 1) {
                if (result.quantity <= result.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true });
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: result.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    temp.wishListStatus = 1;
                } else {
                    temp.wishListStatus = 0;
                }
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get feature product List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
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

    @Get('/todayDeals-list')
    public async todayDealsList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
        const todayDeals = await this.productService.list(limit, offset, select, 0, whereConditions, search, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got today deals count',
                data: todayDeals,
            };
            return response.status(200).send(successresponse);
        }
        const promises = todayDeals.map(async (result: any) => {
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            if (result.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: result.taxValue });
                if (tax) {
                    result.taxValue = tax.taxPercentage;
                } else {
                    result.taxValue = '';
                }
            }
            const temp: any = result;
            temp.skuName = '';
            let skuValue = undefined;
            temp.Images = productImage;
            let skuId = undefined;
            const manufacturer = await this.manufacturerService.findOne({ manufacturerId: result.manufacturerId });
            temp.manufacturerName = manufacturer ? manufacturer.name : '';
            temp.manufacturerImage = (manufacturer && manufacturer.image) ? manufacturer.image : '';
            temp.manufacturerImagePath = (manufacturer && manufacturer.imagePath) ? manufacturer.imagePath : '';
            if (result.isSimplified === 1) {
                skuValue = await this.skuService.findOne({ id: result.skuId });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                }
            } else {
                skuValue = await this.productVarientOptionService.findOne({ productId: result.productId, isActive: 1 });
                if (skuValue) {
                    const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                    temp.price = productVarientSku.price;
                    temp.skuName = productVarientSku.skuName;
                    skuId = productVarientSku.id;
                } else {
                    const skuDetail = await this.skuService.findOne({ id: result.skuId });
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
                const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(result.productId, skuId, todaydate);
                const productDiscount = await this.productDiscountService.findDiscountPricewithSku(result.productId, skuId, todaydate);
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
            } else {
                temp.pricerefer = '';
                temp.flag = '';
            }
            if (result.hasStock === 1) {
                if (result.quantity <= result.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', { ignoreExpiration: true });
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                const wishStatus = await this.customerWishlistService.findOne({
                    where: {
                        productId: result.productId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (wishStatus) {
                    temp.wishListStatus = 1;
                } else {
                    temp.wishListStatus = 0;
                }
            } else {
                temp.wishListStatus = 0;
            }
            return temp;
        });
        const finalResult = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got today deals List',
            data: finalResult,
        };
        return response.status(200).send(successResponse);
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
    @Get('/Get-Category')
    public async getCategory(@QueryParam('CategoryId') CategoryId: number, @Res() response: any): Promise<any> {
        const select = ['categoryId', 'name', 'parentInt', 'sortOrder', 'categorySlug'];
        const search = [];
        const WhereConditions = [{
            name: 'categoryId',
            value: CategoryId,
        }];
        const category: any = await this.categoryService.list(0, 0, select, search, WhereConditions, 0, 0);
        const promise = category.map(async (result: any) => {
            const temp: any = result;
            const categoryLevel: any = await this.categoryPathService.find({
                select: ['level', 'pathId'],
                where: { categoryId: result.categoryId },
                order: { level: 'ASC' },
            }).then((values) => {
                const categories = values.map(async (val: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: val.pathId });
                    const tempVal: any = val;
                    tempVal.categoryName = categoryNames.name;
                    return tempVal;
                });
                const results = Promise.all(categories);
                return results;
            });
            temp.levels = categoryLevel;
            return temp;
        });
        const value = await Promise.all(promise);
        if (category) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the category. ',
                data: value,
            };
            return response.status(200).send(successResponse);
        }
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
    @Get('/Get-Product-rating')
    public async getProductRating(@QueryParam('productId') productId: string, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
            productSlug: productId,
        });
        if (!productDetail) {
            const errorResponse: any = {
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
        const rating: any = await this.productRatingService.list(limit, offset, select, relation, WhereConditions, count);
        const promise = rating.map(async (result: any) => {
            const temp: any = result;
            const customer: any = await this.customerService.findOne({
                select: ['firstName', 'avatar', 'avatarPath'],
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
    @Get('/get-rating-statistics')
    public async getRatingStatistics(@QueryParam('productId') id: number, @Res() response: any): Promise<any> {
        const ratings: any = [];
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
            const star = await this.productRatingService.list(0, 0, 0, 0, WhereConditions, count);
            ratings.push(star);
        }
        const totalRatingReview = await this.productRatingService.ratingStatistics(id);
        const starsCount = { oneStar: ratings[0], twoStar: ratings[1], threeStar: ratings[2], fourStar: ratings[3], fiveStar: ratings[4] };
        if (starsCount) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the product ratings & review count.',
                data: { starsCount, totalRatingReview },
            };
            return response.status(200).send(successResponse);
        }
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

    @Get('/Product-Compare')
    public async productCompare(@QueryParam('productId') productId: string, @QueryParam('data') data: string, @Res() response: any): Promise<any> {
        const productid = productId.split(',');
        if (productid.length === 0) {
            return response.status(200).send({
                status: 1,
                data: [],
            });
        }
        if (productid.length === 1) {
            if (data === '0') {
                const Response: any = {
                    status: 1,
                    message: 'Product Compared Successfully ',
                };
                return response.status(200).send(Response);
            } else {
                const Detail = [];
                const List = await this.productService.findOne({ where: { productId: productid } });
                const defaultValue = await this.productImageService.findOne({
                    where: {
                        productId: List.productId,
                        defaultImage: 1,
                    },
                });
                const temp: any = List;
                const manufacturer = await this.manufacturerService.findOne({ manufacturerId: List.manufacturerId });
                temp.manufacturerName = manufacturer ? manufacturer.name : '';
                temp.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                if (List.isSimplified === 1) {
                    skuValue = await this.skuService.findOne({ id: List.skuId });
                    if (skuValue) {
                        temp.price = skuValue.price;
                        temp.skuName = skuValue.skuName;
                        skuId = skuValue.id;
                    }
                } else {
                    skuValue = await this.productVarientOptionService.findOne({ productId: List.productId, isActive: 1 });
                    if (skuValue) {
                        const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                        temp.price = productVarientSku.price;
                        temp.skuName = productVarientSku.skuName;
                        skuId = productVarientSku.id;
                    } else {
                        const sku = await this.skuService.findOne({ id: List.skuId });
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
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(List.productId, skuId, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(List.productId, skuId, todaydate);
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
                } else {
                    temp.pricerefer = '';
                    temp.flag = '';
                }
                if (List.taxType === 2) {
                    const tax = await this.taxService.findOne({ taxId: List.taxValue });
                    if (tax) {
                        temp.taxValue = tax.taxPercentage;
                    } else {
                        temp.taxValue = '';
                    }
                }
                temp.productImage = defaultValue;
                temp.productAttributes = await this.productAttributeService.findAll({
                    select: ['id', 'attributeId', 'text'],
                    where: { productId: List.productId },
                }).then((val) => {
                    const attribute = val.map(async (value: any) => {
                        const attributes = await this.attributeService.findOne({ attributeId: value.attributeId });
                        const attributeGroup = await this.attributeGroupService.findOne({ groupId: attributes.groupId });
                        const tempVal: any = value;
                        if (attributes !== undefined && attributeGroup !== undefined) {
                            tempVal.attributeName = attributes.attributeName;
                            tempVal.attributeGroupName = attributeGroup.attributeGroupName;
                        } else {
                            tempVal.attributeName = '';
                            tempVal.attributeGroupName = '';
                        }
                        return tempVal;
                    });
                    const results = Promise.all(attribute);
                    return results;
                });
                if (List.hasStock === 1) {
                    if (List.quantity <= List.outOfStockThreshold) {
                        temp.stockStatus = 'outOfStock';
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                } else {
                    temp.stockStatus = 'inStock';
                }
                Detail.push(temp);
                const Response: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: Detail,
                };
                return response.status(200).send(Response);
            }
        } else {
            if (data === '0') {
                const categoryDataDetail = [];
                // product find the which category
                for (const id of productid) {
                    const categoryId = await this.productToCategoryService.findAll({ where: { productId: id } });
                    const categoryDataValue = categoryId.map((item: any) => {
                        return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'please choose same category product',
                    };
                    return response.status(400).send(errorResponse);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                };
                return response.status(200).send(successResponse);
            } else {
                const productDataDetail = [];
                const categoryDataDetail = [];
                // product find the which category
                for (const id of productid) {
                    const categoryId = await this.productToCategoryService.findAll({ where: { productId: id } });
                    const categoryDataValue = categoryId.map((item: any) => {
                        return item.categoryId;
                    });
                    categoryDataDetail.push(categoryDataValue);
                }
                let categoryData;
                if (categoryDataDetail.length === 2) {
                    categoryData = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                } else {
                    const intersectionsTwo = categoryDataDetail[0].filter(e => categoryDataDetail[1].indexOf(e) !== -1);
                    categoryData = intersectionsTwo.filter(e => categoryDataDetail[2].indexOf(e) !== -1);
                }
                if (categoryData.length === 0) {
                    const errorResponse: any = {
                        status: 1,
                        message: 'please choose same category product',
                    };
                    return response.status(400).send(errorResponse);
                }
                let productListData;
                // find the product to compare
                for (const id of productid) {
                    productListData = await this.productService.findOne(id);
                    const defaultValue = await this.productImageService.findOne({
                        where: {
                            productId: productListData.productId,
                            defaultImage: 1,
                        },
                    });
                    const temp: any = productListData;
                    const manufacturer = await this.manufacturerService.findOne({ manufacturerId: productListData.manufacturerId });
                    temp.manufacturerName = manufacturer ? manufacturer.name : '';
                    temp.skuName = '';
                    let skuValue = undefined;
                    let skuId = undefined;
                    if (productListData.isSimplified === 1) {
                        if (skuValue) {
                            skuValue = await this.skuService.findOne({ id: productListData.skuId });
                            temp.price = skuValue.price;
                            temp.skuName = skuValue.skuName;
                            skuId = skuValue.id;
                        }
                    } else {
                        skuValue = await this.productVarientOptionService.findOne({ productId: productListData.productId, isActive: 1 });
                        const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                        if (skuValue) {
                            temp.price = productVarientSku.price;
                            temp.skuName = productVarientSku.skuName;
                            skuId = productVarientSku.id;
                        } else {
                            const sku = await this.skuService.findOne({ id: productListData.skuId });
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
                        const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(productListData.productId, skuId, todaydate);
                        const productDiscount = await this.productDiscountService.findDiscountPricewithSku(productListData.productId, skuId, todaydate);
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
                    } else {
                        temp.pricerefer = '';
                        temp.flag = '';
                    }
                    if (productListData.taxType === 2) {
                        const tax = await this.taxService.findOne({ taxId: productListData.taxValue });
                        if (tax) {
                            temp.taxValue = tax.taxPercentage;
                        } else {
                            temp.taxValue = '';
                        }
                    }
                    temp.productImage = defaultValue;
                    temp.productAttributes = await this.productAttributeService.findAll({
                        select: ['id', 'attributeId', 'text'],
                        where: { productId: productListData.productId },
                    }).then((val) => {
                        const attribute = val.map(async (value: any) => {
                            const attributes = await this.attributeService.findOne({ attributeId: value.attributeId });
                            const attributeGroup = await this.attributeGroupService.findOne({ groupId: attributes.groupId });
                            const tempVal: any = value;
                            if (attributes !== undefined && attributeGroup !== undefined) {
                                tempVal.attributeName = attributes.attributeName;
                                tempVal.attributeGroupName = attributeGroup.attributeGroupName;
                            } else {
                                tempVal.attributeName = '';
                                tempVal.attributeGroupName = '';
                            }
                            return tempVal;
                        });
                        const results = Promise.all(attribute);
                        return results;
                    });
                    if (productListData.hasStock === 1) {
                        if (productListData.quantity <= productListData.outOfStockThreshold) {
                            temp.stockStatus = 'outOfStock';
                        } else {
                            temp.stockStatus = 'inStock';
                        }
                    } else {
                        temp.stockStatus = 'inStock';
                    }
                    productDataDetail.push(temp);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Product Compared Successfully',
                    data: productDataDetail,
                };
                return response.status(200).send(successResponse);
            }
        }
    }

}
