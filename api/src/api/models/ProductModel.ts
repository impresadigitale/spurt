/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import { BeforeInsert, Column, Entity, BeforeUpdate, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment from 'moment';
import { ProductToCategory } from './ProductToCategory';
import { ProductImage } from './ProductImage';
import { CustomerWishlist } from './CustomerWishlist';
import { ProductRelated } from './ProductRelated';
import { OrderProduct } from './OrderProduct';
import { ProductRating } from './ProductRating';
import { OrderProductLog } from './OrderProductLog';
import { CustomerCart } from './CustomerCart';
import { ProductQuestion } from './ProductQuestion';
import { ProductTirePrice } from './ProductTirePrice';
import { Quotation } from './Quotation';
import { VendorProducts } from './VendorProducts';
import { ProductAttribute } from './ProductAttribute';
import { ProductVarient } from './ProductVarient';
import { ProductVarientOption } from './ProductVarientOption';
import { Sku } from './SkuModel';

@Entity('product')
export class Product extends BaseModel {
    @PrimaryGeneratedColumn({ name: 'product_id' })
    @IsNotEmpty()
    public productId: number;

    @Column({ name: 'sku' })
    public sku: string;

    @Column({ name: 'upc' })
    public upc: string;

    @Column({ name: 'hsn' })
    public hsn: string;

    @Column({ name: 'location' })
    public location: string;

    @Column({ name: 'quantity' })
    public quantity: number;

    @Column({ name: 'minimum_quantity' })
    public minimumQuantity: number;

    @Column({ name: 'subtract_stock' })
    public subtractStock: number;

    @IsNotEmpty()
    @Column({ name: 'stock_status_id' })
    public stockStatusId: number;

    @Column({ name: 'image' })
    public image: string;

    @Column({ name: 'image_path' })
    public imagePath: string;

    @Column({ name: 'manufacturer_id' })
    public manufacturerId: number;

    @Column({ name: 'shipping' })
    public shipping: number;

    @Column({ name: 'service_charges' })
    public serviceCharges: string;

    @Column({ name: 'tax_type' })
    public taxType: number;

    @Column({ name: 'tax_value' })
    public taxValue: number;

    @IsNotEmpty()
    @Column({ name: 'price' })
    public price: number;

    @Column({ name: 'price_update_file_log_id' })
    public priceUpdateFileLogId: number;

    @Column({ name: 'date_available' })
    public dateAvailable: Date;

    @Column({ name: 'sort_order' })
    public sortOrder: number;

    @Column({ name: 'name' })
    public name: string;

    @Column({ name: 'description' })
    public description: string;

    @Column({ name: 'amount' })
    public amount: number;

    @Column({ name: 'meta_tag_title' })
    public metaTagTitle: string;

    @Column({ name: 'meta_tag_description' })
    public metaTagDescription: string;

    @Column({ name: 'meta_tag_keyword' })
    public metaTagKeyword: string;

    @Column({ name: 'keywords' })
    public keywords: string;

    @Column({ name: 'discount' })
    public discount: number;

    @Column({ name: 'delete_flag' })
    public deleteFlag: number;

    @Column({ name: 'is_featured' })
    public isFeatured: number;

    @Column({ name: 'today_deals' })
    public todayDeals: number;

    @Column({ name: 'condition' })
    public condition: number;

    @Column({ name: 'rating' })
    public rating: number;

    @Column({ name: 'wishlist_status' })
    public wishListStatus: number;

    @Column({ name: 'product_slug' })
    public productSlug: string;

    @Column({ name: 'is_active' })
    public isActive: number;

    @Column({ name: 'width' })
    public width: string;

    @Column({ name: 'height' })
    public height: string;

    @Column({ name: 'length' })
    public length: string;

    @Column({ name: 'weight' })
    public weight: string;

    @Column({ name: 'has_stock' })
    public hasStock: number;

    @Column({ name: 'is_simplified' })
    public isSimplified: number;

    @Column({ name: 'sku_id' })
    public skuId: number;

    @Column({ name: 'has_tire_price' })
    public hasTirePrice: number;

    @Column({ name: 'out_of_stock_threshold' })
    public outOfStockThreshold: number;

    @Column({ name: 'notify_min_quantity_below' })
    public notifyMinQuantity: number;

    @Column({ name: 'min_quantity_allowed_cart' })
    public minQuantityAllowedCart: number;

    @Column({ name: 'max_quantity_allowed_cart' })
    public maxQuantityAllowedCart: number;

    @Column({ name: 'enable_back_orders' })
    public enableBackOrders: number;

    @Column({ name: 'pincode_based_delivery' })
    public pincodeBasedDelivery: number;

    @Column({ name: 'attribute_keyword' })
    public attributeKeyword: string;

    @OneToOne(type => Sku)
    @JoinColumn({ name: 'sku_id' })
    public skuDetail: Sku;

    @OneToMany(type => ProductToCategory, productToCategory => productToCategory.product)
    public productToCategory: ProductToCategory[];

    @OneToMany(type => ProductImage, productImage => productImage.product)
    public productImage: ProductImage[];

    @OneToMany(type => CustomerWishlist, customerWishlist => customerWishlist.product)
    public wishlist: CustomerWishlist[];

    @OneToMany(type => ProductRelated, productRelated => productRelated.productRelated)
    public relatedproduct: ProductRelated[];

    @OneToMany(type => ProductRating, productRating => productRating.product)
    public productRating: ProductRating[];

    @OneToMany(type => OrderProduct, orderProduct => orderProduct.productInformationDetail)
    public orderProduct: OrderProduct[];

    @OneToMany(type => OrderProductLog, orderProductLog => orderProductLog.product)
    public orderProductLog: OrderProductLog[];

    @OneToMany(type => CustomerCart, customerCart => customerCart.product)
    public cart: OrderProductLog[];

    @OneToMany(type => ProductTirePrice, productTirePrice => productTirePrice.product)
    public productTirePrice: ProductTirePrice[];

    @OneToMany(type => ProductQuestion, productAnswer => productAnswer.product)
    public productQuestion: ProductQuestion[];

    @OneToMany(type => Quotation, quotation => quotation.product)
    public quotation: Quotation[];

    @OneToMany(type => VendorProducts, vendorProduct => vendorProduct.product)
    public vendorProducts: VendorProducts[];

    @OneToMany(type => ProductAttribute, productAttribute => productAttribute.product)
    public productAttribute: ProductAttribute[];

    @OneToMany(type => ProductVarient, productVarient => productVarient.product)
    public productVarient: ProductVarient[];

    @OneToMany(type => ProductVarientOption, productVarientOption => productVarientOption.product)
    public productVarientOption: ProductVarientOption[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
