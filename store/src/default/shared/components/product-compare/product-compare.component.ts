/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnInit,
  Input,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCompareSandbox } from '../../../../core/product-compare/product-compare.sandbox';


@Component({
  selector: 'app-product-compare',
  templateUrl: './product-compare.component.html',
  styleUrls: ['./product-compare.component.scss']
})

export class ProductCompareComponent implements OnInit {

  public selectedCompare = [];
  @Input() product: any;

  constructor(
    public compareSandbox: ProductCompareSandbox,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {}

  addToCompare(event) {
    let isAdded = false;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('compareId')) {
        this.selectedCompare = JSON.parse(localStorage.getItem('compareId'));
      }
    }
    this.selectedCompare.forEach(val => {
      if (val === event.productId) {
        isAdded = true;
      }
    });
    if (isAdded) {
      this.showError('Product Already Choosed');
      return;
    }
    if (this.selectedCompare.length >= 3) {
      this.showError('Cannot compare more than 3 products');
      return;
    }
    this.selectedCompare.push(event.productId);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('compareId', JSON.stringify(this.selectedCompare));
    }
    this.compareSandbox.addCompareCount(this.selectedCompare);
    const compare = this.selectedCompare.toString();
    this.compareProducts(compare);
  }

  compareProducts(products) {
    const compareParam: any = {};
    compareParam.data = 0;
    compareParam.productId = products;
    this.compareSandbox.compareProducts(compareParam);
  }

  showError(message) {
    this.snackBar.open(message, '×', {
      panelClass: 'error',
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 3000
    });
  }
}
