/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
// Store
import { CouponSandbox } from '../../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { CouponService } from '../../../../../../../core/admin/catalog/coupon/coupon.service';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spurt-catalog-coupon-add',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CouponAddComponent implements OnInit, OnDestroy {

  public user: FormGroup;
  public couponCode: FormControl;
  public couponType: FormControl;
  public couponDescription: FormControl;
  public couponValue: FormControl;
  public startDate: FormControl;
  public endDate: FormControl;
  public minimumAmount: FormControl;
  public maximumAmount: FormControl;
  public emailRestriction: FormControl;
  public userCount: FormControl;
  public usageLimit: FormControl;
  public cartItems: FormControl;
  public couponQualified: FormControl;
  public products: FormControl;
  public status: FormControl;
  public searchKeyword = '';
  private valids: boolean;
  private vendorCouponId: any;
  public items: any = [];
  private subscriptions: Array<Subscription> = [];
  public selectedProduct: any = [];
  private closeResult: string;
  private param: any = {};
  private CouponEditdata: any;
  public submittedValues = false;
  public minDate: any;
  public todayDate: any;
  public limit = 10;

  constructor(
    private modalService: NgbModal,
    public fb: FormBuilder,
    public sandbox: CouponSandbox, public route: ActivatedRoute,
    private couponservice: CouponService, public productSandbox: ProductSandbox
  ) {
    this.valids = false;
    this.route.params.subscribe(data => {
      if (data.id) {
        this.vendorCouponId = data.id;
      } else {
        this.todayDate = new Date();
        this.minDate = this.todayDate;
      }
    });
    this.valids = false;

  }

  // STYLE PURPOSE

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  open(content) {
    this.modalService.open(content, {
      windowClass: 'dark-modal,image-manager'
    });
  }

  ngOnInit() {
    this.getProductList();
    if (this.vendorCouponId) {
      const params: any = {};
      params.vendorCouponId = this.vendorCouponId;
      this.sandbox.couponDetails(params);
      this.subscriptions.push(this.sandbox.getCouponGet$.subscribe(datas => {
        if (datas && Object.keys(datas).length) {
           this.CouponEditdata = datas;
           if (this.CouponEditdata) {
               this.editCouponList();
           }
        }
      }));
     }

    this.apiFordropDownlist();
    this.couponCode = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(32)
    ]));
    this.couponDescription = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.couponType = new FormControl('', [Validators.required]);
    this.couponValue = new FormControl('', [Validators.required]);
    this.startDate = new FormControl('', [Validators.required]);
    this.endDate = new FormControl('', [Validators.required]),
    this.minimumAmount = new FormControl('', [Validators.required]),
    this.maximumAmount = new FormControl('', [Validators.required]),
    this.emailRestriction = new FormControl(''),
    this.userCount = new FormControl('', [Validators.required]),
    this.couponQualified = new FormControl(''),
    this.usageLimit = new FormControl('', [Validators.required]),
    this.cartItems = new FormControl('', Validators.compose([Validators.required, Validators.min(1)])),
    this.products = new FormControl([], [Validators.required]),
    this.status = new FormControl('', [Validators.required]);
    this.user = this.fb.group({
      couponCode: this.couponCode,
      couponType: this.couponType,
      couponDescription: this.couponDescription,
      couponValue: this.couponValue,
      startDate: this.startDate,
      endDate: this.endDate,
      emailRestriction: this.emailRestriction,
      userCount: this.userCount,
      couponQualified: this.couponQualified,
      minimumAmount: this.minimumAmount,
      maximumAmount: this.maximumAmount,
      usageLimit: this.usageLimit,
      cartItems: this.cartItems,
      products: this.products,
      status: this.status
    });
  }

  // calling sandbox couponlist for dropdown list with empty param values
  apiFordropDownlist() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = '';
    param.sortOrder = '';
    this.sandbox.couponList(param);
  }

  /**
   * Handles  'onSubmits' event. Calls sandbox  updatecoupon if ((this.CouponEditdata!=undefined)&&(this.CouponEditdata!=' ')),
   * else calls sandbox addcoupon function,if the form is valid.
   *
   * @param user entire form value
   * @param param storing entire form value
   *
   */

  onSubmits(user) {
    if (this.user.controls['couponQualified'].value === true) {
      this.user.controls['cartItems'].clearValidators();
      this.user.controls['cartItems'].updateValueAndValidity();
      this.user.controls['cartItems'].reset();
    } else {
      this.user.controls['cartItems'].setValidators([Validators.required, Validators.min(1)]);
      this.user.controls['cartItems'].updateValueAndValidity();
    }
    const productsArray: any = [];
    this.submittedValues = true;
    if (!this.user.valid) {
      this.validateAllFormFields(this.user);
      return;
    }
    if (user.products) {
          const object: any = {};
          const array = [];
          object.type = 1;
          user.products.forEach(data => {
        array.push(data.productId);
      });
      object.referenceId = array;
      productsArray.push(object);
    }
    this.param.couponName = user.couponDescription;
    this.param.couponCode = user.couponCode;
    this.param.couponType = user.couponType;
    this.param.discount = user.couponValue;
    this.param.minimumPurchaseAmount = user.minimumAmount;
    this.param.maximumPurchaseAmount = user.maximumAmount;
    this.param.emailRestrictions = user.emailRestriction;
    this.param.startDate	 = user.startDate;
    this.param.endDate	 = user.endDate;
    this.param.maxUserPerCoupon	 = user.usageLimit;
    this.param.noOfTimeCouponValidPerUser	 = user.userCount;
    this.param.allQualifyingItemsApply	 = user.couponQualified;
    this.param.appliedCartItemsCount	 = user.cartItems;
    this.param.productType	 = productsArray;
    this.param.status = user.status;
    if (this.CouponEditdata !== undefined && this.CouponEditdata !== ' ') {
      this.param.couponId = this.vendorCouponId;
      this.sandbox.updateCoupon(this.param);
    } else {
      this.sandbox.addCoupon(this.param);
    }
  }

  editCouponList() {
    if (this.CouponEditdata.applicableProduct.length > 0) {
      this.selectedProduct = this.CouponEditdata.applicableProduct;
    }
    this.todayDate = this.CouponEditdata.startDate;
    this.minDate = this.todayDate;
    this.user.controls['couponCode'].setValue(this.CouponEditdata.couponCode);
    this.user.controls['couponDescription'].setValue(
      this.CouponEditdata.couponName
    );
    this.user.controls['couponType'].setValue(
      this.CouponEditdata.couponType
    );
    this.user.controls['couponValue'].setValue(
      this.CouponEditdata.discount
    );
    this.user.controls['startDate'].setValue(
      this.CouponEditdata.startDate
    );
    this.user.controls['minimumAmount'].setValue(
      this.CouponEditdata.minimumPurchaseAmount
    );
    this.user.controls['maximumAmount'].setValue(
      this.CouponEditdata.maximumPurchaseAmount
    );
    this.user.controls['endDate'].setValue(
      this.CouponEditdata.endDate
    );
    this.status.setValue(this.CouponEditdata.isActive);
    this.user.controls['emailRestriction'].setValue(
      this.CouponEditdata.emailRestrictions
    );
    this.user.controls['usageLimit'].setValue(
      this.CouponEditdata.maxUserPerCoupon
    );
    this.user.controls['userCount'].setValue(
      this.CouponEditdata.maxUserPerCoupon
    );
    this.user.controls['cartItems'].setValue(
      this.CouponEditdata.appliedCartItemsCount
    );
    const qualified = this.CouponEditdata.allQualifyingItemsApply === 1 ? true : false;
    this.user.controls['couponQualified'].setValue(
      qualified
    );
  }

  // calling product list api with default value

  getProductList() {
    const params: any = {};
    params.offset = '';
    params.limit = this.limit;
    params.keyword = this.searchKeyword;
    params.sku = '';
    params.status = '';
    params.price = '';
    this.sandbox.getProductList(params);
  }

  searchProduct(event) {
    const params: any = {};
    params.offset = '';
    params.limit = this.limit;
    params.keyword = event.target.value;
    params.sku = '';
    params.status = '';
    params.price = '';
    this.sandbox.getProductList(params);

  }

  // validation for formGroup
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

  changeFromDate(event) {
    this.minDate = event.value;
  }


  // validation for reactive form
  get f() {
    return this.user.controls;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
