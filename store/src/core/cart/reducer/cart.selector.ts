/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { createSelector } from 'reselect';

import * as fromCart from './cart.reducer';
import { AppState } from '../../state.interface';

export const getState = (State: AppState) => State.cart;
export const cartCount = createSelector(
  getState,
  fromCart.getCartCount
);
export const addToCart = createSelector(
  getState,
  fromCart.addToCart
);
export const DeleteFromCart = createSelector(
  getState,
  fromCart.DeleteFromCart
);
export const AddToCartValid = createSelector(
  getState,
  fromCart.AddToCartValid
);
export const cartList = createSelector(
  getState,
  fromCart.cartList
);

export const cartCountLoading = createSelector(
  getState,
  fromCart.getCartCountLoading
);
export const cartCountLoaded = createSelector(
  getState,
  fromCart.getCartCountLoaded
);
export const cartCountFailed = createSelector(
  getState,
  fromCart.getCartCountFailed
);

export const addToCartLoading = createSelector(
  getState,
  fromCart.AddToCartLoading
);
export const addToCartLoaded = createSelector(
  getState,
  fromCart.AddToCartLoaded
);
export const addToCartFailed = createSelector(
  getState,
  fromCart.AddToCartFailed
);
export const deleteFromCartLoading = createSelector(
  getState,
  fromCart.DeleteFromCartLoading
);
export const deleteFromCartLoaded = createSelector(
  getState,
  fromCart.DeleteFromCartLoaded
);
export const deleteFromCartFailed = createSelector(
  getState,
  fromCart.DeleteFromCartFailed
);
export const cartLoading = createSelector(
  getState,
  fromCart.GetCartListLoading
);
export const cartLoaded = createSelector(
  getState,
  fromCart.GetCartListLoaded
);
export const cartFailed = createSelector(
  getState,
  fromCart.GetCartListFailed
);
