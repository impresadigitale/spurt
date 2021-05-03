/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/cart.action';
import { CartState, CartRecord } from './cart.state';
export const initialState: CartState = (new CartRecord() as unknown) as CartState;
export function reducer(
  state = initialState,
  { type, payload }: any
): CartState {
  if (!type) {
    return state;
  }
  switch (type) {

// <------------ GET CART COUNT -----------> //

    case actions.ActionTypes.GET_CART_COUNT: {
      return Object.assign({}, state, {
        cartCountLoading: true,
        cartCountLoaded: false,
        cartCountFailed: false
      });
    }

    case actions.ActionTypes.GET_CART_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        cartCount: payload.data,
        cartCountLoading: false,
        cartCountLoaded: true,
        cartCountFailed: false
      });
    }
    case actions.ActionTypes.GET_CART_COUNT_FAIL: {
      return Object.assign({}, state, {
        cartCount: 0,
        cartCountLoading: false,
        cartCountLoaded: true,
        cartCountFailed: true
      });
    }


// <------------ ADD TO CART (IF CUSTOMER LOGED IN) -----------> //

    case actions.ActionTypes.ADD_TO_CART: {
      return Object.assign({}, state, {
        AddToCartLoading: true,
        AddToCartLoaded: false,
        AddToCartFailed: false
      });
    }

    case actions.ActionTypes.ADD_TO_CART_SUCCESS: {
      return Object.assign({}, state, {
        addToCart: payload.data,
        AddToCartLoading: false,
        AddToCartLoaded: true,
        AddToCartFailed: false
      });
    }
    case actions.ActionTypes.ADD_TO_CART_FAIL: {
      return Object.assign({}, state, {
        AddToCartLoading: false,
        AddToCartLoaded: true,
        AddToCartFailed: true
      });
    }


// <------------ DELETE CART ITEMS (IF CUSTOMER LOGED IN) -----------> //

    case actions.ActionTypes.DELETE_FROM_CART: {
      return Object.assign({}, state, {
        deleteFromCartLoading: true,
        deleteFromCartLoaded: false,
        deleteFromCartFailed: false
      });
    }

    case actions.ActionTypes.DELETE_FROM_CART_SUCCESS: {
      return Object.assign({}, state, {
        deleteFromCart: payload.data,
        deleteFromCartLoading: false,
        deleteFromCartLoaded: true,
        deleteFromCartFailed: false
      });
    }
    case actions.ActionTypes.DELETE_FROM_CART_FAIL: {
      return Object.assign({}, state, {
        deleteFromCartLoading: false,
        deleteFromCartLoaded: true,
        deleteFromCartFailed: true
      });
    }


  // <------------ GET CART LIST (WHILE REFRESH OR AGAIN LOGED IN) -----------> //

    case actions.ActionTypes.GET_CART_LIST: {
      return Object.assign({}, state, {
        getcartLoading: true,
        getcartLoaded: false,
        getcartFailed: false
      });
    }

    case actions.ActionTypes.GET_CART_LIST_SUCCESS: {
      const tempCartDetails = [];
      if (payload.data && payload.data.cartList && payload.data.cartList.length > 0) {
        payload.data.cartList.forEach((data: any) => {
          let temp: any = {};
          temp = data;
          temp.productCount = data.quantity;
          temp.productOption = [];
          temp._optionValueArray = [];
          temp._totalOptions = 0;
          temp.tirePrice = data.tirePrice !== '0.00' ? data.tirePrice : '';
          if (data.optionName) {
            const additionalParams = data.optionName !== null ? JSON.parse(data.optionName) : false;
            temp.productOption = additionalParams.options;
            temp._totalOptions = additionalParams.totalOptions ? additionalParams.totalOptions : 0;
            temp._optionValueArray = additionalParams.optionValueArray ? additionalParams.optionValueArray : [];
          }
          if (data.isSimplified === 0) {
            temp.variantTirePrice = data.productTirePrices;
          }
          tempCartDetails.push(temp);
        });
      }
      for (let i = 0; i < tempCartDetails.length; i++) {
        if (tempCartDetails[i].pricerefer) {
          const tempPrice = tempCartDetails[i].pricerefer.split('.');
          let subractPrice = tempPrice[0] - tempCartDetails[i].price;
          if (subractPrice < 0) {
            subractPrice = subractPrice / -1;
          }
          const dividePrice = tempCartDetails[i].price / 100;
          const sumPrice = subractPrice / dividePrice;
          const sumPriceInString = sumPrice.toString();
          const percentage = sumPriceInString.split('.');
          tempCartDetails[i].discount = percentage[0];
        }
        if (tempCartDetails[i].productOptions && tempCartDetails[i].productOptions.length > 0) {
          const array = [];
          tempCartDetails[i].productOptions.forEach(option => {
            array.push(option.productOptionValueId);
          });
          tempCartDetails[i].selectedOptions = array;
        } else {
          tempCartDetails[i].selectedOptions = [];
        }
      }

      return Object.assign({}, state, {
        cartList: tempCartDetails,
        getcartLoading: false,
        getcartLoaded: true,
        getcartFailed: false
      });
    }
    case actions.ActionTypes.GET_CART_LIST_FAIL: {
      return Object.assign({}, state, {
        getcartLoading: false,
        getcartLoaded: true,
        getcartFailed: true
      });
    }


    default: {
      return state;
    }
  }
}

export const getCartCount = (state: CartState) => state.cartCount;
export const addToCart = (state: CartState) => state.addToCart;
export const DeleteFromCart = (state: CartState) => state.deleteFromCart;
export const AddToCartValid = (state: CartState) => state.addToCartValid;
export const cartList = (state: CartState) => state.cartList;

export const getCartCountLoading = (state: CartState) =>
  state.cartCountLoading;
export const getCartCountLoaded = (state: CartState) =>
  state.cartCountLoaded;
export const getCartCountFailed = (state: CartState) =>
  state.cartCountFailed;

export const AddToCartLoading = (state: CartState) =>
  state.AddToCartLoading;
export const AddToCartLoaded = (state: CartState) => state.AddToCartLoaded;
export const AddToCartFailed = (state: CartState) => state.AddToCartFailed;
export const DeleteFromCartLoading = (state: CartState) =>
  state.deleteFromCartLoading;
export const DeleteFromCartLoaded = (state: CartState) => state.deleteFromCartLoaded;
export const DeleteFromCartFailed = (state: CartState) => state.deleteFromCartFailed;

export const GetCartListLoading = (state: CartState) =>
  state.getcartLoading;
export const GetCartListLoaded = (state: CartState) =>
  state.getcartLoaded;
export const GetCartListFailed = (state: CartState) =>
  state.getcartFailed;
