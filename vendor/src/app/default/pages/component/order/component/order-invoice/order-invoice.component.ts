import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit, AfterViewInit, OnDestroy {


  public keyword = '';
  public filterForm: FormGroup;
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public startDate: any;
  public isRequired = false;
  public endDate: any;
  public selectedAll: any;
  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public orderArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public config: SwiperConfigInterface = {};
  public vendorDetails: any;
  public subscriptions: Array<Subscription> = [];
  public selectedOrderId: any;

  constructor(
    public orderSandbox: OrderSandbox,
    public formBuilder: FormBuilder,
    public router: Router,
    public cd: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.initFilterForm();
    this.getOrderInvoiceList();
    this.getOrderInvoiceListCount();
  }

  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 6,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2
        },
        960: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 4
        },
        1500: {
          slidesPerView: 5
        }
      }
    };
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  getOrderInvoiceList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.count = '';
    this.orderSandbox.getOrderInvoiceList(params);
  }

  getOrderInvoiceListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    params.count = 1;
    this.orderSandbox.getOrderInvoiceListCount(params);
  }

  searchOrderInvoice(value) {
    this.keyword = value;
    this.getOrderInvoiceList();
    this.getOrderInvoiceListCount();
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
    this.getOrderInvoiceList();
    this.getOrderInvoiceListCount();
  }

  onDateSelect(event) {
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
    this.getOrderInvoiceList();
  }

  // bulk delete checkbox event
  selectAll(event) {
    for (let i = 0; i < this.orderArray.length; i++) {
      this.orderArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.orderArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  // filter product list event for multiple delete
  filterDataList() {
    this.filterData = this.orderArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.orderProductId);
  }

  // page change event
  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getOrderInvoiceList();
  }

  changeStatus(list, event) {
    const params: any = {};
    params.cancelStatusId = event.value;
    params.orderProductId = list.orderProductId;
    this.orderSandbox.changeCancelOrderStatus(params);
    this.subscriptions.push(this.orderSandbox.cancelOrderStatusLoaded$.subscribe(data => {
      if (data && data === true) {
        this.cd.detectChanges();
      }
    }));
  }

  changeAllStatus(event) {
    const params: any = {};
    params.orderProductId = this.filterDataId.toString();
    params.cancelStatusId = event.value;
    this.orderSandbox.bulkCancelOrderStatus(params);
    this.subscriptions.push(this.orderSandbox.bulkCancelOrderStatusLoaded$.subscribe(data => {
      if (data && data === true) {
        this.cd.detectChanges();
        this.orderSandbox.RemoveExportSelection('cancelOrder');
        this.selectedAll = false;
        this.filterDataId = [];
      }
    }));
  }

  downloadInvoice(list) {
    const params: any = {};
    params.orderId	= list.orderId;
    this.selectedOrderId = list.orderId;
    this.orderSandbox.downloadInvoice(params);
  }

  sendMail(list) {
    const params: any = {};
    params.orderId	= list.orderId;
    this.selectedOrderId = list.orderId;
    this.orderSandbox.sendMail(params);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
