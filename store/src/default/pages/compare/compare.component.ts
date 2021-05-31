/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { ProductCompareSandbox } from '../../../core/product-compare/product-compare.sandbox';
import { Router } from '@angular/router';


@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {


  public imagePath: string;
  public totalPrice = 0;
  public optionValueArray: any = [];
  public currentCompareId: any;
  public quantity: any = 1;
  public ratingValue = 4.5;


  constructor(
    public compareSandbox: ProductCompareSandbox,
    public listSandbox: ListsSandbox,
    public configService: ConfigService,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object,
    public controlSandbox: ProductControlSandbox,
    public router: Router
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.currentCompareId = JSON.parse(localStorage.getItem('compareId'));
    }
    this.imagePath = this.configService.getImageUrl();
    this.getCompareList();
  }

  getCompareList() {
    if (this.currentCompareId && this.currentCompareId.length > 0) {
      const compare = this.currentCompareId.toString();
      const params: any = {};
      params.data = 1;
      params.productId = compare;
      this.compareSandbox.compareProducts(params);
    } else {
      this.compareSandbox.clearCompare([]);
    }
  }

  addToCart(product) {
    this.router.navigate(['/products/productdetails/' + product.productSlug]);
  }

  removeAll() {
    this.snackBar.open('Products removed successfully', '×', {
      panelClass: 'success',
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000
    });
    this.compareSandbox.clearCompare([]);
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

  removeProduct(product) {
    let currentId;
    if (isPlatformBrowser(this.platformId)) {
      currentId = JSON.parse(localStorage.getItem('compareId'));
    }
    currentId = currentId.filter(ids => {
      if (ids === product.productId) {
        return false;
      } else {
        return true;
      }
    });
    const id = currentId;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('compareId', JSON.stringify(id));
    }
    this.snackBar.open('Products removed successfully', '×', {
      panelClass: 'success',
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000
    });
    if (currentId.length > 0) {
      this.compareSandbox.addCompareCount(currentId);

      const compare = currentId.toString();
      const compareParam: any = {};
      compareParam.data = 1;
      compareParam.productId = compare;
      this.compareSandbox.compareProducts(compareParam);
    } else {
      this.compareSandbox.clearCompare([]);
    }
  }
}
