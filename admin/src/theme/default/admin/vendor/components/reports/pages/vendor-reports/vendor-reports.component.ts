import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportsSandbox } from '../../../../../../../../core/admin/vendor/reports/reports.sandbox';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vendor-reports',
  templateUrl: 'vendor-reports.component.html',
  styleUrls: ['vendor-reports.component.scss'],
  providers: [DatePipe]

})
export class VendorReportsComponent implements OnInit, OnDestroy {

  public vendorReportFilterForm: FormGroup;
  public currency: any;
  private subscriptions: Array<Subscription> = [];
  public quantityTotal = 0;
  public baseTotal = 0;
  public subTotal = 0;
  public taxTotal = 0;
  public mininimumDate: any;


  constructor(public sandbox: ReportsSandbox,
              public fb: FormBuilder,
              private dateAdapter: DateAdapter<Date>,
              public datePipe: DatePipe) {
                this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.currency = JSON.parse(localStorage.getItem('adminCurrency'));
    this.initForm();
    this.getVendorList();
  }

  initForm() {
    this.vendorReportFilterForm = this.fb.group({
      allVendor: [''],
      fromDate: [''],
      toDate: [''],
      vendorId: ['']
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

  generateReport() {
    const allVendor = this.vendorReportFilterForm.value.allVendor;
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.startDate = this.datePipe.transform(this.vendorReportFilterForm.value.fromDate, 'yyyy-MM-dd');
    params.endDate = this.datePipe.transform(this.vendorReportFilterForm.value.toDate, 'yyyy-MM-dd');
    params.allVendor = allVendor === true ? 1 : 0;
    if (this.vendorReportFilterForm.value.vendorId.length > 0) {
      const vendor = this.vendorReportFilterForm.value.vendorId;
      const id = [];
      vendor.forEach(data => {
        id.push(data.vendorId);
      });
     params.vendorsId = id.toString();
    } else {
      params.vendorsId = '';
    }
    this.sandbox.vendorSalesReports(params);
    this.subscribe();
  }

  subscribe() {
    this.subscriptions.push(this.sandbox.vendorSalesReport$.subscribe(data => {
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

  exportVendorSalesReport() {
    const allVendor = this.vendorReportFilterForm.value.allVendor;
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.startDate = this.datePipe.transform(this.vendorReportFilterForm.value.fromDate, 'yyyy-MM-dd');
    params.endDate = this.datePipe.transform(this.vendorReportFilterForm.value.toDate, 'yyyy-MM-dd');
    params.allVendor = allVendor === true ? 1 : 0;
    if (this.vendorReportFilterForm.value.vendorId.length > 0) {
      const vendor = this.vendorReportFilterForm.value.vendorId;
      const id = [];
      vendor.forEach(data => {
        id.push(data.vendorId);
      });
     params.vendorsId = id.toString();
    } else {
      params.vendorsId = '';
    }
    this.sandbox.exportVendorSalesReport(params);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
    this.sandbox.clear();
  }
}
