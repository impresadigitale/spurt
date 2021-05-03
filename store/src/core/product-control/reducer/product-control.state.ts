/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Map, Record } from 'immutable';
import { PaymentSetting } from '../models/payment-settings.model';

export interface ProductControlState extends Map<string, any> {
  wishlist: any;
  cartList: any;
  selectedOptions: any;
  optionsAvailable: any;
  cartCount: any;
  totalCartPrice: any;
  checkedOut: any;
  checkoutLoading: any;
  checkoutLoaded: any;
  checkoutFailed: any;
  checkProductAvailabilityData: any;
  checkProductAvailabilityLoading: any;
  checkProductAvailabilityLoaded: any;
  checkProductAvailabilityFailed: any;
  applyCoupon: any;
  applyCouponLoading: any;
  applyCouponLoaded: any;
  applyCouponFailed: any;
  paymentMode: Array<PaymentSetting>;
  whislistLoading: boolean;
  backorder: any;
  backorderProduct: any;
  backorderTotal: any;
  selectedBackorderOptions: any;


  backorderCheckout: any;
  backorderCheckoutLoading: boolean;
  backorderCheckoutLoaded: boolean;
  backorderCheckoutFailed: boolean;

  makeQuatation: any;
  makeQuatationLoading: boolean;
  makeQuatationLoaded: boolean;
  makeQuatationFailed: boolean;

}


export const productControlRecord = Record({
  wishlist: [],
  cartList: [],
  cartCount: [],
  totalCartPrice: [],
  checkedOut: [],
  optionsAvailable: {},
  selectedOptions: [],
  paymentMode: [],
  backorder: [],
  backorderProduct: {},
  backorderTotal: '',
  selectedBackorderOptions: [],

  checkoutLoading: false,
  checkoutLoaded: false,
  checkoutFailed: false,
  whislistLoading: false,

  checkProductAvailabilityData: {},
  checkProductAvailabilityLoading: false,
  checkProductAvailabilityLoaded: false,
  checkProductAvailabilityFailed: false,

  applyCoupon: {},
  applyCouponLoading: false,
  applyCouponLoaded: false,
  applyCouponFailed: false,

  backorderCheckout: {},
  backorderCheckoutLoading: false,
  backorderCheckoutLoaded: false,
  backorderCheckoutFailed: false,

  makeQuatation: {},
  makeQuatationLoading: false,
  makeQuatationLoaded: false,
  makeQuatationFailed: false,

});
