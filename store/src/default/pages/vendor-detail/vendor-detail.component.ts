/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RelatedProductListModel } from '../../../core/lists/models/related-product-list.model';
import { ProductDialogComponent } from '../../shared/components/products-carousel/product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-vendor-detail',
    templateUrl: './vendor-detail.component.html',
    styleUrls: ['./vendor-detail.component.scss']
})


export class VendorDetailComponent implements OnInit, OnDestroy {

    public contactForm: FormGroup;
    public submitted = false;
    // load image path
    public imagePath: string;
    // route params
    private sub: any;
    private id: any;
    public productDetails: any;
    // subcription
    private subscriptions: Array<Subscription> = [];
    public vendorId: any;
    public product: any;

    // review pagination
    public limit: any = 10;
    public offset: any = 0;
    public keyword: any = '';
    public reviewCount = 0;
    public disableNext = false;
    public disablePrevious = false;
    public rating = 0;
    public starCount = 5;
    public pageSize = 12;
    public index = 0;
    public productOffset = 0;
    public discountPrice = 20;
    public fiftyPercent = 50;


    constructor(public formBuilder: FormBuilder,
        public configService: ConfigService,
        public dialog: MatDialog,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
                public listSandbox: ListsSandbox) {
                    this.sub = this.activatedRoute.params.subscribe(params => {
                        this.id = params['id'];
                        this.getVendorDetail();
                    });
                    this.activatedRoute.queryParams.subscribe(params => {
                        this.vendorId = params['vendorId'];
                     });
                 }

    ngOnInit() {
        this.titleService.setTitle('Vendor Details');
        this.imagePath = this.configService.getImageUrl();
        // subscribe route params and trigger selected product detail, related products
        this.subscriptions.push(
            this.listSandbox.vendorDetail$.subscribe(data => {
                if (data && data.productlist) {
                    const tempProduct = data.productlist.map(product => {
                        const tempList = new RelatedProductListModel(product);
                        return tempList;
                    });
                    this.productDetails = tempProduct;
                }
            })
        );
        if (this.vendorId) {
            this.getVendorProductList();
            this.getVendorProductListCount();
            this.getReviewList();
            this.getReviewListCount();
        }
    }


    getVendorDetail() {
        const params: any = {};
        params.id = this.id;
        this.listSandbox.getVendorDetail(params);
    }

    getVendorProductList() {
        const params: any = {};
        params.limit = this.pageSize;
        params.offset = this.productOffset;
        params.count = '';
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorProductList(params);
    }

    getVendorProductListCount() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = 1;
        params.vendorId = +this.vendorId;
        this.listSandbox.vendorProductListCount(params);
    }

    getReviewList() {
        const params: any = {};
        params.limit = this.limit;
        params.offset = this.offset;
        params.count = '';
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorReviewList(params);
    }

    getReviewListCount() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = 1;
        params.vendorId = +this.vendorId;
        this.listSandbox.getVendorReviewListCount(params);
        this.subscriptions.push(this.listSandbox.vendorReviewListCount$.subscribe(data => {
            if (data) {
                this.reviewCount = data;
            }
        }));
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

        /**
     * open quick view of the product
     *
     * @param data passing selected product detail to dialog
     */
    public openProductDialog(product) {
        const dialogRef = this.dialog.open(ProductDialogComponent, {
            panelClass: 'product-dialog',
            data: product
        });
        dialogRef.afterClosed().subscribe(products => {
            if (products) {
                this.router.navigate(['/products/productdetails', products.productSlug]);
            }
        });
    }

    goToPreviousPage() {
        this.disablePrevious = false;
        this.offset = this.offset - this.limit;
        if (this.offset < this.reviewCount && this.offset > 0) {
            this.getReviewList();
        } else {
            this.disablePrevious = true;
            return;
        }
    }

    goToNextPage() {
        this.disableNext = true;
        this.offset = this.offset + this.limit;

        if (this.offset < this.reviewCount) {
            this.getReviewList();
        } else {
            this.disableNext = true;
        }
    }

    getShortName(fullName: string) {
        return fullName.split(' ').map(n => n[0]).join('');
    }

    public onPageChange(event) {
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.productOffset = event.pageIndex * event.pageSize;
        this.getVendorProductList();
    }

    goToDetailPage(product) {
        this.router.navigate(['/products/productdetails/' + product.productSlug]);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
    }
}
