import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { NgbDropdown, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../../../shared/interfaces/dateformat';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}],
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {


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
  public paymentArray = [];
  public filterData: any = [];
  public filterDataId = [];
  public limit = 10;
  public offset = 0;
  public currentPage = 1;
  public config: SwiperConfigInterface = {};
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public paymentSandbox: PaymentSandbox,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.initFilterForm();
    this.getPaymentList();
    this.getPaymentCount();
    this.paymentSandbox.paymentList$.subscribe(data => {
      if (data) {
        this.paymentArray = data;
      }
    });
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

  getPaymentList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.paymentSandbox.getPaymentList(params);
  }

  searchPayment(value) {
    this.keyword = value;
    this.getPaymentList();
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
    this.getPaymentList();
  }

  downloadInvoice(id) {
    const params: any = {};
    params.vendorOrderId = id;
    this.paymentSandbox.downloadInvoice(params);
  }

  goToOrders(id) {
    this.router.navigate(['/orders/all-orders'], {
      queryParams: { orderId: id }
    });
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
    this.getPaymentList();
  }

  exportPayment() {
    if (this.filterDataId.length > 0) {
      const params: any = {};
      params.vendorOrderId	 = this.filterDataId.toString();
      this.paymentSandbox.multiplePaymentExport(params);
      this.paymentSandbox.MultiplePaymentExportLoaded$.subscribe(data => {
        if (data === true) {
          this.paymentSandbox.removeExportSelection('payment');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    } else {
      const params: any = {};
      const vendor = JSON.parse(localStorage.getItem('vendorUserDetails'));
      params.vendorId = vendor.vendorId;
      this.paymentSandbox.exportPayment(params);
    }

  }

  selectAll() {
    for (let i = 0; i < this.paymentArray.length; i++) {
      this.paymentArray[i].selected = this.selectedAll;
    }
    this.filterDataList();
  }

  checkIfAllSelected() {
    this.selectedAll = this.paymentArray.every(function(item: any) {
      return item.selected === true;
    });
    this.filterDataList();
  }

  filterDataList() {
    this.filterData = this.paymentArray.filter(data => {
      if (data.selected === true) {
        return data;
      }
    });
    this.filterDataId = this.filterData.map(obj => obj.vendorOrderId);
  }

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getPaymentList();
  }
  getPaymentCount() {
    const params: any = {};
    this.paymentSandbox.getPaymentListCount(params);
 }

 makeAchive(id) {
   const params: any = {};
   params.vendorPaymentId = id;
   this.paymentSandbox.makePaymentArchive(params);
   this.subscriptions.push(this.paymentSandbox.makePaymentArchive$.subscribe(data => {
     if (data && data['status'] === 1) {
      this.getPaymentList();
     }
   }));
 }

 ngOnDestroy() {
   this.subscriptions.forEach(each => each.unsubscribe());
 }
}
