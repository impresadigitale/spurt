/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { environment } from '../../../../../../../environments/environment';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-catalog-product-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public pageSize;
  public keyword = '';
  public offset: any = 0;
  public index: any = 0;
  public sku: any = '';
  public status: any = '';
  public price: any = '';
  private isCount: boolean;
  public popoverContent: any;
  public isActive: any = [];
  public buttoncheck = true;
  public imageUrl: string;
  public productUrl: string;
  public productListImage = {};
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public previousSort = {};
  public selectedSortField = '';
  public currentPage = 1;
  public filterParams: any = {};
  private subscriptions: Array<Subscription> = [];
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public productListArray: any;
  public filterData: any = [];
  public filterDataId = [];


  constructor(
    public productSandbox: ProductSandbox,
    public commonSandbox: LayoutSandbox,
    private router: Router,
    private toastr: ToastrManager,
    public modalService: NgbModal,
    public layoutSandbox: LayoutsSandbox,
    public configService: ConfigService,
    public route: ActivatedRoute
  ) {
    this.subscribeProduct();
    this.pageSize = this.route.snapshot.queryParamMap.get('pageSize');
    this.offset = this.route.snapshot.queryParamMap.get('offset');
    this.keyword = this.route.snapshot.queryParamMap.get('keyword');
    this.sku = this.route.snapshot.queryParamMap.get('sku');
    this.status = this.route.snapshot.queryParamMap.get('status');
    this.price = this.route.snapshot.queryParamMap.get('price');
    this.index = this.route.snapshot.queryParamMap.get('index');
  }

  /** initially calling RatingReviewSandbox
   * getProductlist with pagination data with pagination count
   * and assigning  configService url
   * */
  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.ProductLists();
    this.paginations();
    this.layoutSandbox.getCatalogCount();
    this.imageUrl = environment.imageUrl;
    this.productUrl = environment.productUrl;
  }

  /**
   * Handles  'getProductlist' event. Calls productSandbox getProductList,
   *  if (isCount) Calls productSandbox getProductCount.
   *
   * @param params with pagination value
   */
  ProductLists() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    this.filterParams.pageSize = this.pageSize || '';
    this.filterParams.keyword = this.keyword || '';
    this.filterParams.sku = this.sku || '';
    this.filterParams.offset = this.offset || 0;
    this.filterParams.price = this.price || '';
    this.filterParams.index = this.index || 0;
    this.filterParams.status = this.status || '';
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: this.filterParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });

    this.productSandbox.getProductList(params);
    this.subscribe();
  }

  subscribe() {
    this.subscriptions.push(this.productSandbox.productList$.subscribe((data: any) => {
      if (data && data.length === 0) {
        this.productList = data;
        if (this.index !== 0) {
          this.index = +this.index - 1;
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: this.filterParams,
              queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
        }
      }
    }));
  }

  changeFilter(event) {
    this.buttoncheck = event.target.checked;
  }

  onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.filterDataId = [];
    this.selectedAll = false;
    this.ProductLists();
  }

  /** calls productSandbox doProductDelete,
   * if (_delete) then calls getProductlist .
   *
   *@param params with productId from deleteProduct button .
   */
  deleteProduct(id) {
    const params: any = {};
    params.productId = id;
    this.productSandbox.doProductDelete(params);
    this.subscriptions.push(this.productSandbox.deletedProduct$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.ProductLists();
          this.paginations();
          this.layoutSandbox.getCatalogCount();
        }
      }
    }));
  }


  
  /**
   * Handles  'onFilterChange' event. Calls productSandbox productIsFeature function if FeatureValu is true,
   * else calls productSandbox productIsFeature
   *
   * @param event and prodinfo form onFilterChange input.
   *
   */
   onFilterChange(event: any, prodinfo) {
    const params: any = {};
    params.productId = prodinfo.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.isFeature = '1';

      this.productSandbox.productIsFeature(params);
      this.layoutSandbox.getCatalogCount();
    } else {
      params.isFeature = '0';

      this.productSandbox.productIsFeature(params);
    }
  }


  /**
   * Handles  'onFilterChange' event. Calls productSandbox productIsFeature function if FeatureValu is true,
   * else calls productSandbox productIsFeature
   *
   * @param event and prodinfo form onFilterChange input.
   *
   */
  CarParkChange(event: any, prodinfo) {
    const params: any = {};
    params.productId = prodinfo.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.CarPark = '1';

      this.productSandbox.productCarPark(params);
      this.layoutSandbox.getCatalogCount();
    } else {
      params.CarPark = '0';

      this.productSandbox.productCarPark(params);
    }
  }

  // receive param from filter component .And calls paginations event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.sku = event.sku;
    this.status = event.status;
    this.price = event.price;
    this.offset = event.offset;
    this.ProductLists();
    this.paginations();
  }

  // calls productSandbox getProductCount with params
  paginations() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    params.count = true;
    this.productSandbox.getProductCount(params);
  }

  // perticular product details will show
  product_Details(slug) {
    window.open(this.productUrl + 'products/productdetails/' + slug);
  }

  /**
   * Handles  'todayDealsChange' event. Calls productSandbox productTodayDeals function if FeatureValue is true,
   * else calls productSandbox productTodayDeals
   *
   * @param event and prodinfo form onFilterChange input.
   *
   */
  todayDealsChange(event: any, prodinfo) {
    const params: any = {};
    params.productId = prodinfo.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.todayDeals = 1;
      this.productSandbox.productTodayDeals(params);
    } else {
      params.todayDeals = 0;
      this.productSandbox.productTodayDeals(params);
    }
  }

  // Product List ImageLoader
  productListImageLoading(id) {
    this.productListImage[id] = true;
  }

  // bulkDelete
  bulkDelete() {
    const param: any = {};
    param.productId = this.filterDataId.toString();
    this.productSandbox.bulkDelete(param);
   this.subscriptions.push(this.productSandbox.deletedProduct$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.filterDataId = [];
          this.selectedAll = false;
          this.ProductLists();
          this.paginations();
          this.layoutSandbox.getCatalogCount();
        }
      }
    }));
  }

  // export Excel
  exportExcel() {
    const param: any = {};
    param.productId = this.filterDataId;
    this.productSandbox.productExcel(param);
  }


  /**
   * Shows error notification with given title and message
   *
   * @params message
   */
  private showNotificationError(message: string): void {
    this.toastr.errorToastr(message);
  }

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
  pageChange(event) {
    this.selectedSortField = '';
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = this.pageSize * (event - 1);
    this.ProductLists();
  }

  // select checkbox
  selectAll() {
    for (let i = 0; i < this.productListArray.length; i++) {
      this.productListArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
    }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.productListArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }

        // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.productListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  subscribeProduct() {
    this.subscriptions.push(this.productSandbox.productList$.subscribe((data: any) => {
      this.productListArray = [];
      if (data && data.length > 0) {
        this.productListArray = data.map(list => {
          return {...list, selected: false};
        });
      }
    }));
  }

  viewQuestion(id) {
    this.router.navigate(['/catalog/product/question', id]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
