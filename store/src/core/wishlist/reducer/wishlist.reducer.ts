/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/wishlist.action';
import construct = Reflect.construct;
import { WishlistState, wishlistRecord } from './wishlist.state';

export const initialState: WishlistState = (new wishlistRecord() as unknown) as WishlistState;

export function reducer(
  state = initialState,
  { type, payload }: any
): WishlistState {
  if (!type) {
    return state;
  }
  switch (type) {


// <------------ GET WISHLIST PRODUCT -----------> //

    case actions.ActionTypes.get_wishlist: {
      return Object.assign({}, state, {
        wishlist: state.wishlist,
        wishlistLoading: true,
        wishlistLoaded: false,
        wishlistFailed: false
      });
    }

    case actions.ActionTypes.get_wishlist_SUCCESS: {
        for (let i = 0; i < payload.data.length; i++) {
          let tempPriceRef: any;
          tempPriceRef = '';
          const tempPrice = +parseFloat(payload.data[i].product.price).toFixed(2);
          if (payload.data[i].product.pricerefer !== '') {
           tempPriceRef = +parseFloat(
            payload.data[i].product.pricerefer
          ).toFixed(2);
           }
          payload.data[i].product.price = tempPrice;
          payload.data[i].product.pricerefer = tempPriceRef;
        }
        return Object.assign({}, state, {
          wishlist: payload.data,
          wishlistLoading: false,
          wishlistLoaded: true,
          wishlistFailed: false
        });
      }

    case actions.ActionTypes.get_wishlist_FAIL: {
      return Object.assign({}, state, {
        wishlist: [],
        wishlistLoading: false,
        wishlistLoaded: true,
        wishlistFailed: true
      });
    }


    default: {
      return state;
    }
  }
}

export const getWishlist = (state: WishlistState) => state.wishlist;
export const getWishlistLoading = (state: WishlistState) =>
  state.wishlistLoading;
export const getWishlistLoaded = (state: WishlistState) => state.wishlistLoaded;
export const getWishlistFailed = (state: WishlistState) => state.wishlistFailed;
