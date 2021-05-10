import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-archive-orders',
  templateUrl: './archive-orders.component.html',
  styleUrls: ['./archive-orders.component.scss']
})
export class ArchiveOrdersComponent implements OnInit, AfterViewInit {


  // variables
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


  constructor(
    public orderSandbox: OrderSandbox,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.initFilterForm();
    this.getArchiveOrderList();
    this.getArchiveOrderCount();
    this.orderSandbox.archiveOrderList$.subscribe(data => {
      if (data) {
        this.orderArray = data;
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

  getArchiveOrderList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.keyword = this.keyword;
    params.startDate = this.startDate ? this.startDate : '';
    params.endDate = this.endDate ? this.endDate : '';
    this.orderSandbox.getArchiveOrderList(params);
  }

  searchArchiveList(value) {
    this.keyword = value;
    this.getArchiveOrderList();
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
    this.getArchiveOrderList();
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
    this.getArchiveOrderList();
  }

  exportOrder() {
    if (this.filterDataId.length > 0) {
      const params: any = {};
      params.vendorOrderArchiveId	 = this.filterDataId.toString();
      this.orderSandbox.exportArchiveOrder(params);
      this.orderSandbox.exportArchiveOrderLoaded$.subscribe(data => {
        if (data === true) {
          this.orderSandbox.RemoveExportSelection('archiveOrder');
          this.selectedAll = false;
          this.filterDataId = [];
        }
      });
    }
  }

  exportAllArchiveOrder() {
    const params: any = {};
    params.vendorId = this.vendorDetails.vendorId;
    this.orderSandbox.exportAllArchiveOrder(params);
  }

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
    this.filterDataId = this.filterData.map(obj => obj.vendorOrderArchiveId);
  }

  // page change event
  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getArchiveOrderList();
  }

  getArchiveOrderCount() {
    const params: any = {};
    this.orderSandbox.getArchiveOrderListCount(params);
}
}
