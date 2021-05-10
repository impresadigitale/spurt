/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator } from '../../theme/utils/app-validators';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { AccountSandbox } from '../../../core/account/account.sandbox';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { CommonSandbox } from '../../../core/common/common.sandbox';
import { CustomValidators } from '../../shared/password-validation/custom-password-validation';


@Component({
  selector: 'app-stock-checkout',
  templateUrl: './stock-checkout.component.html',
  styleUrls: ['./stock-checkout.component.scss']
})
export class StockCheckoutComponent implements OnInit, OnDestroy {

  public checkoutForm: FormGroup;
  public zipCodes: any;
  public checked: boolean;
  public isCoupon = false;
  // validation
  public submitted = false;
  public newAddress = true;
  public dataOptions: any;
  // address option
  public showAddresses = false;
  // create account
  public createAccount = false;
  public coupon: any;
  // image
  public imagePath: any;
  // checkout list name
  public semiColon = ':';
  // hide address
  public hideAddress = false;
  public activeAdressId: any;
  public product: any = [];
  public paymentMethod: FormControl;
  private subscriptions: Array<Subscription> = [];
  public currentUser = JSON.parse(localStorage.getItem('storeUser'));
  public productDetail = [];
  public clearCoupon = false;
  public couponData: string;
  public couponDiscountAmout: any;
  public viewAllAppliedProduct = false;
  public couponCode = '';
  public seasons = ['a', 'b', 'c'];

  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public router: Router,
    public listSandbox: ListsSandbox,
    public accountSandbox: AccountSandbox,
    public productControlSandbox: ProductControlSandbox,
    public commonSandbox: CommonSandbox,
    public authSandbox: AuthSandbox,
    @Inject(PLATFORM_ID) private platformId: Object, public toaster: MatSnackBar,
  ) {}

  // Initially calls initCheckoutForm function
  ngOnInit() {
    this.initCheckoutForm();
    this.getSessionData();
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('storeUserToken')) {
        this.hideAddress = true;
        this.getCustomerAddressList();
        this.commonSandbox.doGetProfile();
        this.setProfileDetails();
      } else {
        this.hideAddress = false;
        this.showAddress();
      }
    }
    this.imagePath = environment.imageUrl;
  }

   /** initialize checkout form */

   initCheckoutForm() {
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';

    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(nameValidationPattern),
        Validators.minLength(3),
        Validators.maxLength(32)
        ])],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(nameValidationPattern),
        Validators.maxLength(32)
        ])],
      email: ['', Validators.compose([
        Validators.required,
        emailValidator,
        Validators.maxLength(96)
       ])],
      phone: ['', Validators.compose([
        Validators.required,
        Validators.pattern(mobileValidationPattern),
        Validators.maxLength(15),
        Validators.minLength(4)
      ])],
      country: ['', Validators.required],
      city: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128),
      ])],
      state: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128),
      ])],
      zip: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(4)
      ])],
      address: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(128),
      ])],
      addressLine: ['', Validators.compose([
        Validators.maxLength(128),
      ])],
      setPassword: [''],
      shippingName: ['', Validators.required]
    });
  }

  getSessionData() {
    const params: any = {};
    params.products = JSON.parse(sessionStorage.getItem('backorderProduct'));
    params.totalPrice = JSON.parse(
      sessionStorage.getItem('backorderTotal')
    );
    this.productControlSandbox.HandleBackorderCheckout(params);
  }

  /** if user loged in, call address list */
  public getCustomerAddressList() {
    const params: any = {};
    params.limit = 0;
    params.offset = 0;
    params.count = 0;
    this.accountSandbox.getAddressList(params);
  }

  // passes address details to edit
  selectAddress(param) {
    this.activeAdressId = param.addressId;
    this.showAddresses = false;
    this.editAddressList(param);
  }

  // editing billing form(from get profile api)
  setProfileDetails() {
    this.subscriptions.push(
      this.commonSandbox.getProfile$.subscribe(profile => {
        if (profile) {
          this.checkoutForm.controls['firstName'].setValue(profile.firstName);
          this.checkoutForm.controls['lastName'].setValue(profile.lastName);
          this.checkoutForm.controls['email'].setValue(profile.email);
          this.checkoutForm.controls['phone'].setValue(profile.mobileNumber);
        }
      })
    );
  }

  // editing billing form
  editAddressList(param) {
    this.checkoutForm.controls['city'].setValue(param.city);
    this.checkoutForm.controls['state'].setValue(param.state);
    this.checkoutForm.controls['shippingName'].setValue(param.company);

    if (typeof param.postcode === 'number') {
      this.zipCodes = parseInt(param.postcode, 10);
      this.checkoutForm.controls['zip'].setValue(this.zipCodes);
    } else {
      this.checkoutForm.controls['zip'].setValue(param.postcode);
    }
    this.checkoutForm.controls['address'].setValue(param.address1);
    this.checkoutForm.controls['addressLine'].setValue(param.address2);
    if (param.countryId) {
      this.checkoutForm.controls['country'].setValue(param.countryId);
    }
  }


  // show Address options in the checkout form
  showAddress() {
    this.newAddress = false;
    this.checked = false;
    this.showAddresses = true;
    const param: any = {};
    param.city = '';
    this.editAddressList(param);
  }

  // removeProduct() {
  //   sessionStorage.removeItem('backOrder');
  //   this.product = [];
  // }

  calculatePrice(price: number, taxType: number, taxValue: number) {
   switch (taxType) {
      case 1:
        const priceWithOutTax = +price + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = price * (taxValue / 100);
        const priceWithTax = +price + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return price;
    }
  }

  // change count

  changeCount(products, operation) {
    if (operation) {
      if (products.productCount >= products.minQuantityAllowedCart && products.productCount < products.maxQuantityAllowedCart) {
        products.productCount += 1;
        this.productControlSandbox.addTocheckout(products);
      }
    } else {
      if (products.productCount > products.minQuantityAllowedCart) {
        products.productCount -= 1;
        this.productControlSandbox.addTocheckout(products);
      }
    }
  }

  public accountCreated(param) {
    if (param.checked) {
      this.checkoutForm.controls['setPassword'].setValidators(
        Validators.compose([
          Validators.required,
          // check whether the entered password has a number or symbol
          CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
          // check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // Has a minimum length of 8 characters
          Validators.minLength(8),
          Validators.maxLength(50)
      ]));
      this.checkoutForm.controls['setPassword'].updateValueAndValidity();
    } else {
      this.checkoutForm.controls['setPassword'].clearValidators();
      this.checkoutForm.controls['setPassword'].updateValueAndValidity();
    }
    this.createAccount = param.checked;
  }

  addNewAddress() {
    this.router.navigate(['/account/addaddresses'], {
      queryParams: { url: '/stock-checkout' }
    });
  }

  placeOrder(products) {
    this.submitted = true;
    this.productDetail = [];
      this.productDetail.push(products);
    if (this.hideAddress) {
      this.checkoutForm.controls['setPassword'].disable();
    }
    if (!this.checkoutForm.valid) {
      return;
    }

    const params: any = {};
    params.productDetails = this.productDetail;
    params.paymentMethod = 2;
    params.shippingFirstName = this.checkoutForm.value.firstName;
    params.shippingLastName = this.checkoutForm.value.lastName;
    params.shippingCompany = this.checkoutForm.value.shippingName;
    params.shippingAddress_1 = this.checkoutForm.value.address;
    params.shippingAddress_2 = this.checkoutForm.value.addressLine;
    params.shippingCity = this.checkoutForm.value.city;
    params.shippingPostCode = this.checkoutForm.value.zip;
    params.shippingCountryId = this.checkoutForm.value.country;
    params.shippingZone = this.checkoutForm.value.state;
    params.shippingAddressFormat = '';
    params.phoneNumber = this.checkoutForm.value.phone;
    params.emailId = this.checkoutForm.value.email;
    params.password = this.checkoutForm.value.setPassword;
    this.productControlSandbox.placeBackorderProduct(params);

  }

  // destroy the subscribed events while page destroy

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
