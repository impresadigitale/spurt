import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../../../../../../../core/admin/service/config.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LayoutSandbox } from '../../../../../../../../../core/admin/layout/layout.sandbox';
import { PaymentSandbox } from '../../../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { SettlementHistorySandbox } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-history/settlement-history.sandbox';
import { VendorProductSandbox } from '../../../../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { SettlementHistoryModalComponent } from '../modals/settlement-history-modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vendor-settlement-history',
  templateUrl: 'settlement-history-list.component.html',
  styleUrls: ['settlement-history-list.component.scss']
})
export class SettlementHistoryListComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;

  public ImageUrl: any = '';
  public checkmodules: any = [];
  public unCheckData: any = [];
  public checkCondition: any = [];
  public offset = 0;
  public index = 0;
  public pageSize = 20;
  private isCount: boolean;
  public currentPage = 1;
  public buttoncheck = true;
  public buttonActive = false;
  public filterEnable = true;
  public isChecked: any = [];
  public sampleArray: any = [];
  public pageSizeOptions = [10, 20];
  public deleteItem: any = [];
  public seriesData: any;
  public productArray = [];
  public bulkFunction = false;
  public checkAll = false;
  // Filter
  public filterForm: FormGroup;
  public keyword: FormControl;
  public status: FormControl;
  public fromDate: FormControl;
  public toDate: FormControl;
  public rangeFrom: FormControl;
  public rangeTo: FormControl;

  public filterKeyword = '';
  public startDate = '';
  public endDate = '';
  public filterRangeFrom = '';
  public filterRangeTo = '';
  public subscriptions: Array<Subscription> = [];
  public filterData: any = [];
  public filterDataId = [];
  public selectedAll: any;
  public currency: any;

  constructor(
    private configService: ConfigService,
    public fb: FormBuilder,
    public modalService: NgbModal,
    public commonSandbox: LayoutSandbox,
    public paymentSandbox: PaymentSandbox,
    public sandbox: SettlementHistorySandbox,
    public productSandbox: VendorProductSandbox
  ) {
    this.subscribeVal();
  }

  ngOnInit() {
    this.currency = JSON.parse(localStorage.getItem('adminCurrency'));
    this.ImageUrl = this.configService.getImageUrl();
    this.paymentSandbox.getPaymentDashboardCount();
    this.initFilterForm();
    this.isCount = true;
    this.settlementHistoryList();
    this.settlementHistoryListCount();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: [''],
      fromDate: [''],
      toDate: [''],
      rangeFrom: [''],
      rangeTo: ['']
    });
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

  resetFilter() {
    this.filterForm.reset();
    this.filterKeyword = '';
    this.startDate = '';
    this.endDate = '';
    this.filterRangeFrom = '';
    this.filterRangeTo = '';
    this.pageSize = 20;
    this.offset = 0;
    this.index = 0;
    this.settlementHistoryList();
    this.settlementHistoryListCount();
  }
  applyFilter() {
    this.filterKeyword = this.filterForm.value.keyword || '';
    this.startDate = this.filterForm.value.fromDate || '';
    this.endDate = this.filterForm.value.toDate || '';
    this.filterRangeFrom = this.filterForm.value.rangeFrom || '';
    this.filterRangeTo = this.filterForm.value.rangeTo || '';
    this.pageSize = 20;
    this.offset = 0;
    this.index = 0;
    this.settlementHistoryList();
    this.settlementHistoryListCount();

  }

  settlementHistoryList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.filterKeyword;
    params.startDate = this.startDate;
    params.endDate = this.endDate;
    params.amountFrom = this.filterRangeFrom;
    params.amountTo = this.filterRangeTo;
    this.sandbox.getSettlementHistoryList(params);
  }

  settlementHistoryListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.filterKeyword;
    params.startDate = this.startDate;
    params.endDate = this.endDate;
    params.amountFrom = this.filterRangeFrom;
    params.aamountTo = this.filterRangeTo;
    params.count = 1;
    this.sandbox.getSettlementHistoryListCount(params);
  }


  subscribeVal() {
    this.subscriptions.push(this.sandbox.historyList$.subscribe(data => {
      if (data) {
        this.productArray = [];
       data.map(val => {
         val.selected = false;
         this.productArray.push(val);
       });
      }
    }));  }


  checkIfAllSelected() {
    this.selectedAll = this.productArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }
  // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.productArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.productId);
  }

  onPageChange(event: any) {
    this.isCount = false;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.settlementHistoryList();
  }

  selectAll(event: any) {
    for (let i = 0; i < this.productArray.length; i++) {
      this.productArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
    }

  viewSettlementDetails(list) {
      const modalRef = this.modalService.open(SettlementHistoryModalComponent, {
        windowClass: 'make-settle'});
        modalRef.componentInstance.details = list;
        modalRef.result.then((result) => {
          if (result === 'success') {
            this.settlementHistoryList();
            this.settlementHistoryListCount();
          }
        });
    }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
