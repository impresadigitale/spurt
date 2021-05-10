/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { Get, JsonController, Res, Req, QueryParam, Body, Post, Param, QueryParams } from 'routing-controllers';
import { BannerService } from '../../services/BannerService';
import { MAILService } from '../../../auth/mail.services';
import { classToPlain } from 'class-transformer';
import { CategoryService } from '../../services/CategoryService';
import { ProductService } from '../../services/ProductService';
import arrayToTree from 'array-to-tree';
import { ProductRelated } from '../../models/ProductRelated';
import { ProductRelatedService } from '../../services/ProductRelatedService';
import { ProductImageService } from '../../services/ProductImageService';
import { CustomerWishlistService } from '../../services/CustomerWishlistService';
import jwt from 'jsonwebtoken';
import { CountryService } from '../../services/CountryService';
import { ContactService } from '../../services/ContactService';
import { ContactRequest } from './requests/ContactRequest';
import { Contact } from '../../models/Contact';
import { EmailTemplateService } from '../../services/EmailTemplateService';
import { ZoneService } from '../../services/zoneService';
import { LanguageService } from '../../services/LanguageService';
import { ProductDiscountService } from '../../services/ProductDiscountService';
import { ProductSpecialService } from '../../services/ProductSpecialService';
import { ProductToCategoryService } from '../../services/ProductToCategoryService';
import { CategoryPathService } from '../../services/CategoryPathService';
import { PluginService } from '../../services/PluginService';
import { UserService } from '../../services/UserService';
import { BlogService } from '../../services/BlogService';
import { VendorProductService } from '../../services/VendorProductService';
import { VendorService } from '../../services/VendorService';
import { CustomerService } from '../../services/CustomerService';
import { OrderStatusService } from '../../services/OrderStatusService';
import { TaxService } from '../../services/TaxService';
import { BlogRelatedService } from '../../services/BlogRelatedService';
import { OrderProductService } from '../../services/OrderProductService';
import { OrderProductLogService } from '../../services/OrderProductLogService';
import { ProductQuestionService } from '../../services/ProductQuestionService';
import { ProductAnswerService } from '../../services/ProductAnswerService';
import { ProductAnswerLikeService } from '../../services/ProductAnswerLikeDislikeService';
import { SettingService } from '../../services/SettingService';
import { env } from '../../../env';
import { SkuService } from '../../services/SkuService';
import { ProductVarientOptionService } from '../../services/ProductVarientOptionService';
import { AttributeDetails, ListRequest, VariantDetails } from './requests/ListRequest';
import { SiteFilterCategoryService } from '../../services/SiteFilterCategoryService';
import { SiteFilterSectionService } from '../../services/SiteFilterSectionService';
import { SiteFilterSectionItemService } from '../../services/SiteFilterSectionItemService';
import { WidgetService } from '../../services/WidgetService';
import { WidgetItemService } from '../../services/WidgetItemService';

@JsonController('/list')
export class CommonListController {
    constructor(
        private bannerService: BannerService,
        private taxService: TaxService, private categoryService: CategoryService, private productRelatedService: ProductRelatedService,
        private productService: ProductService, private productImageService: ProductImageService, private languageService: LanguageService,
        private customerWishlistService: CustomerWishlistService, private countryService: CountryService, private contactService: ContactService,
        private emailTemplateService: EmailTemplateService, private blogService: BlogService, private blogRelatedService: BlogRelatedService,
        private zoneService: ZoneService, private productDiscountService: ProductDiscountService, private productSpecialService: ProductSpecialService,
        private siteFilterSectionService: SiteFilterSectionService,
        private siteFilterSectionItemService: SiteFilterSectionItemService,
        private siteFilterCategoryService: SiteFilterCategoryService,
        private widgetService: WidgetService,
        private widgetItemService: WidgetItemService,
        private productToCategoryService: ProductToCategoryService, private categoryPathService: CategoryPathService, private pluginService: PluginService, private vendorProductService: VendorProductService, private vendorService: VendorService, private customerService: CustomerService,
        private userService: UserService, private orderStatusService: OrderStatusService, private productQuestionService: ProductQuestionService, private productAnswerLikeService: ProductAnswerLikeService, private settingsService: SettingService,
        private orderProductService: OrderProductService, private orderProductLogService: OrderProductLogService, private productAnswerService: ProductAnswerService, private productVarientOptionService: ProductVarientOptionService, private skuService: SkuService
    ) {
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
    @Get('/banner-list')
    public async bannerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
        const bannerList: any = await this.bannerService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got banner list',
            data: bannerList,
        };
        return response.status(200).send(successResponse);
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
    @Get('/category-list')
    public async ParentCategoryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sortOrder') sortOrder: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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
        const categoryData = await this.categoryService.list(limit, offset, select, search, WhereConditions, sortOrder, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get All category List',
                data: categoryData,
            };
            return response.status(200).send(successResponse);
        } else {
            const category = categoryData.map(async (value: any) => {
                const tempVal: any = value;
                const child = await this.categoryService.find({
                    where: { parentInt: value.categoryId, isActive: 1 }, order: { sortOrder: 'ASC' },
                    select: ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'categorySlug'],
                });
                const children = child.map(async (val: any) => {
                    const data: any = val;
                    const subChild = await this.categoryService.find({
                        where: { parentInt: val.categoryId, isActive: 1 }, order: { sortOrder: 'ASC' },
                        select: ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'isActive', 'categorySlug'],
                    });
                    if (subChild.length > 0) {
                        data.children = subChild;
                        return data;
                    }
                    return data;
                });
                const childrenData = await Promise.all(children);
                tempVal.children = childrenData;
                return tempVal;
            });
            const result = await Promise.all(category);
            if (result) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully got the list of categories.',
                    data: result,
                };
                return response.status(200).send(successResponse);
            }
        }
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
    @Post('/add-related-product')
    public async addRelatedProduct(@Body({ validate: true }) productParam: any, @Req() request: any, @Res() response: any): Promise<any> {
        const productId = productParam.productId;
        const relatedProductId = productParam.relatedProductId;
        const eachData: any = relatedProductId.split(',');
        let i;
        for (i = 0; i < eachData.length; i++) {
            const relatedProduct = new ProductRelated();
            relatedProduct.productId = productId;
            relatedProduct.relatedProductId = eachData[i];
            await this.productRelatedService.create(relatedProduct);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully added the related products.',
        };
        return response.status(200).send(successResponse);
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
    @Get('/productlist')
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
                             @QueryParam('manufacturerId') manufacturerId: string, @QueryParam('categoryId') categoryId: string, @QueryParam('priceFrom') priceFrom: string,
                             @QueryParam('priceTo') priceTo: string, @QueryParam('price') price: number, @QueryParam('condition') condition: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
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

        const whereConditions: any = [{
            name: 'product.productId',
            op: 'inraw',
            value: categoryId,
        }];

        const productList: any = await this.productService.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully got Products count',
                data: productList,
            };
            return response.status(200).send(Response);
        }
        const promises = productList.map(async (result: any) => {
            const productToCategory = await this.productToCategoryService.findAll({
                select: ['categoryId', 'productId'],
                where: { productId: result.productId },
            }).then((val) => {
                const category = val.map(async (value: any) => {
                    const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                    const tempValue: any = value;
                    tempValue.categoryName = categoryNames.name;
                    return tempValue;
                });
                const results = Promise.all(category);
                return results;
            });
            if (result.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: result.taxValue });
                if (tax) {
                    result.taxValue = tax.taxPercentage;
                } else {
                    result.taxValue = '';
                }
            }
            const productImage = await this.productImageService.findOne({
                select: ['productId', 'image', 'containerName', 'defaultImage'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = result;
            temp.Images = productImage;
            temp.Category = productToCategory;
            temp.skuName = '';
            let skuValue = undefined;
            let skuId = undefined;
            if (result.isSimplified === 1) {
                skuValue = await this.skuService.findOne({ id: result.skuId });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                }
            } else {
                skuValue = await this.productVarientOptionService.findOne({ productId: result.productId });
                if (skuValue) {
                    const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                    temp.price = productVarientSku.price;
                    temp.skuName = productVarientSku.skuName;
                    skuId = productVarientSku.id;
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
                if (wishStatus !== undefined) {
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
        const maximum: any = ['Max(product.price) As maximumProductPrice'];
        const maximumPrice: any = await this.productService.productMaxPrice(maximum);
        const productPrice: any = maximumPrice.maximumProductPrice;
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete list of products.',
            data: {
                maximumProductPrice: productPrice,
                productList: finalResult,
            },
        };
        return response.status(200).send(successResponse);
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
    @Get('/custom-product-list')
    public async customProductList(
        @QueryParams() params: ListRequest,
        @Req() request: any,
        @Res() response: any
    ): Promise<any> {
        return new Promise(async () => {
            const variant: VariantDetails[] = [];
            const attribute: AttributeDetails[] = [];
            const tempVariant = params.variant ? params.variant.split(',') : [];
            const tempAttribute = params.attribute ? params.attribute.split(',') : [];
            if (tempVariant && tempVariant.length > 0) {
                tempVariant.forEach(element => {
                    const temp: VariantDetails = {};
                    const value = element.split('~');
                    temp.name = value[0];
                    temp.value = value[1];
                    variant.push(temp);
                });
            }
            if (tempAttribute && tempAttribute.length > 0) {
                tempAttribute.forEach(element => {
                    const temp: AttributeDetails = {};
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
                },
                    {
                        tableName: 'vendorProducts.vendor',
                        op: 'left',
                        aliasName: 'vendor',
                    },
                    {
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
            } else {
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
            } else {
                sort.push({
                    name: 'Product.sortOrder',
                    order: 'ASC',
                });
            }
            const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = productList.map(async (result: any) => {
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
                temp.Images = productImage;
                temp.skuName = '';
                let skuValue = undefined;
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
                        const sku = await this.skuService.findOne({ id: result.skuId });
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
                const vendorProduct = await this.vendorProductService.findOne({ where: { productId: result.productId } });
                if (vendorProduct) {
                    const vendor = await this.vendorService.findOne(vendorProduct.vendorId);
                    const customer = await this.customerService.findOne(vendor.customerId);
                    temp.vendorId = vendor ? vendor.vendorId : '';
                    temp.vendorName = customer ? customer.firstName : '';
                    temp.vendorCompanyName = customer ? customer.companyName : '';
                    temp.vendorCompanyLocation = vendor ? vendor.companyLocation : '';
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
            const finalResult = await
                Promise.all(promises);
            let categoryLevel;
            if (params.categoryslug) {
                const category = await this.categoryService.findOne({ categorySlug: params.categoryslug, isActive: 1 });
                if (category) {
                    const categoryLevels: any = await this.categoryPathService.find({
                        select: ['level', 'pathId'],
                        where: { categoryId: category.categoryId },
                        order: { level: 'ASC' },
                    }).then((values) => {
                        const categories = values.map(async (val: any) => {
                            const categoryData = await this.categoryService.findOne({ categoryId: val.pathId });
                            const tempVal: any = val;
                            tempVal.categoryName = categoryData ? categoryData.name : '';
                            tempVal.categoryId = categoryData ? categoryData.categoryId : '';
                            tempVal.categorySlug = categoryData ? categoryData.categorySlug : '';
                            tempVal.parentInt = categoryData ? categoryData.parentInt : '';
                            tempVal.metaTagTitle = categoryData ? categoryData.metaTagTitle : '';
                            tempVal.metaTagDescription = categoryData ? categoryData.metaTagDescription : '';
                            tempVal.metaTagKeyword = categoryData ? categoryData.metaTagKeyword : '';
                            return tempVal;
                        });
                        const results = Promise.all(categories);
                        return results;
                    });
                    categoryLevel = categoryLevels;
                } else {
                    const errorResponse: any = {
                        status: 0,
                        message: 'Invalid category',
                    };
                    return response.status(400).send(errorResponse);
                }
            } else {
                categoryLevel = '';
            }
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete list of products.',
                data: finalResult,
                categoryLevel,
            };
            return response.status(200).send(successResponse);
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
    @Get('/related-product-list')
    public async relatedProductList(@QueryParam('productId') productid: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail: any = await this.productService.findOne({
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
            const relatedDataCount: any = await this.productRelatedService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
            const Response: any = {
                status: 1,
                message: 'Related product list is successfully being shown. ',
                data: relatedDataCount,
            };
            return response.status(200).send(Response);
        }
        const relatedData: any = await this.productRelatedService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
        const promises = relatedData.map(async (results: any) => {
            if (results.taxType === 2) {
                const tax = await this.taxService.findOne({ taxId: results.taxValue });
                if (tax) {
                    results.taxValue = tax.taxPercentage;
                } else {
                    results.taxValue = '';
                }
            }
            const Image = await this.productImageService.findOne({ where: { productId: results.productId, defaultImage: 1 } });
            const temp: any = results;
            temp.productImage = Image;
            temp.skuName = '';
            let skuValue = undefined;
            let skuId = undefined;
            if (results.isSimplified === 1) {
                skuValue = await this.skuService.findOne({ id: results.skuId });
                if (skuValue) {
                    temp.price = skuValue.price;
                    temp.skuName = skuValue.skuName;
                    skuId = skuValue.id;
                }
            } else {
                skuValue = await this.productVarientOptionService.findOne({ productId: results.productId, isActive: 1 });
                if (skuValue) {
                    const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                    temp.price = productVarientSku.price;
                    temp.skuName = productVarientSku.skuName;
                    skuId = productVarientSku.id;
                } else {
                    const sku = await this.skuService.findOne({ id: results.skuId });
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
                const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(results.productId, skuId, todaydate);
                const productDiscount = await this.productDiscountService.findDiscountPricewithSku(results.productId, skuId, todaydate);
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
            if (results.hasStock === 1) {
                if (results.quantity <= results.outOfStockThreshold) {
                    temp.stockStatus = 'outOfStock';
                } else {
                    temp.stockStatus = 'inStock';
                }
            } else {
                temp.stockStatus = 'inStock';
            }
            return temp;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Related product list is successfully being shown. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
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
    @Get('/country-list')
    public async countryList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
        const countryList = await this.countryService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the list of countries.',
            data: countryList,
        };
        return response.status(200).send(successResponse);

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
    @Post('/contact-us')
    public async userContact(@Body({ validate: true }) contactParam: ContactRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const contactInformation = new Contact();
        contactInformation.name = contactParam.name;
        contactInformation.email = contactParam.email;
        contactInformation.phoneNumber = contactParam.phoneNumber;
        contactInformation.message = contactParam.message;
        const informationData = await this.contactService.create(contactInformation);
        const emailContent = await this.emailTemplateService.findOne(3);
        const logo = await this.settingsService.findOne();
        const message = emailContent.content.replace('{name}', informationData.name).replace('{email}', informationData.email).replace('{phoneNumber}', informationData.phoneNumber).replace('{message}', informationData.message);
        const adminId: any = [];
        const adminUser = await this.userService.findAll({ select: ['username'], where: { userGroupId: 1 } });
        for (const user of adminUser) {
            const val = user.username;
            adminId.push(val);
        }
        const redirectUrl = env.storeRedirectUrl;
        const sendMailRes = MAILService.contactMail(logo, message, emailContent.subject, adminId, redirectUrl);
        if (sendMailRes) {
            const successResponse: any = {
                status: 1,
                message: 'Your request Successfully send',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Mail does not send',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/zone-list')
    public async zonelist(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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

        const zoneList = await this.zoneService.list(limit, offset, select, search, WhereConditions, relation, count);
        if (zoneList) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get all zone List',
                data: classToPlain(zoneList),
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 1,
                message: 'unable to get zone List',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/language-list')
    public async languageList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
        const languageList = await this.languageService.list(limit, offset, select, search, WhereConditions, count);
        if (languageList) {
            const successResponse: any = {
                status: 1,
                message: 'successfully got the complete language list.',
                data: languageList,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to show language list',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/specific-category-list')
    public async SpecificcategoryList(@QueryParam('categorySlug') categorySlugParam: string, @Req() request: any, @Res() response: any): Promise<any> {
        const categoryDataId = await this.categoryService.findOne({
            where: {
                categorySlug: categorySlugParam,
            },
        });
        if (categoryDataId === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid categoryId',
            };
            return response.status(400).send(errorResponse);
        }
        const categoryDetailId = await this.categoryPathService.findOne({ categoryId: categoryDataId.categoryId, level: 0 });
        const select = ['categoryId', 'name', 'image', 'imagePath', 'parentInt', 'sortOrder', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'categorySlug'];
        const search = [
            {
                name: 'isActive',
                op: 'where',
                value: 1,
            },
        ];
        const categoryData = await this.categoryService.list(0, 0, select, search, 0, 0, 0);
        const categoryList = arrayToTree(categoryData, {
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
        const successResponse: any = {
            status: 1,
            message: 'Successfully get the related category List',
            data: dataList,
        };
        return response.status(200).send(successResponse);
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
    @Get('/get-payment-setting')
    public async paymentSettingList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
        const paymentSettingList = await this.pluginService.list(limit, offset, select, search, WhereConditions, count);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got payment List.',
            data: paymentSettingList,
        };
        return response.status(200).send(successResponse);

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
    @Get('/product-count')
    public async productCount(@QueryParams() params: ListRequest, @Req() request: any, @Res() response: any): Promise<any> {
        const variant: VariantDetails[] = [];
        const attribute: AttributeDetails[] = [];
        const tempVariant = params.variant ? params.variant.split(',') : [];
        const tempAttribute = params.attribute ? params.attribute.split(',') : [];
        if (tempVariant && tempVariant.length > 0) {
            tempVariant.forEach(element => {
                const temp: VariantDetails = {};
                const value = element.split('~');
                temp.name = value[0];
                temp.value = value[1];
                variant.push(temp);
            });
        }
        if (tempAttribute && tempAttribute.length > 0) {
            tempAttribute.forEach(element => {
                const temp: AttributeDetails = {};
                const value = element.split('~');
                temp.name = value[0];
                temp.value = value[1];
                attribute.push(temp);
            });
        }
        const maximum: any = ['Max(product.price) As maximumProductPrice'];
        const maximumPrice: any = await this.productService.productMaxPrice(maximum);
        const productPrice: any = maximumPrice.maximumProductPrice;
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
            },
                {
                    tableName: 'vendorProducts.vendor',
                    op: 'left',
                    aliasName: 'vendor',
                },
                {
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
        } else {
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
        } else {
            sort.push({
                name: '(CASE WHEN special IS NOT NULL THEN special WHEN discount IS NOT NULL THEN discount ELSE Product.price END)',
                order: 'ASC',
            });
        }
        const productList: any = await this.productService.listByQueryBuilder(limit, offset, selects, whereCondition, searchConditions, relations, groupBy, sort, true, true);
        // let count;
        // if (productCount.length > 0) {
        //     count = productCount[0].productCount;
        // } else {
        //     count = 0;
        // }
        const successResponse: any = {
            status: 1,
            message: 'Successfully get Product Count',
            data: {
                productCount: productList,
                maximumProductPrice: productPrice,
            },
        };
        return response.status(200).send(successResponse);

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
    @Get('/blog/blog-list')
    public async BlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('isActive') isActive: number, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
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
        const getBlogList = await this.blogService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get All Blog List',
                data: getBlogList,
            };
            return response.status(200).send(successResponse);
        } else {
            const blogList = getBlogList.map(async (val: any) => {
                const data: any = val;
                const getCategoryName = await this.categoryService.findOne({
                    where: { categoryId: val.categoryId },
                    select: ['name'],
                });
                const getUser = await this.userService.findOne({
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
            });
            const results = await Promise.all(blogList);
            if (blogList) {
                const successResponse: any = {
                    status: 1,
                    message: 'Successfully get blog list',
                    data: results,
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'unable to list blog',
                };
                return response.status(400).send(errorResponse);
            }
        }
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
    @Get('/blog/blog-detail/:blogSlug')
    public async BlogDetail(@Param('blogSlug') blogSlug: string, @Res() response: any): Promise<any> {
        const blog = await this.blogService.findOne({
            where: {
                blogSlug,
            },
        });
        if (!blog) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid blog id',
            };
            return response.status(400).send(errorResponse);
        }
        const blogDetails = await this.blogService.findOne(blog);
        const getCategoryName = await this.categoryService.findOne({
            where: { categoryId: blogDetails.categoryId },
            select: ['name'],
        });
        if (getCategoryName !== undefined) {
            blogDetails.categoryName = getCategoryName.name;
        }
        if (blogDetails) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully get blog Details',
                data: blogDetails,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to get blog Details',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/orderLoglist')
    public async listOrderLog(@QueryParam('orderPrefixId') orderProductPrefixId: string, @Res() response: any): Promise<any> {
        const orderProductData = await this.orderProductService.findOne({
            where: {
                orderProductPrefixId,
            },
        });
        if (!orderProductData) {
            const errorResponse: any = {
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
        const orderProductList = await this.orderProductLogService.list(0, 0, select, relation, WhereConditions, 0);
        const orderStatuss = await this.orderStatusService.findAll({ select: ['orderStatusId', 'name'], where: { isActive: 1 } });
        const orderProduct = orderStatuss.map(async (value: any) => {
            const user = orderProductList.find(item => item.orderStatusId === value.orderStatusId);
            const temp: any = value;
            if (user === undefined) {
                temp.createdDate = '';
            } else {
                temp.createdDate = user.createdDate;
            }
            return temp;
        });
        const result = await Promise.all(orderProduct);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete order Log list.',
            data: result,
        };
        return response.status(200).send(successResponse);
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
    @Get('/related-blog-list')
    public async relatedBlogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('blogSlug') blogSlug: string, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const blogDetail: any = await this.blogService.findOne({
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
        const relatedData = await this.blogRelatedService.list(limit, offset, 0, 0, whereConditions, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Related blog list is successfully being shown. ',
                data: relatedData,
            };
            return response.status(200).send(Response);
        }
        const promises = relatedData.map(async (results: any) => {
            const Id = results.relatedBlogId;
            const blog = await this.blogService.findOne({
                select: ['id', 'title', 'categoryId', 'description', 'image', 'imagePath', 'isActive', 'metaTagTitle', 'metaTagDescription', 'metaTagKeyword', 'blogSlug', 'createdDate'],
                where: { id: Id },
            });
            const category = await this.categoryService.findOne({ where: { categoryId: blog.categoryId } });
            const temp: any = blog;
            if (category !== undefined) {
                temp.categoryName = category.name;
            }
            return temp;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Related blog list is successfully being shown. ',
            data: result,
        };
        return response.status(200).send(successResponse);
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
    @Get('/question-list')
    public async questionList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('productId') productId: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const productDetail = await this.productService.findOne({
            where: { productId },
        });
        if (!productDetail) {
            const errorResponse: any = {
                status: 1,
                message: 'Invalid ProductId',
            };
            return response.status(400).send(errorResponse);
        }
        const select = ['questionId', 'productId', 'question', 'referenceId', 'type', 'isActive'];
        const whereConditions = [];
        const search: any = [
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

        const questionList = await this.productQuestionService.list(limit, offset, select, search, whereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully get count',
                data: questionList,
            });
        }
        const promise = questionList.map(async (result: any) => {
            const type = result.type;
            const temp: any = result;
            const answer = await this.productAnswerService.findOne({
                select: ['questionId', 'answerId', 'answer', 'referenceId', 'likes', 'dislikes', 'type', 'createdDate', 'isActive'],
                where: { questionId: result.questionId, isActive: 1, defaultAnswer: 1 },
            });
            if (answer) {
                if (request.header('authorization')) {
                    const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                    const userUniqueId: any = Object.keys(userId).map((key: any) => {
                        return [(key), userId[key]];
                    });
                    const likeType = await this.productAnswerLikeService.findOne({
                        where: {
                            answerId: answer.answerId,
                            customerId: userUniqueId[0][1],
                        },
                    });
                    if (likeType) {
                        answer.likeType = likeType.type;
                    } else {
                        answer.likeType = 0;
                    }
                } else {
                    answer.likeType = 0;
                }
            }
            temp.answerList = answer;
            if (type && type === 2) {
                const customer = await this.customerService.findOne({
                    select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                    where: { id: result.referenceId },
                });
                if (customer !== undefined) {
                    temp.postedBy = customer;
                }
            } else if (type && type === 1) {
                const adminUser = await this.userService.findOne({
                    select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                    where: { userId: result.referenceId },
                });
                if (adminUser !== undefined) {
                    temp.postedBy = adminUser;
                }
            }
            const searchQuestion: any = [
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
            const ansCount = await this.productAnswerService.list(0, 0, [], searchQuestion, [], 1);
            temp.answerCount = ansCount;
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all question List',
            data: value,
        };
        return response.status(200).send(successResponse);

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
    @Get('/answer-list')
    public async answerList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('questionId') questionId: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const question = await this.productQuestionService.findOne({
            where: { questionId },
        });
        if (!question) {
            const errorResponse: any = {
                status: 1,
                message: 'Invalid QuestionId',
            };
            return response.status(400).send(errorResponse);
        }
        const select = ['questionId', 'answerId', 'answer', 'referenceId', 'likes', 'dislikes', 'type', 'defaultAnswer', 'createdDate', 'isActive'];
        const whereConditions = [];
        const search: any = [
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

        const answerList = await this.productAnswerService.list(limit, offset, select, search, whereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully get count',
                data: answerList,
            });
        }
        const promise = answerList.map(async (result: any) => {
            const type = result.type;
            const temp: any = result;
            if (type && type === 2) {
                const customer = await this.customerService.findOne({
                    select: ['id', 'firstName', 'avatar', 'avatarPath', 'city'],
                    where: { id: result.referenceId },
                });
                if (customer !== undefined) {
                    temp.postedBy = customer;
                }
            } else if (type && type === 1) {
                const adminUser = await this.userService.findOne({
                    select: ['userId', 'firstName', 'avatar', 'avatarPath'],
                    where: { userId: result.referenceId },
                });
                if (adminUser !== undefined) {
                    temp.postedBy = adminUser;
                }
            }
            if (request.header('authorization')) {
                const userId = jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&');
                const userUniqueId: any = Object.keys(userId).map((key: any) => {
                    return [(key), userId[key]];
                });
                const likeType = await this.productAnswerLikeService.findOne({
                    where: {
                        answerId: result.answerId,
                        customerId: userUniqueId[0][1],
                    },
                });
                if (likeType) {
                    temp.likeType = likeType.type;
                } else {
                    temp.likeType = 0;
                }
            } else {
                temp.likeType = 0;
            }
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully get all answer List',
            data: value,
        };
        return response.status(200).send(successResponse);

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
    @Get('/widget-list')
    public async widgetList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = ['widgetId', 'widgetTitle', 'widgetLinkType', 'position', 'metaTagKeyword', 'metaTagDescription', 'metaTagTitle', 'widgetSlugName'];
        const search = [];
        const WhereConditions = [
            {
                name: 'isActive',
                value: 1,
            },
        ];
        const widgetList: any = await this.widgetService.list(limit, offset, select, search, WhereConditions, count);
        if (count) {
            return response.status(200).send({
                status: 1,
                message: 'Successfully get count',
                data: widgetList,
            });
        }
        const promise = widgetList.map(async (result: any) => {
            const temp: any = result;
            const BannerItem = await this.widgetItemService.find({
                where: {
                    widgetId: result.widgetId,
                },
            });
            const arr: any = [];
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
            } else {
                relations.push({
                    tableName: 'Product.productToCategory',
                    aliasName: 'productToCategory',
                },
                    {
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
            const productList: any = await this.productService.listByQueryBuilder(0, 0, selects, whereCondition, searchConditions, relations, groupBy, sort, false, true);
            const promises = productList.map(async (resultData: any) => {
                const productImage = await this.productImageService.findOne({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: resultData.productId,
                        defaultImage: 1,
                    },
                });
                if (resultData.taxType === 2) {
                    const tax = await this.taxService.findOne({ taxId: resultData.taxValue });
                    resultData.taxValue = tax ? tax.taxPercentage : 0;
                }
                const tempVal: any = resultData;
                tempVal.Images = productImage;
                if (resultData.hasStock === 1) {
                    if (resultData.quantity <= resultData.outOfStockThreshold) {
                        tempVal.stockStatus = 'outOfStock';
                    } else {
                        tempVal.stockStatus = 'inStock';
                    }
                } else {
                    tempVal.stockStatus = 'inStock';
                }
                tempVal.skuName = '';
                let skuValue = undefined;
                let skuId = undefined;
                if (resultData.isSimplified === 1) {
                    skuValue = await this.skuService.findOne({ id: result.skuId });
                    if (skuValue) {
                        tempVal.price = skuValue.price;
                        tempVal.skuName = skuValue.skuName;
                        skuId = skuValue.id;
                    }
                } else {
                    skuValue = await this.productVarientOptionService.findOne({ productId: result.productId, isActive: 1 });
                    if (skuValue) {
                        const productVarientSku = await this.skuService.findOne({ id: skuValue.skuId });
                        tempVal.price = productVarientSku.price;
                        tempVal.skuName = productVarientSku.skuName;
                        skuId = productVarientSku.id;
                    } else {
                        const sku = await this.skuService.findOne({ id: result.skuId });
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
                    const productSpecial = await this.productSpecialService.findSpecialPriceWithSku(result.productId, skuId, todaydate);
                    const productDiscount = await this.productDiscountService.findDiscountPricewithSku(result.productId, skuId, todaydate);
                    if (productSpecial !== undefined) {
                        tempVal.pricerefer = productSpecial.price;
                        tempVal.flag = 1;
                    } else if (productDiscount !== undefined) {
                        tempVal.pricerefer = productDiscount.price;
                        tempVal.flag = 0;
                    } else {
                        tempVal.pricerefer = '';
                        tempVal.flag = '';
                    }
                } else {
                    tempVal.pricerefer = '';
                    tempVal.flag = '';
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
                        tempVal.wishListStatus = 1;
                    } else {
                        tempVal.wishListStatus = 0;
                    }
                } else {
                    tempVal.wishListStatus = 0;
                }
                return tempVal;
            });
            temp.items = await Promise.all(promises);
            return temp;
        });
        const value = await Promise.all(promise);
        const successResponse: any = {
            status: 1,
            message: 'Successfully got widget list',
            data: value,
        };
        return response.status(200).send(successResponse);
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
    @Get('/filter-detail/:categorySlug')
    public async FilterDetail(@Param('categorySlug') categorySlug: string, @Res() response: any): Promise<any> {
        const category = await this.categoryService.findOne({
            where: {
                categorySlug,
            },
        });
        if (!category) {
            const errorResponse: any = {
                status: 0,
                message: 'invalid category Id',
            };
            return response.status(400).send(errorResponse);
        }
        const filterCategory = await this.siteFilterCategoryService.findOne({
            where: {
                categoryId: category.categoryId,
            },
        });
        if (filterCategory) {
            const filterSection = await this.siteFilterSectionService.findAll({
                where: {
                    filterId: filterCategory.filterId,
                },
            }).then(async (data) => {
                const promise = data.map(async (result: any) => {
                    const sectionItem = await this.siteFilterSectionItemService.findAll({ where: { filterSectionId: result.id } });
                    const temp: any = result;
                    temp.sectionItem = sectionItem;
                    return temp;
                });
                const value = await Promise.all(promise);
                return value;
            });
            const successResponse: any = {
                status: 1,
                message: 'Successfully get filter Details',
                data: filterSection,
            };
            return response.status(200).send(successResponse);
        } else {
            const successRes: any = {
                status: 1,
                message: 'Successfully get filter Details',
                data: [],
            };
            return response.status(200).send(successRes);
        }
    }
}
