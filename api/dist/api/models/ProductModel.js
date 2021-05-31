"use strict";
/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const ProductToCategory_1 = require("./ProductToCategory");
const ProductImage_1 = require("./ProductImage");
const CustomerWishlist_1 = require("./CustomerWishlist");
const ProductRelated_1 = require("./ProductRelated");
const OrderProduct_1 = require("./OrderProduct");
const ProductRating_1 = require("./ProductRating");
const OrderProductLog_1 = require("./OrderProductLog");
const CustomerCart_1 = require("./CustomerCart");
const ProductQuestion_1 = require("./ProductQuestion");
const ProductTirePrice_1 = require("./ProductTirePrice");
const Quotation_1 = require("./Quotation");
const VendorProducts_1 = require("./VendorProducts");
const ProductAttribute_1 = require("./ProductAttribute");
const ProductVarient_1 = require("./ProductVarient");
const ProductVarientOption_1 = require("./ProductVarientOption");
const SkuModel_1 = require("./SkuModel");
let Product = class Product extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'product_id' }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "productId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sku' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "sku", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'upc' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "upc", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'hsn' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "hsn", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'location' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "location", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'quantity' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'minimum_quantity' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "minimumQuantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'subtract_stock' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "subtractStock", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'stock_status_id' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "stockStatusId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'image' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "image", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'image_path' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "imagePath", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'manufacturer_id' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "manufacturerId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'shipping' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "shipping", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'service_charges' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "serviceCharges", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'tax_type' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "taxType", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'tax_value' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "taxValue", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'price' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'price_update_file_log_id' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "priceUpdateFileLogId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'date_available' }),
    tslib_1.__metadata("design:type", Date)
], Product.prototype, "dateAvailable", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sort_order' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "sortOrder", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'description' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'amount' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "amount", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_title' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "metaTagTitle", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_description' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "metaTagDescription", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'meta_tag_keyword' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "metaTagKeyword", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'keywords' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "keywords", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'discount' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "discount", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'delete_flag' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "deleteFlag", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_featured' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "isFeatured", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'today_deals' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "todayDeals", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'condition' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "condition", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'rating' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "rating", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'wishlist_status' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "wishListStatus", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_slug' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "productSlug", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "isActive", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'width' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "width", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'height' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "height", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'length' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "length", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'weight' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "weight", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'has_stock' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "hasStock", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_simplified' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "isSimplified", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "skuId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'has_tire_price' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "hasTirePrice", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'out_of_stock_threshold' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "outOfStockThreshold", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'notify_min_quantity_below' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "notifyMinQuantity", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'min_quantity_allowed_cart' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "minQuantityAllowedCart", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'max_quantity_allowed_cart' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "maxQuantityAllowedCart", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'enable_back_orders' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "enableBackOrders", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'pincode_based_delivery' }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "pincodeBasedDelivery", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'attribute_keyword' }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "attributeKeyword", void 0);
tslib_1.__decorate([
    typeorm_1.OneToOne(type => SkuModel_1.Sku),
    typeorm_1.JoinColumn({ name: 'sku_id' }),
    tslib_1.__metadata("design:type", SkuModel_1.Sku)
], Product.prototype, "skuDetail", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductToCategory_1.ProductToCategory, productToCategory => productToCategory.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productToCategory", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductImage_1.ProductImage, productImage => productImage.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productImage", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => CustomerWishlist_1.CustomerWishlist, customerWishlist => customerWishlist.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "wishlist", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductRelated_1.ProductRelated, productRelated => productRelated.productRelated),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "relatedproduct", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductRating_1.ProductRating, productRating => productRating.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productRating", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => OrderProduct_1.OrderProduct, orderProduct => orderProduct.productInformationDetail),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "orderProduct", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => OrderProductLog_1.OrderProductLog, orderProductLog => orderProductLog.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "orderProductLog", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => CustomerCart_1.CustomerCart, customerCart => customerCart.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "cart", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductTirePrice_1.ProductTirePrice, productTirePrice => productTirePrice.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productTirePrice", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductQuestion_1.ProductQuestion, productAnswer => productAnswer.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productQuestion", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => Quotation_1.Quotation, quotation => quotation.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "quotation", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => VendorProducts_1.VendorProducts, vendorProduct => vendorProduct.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "vendorProducts", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductAttribute_1.ProductAttribute, productAttribute => productAttribute.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productAttribute", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductVarient_1.ProductVarient, productVarient => productVarient.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productVarient", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => ProductVarientOption_1.ProductVarientOption, productVarientOption => productVarientOption.product),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "productVarientOption", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Product.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Product.prototype, "updateDetails", null);
Product = tslib_1.__decorate([
    typeorm_1.Entity('product')
], Product);
exports.Product = Product;
//# sourceMappingURL=ProductModel.js.map