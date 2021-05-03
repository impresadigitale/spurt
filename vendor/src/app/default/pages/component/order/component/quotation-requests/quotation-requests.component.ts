import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quotation-requests',
  templateUrl: './quotation-requests.component.html',
  styleUrls: ['./quotation-requests.component.scss']
})

export class QuotationRequestsComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(NgbDropdown)

  public keyword = '';
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public startDate: any;
  public isRequired = false;
  public endDate: any;
  public selectedAll: any;
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
  public rowSelected: number;
  public selectedRow: any = [];

  constructor(
    public orderSandbox: OrderSandbox,
    public router: Router
  ) {}

  ngOnInit() {
    this.rowSelected = -1;
    this.vendorDetails = JSON.parse(localStorage.getItem('vendorUserDetails'));
    this.getQuotationList();
    this.getQuotationListCount();
    this.orderSandbox.quotationList$.subscribe(data => {
      if (data && data.length > 0) {
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

  getQuotationList() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.productName = this.keyword;
    params.count = '';
    this.orderSandbox.getQuotationList(params);
  }

  getQuotationListCount() {
    const params: any = {};
    params.offset = this.offset;
    params.limit = this.limit;
    params.productName = this.keyword;
    params.count = 1;
    this.orderSandbox.getQuotationListCount(params);
  }

  searchList(value) {
    this.keyword = value;
    this.getQuotationList();
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
    this.filterDataId = this.filterData.map(obj => obj.quotationId);
  }

      // page change event
  pageChange(event) {
    this.currentPage = event;
    this.offset = this.limit * (event - 1);
    this.getQuotationList();
  }

  public openCloseRow(id: number): void {
    if (this.rowSelected === -1) {
      this.rowSelected = id;
    } else {
      if (this.rowSelected === id) {
        this.rowSelected = -1;
      } else {
        this.rowSelected = id;
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
