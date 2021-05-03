import { Component, OnInit } from '@angular/core';
import { ProductSandbox } from '../../../../../../core/product/product.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active-product-list',
  templateUrl: './active-product-list.component.html',
  styleUrls: ['./active-product-list.component.scss'],
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
export class ActiveProductListComponent implements OnInit {

  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public productArray = [];
  public selectedAll: any;
  public filterData: any = [];
  public filterDataId = [];
  public items = [
    { name: 'aaaaaa' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' },
    { name: 'bbbbbb' }
  ];
  public imageUrl = environment.imageUrl;
  public currencySymbol: any = JSON.parse(localStorage.getItem('vendor-settings'));

  constructor(
    public productSandbox: ProductSandbox,
    public router: Router,
    public toaster: ToastrService
  ) {}

  ngOnInit() {
    this.getProductList();
    this.productSandbox.productList$.subscribe(data => {
      if (data) {
        this.productArray = data;
      }
    });
  }

  getProductList() {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.status = 1;
    this.productSandbox.getProductList(params);
  }

  searchProduct(key) {
    const params: any = {};
    params.limit = this.limit;
    params.offset = this.offset;
    params.keyword = key;
    params.status = 1;
    this.productSandbox.getProductList(params);
  }

  statusChangeEnable(id) {
    if (id === 0) {
      this.toaster.error('This product is not approved');
    }
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

  statusChange(event: any, array) {
    const params: any = {};
    params.productId = array.productId;
    const FeatureValue = event.target.checked;
    if (FeatureValue === false) {
      params.status = 0;
      this.productSandbox.productStatus(params);
    } else {
      params.status = 1;
      this.productSandbox.productStatus(params);
    }
    this.productSandbox.getProductStatusLoaded$.subscribe(data => {
      if (data === true) {
        this.getInactiveProductCount();
        this.getActiveProductCount();
        this.productSandbox.changeCount(params);
      }
    });
  }

  goToEdit(productId) {
    this.router.navigate(['/products/edit/', productId]);
  }

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

  getActiveProductCount() {
    const params: any = {};
    params.count = 1;
    params.status = '1';
    this.productSandbox.getActiveProductListCount(params);
  }

  getInactiveProductCount() {
    const params: any = {};
    params.count = 1;
    params.status = '0';
    this.productSandbox.getInActiveProductListCount(params);
  }

  selectAll(event) {
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

  filterDataList() {
    this.filterData = this.productArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

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
