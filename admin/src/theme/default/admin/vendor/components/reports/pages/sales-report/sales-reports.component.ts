import {
  Component,
  OnInit , OnDestroy} from '@angular/core';
  import { FormGroup, FormBuilder } from '@angular/forms';
  import { ReportsSandbox } from '../../../../../../../../core/admin/vendor/reports/reports.sandbox';
  import { Subscription } from 'rxjs';
  import { DateAdapter } from '@angular/material/core';
  import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sales-reports',
  templateUrl: 'sales-reports.component.html',
  styleUrls: ['sales-reports.component.scss'],
  providers: [DatePipe]
})
export class SalesReportsComponent implements OnInit, OnDestroy {

  public totalReportFilterForm: FormGroup;
  public currency: any;
  private subscriptions: Array<Subscription> = [];
  public quantityTotal: any;
  public taxTotal: any;
  public baseTotal: any;
  public subTotal: any;
  public todayDate: any;
  public currentDate: any;
  public selectedMonth: any;
  public selectedFromDate: any;
  public selectedToDate: any;
  public selectedFromAmt: any = 0;
  public selectedToAmt: any = 0;


  constructor(public sandbox: ReportsSandbox, public fb: FormBuilder,
              private dateAdapter: DateAdapter<Date>, public datePipe: DatePipe) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.currency = JSON.parse(localStorage.getItem('adminCurrency'));
    this.initForm();
    this.totalReportFilterForm.controls['dateRange'].valueChanges.subscribe(
      (selectedValue) => {
        if (selectedValue == 1) {
          const date1 = new Date();
          this.todayDate = new Date(date1.getFullYear(), date1.getMonth() - 0, 1);
          this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
        } else if (selectedValue == 2) {
          const date2 = new Date();
          this.todayDate = new Date(date2.getFullYear(), date2.getMonth() - 3, 1);
          this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
        } else {
          const date3 = new Date();
          this.todayDate = new Date(date3.getFullYear(), date3.getMonth() - 6, 1);
          this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);

        }
      }
  );
  const date = new Date();
  this.todayDate = new Date(date.getFullYear(), date.getMonth() - 0, 1);
  this.totalReportFilterForm.controls['fromDate'].setValue(this.todayDate);
  this.totalReportFilterForm.controls['toDate'].setValue(this.currentDate);
  }

  initForm() {
    this.totalReportFilterForm = this.fb.group({
      fromDate: [''],
      toDate: [''],
      dateRange: ['1'],
      rangeFrom: [''],
      rangeTo: ['']
    });
  }

  generateReport() {
    this.selectedFromAmt = this.totalReportFilterForm.value.rangeFrom;
    this.selectedToAmt = this.totalReportFilterForm.value.rangeTo;
    const dateRange = this.totalReportFilterForm.value.dateRange;
    if (dateRange == 1) {
      this.selectedMonth = 'This Month';
    } else if (dateRange == 2) {
      this.selectedMonth = '3 Months';
    } else {
      this.selectedMonth = '6 Months';
    }
    this.selectedFromDate = this.datePipe.transform(this.totalReportFilterForm.value.fromDate, 'yyyy-MM-dd');
    this.selectedToDate = this.datePipe.transform(this.totalReportFilterForm.value.toDate, 'yyyy-MM-dd');

    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.startDate = this.datePipe.transform(this.totalReportFilterForm.value.fromDate, 'yyyy-MM-dd');
    params.endDate = this.datePipe.transform(this.totalReportFilterForm.value.toDate, 'yyyy-MM-dd');
    params.amountFrom = this.totalReportFilterForm.value.rangeFrom;
    params.amountTo = this.totalReportFilterForm.value.rangeTo;
    this.sandbox.totalSalesReports(params);
    this.subscribe();
  }

  subscribe() {
    this.subscriptions.push(this.sandbox.totalSalesReport$.subscribe(data => {
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

  exportSalesReport() {
    const params: any = {};
    params.startDate = this.datePipe.transform(this.totalReportFilterForm.value.fromDate, 'yyyy-MM-dd');
    params.endDate = this.datePipe.transform(this.totalReportFilterForm.value.toDate, 'yyyy-MM-dd');
    params.amountFrom = this.totalReportFilterForm.value.rangeFrom;
    params.amountTo = this.totalReportFilterForm.value.rangeTo;
    this.sandbox.exportTotalSalesReport(params);
  }

  ngOnDestroy() {
    this.sandbox.clear();
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
