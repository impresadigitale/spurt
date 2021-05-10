import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { InventoryProductSandbox } from '../../../../../../../core/admin/sales/inventory-products/inventory-products.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sales-payment-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0'
      })),
      state('final', style({
        overflow: 'hidden',
        opacity: '1'
      })),
      transition('initial=>final', animate('750ms')),
      transition('final=>initial', animate('750ms'))
    ]),
  ]
})
export class InventoryProductsComponent implements OnInit, OnDestroy {


  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  // pagination
  public pageSize;
  public offset = 0;
  public index = 0;
  public keyword: string;
  public fromDate: string;
  public toDate: string;
  // filter
  public sku: any;
  public price: any;
  public status: any;
  // pagination
  public previousSort = {};
  public selectedSortField = '';
  public currentPage = 1;
  public filterForm: FormGroup;
  public submitted = false;
  public keywordInput: FormControl;
  public currency: any;
  public isCollapsed = [];
  public isChecked: any = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public bulkFunction = false;
  public outOfStock: any = [];
  public notifyMinQty: any = [];
  public minQtyCart: any = [];
  public maxQtyCart: any = [];
  public backorders: any = [];
  public stockStatus: any = [];
  private subscriptions: Array<Subscription> = [];

  constructor(
    public sandbox: InventoryProductSandbox,
    public fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.currency = JSON.parse(localStorage.getItem('adminCurrency'));
    // ----
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.keyword = '';
    this.sku = '';
    this.price = '';
    this.status = '';
    this.inventoryProductList();
    this.inventoryProductListCount();
    this.initFilterForm();
  }

  inventoryProductList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    params.count = '';
    this.sandbox.inventoryProductList(params);
    this.subscriptions.push(this.sandbox.inventoryProductList$.subscribe(data => {
      if (data && data.length > 0) {
        data.forEach(list => {
          this.stockStatus[list.productId] = list.hasStock;
        });
      }
    }));
    }

  inventoryProductListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.keyword;
    params.sku = this.sku;
    params.status = this.status;
    params.price = this.price;
    params.count = 1;
    this.sandbox.inventoryProductListCount(params);
  }

  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttoncheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttoncheck = event.target.checked;
      this.filterEnable = false;
    }
  }

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
  pageChange(event) {
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = event.pageSize * event.pageIndex;
    this.inventoryProductList();
  }

  // reactive form
  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: ['', Validators.required],
      sku: ['', Validators.required],
      status: ['', Validators.required],
      price: ['', Validators.required]
    });
  }


  applyFilter() {
    this.keyword = this.filterForm.value.keyword;
    this.sku = this.filterForm.value.sku;
    this.status = this.filterForm.value.status;
    this.price = this.filterForm.value.price;
    this.inventoryProductList();
    this.inventoryProductListCount();
  }

  resetFilter() {
    this.filterForm.reset();
    this.offset = 0;
    this.keyword = '';
    this.sku = '';
    this.price = '';
    this.status = '';
    this.inventoryProductList();
    this.inventoryProductListCount();
  }

  selectChkBox(event, inventory) {
    if (event.target.checked === true) {
      this.checkedData.push(inventory);
      this.bulkFunction = true;

    } else if (event.target.checked === false ) {
     this.checkedData = this.checkedData.filter(data => {
        if (data !== inventory) {
           return true;
        }
      });
      if (this.checkedData.length === 0) {
        this.bulkFunction = false;
      }

    }
  }

  selectAll(event: any, vendor) {
    this.checkedData = [];
    vendor.forEach(values => {
      if (event.target.checked === false) {
        this.isChecked[values.productId] = false;
        this.sampleArray = [];
        this.checkedData = [];
        this.bulkFunction = false;

      } else {
        this.isChecked[values.productId] = true;
        this.sampleArray.push(values.productId);
        this.bulkFunction = true;
        this.checkedData.push(values.productId);

      }
    });
  }

  updateStock(list) {
    const params: any = {};
    params.productId = list.productId;
    if (this.stockStatus[list.productId] === 0 || this.stockStatus[list.productId] === false) {
      params.hasStock = 0;
    }
    if (this.stockStatus[list.productId] === 1 || this.stockStatus[list.productId] === true) {
      params.hasStock = 1;
    }
    if (list.skuValue.length > 0) {
      const array = [];
      list.skuValue.forEach(data => {
        const object: any = {};
        object.skuId = data.id;
        object.outOfStockThreshold = data.outOfStockThreshold;
        object.notifyMinQuantity = data.notifyMinQuantity;
        object.minQuantityAllowedCart = data.minQuantityAllowedCart;
        object.maxQuantityAllowedCart = data.maxQuantityAllowedCart;
        object.enableBackOrders = data.enableBackOrders;
        array.push(object);
      });
      params.productStock = array;
    }
    this.sandbox.updateStock(params);
  }

  changeManageStock(list, event) {
    if (event.target.checked) {
      if (list.skuValue.length > 0) {
        list.skuValue = list.skuValue.map(data => {
          return { ...data,
            outOfStockThreshold: data.outOfStockThreshold ? data.outOfStockThreshold : '',
            notifyMinQuantity: data.notifyMinQuantity ? data.notifyMinQuantity : '',
            minQuantityAllowedCart: data.minQuantityAllowedCart ? data.minQuantityAllowedCart : 1,
            maxQuantityAllowedCart: data.maxQuantityAllowedCart ? data.maxQuantityAllowedCart : 5,
            enableBackOrders: data.enableBackOrders ? data.enableBackOrders : 0
           };
        });
      }
    }

  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
