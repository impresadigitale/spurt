/*
 * spurtcommerce
 * version 4.4
 * http://api.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  Inject,
  SimpleChanges,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../../core/service/config.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-spurt-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit, OnChanges, OnDestroy {
  // price filter
  public priceFrom = '';
  public priceTo: any = '';
  // filter used new
  public conditions = [
    { option: 'All', value: '' },
    { option: 'New', value: 1 },
    { option: 'Used', value: 2 }
  ];
  // product list
  private keyword: any = '';
  public condition = 0;
  public rupees: any;
  private oneTimeAssignValue = 1;
  @Input() isClickedData: any;
  @Input() brandId: any;
  @Input() category: any;
  @Output() progressEmit = new EventEmitter<string>();
  @Output() attributeData: EventEmitter<any> = new EventEmitter();
  // radio form variable
  public radioForm: FormGroup;
  public radio: FormControl;
  // image
  public imagePath: string;
  private subscriptions: Array<Subscription> = [];
  public categorySlug: any;
  public variant: any = [];
  public attribute: any = [];
  public selectedVariant: any = {};
  public brandIdarray: any = [];


  public variantValue: any = '';
  public splittedVaraint: any = [];
  public originalBrandArray: any = [];
  public routeBrands: any;

  public attributeValue: any;
  public splittedAttribute: any = [];
  public filterPriceFrom: any;
  public filterPriceTo: any;


  constructor(
    private router: Router,
    public listSandbox: ListsSandbox,
    private configService: ConfigService,
    private fb: FormBuilder,
    public route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.listSandbox.clearFilter();

    this.route.params.subscribe(data => {
      if (data.id) {
        this.categorySlug = data.id;
      }
    });
    this.route.queryParams.subscribe(val => {
      this.variantValue = val.variantValue ? val.variantValue : '';
      this.routeBrands = val.brand;
      this.filterPriceFrom = val.priceFrom ? val.priceFrom : 0;
      this.filterPriceTo = val.priceTo ? val.priceTo : '30000';

  });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.category && this.category !== '' && this.category !== 'All') {
      this.getCategory(this.category);
      this.getFilter(this.category);
    } else {
      this.listSandbox.clearFilter();
      this.attribute = [];
      this.variant = [];
      this.selectedVariant = {};
      this.getCategories();
    }
  }
  // Initially calls getCategories,getBrands function.
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.rupees = JSON.parse(localStorage.getItem('currency')).symbol ? JSON.parse(localStorage.getItem('currency')).symbol : '';
    }
    this.imagePath = this.configService.getImageUrl();
    this.getBrands();

    /**               INITIALLY SET VALUE  (FROM PRICE) AND  (TO PRICE)
     * subscribe listSandbox maxProductPrice$  to get  maximum product price and as well as set default minimum price.
     * priceTo gets value from listSandbox.maxProductPrice$ and  convert string to number format
     * priceFrom gets value from listSandbox.maxProductPrice$ and  convert string to number format
     * **/
    this.subscriptions.push(
      this.listSandbox.maxProductPrice$.subscribe(maximumPrice => {
        if (this.filterPriceTo) {
          maximumPrice = this.filterPriceTo;
        } else {
          maximumPrice = '300000';
        }
        if (maximumPrice && this.oneTimeAssignValue === 1) {
          const tempPriceTo = JSON.parse(maximumPrice);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('priceTo', tempPriceTo);
            this.priceTo = localStorage.getItem('priceTo');
          }
          let initialToPrice = '0';
          if (this.filterPriceTo) {
            initialToPrice = this.filterPriceFrom;
          } else {
            initialToPrice = '0';
          }
          this.priceFrom = JSON.parse(initialToPrice);
          this.oneTimeAssignValue++;
        }
      })
    );
    // subscribe subject getting value from filter
    this.subscriptions.push(
      this.listSandbox.filterList$.subscribe(result => {
        this.variant = [];
        if (result && result.length > 0) {
          result.forEach(element => {
            if (element.sectionType === 1) {
              this.variant.push(element);
            } else {
              this.attribute.push(element);
            }
          });
          this.attributeData.emit(this.attribute);
          this.splitVariant();
        } else {
          this.attribute = [];
          this.selectedVariant = {};
          this.attributeValue = '';
          this.attributeData.emit(this.attribute);
        }
      })
    );
  }

  splitVariant() {

    if (this.variantValue !== '') {
      this.selectedVariant = {};

      const commaSplited = this.variantValue.split(',');
      const tildSplited = commaSplited.map(data => {
           return data.split('~');
      });
      this.splittedVaraint = tildSplited.map(data => {
        return {group: data[0], children: data[1]};
      });
      if (this.variant && this.variant.length > 0) {
        this.variant.map(varr => {
          this.splittedVaraint.forEach((splitVal) => {
           if (splitVal.group === varr.sectionName) {
             if (varr.sectionItem && varr.sectionItem.length > 0) {
              varr.sectionItem = varr.sectionItem.map(sec => {
                  if (sec.itemName === splitVal.children) {
                    const opts = { ...sec, selected: true};
                    sec = Object.assign({}, opts);
                    this.selectAttribute(varr.id, varr.sectionName, sec);
                   }
                   return Object.assign({}, sec);
                });
               }
              }
           });
         });
       }

    } else {
      this.selectedVariant = {};
      if (this.variant && this.variant.length > 0) {
        this.variant.map(varr => {
          if (varr.sectionItem && varr.sectionItem.length > 0) {
            varr.sectionItem = varr.sectionItem.map(sec => {
              const opts = { ...sec, selected: false};
              sec = Object.assign({}, opts);
              return Object.assign({}, sec);
            });
          }
        });
      }
    }

  }


  splitBrand() {
    if (this.routeBrands) {
      const commaSplited = this.routeBrands.split(',');
      if (commaSplited && commaSplited.length > 0) {
        commaSplited.forEach(data => {
          const id = +data;
          this.brandIdarray.push(id);
        });
      }
      this.originalBrandArray.map(data => {
        commaSplited.map(item => {
          if (data.manufacturerId === item) {
             const opts = {...data, isChecked: true};
             data = Object.assign(data, opts);
          }
        });
      });
    }
  }

  // calls listSandbox getManufacturerList for getting brand list
  public getBrands() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    this.listSandbox.getManufacturerList(params);
    this.subscriptions.push(this.listSandbox.manufacturer$.subscribe(data => {
      this.originalBrandArray = [];
      this.brandIdarray = [];
      if (data && data.length > 0) {
        this.originalBrandArray = data;
        this.splitBrand();
      }
    }));
  }
  // calls listSandbox getCategoryList with default param values
  public getCategories() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    params.sortOrder = '';
    this.listSandbox.getCategoryList(params);
  }
  getCategory(id) {
    const params: any = {};
    params.categorySlug = id;
    this.listSandbox.getCategory(params);
  }

  getFilter(id) {
    const params: any = {};
    params.categorySlug = id;
    this.listSandbox.getFilter(params);
  }

  public selectAttribute(sectionId: number, sectionName: string, itemDetail: any) {

    if (Object.keys(this.selectedVariant).length > 0) {

    }

    if (!this.selectedVariant[sectionId]) {
      this.selectedVariant[sectionId] = {};
    }
    if (!this.selectedVariant[sectionId][sectionName]) {
      this.selectedVariant[sectionId][sectionName] = [];
    }

    const isPresent = this.selectedVariant[sectionId][sectionName].some(function(el) { return el.id === itemDetail.id; });

    if (isPresent) {

      this.selectedVariant[sectionId][sectionName] = this.selectedVariant[sectionId][sectionName].filter(data => {
        if (data.id === itemDetail.id) {
          return false;
        } else {
          return true;
        }
      });

      if (this.selectedVariant[sectionId][sectionName] && this.selectedVariant[sectionId][sectionName].length === 0) {
        delete this.selectedVariant[sectionId][sectionName];
      }
        const sectionObjectArray = Object.keys(this.selectedVariant[sectionId]);
      if (!sectionObjectArray || sectionObjectArray.length === 0) {
        delete this.selectedVariant[sectionId];
      }

    } else {
          this.selectedVariant[sectionId][sectionName].push(itemDetail);
    }
    this.getProducts();
  }

  // calls getProducts for filter
  public onChangeCategory(params) {
    this.variantValue = '';
    this.splittedVaraint = [];
    this.variant = [];
    this.category = params.id;
    this.categorySlug = params.slug;
    this.getProducts();
  }
  /**
   *  selecting brand in the brand list.
   *  Then calls getProducts to refresh the product list,
   *  set ,get,remove local storage for brandId.
   *  remove brandSelectionKey local storage.
   *  **/
  public selectBrand(event, brandId, brand: any) {


    if (event.checked) {
      brand.isChecked = true;
      this.brandIdarray.push(brandId);
    } else {
      brand.isChecked = false;
      this.brandIdarray = this.brandIdarray.filter(data => {
        if (data === brandId) {
          return false;
        } else {
          return true;
        }
      });
    }

    this.getProducts();
  }

  /** calls getProducts event changed,
   * @param id from condition event **/
  changeCondition(event, id) {
    this.condition = id;
    this.getProducts();
  }

  /** set local storage value,
   *  after the price value changed based on the slider.
   *  @param event from priceFrom slider
   * **/
  priceFromValue(event) {
    this.priceFrom = event.value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('fromPrice');
      localStorage.setItem('fromPrice', this.priceFrom);
      this.priceFrom = localStorage.getItem('fromPrice');
    }
  }

  /** set local storage value,
   *  after the price value changed based on the slider.
   *  @param event from priceTo slider
   * **/
  priceToValue(event) {
    this.priceTo = event.value;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('priceTo');
      const objStr = JSON.stringify(this.priceTo);
      localStorage.setItem('priceTo', this.priceTo);
      this.priceTo = localStorage.getItem('priceTo');
    }
  }

  /**calls getProducts for price filter
   * **/
  selectPrice() {
    this.getProducts();
  }

  /**
   * calls listSandbox getProductList.Then calls listSandbox getProductCount
   *And also emits the param to product list for correct pagination.
   * */
  getProducts() {
    const params: any = {};
    params.refresh = false;
    if (this.brandIdarray.length > 0) {
      const brands = this.brandIdarray.toString();
      params.manufacturerId = brands;
    } else {
      params.manufacturerId = '';
    }
    /**  during removing local storage it assigns null string
     * this condition will handle that.**/
    params.keyword = this.keyword;
    if (this.category === 'null' || this.category == null) {
      this.category = '';
      params.categoryslug = this.categorySlug;
    } else {
      params.categoryslug = this.categorySlug;
    }
    if (this.priceFrom === 'null' || this.priceFrom == null) {
      this.priceFrom = '';
      params.priceFrom = this.priceFrom;
    } else {
      params.priceFrom = this.priceFrom;
    }
    if (isPlatformBrowser(this.platformId)) {
      if (!localStorage.getItem('priceTo')) {
        this.priceTo = '';
        params.priceTo = this.priceTo;
      } else {
        params.priceTo = this.priceTo;
      }
    }
    const variantValues: any = [];
    if (this.selectedVariant) {
      const selectedVariantKey = Object.keys(this.selectedVariant);
      if (selectedVariantKey && selectedVariantKey.length > 0) {
        selectedVariantKey.forEach(variant => {
          if (this.selectedVariant[variant]) {
            const selectedVariantSectionKeys = Object.keys(this.selectedVariant[variant]);
            if (selectedVariantSectionKeys && selectedVariantSectionKeys.length > 0) {
              selectedVariantSectionKeys.forEach(sectionName => {
                if (this.selectedVariant[variant][sectionName] && this.selectedVariant[variant][sectionName].length > 0) {
                  this.selectedVariant[variant][sectionName].forEach(element => {
                    variantValues.push(sectionName + '~' + element.itemName);
                  });
                }
              });
            }
          }
        });
      }
    }
    params.condition = this.condition;
    params.variant = variantValues.join(',');
    this.progressEmit.emit(params);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
    this.listSandbox.clearFilter();
  }
}
