/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersApiClientService } from '../../../../../../../core/admin/Customers/customers/customer.ApiClient.service';
import { CustomerAddressComponent } from '../address/address.component';
import { LayoutSandbox } from '../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-customer-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;


  public closeResult: string;
  public pageSize = '10';
  public pageSizeOptions = [10, 20];
  public offset = 0;
  public keyword = '';
  public currentPage: number;
  public index: number;
  public buttoncheck = true;
  public popoverContent: any;
  public checkedArray: any = [];
  public limit = 10;
  public name = '';
  public customerGroupName: any;
  public email: any;
  public customergroup: any;
  public customerGroup: any;
  public date: any;
  public checkCondition: any = [];
  public checkmodules: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  private subscriptions: Array<Subscription> = [];
  // bulk delete or bulk export variables
  public bulkFunction = false;
  public productList: any;
  public selectedAll = false;
  public customerListArray: any;
  public filterData: any = [];
  public filterDataId = [];

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public sandbox: CustomerSandbox,
    public Sandbox: CustomersGroupSandbox,
    public layoutSandbox: LayoutSandbox,
    private service: CustomersApiClientService
  ) {
    this.subscribeCustomer();

  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.customerList();
    this.customerListCount();
    this.regSubscribeEvents();
    this.layoutSandbox.getCustomerCount();

  }

  // Open to Add Address Add Form And List
  open2(content, id) {
    const modalRef = this.modalService.open(CustomerAddressComponent, {
      windowClass: 'view-address'
    });
    modalRef.componentInstance.customerId = id;
  }

  // style purpose
  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  check(event) {
    this.buttoncheck = event.target.checked;
  }

  viewcustomer(customelist) {
    this.router.navigate(['customers/customer/view', customelist]);
  }


  editcustomer(custlistdata) {
    this.router.navigate(['/customers/customer/edit', custlistdata.id]);
  }

  addAddress() {
    this.service.setcusteditdata('');
    this.router.navigate(['/customers/customer/add']);
  }

  customerList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.name;
    param.email = this.email;
    param.customerGroup = this.customerGroup;
    param.customerGroupName = '';
    param.date = this.date;
    param.count = '';
    param.status = '';
    this.sandbox.customerList(param);
  }

  customerListCount(offset = 0) {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.name;
    param.email = this.email;
    param.customerGroup = this.customerGroup;
    param.customerGroupName = '';
    param.date = this.date;
    param.count = '';
    param.status = '';
    param.count = true;
    this.sandbox.paginationCustomer(param);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSizeOptions = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.filterDataId = [];
    this.selectedAll = false;
    this.customerList();
  }

  deleteCustomer(id, deletePop) {
    event.stopPropagation();
    this.popoverContent = deletePop;
    this.sandbox.deleteCustomers({ customerId: id });
  }

  regSubscribeEvents() {
    this.subscriptions.push(this.sandbox.deleteCustomer$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.customerList();
        this.customerListCount();
        this.layoutSandbox.getCustomerCount();

      }
    }));
  }

  receiveProgress(event) {
    this.index = 0;
    this.name = event.name;
    this.email = event.email;
    this.customerGroup = event.customergroup;
    this.date = event.date;
    this.offset = 0;
    this.paginator.firstPage();
    this.customerList();
    this.customerListCount();
  }

  bulkDelete() {
    const param: any = {};
    param.customerId = this.filterDataId;
    this.sandbox.bulkDelete(param);
    this.subscriptions.push(this.sandbox.deleteCustomer$.subscribe(_delete => {
      if (_delete) {
        if (_delete.status === 1) {
          this.filterDataId = [];
          this.selectedAll = false;
          this.customerList();
          this.customerListCount();
          this.layoutSandbox.getCustomerCount();

        }
      }
    }));
  }

  selectAll() {
    for (let i = 0; i < this.customerListArray.length; i++) {
      this.customerListArray[i].selected = this.selectedAll;
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
    this.selectedAll = this.customerListArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }

  filterDataList() {
    this.filterData = this.customerListArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.id);
  }

  exportAllExcel(event: any) {
    const param: any = {};
    this.sandbox.customerAllExcel(param);
  }

  exportExcel() {
    const param: any = {};
    param.customerId = this.filterDataId;
    this.sandbox.customerExcel(param);
  }

  subscribeCustomer() {
    this.subscriptions.push(this.sandbox.customerList$.subscribe(data => {
      this.customerListArray = [];
      if (data && data.length > 0) {
        this.customerListArray = data.map(list => {
          return {...list , selected: false};
        });
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
