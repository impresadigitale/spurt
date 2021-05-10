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
import { CartModel } from '../models/cart.model';

export interface CartState extends Map<string, any> {
  cartCount: number;
  addToCart: CartModel;
  deleteFromCart: any;
  cartList: any;

  cartCountLoading: boolean;
  cartCountLoaded: boolean;
  cartCountFailed: boolean;

  AddToCartLoading: boolean;
  addToCartValid: boolean;
  AddToCartLoaded: boolean;
  AddToCartFailed: boolean;

  deleteFromCartLoading: boolean;
  deleteFromCartLoaded: boolean;
  deleteFromCartFailed: boolean;

  getcartLoading: boolean;
  getcartLoaded: boolean;
  getcartFailed: boolean;
}

export const CartRecord = Record({
  cartCount: 0,
  addToCart: null,
  deleteFromCart: {},
  cartList: [],

  cartCountLoading: false,
  cartCountLoaded: false,
  cartCountFailed: false,

  addToCartValid: false,
  AddToCartLoading: false,
  AddToCartLoaded: false,
  AddToCartFailed: false,

  deleteFromCartLoading: false,
  deleteFromCartLoaded: false,
  deleteFromCartFailed: false,

  getcartLoading: false,
  getcartLoaded: false,
  getcartFailed: false
});
