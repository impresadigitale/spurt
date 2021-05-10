/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ProductControlSandbox} from '../../../core/product-control/product-control.sandbox';
import {WishlistSandbox} from '../../../core/wishlist/wishlist.sandbox';
import {ConfigService} from '../../../core/service/config.service';
import {ListsSandbox} from '../../../core/lists/lists.sandbox';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';


@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.scss'],
    providers: [ProductControlSandbox]
})


export class WishlistComponent implements OnInit, OnDestroy {

    public quantity = 1;
    public imagePath: string;
    public semiColon = ':';
    private subscriptions: Array<Subscription> = [];


    constructor(public snackBar: MatSnackBar, public wishlistSandbox: WishlistSandbox,
                public productControl: ProductControlSandbox,
                public router: Router,
                public listSandbox: ListsSandbox,
                private  configService: ConfigService) {
    }


    // Initially calls wishlistSandbox getWishlist with default param
    ngOnInit() {
        this.imagePath = this.configService.getImageUrl();
        const params: any = {};
        params.limit = 10;
        params.offset = '';
        this.wishlistSandbox.getWishlist(params);
    }

    // remove product from wishlist
    public remove(productId) {
        const params: any = {};
        params.wishlistProductId = productId;
        this.wishlistSandbox.deleteWishlist(params);
    }


    /** add product from wishlist to cart with options if mandatory.
     * @param products from wishlist.
     * @param param to ProductControlSandbox,to add items to cart.
     * **/
    public addToCart(products) {
        this.router.navigate(['/products/productdetails', products.product.productSlug]);
    }

    calculatePrice(price: number, taxType: number, taxValue: number) {
        switch (taxType) {
            case 1:
                const priceWithOutTax = +price + taxValue;
                return Math.round(priceWithOutTax);
            case 2:
                const percentToAmount = price * (taxValue / 100);
                const priceWithTax = +price + percentToAmount;
                return Math.round(priceWithTax);
            default:
                return price;
        }
    }

    // unsubscribe subscribed events while destroy the page
    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }
}
