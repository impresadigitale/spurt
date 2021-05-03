import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { Router } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-archive-payments',
  templateUrl: './archive-payments.component.html',
  styleUrls: ['./archive-payments.component.scss']
})
export class ArchivePaymentsComponent implements OnInit, AfterViewInit {


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
  public vendorDetails: any;

  constructor(
    public paymentSandbox: PaymentSandbox,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.initFilterForm();
    this.getArchivePaymentList();
    this.getPaymentCount();
    this.paymentSandbox.archivePaymentList$.subscribe(data => {
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

  getArchivePaymentList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.paymentSandbox.getArchivePaymentList(params);
  }

  searchPayment(value) {
    this.keyword = value;
    this.getArchivePaymentList();
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
    this.getArchivePaymentList();
  }

  downloadInvoice(id) {
    const params: any = {};
    params.vendorOrderId = id;
    this.paymentSandbox.downloadInvoice(params);
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
    this.getArchivePaymentList();
  }

  exportPayment() {
    if (this.filterDataId.length > 0) {
      const params: any = {};
      params.vendorPaymentArchiveId	 = this.filterDataId.toString();
      this.paymentSandbox.exportArchivePayment(params);
      this.paymentSandbox.exportArchivePaymentLoaded$.subscribe(data => {
        if (data === true) {
          this.paymentSandbox.removeExportSelection('archivePayment');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    }

  }

  exportAllArchivePayment() {
    const params: any = {};
    params.vendorId = this.vendorDetails.vendorId;
    this.paymentSandbox.exportAllArchivePayment(params);
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
    this.filterDataId = this.filterData.map(obj => obj.vendorArchivePaymentId);
  }

  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getArchivePaymentList();
  }

  getPaymentCount() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keywoard = '';
    params.startDate = '';
    params.endDate = '';
    this.paymentSandbox.getArchivePaymentListCount(params);
}
}
