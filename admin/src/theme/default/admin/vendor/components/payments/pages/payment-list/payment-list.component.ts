import {
  Component,
  OnInit,
} from '@angular/core';
import { PaymentSandbox } from '../../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { LayoutSandbox } from '../../../../../../../../core/admin/layout/layout.sandbox';

@Component({
  selector: 'app-payment-list',
  templateUrl: 'payment-list.component.html',
  styleUrls: ['payment-list.component.scss'],
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

export class PaymentListComponent implements OnInit {

  public buttonCheck = true;
  public buttonActive = false;
  public filterEnable = true;
  // pagination
  public pageSize;
  public offset = 0;
  public index = 0;
  public keyword: string;
  public fromDate: string;
  public toDate: string;
  private isCount: boolean;
  // pagination
  public previousSort = {};
  public selectedSortField = '';
  public currentPage = 1;
  public paymentList: FormGroup;
  public submitted = false;
  public keywordInput: FormControl;
  public fromDateInput: FormControl;
  public toDateInput: FormControl;
  public isCollapsed = [];
  public isChecked: any = [];
  public checkedData: any = [];
  public sampleArray: any = [];
  public bulkFunction = false;

  constructor(
    public paymentSandbox: PaymentSandbox,
    public commonSandbox: LayoutSandbox,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.keyword = '';
    this.fromDate = '';
    this.toDate = '';
    this.paymentLists();
    this.getPaymentListCount();
    this.initForm();
    this.paymentSandbox.getPaymentDashboardCount();
  }

  paymentLists() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.paymentSandbox.getPaymentList(params);
  }

  getPaymentListCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    this.paymentSandbox.getPaymentListCount(params);
  }

  check(event) {
    if (event.target.checked) {
      this.buttonActive = false;
      this.buttonCheck = event.target.checked;
      this.filterEnable = true;
    } else {
      this.buttonActive = true;
      this.buttonCheck = event.target.checked;
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
    this.paymentLists();
  }

  initForm() {
    this.keywordInput = new FormControl('', [Validators.required]);
    this.fromDateInput = new FormControl('', [Validators.required]);
    this.toDateInput = new FormControl('', [Validators.required]);
    this.paymentList = this.fb.group({
      keywordInput: this.keywordInput,
      fromDateInput: this.fromDateInput,
      toDateInput: this.toDateInput,
    });
  }

  onSubmit() {
    this.keyword = this.paymentList.value.keywordInput;
    this.fromDate = this.paymentList.value.fromDateInput;
    this.toDate = this.paymentList.value.toDateInput;
    this.isCount = true;
    this.paymentLists();
  }

  reset() {
    this.paymentList.reset();
    const param: any = {};
    this.offset = 0;
    this.fromDate = '';
    this.keyword = '';
    this.toDate = '';
    this.isCount = true;
    this.paymentLists();
    this.getPaymentListCount();
  }

  selectChkBox(event, orderId) {
    if (event.target.checked === true) {
      this.checkedData.push(orderId);
      this.bulkFunction = true;
    } else if (event.target.checked === false ) {
     this.checkedData = this.checkedData.filter(data => {
        if (data !== orderId) {
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
        this.isChecked[values.orderId] = false;
        this.sampleArray = [];
        this.checkedData = [];
        this.bulkFunction = false;
      } else {
        this.isChecked[values.orderId] = true;
        this.sampleArray.push(values.orderId);
        this.checkedData.push(values.orderId);
        this.bulkFunction = true;
      }
    });
  }


//  export payment

exportPayment() {
  const params: any = {};
  params.orderId = this.checkedData;
  this.paymentSandbox.exportPayment(params);
}

calculateTotal(total, commision) {
    const amt = (+total) - (+commision);
    return Math.round(amt);
}

// export all payment

exportAllPayment() {
  const params: any = {};
  this.paymentSandbox.exportAllVendorPayment(params);
}
}
