/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router,  ActivatedRoute } from '@angular/router';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { CustomersGroupService } from '../../../../../../../core/admin/Customers/customers-group/customers-group.service';
import { LayoutSandbox } from '../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-groups-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class GroupsListComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  public closeResult: string;
  public pageSize = '10';
  public pageSizeOptions = [10, 20];
  public offset = 0;
  public keyword = '';
  public currentPage: number;
  public index: number;
  public buttonCheck = true;
  public popoverContent: any;
  public checkedArray: any = [];
  public limit = 10;
  public date: any;
  public checkCondition: any = [];
  public checkedData: any = [];
  public unCheckData: any = [];
  public count: number;
  public name = '';
  public statusdetails: any = {};
  public orderStatusDetails: any = {};
  private editOrderStatusId: string;

  constructor(
    private modalService: NgbModal,
    public sandbox: CustomersGroupSandbox,
    private service: CustomersGroupService,
    public layoutSandbox: LayoutSandbox,
    private router: Router,
    private route: ActivatedRoute,

  ) {
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.customersGroupList();
    this.customersGroupPagination();
    this.regSubscribeEvents();
    this.layoutSandbox.getCustomerCount();
    this.editOrderStatusId = this.route.snapshot.paramMap.get('id');
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

  addCustomerGroup() {
    this.service.setOrderStatus('');
    this.router.navigate(['/customers/groups/add']);
  }

  editList(customersGroup) {
    this.orderStatusDetails = customersGroup;
    this.service.setOrderStatus(this.orderStatusDetails);
    this.router.navigate(['/customers/groups/edit/', this.orderStatusDetails.groupId]);
  }

  customersGroupList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.count = '';
    this.sandbox.customersGroupList(param);
  }

  customersGroupPagination() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = '';
    params.name = '';
    params.keyword = this.keyword;
    params.count = true;
    this.sandbox.PaginationCustomersGroup(params);
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSizeOptions = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.customersGroupList();
  }

  regSubscribeEvents() {
    this.sandbox.getDeleteCustomersGroup$.subscribe(_delete => {
      if (_delete && _delete.status === 1) {
        this.customersGroupList();
        this.customersGroupPagination();
        this.layoutSandbox.getCustomerCount();

      }
    });
  }

  check(event) {
    this.buttonCheck = event.target.checked;
  }

  // receive param from filter component .And calls customerPgination event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.offset = 0;
    this.paginator.firstPage();
    this.customersGroupList();
    this.customersGroupPagination();
  }

  // Open to Add Address Add Form And List
  open2(content, id) {
    const modalRef = this.modalService.open( { });
    modalRef.componentInstance.groupId = id;
  }

  deleteCustomerGroup(groupId, deletePop) {
    this.popoverContent = deletePop;
    this.sandbox.deleteCustomersGroup({groupId: groupId});
  }
}
