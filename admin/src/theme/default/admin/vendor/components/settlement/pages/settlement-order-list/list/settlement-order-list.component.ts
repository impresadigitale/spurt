import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentSandbox } from '../../../../../../../../../core/admin/vendor/pages/payment/payment.sandbox';
import { Router } from '@angular/router';
import { SettlementOrderSandbox } from '../../../../../../../../../core/admin/vendor/vendor-settlements/settlement-order/settlement-order.sandbox';
import { LayoutSandbox } from '../../../../../../../../../core/admin/layout/layout.sandbox';
import { SettlementOrderModalComponent } from '../modals/settlement-modal.component';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-settlement-order-list',
  templateUrl: 'settlement-order-list.component.html',
  styleUrls: ['settlement-order-list.component.scss']
})
export class SettlementOrderListComponent implements OnInit {
  @ViewChild('closeBtn') closeAddExpenseModal: ElementRef;

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
  public settlementAmount: any;
  public currency: any;
  public buttoncheck = true;
  public buttonActive = false;
  public checkBox: any = [];
  public sampleArray: any = [];
  public filterEnable = true;
  public submitted = false;
  public selectAllValues = false;
  public closeResult: string;
  public pageSizeOptions = [10, 20];
  public limit = 10;
  public name = '';
  public email: any;
  public date: any;
  public popoverContent: any;
  public checkedArray: any = [];
  public customerGroupName = '';
  public customerGroup = '';
  public checkCondition: any = [];
  public checkmodules: any = [];
  public unCheckData: any = [];
  public selectedAll: any;
  public filterData: any = [];
  public filterDataId = [];
  public approval = false;
  public value: any = [];
  public pagenationData: any = [];
  public offset = 0;
  public index = 0;
  public pageSize = 20;
  public sellerArray = [];
  public currentPage = 1;
  public bulkFunction = false;
  public vendorId: any = '';
  public orderStatusId: any = '';

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public modalService: NgbModal,
    public paymentSandbox: PaymentSandbox,
    public sandbox: SettlementOrderSandbox,
    public commonSandbox: LayoutSandbox,
    public toastr: ToastrManager
  ) {
    this.subscribeVal();
    }

  ngOnInit() {
    this.paymentSandbox.getPaymentDashboardCount();
    this.currency = localStorage.getItem('adminCurrency') ? JSON.parse(localStorage.getItem('adminCurrency')) : '';
    this.submitted = false;
    this.initFilterForm();
    this.settlementOrderList();
    this.settlementOrderListCount();
    this.vendorList();
    this.orderStatusList();
  }

  initFilterForm() {
    this.filterForm = this.fb.group({
      keyword: [''],
      fromDate: [''],
      toDate: [''],
      rangeFrom: [''],
      rangeTo: [''],
      vendorId: [''],
      orderStatus: ['']
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

  receiveProgress(event) {
    this.index = 0;
    this.status = event.status;
  }

  checkIfAllSelected() {
    this.bulkFunction = true;
    this.selectedAll = this.sellerArray.every(function(item: any) {
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
    this.filterData = this.sellerArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.vendorOrderId);
    let total = 0;
    this.settlementAmount = 0;
    this.filterData.forEach(data => {
      total += (+data.NetAmount);
      this.settlementAmount = total;
    });
    this.settlementAmount = this.settlementAmount ? this.settlementAmount.toFixed(2) : 0;
  }

  /**
   * Handles  'resetFilter' event. Calls  getProductList and reset().
   *
   * @param filterForm entire form value
   */
  resetFilter() {
    this.filterForm.reset();
    this.initFilterForm();
    this.filterKeyword = '';
    this.startDate = '';
    this.endDate = '';
    this.filterRangeFrom = '';
    this.filterRangeTo = '';
    this.vendorId = '';
    this.orderStatusId = '';
    this.pageSize = 20;
    this.offset = 0;
    this.index = 0;
    this.settlementOrderList();
    this.settlementOrderListCount();
  }

  applyFilter() {
    if (this.filterForm.value.vendorId.length > 0) {
      const vendor = this.filterForm.value.vendorId;
      const id = [];
      vendor.forEach(data => {
        id.push(data.vendorId);
      });
     this.vendorId = id.toString();
    } else {
      this.vendorId = '';
    }

    if (this.filterForm.value.orderStatus.length > 0) {
      const vendor = this.filterForm.value.orderStatus;
      const id = [];
      vendor.forEach(data => {
        id.push(data.orderStatusId);
      });
     this.orderStatusId = id.toString();
    } else {
      this.orderStatusId = '';
    }
    this.filterKeyword = this.filterForm.value.keyword || '';
    this.startDate = this.filterForm.value.fromDate || '';
    this.endDate = this.filterForm.value.toDate || '';
    this.filterRangeFrom = this.filterForm.value.rangeFrom || '';
    this.filterRangeTo = this.filterForm.value.rangeTo || '';
    this.pageSize = 20;
    this.offset = 0;
    this.index = 0;
    this.settlementOrderList();
    this.settlementOrderListCount();
  }

  settlementOrderList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.filterKeyword;
    params.startDate = this.startDate;
    params.endDate = this.endDate;
    params.amountFrom = this.filterRangeFrom;
    params.amountTo = this.filterRangeTo;
    params.vendorIds = this.vendorId;
    params.orderStatus = this.orderStatusId;
    this.sandbox.getSettlementOrderList(params);
  }

  settlementOrderListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.pageSize;
    params.keyword = this.filterKeyword;
    params.startDate = this.startDate;
    params.endDate = this.endDate;
    params.amountFrom = this.filterRangeFrom;
    params.amountTo = this.filterRangeTo;
    params.vendorIds = this.vendorId;
    params.orderStatus = this.orderStatusId;
    params.count = 1;
    this.sandbox.getSettlementOrderListCount(params);
  }

  makeSettlement() {
    if (this.filterData.length > 0) {
      const modalRef = this.modalService.open(SettlementOrderModalComponent, {
        windowClass: 'make-settle'});
        modalRef.componentInstance.settlementArray = this.filterData;
        modalRef.result.then((result) => {
          if (result === 'success') {
            this.filterData = [];
            this.filterDataId = [];
            this.selectedAll = false;
            this.settlementOrderList();
            this.settlementOrderListCount();
          }
        });
    } else {
      this.toastr.errorToastr('Choose atleast one order');
      return;
    }
  }

  selectAll(event: any) {
    for (let i = 0; i < this.sellerArray.length; i++) {
      this.sellerArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
    if (this.filterData.length > 0) {
      this.bulkFunction = true;
      } else {
        this.bulkFunction = false;
      }
  }

  subscribeVal() {
    this.sandbox.orderList$.subscribe(data => {
      if (data) {
        this.sellerArray = [];
        this.sellerArray = data;
      }
    });
  }

  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.settlementOrderList();
    this.filterData = [];
    this.filterDataId = [];
    this.selectedAll = false;
  }

  vendorList() {
    const params: any = {};
    params.offset = '';
    params.limit = '';
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
}
