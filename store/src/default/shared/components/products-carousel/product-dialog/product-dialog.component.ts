/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { ListsSandbox } from './../../../../../core/lists/lists.sandbox';
import { Component, ViewEncapsulation, OnInit, Inject, AfterViewInit } from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {ConfigService} from '../../../../../core/service/config.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductDialogComponent implements OnInit , AfterViewInit {

    public config: SwiperConfigInterface = {};
    public imagePath: string;

    constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
                public productDetail: ListsSandbox,
                @Inject(MAT_DIALOG_DATA)
                public product: any,
                public router: Router,
                public listSandbox: ListsSandbox,
                private configService: ConfigService) {

    }

    ngOnInit() {
       this.imagePath = this.configService.getImageUrl();
    }

    ngAfterViewInit() {
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: false,
            preloadImages: false,
            lazy: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            }
        };
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

    public close(): void {
        this.dialogRef.close();
    }

    closePopup(event) {
        this.close();
    }

    redirect() {
        this.close();
        this.router.navigate(['/products/productdetails', this.product.productSlug]);
    }
}

