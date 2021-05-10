/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LayoutSandbox } from '../../../../../../../core/admin/layout/layout.sandbox';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { QuotationRequestSandbox } from '../../../../../../../core/admin/sales/quotation-request/quotation-request.sandbox';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-sales-quotation-list',
  templateUrl: 'list.component.html',
  styleUrls: ['./list.component.scss'],
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
export class QuotationListComponent implements OnInit, OnDestroy {


  public pageSizeOptions = [5, 10, 20];
  public page: any;
  public currentPage: number;
  public index: number;
  public buttonCheck = true;
  public pagination = true;
  public cancelOrderStatus: any;
  public subscriptions: Array<Subscription> = [];
  public quotationForm: FormGroup;
  public submitted = false;
  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  public isCollapsed = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public isChecked: any = [];
  public bulkFunction = false;
  public offset: number;
  public pageSize = '5';
  public keyword = '';
  public checkCondition: any = [];
  public checkmodules: any = [];
  public unCheckData: any = [];
  public fromDate = '';
  public toDate = '';



  constructor(
    public sandbox: QuotationRequestSandbox,
    private toastr: ToastrManager,
    public layoutSandbox: LayoutSandbox,
    public fb: FormBuilder,


  ) {}

  ngOnInit() {
    this.offset = 0;
    this.pageSize = localStorage.getItem('itemsPerPage') ? localStorage.getItem('itemsPerPage') : this.pageSize;
    this.getQuotationList();
    this.initForm();
  }

  initForm() {
    this.quotationForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  getQuotationList() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.productName = this.keyword;
    params.count = '';
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.quotationList(params);
    this.getQuotationListCount();
  }

  getQuotationListCount() {
    const params: any = {};
    params.limit = this.pageSize;
    params.offset = this.offset;
    params.productName = this.keyword;
    params.count = 1;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.quotationListCount(params);
  }

  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.name;
    this.fromDate = event.fromDate;
    this.toDate = event.toDate;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.getQuotationList();
  }

  onSubmit() {
    this.keyword = this.quotationForm.value.name;
    this.fromDate = this.quotationForm.value.startDate;
    this.toDate = this.quotationForm.value.endDate;
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.productName = this.keyword;
    param.count = '';
    param.startDate = this.quotationForm.value.startDate;
    param.endDate = this.quotationForm.value.endDate;
    this.sandbox.quotationList(param);
    this.getQuotationListCount();
  }

  reset() {
    this.keyword = '';
    this.quotationForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.productName = '';
    param.count = '';
    param.startDate = '';
    param.endDate = '';
    this.fromDate = '';
    this.toDate = '';
    this.getQuotationList();
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

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
