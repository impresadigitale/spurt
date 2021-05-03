import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
  import { FormGroup, FormBuilder } from '@angular/forms';
  import { ReportsSandbox } from '../../../../../../../../core/admin/vendor/reports/reports.sandbox';
  import { Subscription } from 'rxjs';
  import { DatePipe } from '@angular/common';
  import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-settlement-reports',
  templateUrl: 'settlement-reports.component.html',
  styleUrls: ['settlement-reports.component.scss'],
  providers: [DatePipe]
})
export class SettlementReportsComponent implements OnInit, OnDestroy {

  public settlementReportFilterForm: FormGroup;
  public currency: any;
  private subscriptions: Array<Subscription> = [];
  public quantityTotal = 0;
  public baseTotal = 0;
  public subTotal = 0;
  public taxTotal = 0;
  public mininimumDate: any;


  constructor(public sandbox: ReportsSandbox, public fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>, public datePipe: DatePipe) {
      this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.currency = JSON.parse(localStorage.getItem('adminCurrency'));
    this.initForm();
    this.getVendorList();
    this.orderStatusList();

  }

  initForm() {
    this.settlementReportFilterForm = this.fb.group({
      allVendor: [''],
      fromDate: [''],
      toDate: [''],
      vendorId: [''],
      settlementFlag: [''],
      orderStatus: ['']
    });
  }

  getVendorList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.status = 1;
    this.sandbox.getVendorList(params);
  }

  orderStatusList() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.keyword = '';
    this.sandbox.orderStatusList(params);
  }

  generateReport() {
    const allVendor = this.settlementReportFilterForm.value.allVendor;
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.startDate = this.datePipe.transform(this.settlementReportFilterForm.value.fromDate, 'yyyy-MM-dd') || '';
    params.endDate = this.datePipe.transform(this.settlementReportFilterForm.value.toDate, 'yyyy-MM-dd') || '';
    if (this.settlementReportFilterForm.value.vendorId.length > 0) {
      const vendor = this.settlementReportFilterForm.value.vendorId;
      const id = [];
      vendor.forEach(data => {
        id.push(data.vendorId);
      });
     params.vendorsId = id.toString();
    } else {
      params.vendorsId = '';
    }

    if (this.settlementReportFilterForm.value.orderStatus.length > 0) {
      const orderStatus = this.settlementReportFilterForm.value.orderStatus;
      const id = [];
      orderStatus.forEach(data => {
        id.push(data.orderStatusId);
      });
     params.orderStatus = id.toString();
    } else {
      params.orderStatus = '';
    }
    params.settlementFlag = this.settlementReportFilterForm.value.settlementFlag;
    this.sandbox.settlementReports(params);
    this.subscribe();
  }

  subscribe() {
    this.subscriptions.push(this.sandbox.settlementReport$.subscribe(data => {
      if (data && data.length > 0) {
        this.quantityTotal = 0;
        this.baseTotal = 0;
        this.subTotal = 0;
        this.taxTotal = 0;
        data.map(obj => {
          this.quantityTotal += (+obj.quantityTotal);
          this.baseTotal += (+obj.baseTotal);
          this.subTotal += (+obj.subTotal);
          this.taxTotal += (+obj.taxTotal);
          });
        }
    }));
  }

  onDateChange(event) {
    this.mininimumDate = event.value;
  }

  exportSettlementReport() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.startDate = this.datePipe.transform(this.settlementReportFilterForm.value.fromDate, 'yyyy-MM-dd') || '';
    params.endDate = this.datePipe.transform(this.settlementReportFilterForm.value.toDate, 'yyyy-MM-dd') || '';

    if (this.settlementReportFilterForm.value.vendorId.length > 0) {
      const vendor = this.settlementReportFilterForm.value.vendorId;
      const id = [];
      vendor.forEach(data => {
        id.push(data.vendorId);
      });
     params.vendorsId = id.toString();
    } else {
      params.vendorsId = '';
    }
    if (this.settlementReportFilterForm.value.orderStatus.length > 0) {
      const orderStatus = this.settlementReportFilterForm.value.orderStatus;
      const id = [];
      orderStatus.forEach(data => {
        id.push(data.orderStatusId);
      });
     params.orderStatus = id.toString();
    } else {
      params.orderStatus = '';
    }
    params.settlementFlag = this.settlementReportFilterForm.value.settlementFlag;
    this.sandbox.exportSettlementReport(params);
  }

  ngOnDestroy() {
    this.sandbox.clear();
  }
}
