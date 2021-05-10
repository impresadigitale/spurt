import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SettingsSandbox } from '../../../../../../core/settings/settings.sandbox';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgbTabset, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../../../../shared/interfaces/dateformat';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss'],
  providers: [DatePipe,
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}]
})
export class AddCouponComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild(NgbTabset)
    private tabset: NgbTabset;

    // Form Variables
    public couponForm: FormGroup;

    // variables
    public selectedProduct: any = [];
    public emailSelected: any = [];
    public removable = true;
    public endDate: any;
    public submitted = false;
    private subscriptions: Array<Subscription> = [];
    public slectedItems: any = [];
    public tabArray = [];
    public vendorCouponId: any;
    public minDate: any = {};
    public todayDate: any;
    public config: SwiperConfigInterface = {};


    constructor(public fb: FormBuilder,
                public sandbox: SettingsSandbox,
                public router: Router,
                public datePipe: DatePipe,
                public ngbDateFormat: NgbDateParserFormatter,
                public route: ActivatedRoute) {
                  this.route.params.subscribe(data => {
                    this.vendorCouponId = data.id;
                  });

    }

    ngOnInit() {
      this.sandbox.clear();
        this.initCouponForm();
        this.getProductList();
        const today = new Date();
        const dateVal = this.datePipe.transform(today, 'dd/MM/yyyy').split('/');
        this.todayDate = {day: +dateVal[0], month: +dateVal[1], year: +dateVal[2]};
        this.minDate = this.todayDate;
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
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1500: {
                    slidesPerView: 5,
                }
            }
        };
    }


  initCouponForm() {
    this.couponForm = this.fb.group({
         couponCode: ['', [Validators.required]],
         description: ['', [Validators.required]],
         status: [''],
         general: this.fb.group({
            couponType: ['', [Validators.required]],
            couponValue: ['', [Validators.required]],
            freeShipping: [''],
            couponStartDate: ['', [Validators.required]],
            couponEndDate: ['', [Validators.required]],
          }),
         usage: this.fb.group({
            minAmount: ['', [Validators.required]],
            maxAmount: ['', [Validators.required]],
            emailRestrict: ['']
         }),
         usageLimit: this.fb.group({
            limit: ['', [Validators.required]],
            count: ['', [Validators.required]],
            allQualifyItem: [false],
            cartItems: ['', Validators.compose([Validators.required, Validators.min(1)])],
        }),
  });
}


 getProductList() {
     const params: any = {};
     params.limit = '';
     params.offset = '';
     params.count = '';
     params.keyword = '';
     this.sandbox.getProductList(params);
     this.subscriptions.push(this.sandbox.productListLoaded$.subscribe(data => {
       if (data === true) {
        if (this.vendorCouponId) {
          this.sandbox.getCouponDetails({vendorCouponId: this.vendorCouponId});
          this.subscribeCouponDetails();
        }
       }
     }));
 }


 // email select to restrict

 emailSelect(event) {
     this.emailSelected.push(event.target.value);
 }


 // remove selected email

 removeEmail(list) {
     this.emailSelected.filter(data => {
         if (data === list) {
             this.emailSelected.pop(data);
         }
     });
 }

// submit coupon form

  submit() {
      this.submitted = true;
      if ( (<FormGroup>this.couponForm.controls['usageLimit']).controls['allQualifyItem'].value === true) {
        (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].clearValidators();
        (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].updateValueAndValidity();
        (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].reset();
      } else {
        (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].setValidators([Validators.required, Validators.min(1)]);
        (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].updateValueAndValidity();
      }

      if (this.couponForm.valid && this.selectedProduct.length > 0) {
          const params: any = {};
          params.couponName = this.couponForm.value.description;
          params.couponCode = this.couponForm.value.couponCode;
          if (this.couponForm.value.status === true || this.couponForm.value.status === 1) {
            params.status = 1;
          } else {
            params.status = 0;
          }
          params.couponType = +this.couponForm.value.general.couponType;
          params.discount = this.couponForm.value.general.couponValue;
          params.minimumPurchaseAmount = this.couponForm.value.usage.minAmount;
          params.maximumPurchaseAmount = this.couponForm.value.usage.maxAmount;
          params.emailRestrictions = this.couponForm.value.usage.emailRestrict;
          params.applicableFor = '';
          if (this.couponForm.value.general.freeShipping === true || this.couponForm.value.general.freeShipping === 1) {
            params.freeShipping = 1;
            } else {
            params.freeShipping = 0;
          }

          if (this.couponForm.value.usageLimit.allQualifyItem === true || this.couponForm.value.usageLimit.allQualifyItem === true) {
            params.allQualifyingItemsApply = 1;
          } else {
            params.allQualifyingItemsApply = 0;
          }
          if (this.couponForm.value.general.couponStartDate) {
            const date = this.couponForm.value.general.couponStartDate;
            const fDate = new Date(date.year, date.month - 1, date.day);
            params.startDate = this.datePipe.transform(fDate, 'yyyy/MM/dd');
          }
          if (this.couponForm.value.general.couponEndDate) {
            const date = this.couponForm.value.general.couponEndDate;
            const eDate = new Date(date.year, date.month - 1, date.day);
            params.endDate = this.datePipe.transform(eDate, 'yyyy/MM/dd');
          }
          params.maxUserPerCoupon = this.couponForm.value.usageLimit.limit;
          params.noOfTimeCouponValidPerUser = this.couponForm.value.usageLimit.count;
          params.appliedCartItemsCount = this.couponForm.value.usageLimit.cartItems;
          if (this.selectedProduct) {
                const object: any = {};
                const array = [];
                object.type = 1;
            this.selectedProduct.forEach(data => {
              array.push(data.productId);
            });
            object.referenceId = array;
            this.slectedItems.push(object);
          }
          params.productType = this.slectedItems;
          if (this.vendorCouponId) {
            params.vendorCouponId = this.vendorCouponId;
            this.sandbox.updateCoupon(params);
          } else {
            this.sandbox.createCoupon(params);
          }
          this.subscribe();
   } else {

     if (!this.couponForm.controls['general'].valid) {
      this.tabset.select('tab-1');
     } else if (!this.couponForm.controls['usage'].valid) {
      this.tabset.select('tab-2');
    } else if (this.selectedProduct.length === 0) {
      this.tabset.select('tab-3');
     } else if (!this.couponForm.controls['usageLimit'].valid) {
      this.tabset.select('tab-4');
     }
   }
}

// set values while update

subscribeCouponDetails() {
  this.subscriptions.push(this.sandbox.couponDetails$.subscribe(data => {
        if (data && Object.keys(data).length > 0) {
              this.setCouponForm(data);
        }

  }));
}

// set the coupon details value to coupon form

setCouponForm(details) {
  this.initCouponForm();
  this.couponForm.controls['couponCode'].setValue(details.couponCode);
  this.couponForm.controls['description'].setValue(details.couponName);
  this.couponForm.controls['status'].setValue(details.isActive);
  (<FormGroup>this.couponForm.controls['general']).controls['couponType'].setValue(details.couponType);
  (<FormGroup>this.couponForm.controls['general']).controls['couponValue'].setValue(details.discount);
  (<FormGroup>this.couponForm.controls['general']).controls['freeShipping'].setValue(details.freeShipping);
   if (details.startDate) {
    const dateVal = this.datePipe.transform(details.startDate, 'dd/MM/yyyy').split('/');
    this.minDate = {day: +dateVal[0], month: +dateVal[1], year: +dateVal[2]};
    this.todayDate = this.minDate;
    (<FormGroup>this.couponForm.controls['general']).controls['couponStartDate'].setValue(this.minDate);
   }
   if (details.endDate) {
    const dateVal = this.datePipe.transform(details.endDate, 'dd/MM/yyyy').split('/');
    const endDate = {day: +dateVal[0], month: +dateVal[1], year: +dateVal[2]};
    (<FormGroup>this.couponForm.controls['general']).controls['couponEndDate'].setValue(endDate);
   }
  (<FormGroup>this.couponForm.controls['usage']).controls['minAmount'].setValue(Math.round(details.minimumPurchaseAmount));
  (<FormGroup>this.couponForm.controls['usage']).controls['maxAmount'].setValue(Math.round(details.maximumPurchaseAmount));
  (<FormGroup>this.couponForm.controls['usage']).controls['emailRestrict'].setValue(details.emailRestrictions);
  if (details.productList.length > 0) {
    this.selectedProduct = details.productList;
  }
  (<FormGroup>this.couponForm.controls['usageLimit']).controls['limit'].setValue(details.maxUserPerCoupon);
  (<FormGroup>this.couponForm.controls['usageLimit']).controls['count'].setValue(details.noOfTimeCouponValidUser);
  (<FormGroup>this.couponForm.controls['usageLimit']).controls['allQualifyItem'].setValue(details.allQualifyingItemsApply === 1 ? true : false);
  (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].setValue(details.appliedCartItemsCount);
}

// reset coupon form

reset() {
  this.couponForm.reset();
  this.selectedProduct = [];
}

// subscribe
 subscribe() {
   if (this.vendorCouponId) {
    this.subscriptions.push(this.sandbox.updateCoupon$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/settings/coupon']);
      }
    }));

   } else {
    this.subscriptions.push(this.sandbox.createCoupon$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/settings/coupon']);
      }
    }));
   }
 }

 // get from date from change event

 selectDate(event) {
   this.minDate = event;
 }

 checkAllQualifyItem(event) {
   if (event.target.checked) {
    (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].clearValidators();
    (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].updateValueAndValidity();
    (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].reset();
   } else {
    (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].setValidators([Validators.required, Validators.min(1)]);
    (<FormGroup>this.couponForm.controls['usageLimit']).controls['cartItems'].updateValueAndValidity();
   }
 }

 ngOnDestroy() {
   this.subscriptions.forEach(each => each.unsubscribe());
 }
}
