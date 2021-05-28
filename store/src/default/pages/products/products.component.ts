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
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  OnChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../shared/components/products-carousel/product-dialog/product-dialog.component';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  // decorator
  @ViewChild('sidenav') sidenav: any;
  // side nav
  public sidenavOpen = true;
  // card view
  public viewType = 'grid';
  public viewCol = 25;
  public sortings: Array<any>;
  public sortData: any = 'Price Low To High';
  condition: any;
  // parameters for product list
  public startKey: any = 0;
  public viewOrder = 'ASC';
  public keyword = '';
  public categoryId = '';
  public categorySlug = '';
  public brand: any = '';
  public priceFrom = '';
  public priceTo: any = '';
  // pagination
  public pagesize: any = 20;
  public index: any = 0;
  // load image path
  public imagePath: string;
  // product list
  public isClicked: any = [];
  public queryParams: any;
  // discount price
  public discountPrice = 20;
  public fiftyPercent = 50;
  public subscription: Array<Subscription> = [];
  public attributeData: any = [];
  public currentAttributeId = 0;
  public currentAttribute: any = [];
  public variantValue = '';
  public selectedAttribute: any = {};
  public checkedAttribute: any = {};
  public selectedAttributeValues: any = [];

  public filterParams: any = {};
  public attributeValue: any;
  public splittedAttribute: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
    public listSandbox: ListsSandbox,
    private configService: ConfigService,
    private changeDetectRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // subscribe route params
    this.subscription.push(
      this.activatedRoute.queryParams.subscribe(query => {
        if (query['keyword']) {
          this.keyword = query['keyword'];
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('keywordData', query['keyword']);
            this.keyword = localStorage.getItem('keywordData');
          }
          this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
        }
        if (query['brand']) {
          this.brand = query['brand'];
          this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
        }
      })
    );
    this.subscription.push(
      this.activatedRoute.params.subscribe(param => {
        this.queryParams = param;
          this.variantValue = '';
          this.attributeData = [];
          this.currentAttributeId = 0;
          this.currentAttribute = [];
          this.variantValue = '';
          this.selectedAttribute = {};
          this.checkedAttribute = {};
          this.selectedAttributeValues = [];
          this.attributeValue = '';
          this.categoryId = '';
        if (this.queryParams.id) {
          if (this.queryParams.id === 'All') {
            this.attributeData = [];
            this.currentAttributeId = 0;
            this.currentAttribute = [];
            this.variantValue = '';
            this.selectedAttribute = {};
            this.checkedAttribute = {};
            this.selectedAttributeValues = [];
          }
          this.startKey = 0;
          this.index = 0;
          if (this.queryParams.id === 'All' && this.brand === '') {
            this.isClicked = [];
            this.brand = '';
            this.keyword = '';
            this.categoryId = '';
            this.categorySlug = '';
            this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
          } else if (this.queryParams.id === 'All' && this.brand !== '') {
            this.isClicked = [];
            this.brand = this.brand;
            this.keyword = '';
            this.categoryId = '';
            this.categorySlug = '';
            this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
          } else {
            this.isClicked = [];
            this.isClicked[this.queryParams.id] = true;
            this.categoryId = this.queryParams.id;
            this.categorySlug = this.queryParams.id;
            this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
          }
        }
      })
    );

    this.subscription.push(this.activatedRoute.queryParams.subscribe(val => {
      this.priceFrom = val.priceFrom ? val.priceFrom : 0;
      this.priceTo = val.priceTo ? val.priceTo : '30000';
      this.brand = val.brand;
      this.variantValue = val.variantValue ? val.variantValue : '';
      this.attributeValue = val.attribute ? val.attribute : '';
      this.startKey = val.offset ? val.offset : 0;
      this.index = val.index ? val.index : 0;
      this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
    }));

  }

  // initially remove local storage and calls listSandbox getSettings
  ngOnInit() {
    if (!this.queryParams.id && this.keyword === '') {
      this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
    }
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('fromPrice');
      localStorage.removeItem('priceTo');
    }

    // this.listSandbox.getSettings();
    this.sortings = [
      { order: 'Price Low To High', value: 'ASC' },
      { order: 'Price High To Low', value: 'DESC' }
    ];
    // this.imagePath = this.configService.get('resize').imageUrl;
    this.imagePath = this.configService.getImageUrl();
    this.changeDetectRef.detectChanges();
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    }
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    }
  }

  /**
   * fetch product list from service. calling getProductList function from sandbox
   *
   * @param limit number of records to be load
   * @param offset startkey of the records to be load
   * @param manufacturerId brand id to be filtered
   * @param categoryId category id to be filtered
   * @param price price to be filtered
   * @param priceFrom filter (from price)
   * @param keyword filter (to price)
   */
  getProductList(offset, price, category) {
    const params: any = {};
    params.limit = this.pagesize;
    params.offset = offset;
    if (this.brand == null) {
      this.brand = '';
    }
    params.manufacturerId = this.brand;
    params.categoryslug = category;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('categoryIdDataKey', this.categoryId);
    }
    params.keyword = this.keyword;
    params.price = price;
    if (this.priceFrom) {
      params.priceFrom = this.priceFrom;
    } else {
      params.priceFrom = 0;
    }
    if (this.condition) {
      params.condition = this.condition;
    }
    if (this.variantValue) {
      params.variant = this.variantValue;
    }
    const attributeValues: any = [];
    const selectedAttributeValues: any = [];
    if (this.selectedAttribute) {
      const selectedAttributeKey = Object.keys(this.selectedAttribute);
      if (selectedAttributeKey && selectedAttributeKey.length > 0) {
        selectedAttributeKey.forEach(variant => {
          if (this.selectedAttribute[variant]) {
            const selectedAttributeSectionKeys = Object.keys(this.selectedAttribute[variant]);
            if (selectedAttributeSectionKeys && selectedAttributeSectionKeys.length > 0) {
              selectedAttributeSectionKeys.forEach(sectionName => {
                if (this.selectedAttribute[variant][sectionName] && this.selectedAttribute[variant][sectionName].length > 0) {
                  this.selectedAttribute[variant][sectionName].forEach(element => {
                    attributeValues.push(sectionName + '~' + element.itemName);
                    selectedAttributeValues.push({
                      sectionName: sectionName,
                      itemName: element.itemName,
                      item: element,
                      id: variant
                    });
                  });
                }
              });
            }
          }
        });
      }
    }
    this.selectedAttributeValues = selectedAttributeValues;
    if (attributeValues && attributeValues.length) {
      params.attribute = attributeValues.join(',');
      this.filterParams.attribute = attributeValues.join(',');
    } else {
      this.filterParams.attribute = '';
    }
    params.priceTo = this.priceTo;

    this.filterParams.priceFrom = this.priceFrom;
    this.filterParams.priceTo = this.priceTo;
    this.filterParams.brand = this.brand;
    this.filterParams.condition = this.condition;
    this.filterParams.categorySlug = this.categorySlug;
    this.filterParams.variantValue = this.variantValue;
    this.filterParams.defaultCallValue = this.viewOrder;
    this.filterParams.offset = this.startKey;
    this.filterParams.index = this.index;


    this.router.navigate(
      ['/products', this.categorySlug],
      {
        relativeTo: this.activatedRoute,
        queryParams: this.filterParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.listSandbox.getProductList(params);
    params.price = '';
    params.count = true;
    this.listSandbox.getProductCount(params);
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

  // sidebar open close based on the window size
  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth < 960
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
    window.innerWidth < 1280 ? (this.viewCol = 33.3) : (this.viewCol = 25);
  }

  // changing the view type
  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }


  // calls getProductList for sorting list
  public changeSorting(sort) {
    this.sortData = sort.order;
    this.viewOrder = sort.value;
    this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
  }

  // calls getProductList for pagination
  onPageChange(event) {
    this.startKey = event.pageSize * event.pageIndex;
    this.pagesize = event.pageSize;
    this.index = event.pageIndex;
    if (isPlatformBrowser(this.platformId)) {
      this.priceFrom = localStorage.getItem('fromPrice');
      this.priceTo = localStorage.getItem('priceTo');
    }

    if (this.priceTo == null) {
      this.priceTo = '';
    }

    this.getProductList(this.startKey, this.viewOrder, this.categorySlug);
  }

  attributeList(event) {
    if (event && event.length > 0) {
      this.attributeData = event;
      this.splitAttribute();

    } else {
      this.attributeData = [];
      this.currentAttributeId = 0;
      this.currentAttribute = [];
      this.variantValue = '';
      this.selectedAttribute = {};
      this.checkedAttribute = {};
      this.selectedAttributeValues = [];
      this.attributeValue = '';
    }
  }

  splitAttribute() {
    if (this.attributeValue) {
      const commaSplited = this.attributeValue.split(',');
      const tildSplited = commaSplited.map(data => {
           return data.split('~');
      });
      this.splittedAttribute = tildSplited.map(data => {
        return {group: data[0], children: data[1]};
      });
      if (this.attributeData && this.attributeData.length > 0) {
        this.attributeData.map(varr => {
          this.splittedAttribute.forEach((splitVal) => {
           if (splitVal.group === varr.sectionName) {
             if (varr.sectionItem && varr.sectionItem.length > 0) {
              varr.sectionItem = varr.sectionItem.map(sec => {
                  if (sec.itemName === splitVal.children) {
                    const opts = { ...sec, selected: true};
                    sec = Object.assign({}, opts);
                    this.selectAttribute(varr.id, varr.sectionName, sec, true);
                    this.openAttribute(varr, varr.id);
                   }
                   return Object.assign({}, sec);
                });
               }
              }
           });
         });
       }
    }
  }

  openAttribute(itemDetail: any, attributeId: number) {
    this.currentAttribute = itemDetail;
    this.currentAttributeId = attributeId;
  }

  public checkAttribute(sectionId: number, sectionName: string, itemDetail: any) {
    if (!this.selectedAttribute[sectionId]) {
      return false;
    }
    if (!this.selectedAttribute[sectionId][sectionName]) {
      return false;
    }
    const idx = this.selectedAttribute[sectionId][sectionName].indexOf(itemDetail);
    if (idx > -1) {
      return true;
    } else {
      return false;
    }
  }

  public selectAttribute(sectionId: number, sectionName: string, itemDetail: any, checked: boolean) {


    if (!checked) {
      if (this.attributeData && this.attributeData.length > 0) {
        this.attributeData.map(varr => {
          if (varr.sectionItem && varr.sectionItem.length > 0) {
            varr.sectionItem = varr.sectionItem.map(item => {
              if (item.id === itemDetail.id) {
                const opts = { ...item, selected: false};
                item = Object.assign({}, opts);
              }
              return Object.assign({}, item);
            });
          }
        });
      }
    } else {
      if (this.attributeData && this.attributeData.length > 0) {
        this.attributeData.map(varr => {
          if (varr.sectionItem && varr.sectionItem.length > 0) {
            varr.sectionItem = varr.sectionItem.map(item => {
              if (item.id === itemDetail.id) {
                const opts = { ...item, selected: true};
                item = Object.assign({}, opts);
              }
              return Object.assign({}, item);
            });
          }
        });
      }
    }

    if (!this.selectedAttribute[sectionId]) {
      this.selectedAttribute[sectionId] = {};
    }
    if (!this.selectedAttribute[sectionId][sectionName]) {
      this.selectedAttribute[sectionId][sectionName] = [];
    }

    // const idx = this.selectedAttribute[sectionId][sectionName].indexOf(itemDetail);
    // if (idx > -1) {
    //   this.selectedAttribute[sectionId][sectionName].splice(idx, 1);
    //   this.checkedAttribute[itemDetail.id] = false;
    //   if (this.selectedAttribute[sectionId][sectionName] && this.selectedAttribute[sectionId][sectionName].length === 0) {
    //     delete this.selectedAttribute[sectionId][sectionName];
    //   }
    //   const sectionObjectArray = Object.keys(this.selectedAttribute[sectionId]);
    //   if (!sectionObjectArray || sectionObjectArray.length === 0) {
    //     delete this.selectedAttribute[sectionId];
    //   }
    // } else {
    //   this.selectedAttribute[sectionId][sectionName].push(itemDetail);
    // }

    const isPresent = this.selectedAttribute[sectionId][sectionName].some(function(el) { return el.id === itemDetail.id; });

    if (isPresent) {

      this.selectedAttribute[sectionId][sectionName] = this.selectedAttribute[sectionId][sectionName].filter(data => {
        if (data.id === itemDetail.id) {
          return false;
        } else {
          return true;
        }
      });

      if (this.selectedAttribute[sectionId][sectionName] && this.selectedAttribute[sectionId][sectionName].length === 0) {
        delete this.selectedAttribute[sectionId][sectionName];
      }
        const sectionObjectArray = Object.keys(this.selectedAttribute[sectionId]);
      if (!sectionObjectArray || sectionObjectArray.length === 0) {
        delete this.selectedAttribute[sectionId];
      }

    } else {
          this.selectedAttribute[sectionId][sectionName].push(itemDetail);
    }

    const defaultCallValue = this.viewOrder;
    this.startKey = 0;
    this.index = 0;
    this.getProductList(0, defaultCallValue, this.categorySlug);
  }

  /**
   *  receive data which is emitted from the child component through event emitter,
   * set's local storage value(brandKey). And calls getProductList.
   *
   *  @param event from event  emitter.
   *
   *  **/
  receiveProgress(event) {
    this.priceFrom = '';
    this.brand = event.manufacturerId;
    // this.categoryId = event.categoryId;
    this.priceFrom = event.priceFrom;
    this.priceTo = event.priceTo;
    this.condition = event.condition;
    const defaultCallValue = this.viewOrder;
    this.categorySlug = event.categoryslug;
    if (this.categorySlug === 'All') {
      this.categorySlug = '';
    }
    this.variantValue = event.variant;
    this.startKey = 0;
    this.index = 0;
    this.getProductList(0, defaultCallValue, this.categorySlug);

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
    // return price;
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj.Images).length === 0));
  }

  ngOnDestroy() {
    this.subscription.forEach(each => {
      each.unsubscribe();
    });
  }
}
