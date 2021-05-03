/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input } from '@angular/core';
import { ProductCompareSandbox } from '../../../../core/product-compare/product-compare.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare-count',
  templateUrl: './compare-count.component.html',
  styleUrls: ['./compare-count.component.scss']
})
export class CompareCountComponent implements OnInit {

  public selectedCompare = [];
  @Input() product: any;

  constructor(
    public compareSandbox: ProductCompareSandbox,
    public router: Router
  ) {}

  ngOnInit() {}

  compareProducts() {
    this.router.navigate(['/compare']);
  }
}
