import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})
export class EarningsComponent implements OnInit {

  public filterForm: FormGroup;
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public startDate: any;
  public isRequired = false;
  public endDate: any;
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public keyword = '';
  public earningsArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public selectedAll: any;
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;

  constructor(public paymentSandbox: PaymentSandbox, public formbuilder: FormBuilder) { }

  ngOnInit() {
      this.getEarningsList();
      this.paymentSandbox.categoryList$.subscribe(data => {
        if (data) {
          this.earningsArray = data;
        }
      });
      this.getTotalEarningsCount();
  }

  initFilterForm() {
      this.filterForm = this.formbuilder.group({
        fromDate: ['', Validators.required],
        toDate: ['', Validators.required]
      });
  }

  applyFilter() {
    if (
      (this.filterForm.controls['toDate'].value === '' ||
        this.filterForm.controls['toDate'].value === null) &&
      this.filterForm.controls['fromDate'].value !== '' &&
        this.filterForm.controls['fromDate'].value !== null
    ) {
      this.isRequired = true;
      return;
    }
    const form = this.filterForm.value.fromDate;
    const to = this.filterForm.value.toDate;
    this.filter = true;
    if (form && form.year) {
      this.startDate = form.year + '-' + form.month + '-' + form.day;
    }
    if (to && to.year) {
      this.endDate = to.year + '-' + to.month + '-' + to.day;
    }
    this.dropdown.close();
    this.getEarningsList();
  }

  onDateSelect(event) {
    event.stopPropogation();
    this.miniDate = event;
    this.dateError = '';
  }

  setMinValue(d) {
    this.isRequired = false;
    if (
      this.filterForm.controls['fromDate'].value === '' ||
      this.filterForm.controls['fromDate'].value === null
    ) {
      this.dateError = 'Choose From Date First';
      return;
    }
    d.toggle();
  }

  close() {
    this.dropdown.close();
  }

  resetFilter() {
    this.startDate = '';
    this.endDate = '';
    this.filter = false;
    this.filterForm.reset();
    this.getEarningsList();
  }

  getEarningsList() {
      const params: any = {};
      params.deliveryList = 1;
      params.startDate = this.startDate ? this.startDate : '';
      params.endDate = this.endDate ? this.endDate : '';
      params.keyword = this.keyword;
      params.limit = this.limit;
      params.offset = this.offset;
      this.paymentSandbox.getCategoryList(params);
  }

  exportEarnings() {
    if (this.filterDataId.length > 0) {
      const params: any = {};
      params.productId	 = this.filterDataId.toString();
      this.paymentSandbox.multipleEarningExport(params);
      this.paymentSandbox.categoryListLoaded$.subscribe(data => {
        if (data === true) {
          this.paymentSandbox.removeExportSelection('earning');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    } else {
      const params: any = {};
      const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
      params.vendorId =  vendor.vendorId;
      this.paymentSandbox.exportEarning(params);
    }
  }

  search(val) {
      this.keyword = val;
      this.getEarningsList();
  }

  selectAll() {
    for (let i = 0; i < this.earningsArray.length; i++) {
      this.earningsArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.earningsArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  filterDataList() {
    this.filterData = this.earningsArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  getTotalEarningsCount() {
    const params: any = {};
    params.count = 1;
    this.paymentSandbox.getEarningListCount(params);
  }

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getEarningsList();
  }
}
