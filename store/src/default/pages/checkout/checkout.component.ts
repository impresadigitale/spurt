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
  ViewChild,
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
import { MatStepper } from '@angular/material/stepper';
import { emailValidator } from '../../theme/utils/app-validators';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { ConfigService } from '../../../core/service/config.service';
import { AccountSandbox } from '../../../core/account/account.sandbox';
import { CommonSandbox } from '../../../core/common/common.sandbox';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { Router } from '@angular/router';
import { CartSandbox } from '../../../core/cart/cart.sandbox';
import { AccountService } from '../../../core/account/account.service';
import { Title } from '@angular/platform-browser';
import { CustomValidators } from '../../shared/password-validation/custom-password-validation';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {

  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('verticalStepper') verticalStepper: MatStepper;


  // reactive form
  public checkoutForm: FormGroup;
  public firstName: FormControl;
  public lastName: FormControl;
  public company: FormControl;
  public email: FormControl;
  public phone: FormControl;
  public setPassword: FormControl;
  public country: FormControl;
  public city: FormControl;
  public state: FormControl;
  public zip: FormControl;
  public zipCodes: any;
  public address: FormControl;
  public addressLine: FormControl;
  public shippingName: FormControl;
  public sameAsBilling: FormControl;
  public billingCountry: FormControl;
  public billingCity: FormControl;
  public billingState: FormControl;
  public billingZip: FormControl;
  public billingZipCodes: any;
  public billingAddress: FormControl;
  public billingAddressLine: FormControl;
  public billingName: FormControl;
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
  public couponCode = '';
  public seasons = ['a', 'b', 'c'];
  public paymentMethod: FormControl;
  private subscriptions: Array<Subscription> = [];
  public currentUser = JSON.parse(localStorage.getItem('storeUser'));
  public productDetail = [];
  public clearCoupon = false;
  public couponData: string;
  public couponDiscountAmout: any;
  public viewAllAppliedProduct = false;
  public activeAdressId: any;
  public activeBillingAddressId: any;
  public countryId: any;
  public isGstAvailable = false;

   // tire price
   public tirePriceArray: any = [];
   public tirePrice: any;
   public quantity = 0;


  constructor(
    public formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public productControlSandbox: ProductControlSandbox,
    public listsSandbox: ListsSandbox,
    public router: Router,
    public accountSandbox: AccountSandbox,
    public commonSandbox: CommonSandbox,
    public authSandbox: AuthSandbox,
    public configService: ConfigService,
    public cartBaseSandbox: CartSandbox,
    @Inject(PLATFORM_ID) private platformId: Object, public toaster: MatSnackBar,
    public accountService: AccountService,
    private titleService: Title
  ) {}

  // Initially calls initCheckoutForm function
  ngOnInit() {
    this.titleService.setTitle('Checkout');
    this.clearCoupon = true;
    this.couponCode = '';
    this.couponData = '';
    this.initCheckoutForm();
    this.getPaymentSetting();
    this.getSessionData();
    this.subscribeCountry();
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

  subscribeCountry() {
    this.subscriptions.push(this.listsSandbox.countryList$.subscribe(data => {
      if (data && data.length > 0) {
        data.forEach((item) => {
          if (item.isoCode3 === 'IND') {
            this.countryId = item.countryId;
            this.checkoutForm.controls['country'].setValue(this.countryId);
            this.checkoutForm.controls['billingCountry'].setValue(this.countryId);
          }
        });
      }
    }));
  }

  getSessionData() {
    if (isPlatformBrowser(this.platformId)) {
      const params: any = {};
      params.totalPrice = JSON.parse(sessionStorage.getItem('productTotal'));
      params.products = JSON.parse(sessionStorage.getItem('selectedProducts'));
      params.productTotal = JSON.parse(
        sessionStorage.getItem('selectedProductsCount')
      );
      this.productControlSandbox.HandleCart(params);
    }
  }

  // get payment serring
  getPaymentSetting() {
    const params: any = {};
    params.keyword = 'payment';
    this.productControlSandbox.getPaymentSettings(params);
  }

  // calls accountSandbox getAddressList
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

  // create form group for checkout
  initCheckoutForm() {
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
    const nameValidationPattern = '[a-zA-Z \'-,;.]*';

    this.firstName = new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(nameValidationPattern),
        Validators.minLength(3),
        Validators.maxLength(32)
        ]));
    this.lastName = new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(nameValidationPattern),
        Validators.maxLength(32)
        ]));
    this.country = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.compose([
        Validators.required,
        emailValidator,
        Validators.maxLength(96)
       ]));
    this.phone = new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(mobileValidationPattern),
        Validators.maxLength(15),
        Validators.minLength(4)
      ]));
      this.zip = new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(4)
      ]));
    this.setPassword = new FormControl('');
    this.city = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(128),
    ]));
    this.state = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(128),
    ]));
    this.addressLine = new FormControl('', Validators.compose([
      Validators.maxLength(128),
    ]));
    this.paymentMethod = new FormControl('', Validators.required);
    this.address = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(128),
    ]));
    this.shippingName = new FormControl('', Validators.required);
    this.sameAsBilling = new FormControl(true, Validators.required);
    this.billingCountry = new FormControl('');
    this.billingCity = new FormControl('');
    this.billingState = new FormControl('');
    this.billingAddressLine = new FormControl('');
    this.billingAddress = new FormControl('');
    this.billingZip = new FormControl('');
    this.billingName = new FormControl('');


    this.checkoutForm = this.formBuilder.group({
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      email: this.email,
      phone: this.phone,
      setPassword: this.setPassword,
      country: this.country,
      city: this.city,
      state: this.state,
      zip: this.zip,
      address: this.address,
      addressLine: this.addressLine,
      paymentMethod: this.paymentMethod,
      gst: [''],
      shippingName: this.shippingName,

      sameAsBilling: this.sameAsBilling,
      billingCountry: this.billingCountry,
      billingCity: this.billingCity,
      billingState: this.billingState,
      billingZip: this.billingZip,
      billingAddress: this.billingAddress,
      billingAddressLine: this.billingAddressLine,
      billingName: this.billingName,

    });
  }

  // editing billing form
  editAddressList(param) {
    this.checkoutForm.controls['shippingName'].setValue(param.company);
    this.checkoutForm.controls['city'].setValue(param.city);
    this.checkoutForm.controls['state'].setValue(param.state);
    if (typeof param.postcode === 'number') {
      this.zipCodes = parseInt(param.postcode, 10);
      this.checkoutForm.controls['zip'].setValue(this.zipCodes);
    } else {
      this.checkoutForm.controls['zip'].setValue(param.postcode);
    }
    this.checkoutForm.controls['address'].setValue(param.address1);
    this.checkoutForm.controls['addressLine'].setValue(param.address2);
    if (param.countryId) {
      this.country = param.countryId;
      this.checkoutForm.controls['country'].setValue(param.countryId);
    }
  }

  // passes address details to edit
  selectBillingAddress(param) {
    this.activeBillingAddressId = param.addressId;
    this.setBillingAddressList(param);
  }

  billingAddressEventChange(event: any) {
    if (!event.checked) {
      this.checkoutForm.controls['billingCity'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(128),
        ])
      );
      this.checkoutForm.controls['billingCity'].updateValueAndValidity();

      this.checkoutForm.controls['billingState'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(128),
        ])
      );
      this.checkoutForm.controls['billingState'].updateValueAndValidity();

      this.checkoutForm.controls['billingZip'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(4)
        ])
      );
      this.checkoutForm.controls['billingZip'].updateValueAndValidity();

      this.checkoutForm.controls['billingAddress'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(128),
        ])
      );
      this.checkoutForm.controls['billingAddress'].updateValueAndValidity();

      this.checkoutForm.controls['billingCountry'].setValidators([Validators.required]);
      this.checkoutForm.controls['billingCountry'].updateValueAndValidity();

      this.checkoutForm.controls['billingName'].setValidators([Validators.required]);
      this.checkoutForm.controls['billingName'].updateValueAndValidity();

      this.checkoutForm.controls['billingAddressLine'].setValidators(
        Validators.compose([
          Validators.maxLength(128),
        ])
      );
      this.checkoutForm.controls['billingAddressLine'].updateValueAndValidity();
    } else {

      this.checkoutForm.controls['billingCity'].clearValidators();
      this.checkoutForm.controls['billingCity'].updateValueAndValidity();

      this.checkoutForm.controls['billingState'].clearValidators();
      this.checkoutForm.controls['billingState'].updateValueAndValidity();

      this.checkoutForm.controls['billingZip'].clearValidators();
      this.checkoutForm.controls['billingZip'].updateValueAndValidity();

      this.checkoutForm.controls['billingAddress'].clearValidators();
      this.checkoutForm.controls['billingAddress'].updateValueAndValidity();

      this.checkoutForm.controls['billingAddressLine'].clearValidators();
      this.checkoutForm.controls['billingAddressLine'].updateValueAndValidity();

      this.checkoutForm.controls['billingCountry'].clearValidators();
      this.checkoutForm.controls['billingCountry'].updateValueAndValidity();

      this.checkoutForm.controls['billingName'].clearValidators();
      this.checkoutForm.controls['billingName'].updateValueAndValidity();

    }
  }

  // set billing address form
  setBillingAddressList(param) {
    this.checkoutForm.controls['billingCity'].setValue(param.city);
    this.checkoutForm.controls['billingState'].setValue(param.state);
    if (typeof param.postcode === 'number') {
      this.zipCodes = parseInt(param.postcode, 10);
      this.checkoutForm.controls['billingZip'].setValue(this.zipCodes);
    } else {
      this.checkoutForm.controls['billingZip'].setValue(param.postcode);
    }
    this.checkoutForm.controls['billingAddress'].setValue(param.address1);
    this.checkoutForm.controls['billingAddressLine'].setValue(param.address2);
    if (param.countryId) {
      this.country = param.countryId;
      this.checkoutForm.controls['billingCountry'].setValue(param.countryId);
    }
    this.checkoutForm.controls['billingName'].setValue(param.company);
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

  public findInvalidControls() {
    const invalid = [];
    const controls = this.checkoutForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  /**
   * place order with product detail, if the form is valid
   *
   * remove checkout local storage.
   * @param productDetails detail of the product for checkout
   */
  public placeOrder(productDetails) {


    this.submitted = true;
    if (productDetails.length === 0) {
      this.snackBar.open('Add items to place order', '×', {
        panelClass: 'error',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      });
      return;
    }

    if (!this.checkoutForm.valid) {
      return;
    }
    if (this.hideAddress) {
      this.checkoutForm.controls['setPassword'].disable();
    }
    const params = this.checkoutForm.value;

    productDetails = productDetails.map(data => {
      delete data.productOption;
      return data;
    });

    params.productDetail = productDetails;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('storeUserToken')) {
        localStorage.removeItem('checkout');
      }
    }
    if (this.couponData && this.couponData !== '') {
      params.couponData = this.couponData;
      params.couponCode = this.couponCode;
      params.couponDiscountAmount = this.couponDiscountAmout;
     }
    this.productControlSandbox.PlaceOrder(params);
  }
  /**
   * increase or decrease product count
   *
   * @param product added product details
   * @param operation differentiate the operation is increament operation or decrement operation
   */
  changeCount(product, operation) {
    if (product.hasTirePrice === 1) {
      product.productTirePrices.forEach(data => {
        this.tirePriceArray.push(data.quantity);
      });
    }
    if (product.hasStock === 1) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      if (operation) {
        if (product.productCount >= product.minQuantityAllowedCart && product.productCount < product.maxQuantityAllowedCart) {
          this.quantity = Number(product.productCount) + 1;
          this.addToCart(product, operation);
        } else {
          return;
        }
      }
      if (!operation) {
        if (product.productCount === 1) {
          this.quantity = 0;
          this.removeProduct(product);
          return;
        } else if (product.productCount > product.minQuantityAllowedCart) {
          this.quantity = Number(product.productCount) - 1;
          this.addToCart(product, operation);
        } else {
          return;
        }
      }

    } else {

      if (operation) {
        this.quantity = product.productCount + 1;
        this.addToCart(product, operation);

      } else {
        this.quantity = product.productCount - 1;
        this.addToCart(product, operation);
      }
    }
    this.productControlSandbox.ChangeCount(product, operation);
  }



  addToCart(product, operation) {
    this.clearCoupon = true;
    this.couponCode = '';
    this.couponData = '';
    if (this.currentUser) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      params.tirePrice = this.tirePrice;
      params.varientName = product.variantName;
      params.productVarientOptionId = product.variantId;
      params.skuName = product.skuName;
      if (operation) {
        params.quantity = Number(product.productCount) + 1;
      }
      if (!operation) {
        params.quantity = Number(product.productCount) - 1;
      }
      if (product.productOption && product.productOption.length > 0) {
          const tempParams: any = {};
          tempParams.totalOptions = product._totalOptions;
          tempParams.options = product.productOption;
          tempParams.optionValueArray = product._optionValueArray;
          params.optionName = JSON.stringify(tempParams);
          params.optionValueName = '';
      }
      params.productOptionValueId  = product.selectedOptions;
      this.cartBaseSandbox.doAddToCart(params);
    }
  }


  // remove product from the cart, calling removeItemFromCart function from sandbox
  removeProduct(product) {
    this.clearCoupon = true;
    this.couponCode = '';
    this.couponData = '';
    if (this.currentUser) {
      const params: any = {};
      params.productId = product.productId;
      params.productPrice = product.price;
      params.quantity = 0;
      params.varientName = product.variantName;
      params.productVarientOptionId = product.variantId;
      params.skuName = product.skuName;
      params.type = 'new';
      if (product.productOption && product.productOption.length > 0) {
        params.optionName = '';
        params.optionValueName = '';
      }
      params.productOptionValueId  = product.selectedOptions;
      this.cartBaseSandbox.doAddToCart(params);
    }
    this.productControlSandbox.removeItemFromCart(product);
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

  // clear cart, for remove all products in the cart
  public clear() {
    this.couponData = '';
    this.clearCoupon = true;
    this.couponCode = '';
    if (this.currentUser) {
      const params: any = {};
      params.cartId = '';
      this.cartBaseSandbox.deleteFromCart(params);
    }
    this.productControlSandbox.clearCart();
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
      queryParams: { url: '/checkout' }
    });
  }

  getCouponCode(val) {
    this.couponCode = val;
  }

  applyCoupon(data) {
    this.productDetail = [];
    let productData = {};
    data.forEach(datas => {
      if (datas) {
        if (datas.tirePrice !== '') {
          const price = this.calculatePrice(datas._totalOptions, datas.tirePrice, datas.taxType, datas.taxValue);
          productData = {
            productId: datas.productId,
            productPrice: price,
            quantity: datas.productCount,
            total: datas.productCount * price,
            skuName: datas.skuName,
          };
        } else if (datas.pricerefer !== '') {
          const price = this.calculatePrice(datas._totalOptions, datas.pricerefer, datas.taxType, datas.taxValue);
          productData = {
            productId: datas.productId,
            productPrice: price,
            quantity: datas.productCount,
            total: datas.productCount * price,
            skuName: datas.skuName,
          };
        } else {
          const price = this.calculatePrice(datas._totalOptions, datas.price, datas.taxType, datas.taxValue);
          productData = {
            productId: datas.productId,
            productPrice: price,
            quantity: datas.productCount,
            total: datas.productCount * price,
            skuName: datas.skuName,
          };
        }
        this.productDetail.push(productData);
      }
    });
    if (this.couponCode === '') {
       this.toaster.open('Please enter the coupon code', '×', {
        panelClass: 'error',
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 3000
      });
      return;
    }
    const params: any = {};
    params.couponCode = this.couponCode;
    params.emailId = this.checkoutForm.controls['email'].value;
    params.productDetail = this.productDetail;
    this.productControlSandbox.ApplyCoupon(params);
    this.productControlSandbox.applyCouponData$.subscribe(datas => {
      if (datas.couponData) {
        this.clearCoupon = false;
        this.couponData = datas.couponData;
        this.couponDiscountAmout = datas.data.grandDiscountAmount;
      }
    });
  }

  removeDiscount() {
    this.viewAllAppliedProduct = false;
    this.clearCoupon = true;
    this.couponCode = '';
    this.couponData = '';
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  preventData(event: any) {
    event.stopPropagation();
    return;
  }

  // price calculation (tire)

  calculatePrice(option: number, price: number, taxType: number, taxValue: number) {
    switch (taxType) {
      case 1:
        const priceWithOutTax = ((+price) + (+option)) + taxValue;
        return Math.round(priceWithOutTax);
      case 2:
        const percentToAmount = ((+price) + (+option)) * (taxValue / 100);
        const priceWithTax = ((+price) + (+option)) + percentToAmount;
        return Math.round(priceWithTax);
      default:
        return ((+price) + (+option));
    }
  }

  calculateGrandTotal(total, discount) {
    const tempDiscount = (discount  && !this.clearCoupon) ? +discount : 0;
    const tempTotal = (+total) - (tempDiscount) ;
    if (Math.sign(tempTotal) === -1) {
      this.paymentMethod.setValue('2');
      return 0;
    } else {
      return tempTotal;
    }
  }

  // view all applied product

  viewAll() {
    this.viewAllAppliedProduct = true;
  }

  // edit adress
  editAddress(list) {
    this.accountService.setCustomerAddress(list);
    this.router.navigate(['/account/addaddresses_edit', list.addressId]);
  }

  selectCountry(event) {
    this.countryId = +event.target.value;
    if (this.countryId === 99) {
      this.checkoutForm.controls['state'].setValue('');
      this.getZoneList();
    }

  }

  getZoneList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.count = '';
    this.accountSandbox.getZoneList(params);
  }

  gstAvailable(event) {
    if (event.checked) {
      this.checkoutForm.controls['gst'].setValidators(
        Validators.compose([
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(15),
        ])
      );
      this.checkoutForm.controls['gst'].updateValueAndValidity();
      this.isGstAvailable = true;
    } else {
      this.checkoutForm.controls['gst'].clearValidators();
      this.checkoutForm.controls['gst'].updateValueAndValidity();
      this.isGstAvailable = false;
    }

  }

  // destroy the subscribed events while page destroy
  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
      this.removeDiscount();
  }
}
