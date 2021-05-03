import { Component, OnInit } from '@angular/core';
import { ProductSandbox } from '../../../../../../core/product/product.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in', style({ transform: 'translateX(-100%)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ProductListComponent implements OnInit {

  public limit = 10;
  public offset = 0;
  public search = true;
  public currentPage = 1;
  public productArray = [];
  public isChecked: any = [];
  public sampleArray: any = [];
  public unCheckData: any = [];
  public checkedData: any = [];
  public filterData: any = [];
  public filterDataId = [];
  public selectedAll: any;
  public imageUrl = environment.imageUrl;
  public currencySymbol: any = JSON.parse(localStorage.getItem('vendor-settings'));


  constructor(
    public productSandbox: ProductSandbox,
    public router: Router,
    public toaster: ToastrService
  ) {
    this.productSandbox.productList$.subscribe(data => {
      if (data) {
        this.productArray = data;
      }
    });
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    this.productSandbox.getProductList(params);
  }

  searchProduct(key) {
    this.search = false;
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = key;
    this.productSandbox.getProductList(params);
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
    this.productSandbox.productDeleteLoaded$.subscribe(_delete => {
      if (_delete) {
        this.getTotalProductCount();
      }
    });
  }

  statusChangeEnable(id) {
    if (id === 0) {
      this.toaster.error('This product is not approved');
    }
  }

  // change active status event
  statusChange(event: any, array) {
    const params: any = {};
    params.productId = array.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === true) {
      params.status = 1;
      this.productSandbox.productStatus(params);
    } else {
      this.productSandbox.productStatus(params);
    }
    this.productSandbox.getProductStatusLoaded$.subscribe(data => {
      if (data === true) {
        this.getActiveProductCount();
        this.getInactiveProductCount();
      }
    });
  }

  // change quotation status
  changeQuotationStatus(event: any, array) {
    const params: any = {};
    params.productId = array.productId;
    if (event.target.checked === true) {
      params.quotationAvailable = 1;
      this.productSandbox.changeQuotationStatus(params);
    } else {
      params.quotationAvailable = 0;
      this.productSandbox.changeQuotationStatus(params);
    }
  }

  // got to edit product page
  goToEdit(productId) {
    this.router.navigate(['/products/edit/', productId]);
  }

  // page change event
  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getProductList();
  }

  getTotalProductCount() {
    const params: any = {};
    params.count = 1;
    this.productSandbox.getProductListCount(params);
  }

  // get active product count event
  getActiveProductCount() {
    const params: any = {};
    params.count = 1;
    params.status = '1';
    this.productSandbox.getActiveProductListCount(params);
  }

  // get inactive product count event
  getInactiveProductCount() {
    const params: any = {};
    params.count = 1;
    params.status = '0';
    this.productSandbox.getInActiveProductListCount(params);
  }

  selectAll() {
    for (let i = 0; i < this.productArray.length; i++) {
      this.productArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.productArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.productArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  // delete multiple product event
  deleteMultipleProduct() {
    if (this.filterData.length === 0) {
      this.toaster.error('Please choose a product for delete');
      return;
    }
    const params: any = {};
    params.productId = this.filterDataId.toString();
    this.productSandbox.doProductBulkDelete(params);
    this.productSandbox.productBulkDeleteLoaded$.subscribe(data => {
      if (data === true) {
        this.getProductList();
      }
    });
  }
}
