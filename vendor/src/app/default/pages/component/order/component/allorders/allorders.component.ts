import { Component, OnInit, AfterViewInit, ViewChild, Output, EventEmitter, OnDestroy, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { OrderSandbox } from '../../../../../../core/order/order.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { NgbDropdown, NgbPanelChangeEvent, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { PaymentSandbox } from '../../../../../../core/payment/payment.sandbox';
import { Subscription } from 'rxjs';
import { NgbDateCustomParserFormatter } from '../../../../../../default/shared/interfaces/dateformat';
import * as $ from 'jquery';
import { ConfirmationDialogComponent } from '../../../../../../default/shared/popup/Confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}],
})
export class AllOrdersComponent implements OnInit, AfterViewInit, OnDestroy {


  @ViewChild(NgbDropdown)
  public dropdown: NgbDropdown;
  public limit = 10;
  public offset = 0;
  public subTotal = 0;
  public total = 0;
  public tax = 0;
  public orderDetail: any;
  public activeOrderId: any;
  public subOrderId: any;
  public imageUrl = environment.imageUrl;
  public keyword = '';
  public date = '';
  public location = '';
  public filter = false;
  public miniDate: any;
  public dateError: string;
  public filterForm: FormGroup;
  public shippingForm: FormGroup;
  public isRequired = false;
  public deliveryPersonId: any;
  public startDate: any;
  public endDate: any;
  public config: SwiperConfigInterface = {};
  private subscriptions: Array<Subscription> = [];
  public userDetails = JSON.parse(localStorage.getItem('vendor-settings'));
  public currencyCode = this.userDetails.currencyCode;
  public toScrollInto: any;
  win: Window = window;
  public couponDiscount: any = 0;
  public priceTag: any = 0;
  public detailsTotal: any = 0;

  @ViewChild('scrollToMe') scrollToMe: ElementRef;
  @ViewChildren('commentDiv') orderDiv: QueryList<ElementRef>;

  constructor(
    public orderSandbox: OrderSandbox,
    public formbuilder: FormBuilder, public modal: NgbModal, public paymentSandbox: PaymentSandbox, public toster: ToastrService, public route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.initFilterForm();
    this.initShippingForm();
    this.getOrderList();
    this.getDeliveryPersonsList();
    this.getOrderStatusList();

    this.route.queryParams.subscribe(data => {
      if (data.orderId) {
        this.activeOrderId = Number(data.orderId);

        this.getOrderDetail(this.activeOrderId);
        this.getOrderLogList();
      }
      if (!data.orderId) {
        this.subscriptions.push(this.orderSandbox.allOrderList$.subscribe(datas => {
          if (datas && datas[0]) {
            this.activeOrderId = datas[0].vendorOrderId;
            this.getOrderDetail(this.activeOrderId);
            this.getOrderLogList();
          }
        }));
      }
    });
    this.subscriptions.push(this.orderSandbox.orderDetail$.subscribe(data => {
      if (data) {
        this.orderDetail = data;
        this.subOrderId = data.subOrderStatusId;

        this.setShippingInfo(this.orderDetail);
        this.orderDetail.productList.forEach(dataList => {
          if (dataList) {
              this.priceTag = dataList.basePrice;
            if (dataList.discountAmount) {
               this.couponDiscount = dataList.discountAmount;
            }
            if (dataList.discountedAmount) {
              this.detailsTotal = dataList.discountedAmount;
            } else {
              this.detailsTotal = dataList.total;

            }
            this.subTotal = 0;
            this.subTotal += Number(dataList.total);
            if (dataList.taxType === 1) {
                 this.tax = dataList.taxValue;
            } else if (dataList.taxType === 2) {
              this.tax = (+dataList.basePrice) * ((+dataList.taxValue) / 100);
            } else {
              this.tax = 0;
            }
          }
        });
      }
    }));
    // the selector will match all input controls of type :checkbox
    // and attach a click event handler
    $(document).on('click', 'input[type="checkbox"]', function() {
      if ($('.adp-check')) {
        $('.adp-check input[type="checkbox"]')
          .not(this)
          .prop('checked', false);
      }
    });
    $('.dropdown-menu').click(function(e) {
      e.stopPropagation();
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
    this.filterForm = this.formbuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }

  initShippingForm() {
    this.shippingForm = this.formbuilder.group({
      id: ['', Validators.required],
      url: ['', Validators.required]
    });
  }

  setShippingInfo(data) {
    this.shippingForm.controls['id'].setValue(data['trackingNo']);
    this.shippingForm.controls['url'].setValue(data['trackingUrl']);
  }

  test(event) {
    event.stopPropogation();
  }

  someMethodName(date) {
  date.stopPropogation();
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
    this.getOrderList();
  }

  searchOrder(value) {
    this.keyword = value;
    this.getOrderList();
  }

close() {
    this.dropdown.close();
}

apllyStatusChange() {
    const modelRef = this.modal.open(ConfirmationDialogComponent, {
      size: 'sm', windowClass: 'delete-confirm', backdrop: 'static', backdropClass: 'createcr'
  });
  modelRef.result.then((result) => {
    if (result === 1) {
      this.updateOrderStatus();
    }
  });
}

getOrderList() {
  const params: any = {};
  params.limit = '';
  params.offset = this.offset;
  params.keyword = this.keyword;
  params.startDate = this.startDate;
  params.endDate = this.endDate;
  this.orderSandbox.getAllOrderList(params);
  this.subscriptions.push(this.orderSandbox.allOrderListLoaded$.subscribe(data => {
  if (data === true) {
    if (this.activeOrderId) {
    this.orderDiv.changes.subscribe(() => {
      if (this.orderDiv && this.orderDiv.last) {
        this.orderDiv.forEach(datas => {
        if (datas.nativeElement.id === 'card-act') {
          datas.nativeElement.focus();
        }
        });
      }
    });
  }   }
  }));

}
getDeliveryPersonsList() {
  const params: any = {};
  params.location = this.location;
  this.orderSandbox.getDeliveryPersonsList(params);
}
searchPerson(val) {
  this.location = val;
  this.getDeliveryPersonsList();
}
getDeliveryPerson(event) {
  this.deliveryPersonId = event.target.checked === true ? event.target.id : null;
}
getOrderStatusList() {
  const params: any = {};
  params.limit = this.limit;
  params.offset = this.offset;
  params.keyword = '';
  this.orderSandbox.getOrderStatusList(params);
}
selectOrderStatus(val) {
  this.subOrderId = val;
}
updateOrderStatus() {
  const params: any = {};
  params.vendorOrderId = this.activeOrderId;
  params.subOrderStatusId = this.subOrderId;
  this.orderSandbox.getOrderStatusUpdate(params);
  this.subscriptions.push(this.orderSandbox.updateOrderStatusLoaded$.subscribe(data => {
    if (data) {
      this.getOrderLogList();
    }
  }));
}
allocateDeliveryPerson() {
    if (!this.deliveryPersonId) {
        this.toster.error('Please choose the delivery person');
      return;
    }
    const params: any = {};
    params.vendorOrderId = this.activeOrderId;
    params.deliveryPersonId = Number(this.deliveryPersonId);
    this.orderSandbox.allocateDeliveryPersons(params);
}

getOrderLogList() {
  const params: any = {};
  params.vendorOrderId = this.activeOrderId;
  this.orderSandbox.getLogOrderList(params);
}

// get order detail event
getOrderDetail(id) {
  this.activeOrderId = id;
  this.orderSandbox.doOrderDetail(this.activeOrderId);
  this.getOrderLogList();
}

resetFilter() {
  this.startDate = '';
  this.endDate = '';
  this.filter = false;
  this.filterForm.reset();
  this.getOrderList();
}

updateShippingInfo() {
  if (!this.shippingForm.valid) {
    this.validateAllFormFields(this.shippingForm);
    return;
  }
  const params: any = {};
  params.vendorOrderId = this.activeOrderId;
  params.trackingUrl = this.shippingForm.controls['url'].value;
  params.trackingNo	 = this.shippingForm.controls['id'].value;
  this.orderSandbox.getShippingInformationUpdate(params);
}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
    const control = formGroup.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFields(control);
    }
  });
}

downloadInvoice() {
  const params: any = {};
  params.vendorOrderId	= this.activeOrderId;
  this.paymentSandbox.downloadInvoice(params);
}

makeArchive() {
  const params: any = {};
  params.vendorOrderId	= this.activeOrderId;
  this.orderSandbox.makeArchive(params);
  this.subscriptions.push(this.orderSandbox.makeArchiveLoaded$.subscribe(data => {
    if (data === true) {
        this.getOrderList();
    }
  }));
}


calculateTotal(total, discount) {
  return (+total) - (+discount);

}

calculateTax(type, taxValue: number, price) {
  switch (type) {
    case 1:
    return Math.round(taxValue);
  case 2:
    const percentToAmount = (+price) * ((+taxValue) / 100);
    return Math.round(percentToAmount);
    default:
    return Math.round(taxValue);
  }
}

scrollIntoView(item) {
  this.toScrollInto = item;
}

ngOnDestroy() {
  this.subscriptions.forEach(each => {
      each.unsubscribe();
  });
}
}
