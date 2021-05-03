import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ArchivePaymentSandbox } from '../../../../../../../core/admin/sales/archive-payments/archive-payments.sandbox';


@Component({
  selector: 'app-sales-payment-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
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
export class ArchivePaymentListComponent implements OnInit, OnDestroy {


  public buttoncheck = true;
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
  private subscriptions: Array<Subscription> = [];

  constructor(
    public sandbox: ArchivePaymentSandbox,
    public fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.isCount = true;
    this.keyword = '';
    this.fromDate = '';
    this.toDate = '';
    this.getArchivePaymentList();
    this.getArchivePaymentListCount();
    this.initForm();
  }

  getArchivePaymentList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.archivePaymentList(params);
    }

    getArchivePaymentListCount() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
    params.customerName = this.keyword;
    params.startDate = this.fromDate;
    params.endDate = this.toDate;
    this.sandbox.archivePaymentListCount(params);
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

  /**
   * Handles form 'onPageChange' event. when page changes
   * @param event form event
   */
  pageChange(event) {
    window.scroll(0, 0);
    this.currentPage = event;
    this.offset = event.pageSize * event.pageIndex;
    this.getArchivePaymentList();
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
    this.getArchivePaymentList();
    this.getArchivePaymentListCount();
  }

  reset() {
    this.paymentList.reset();
    this.offset = 0;
    this.fromDate = '';
    this.keyword = '';
    this.toDate = '';
    this.isCount = true;
    this.getArchivePaymentList();
    this.getArchivePaymentListCount();
  }

  selectChkBox(event, paymentId) {
    if (event.target.checked === true) {
      this.checkedData.push(paymentId);
      this.bulkFunction = true;

    } else if (event.target.checked === false ) {
     this.checkedData = this.checkedData.filter(data => {
        if (data !== paymentId) {
           return true;
        }
      });
      if (this.checkedData.length === 0) {
        this.bulkFunction = false;
      }

    }
  }

  selectAll(event: any, payment) {
    this.checkedData = [];
    payment.forEach(values => {
      if (event.target.checked === false) {
        this.isChecked[values.paymentArchiveId] = false;
        this.sampleArray = [];
        this.checkedData = [];
        this.bulkFunction = false;

      } else {
        this.isChecked[values.paymentArchiveId] = true;
        this.sampleArray.push(values.paymentArchiveId);
        this.bulkFunction = true;
        this.checkedData.push(values.paymentArchiveId);

      }
    });
  }

  exportExcel() {
    const param: any = {};
    param.paymentArchiveId	 = this.checkedData;
    this.sandbox.exportArchivePayment(param);
  }

  exportAllExcel() {
    const param: any = {};
    this.sandbox.exportAllArchivePayment(param);
  }


  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
