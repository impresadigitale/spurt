/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/product-control.action';
import {
  productControlRecord,
  ProductControlState
} from './product-control.state';
import * as cloneDeep from 'lodash/cloneDeep';
import { PaymentSetting } from '../models/payment-settings.model';
export const initialState: ProductControlState = (new productControlRecord() as unknown) as ProductControlState;

export function reducer(
  state = initialState,
  { type, payload }: any
): ProductControlState {
  if (!type) {
    return state;
  }
  switch (type) {


// <------------ ADD PRODUCT TO WISHLIST -----------> //

    case actions.ActionTypes.ADD_TO_WISHLIST: {
      return Object.assign({}, state, {
        whislistLoading: true,
        checkedOut: {}
      });
    }

    case actions.ActionTypes.ADD_TO_WISHLIST_SUCCESS: {
      return Object.assign({}, state, {
        whislistLoading: false,
        checkedOut: {}
      });
    }

    case actions.ActionTypes.ADD_TO_WISHLIST_FAIL: {
      return Object.assign({}, state, {
        whislistLoading: false,
        checkedOut: {}
      });
    }


// <------------ GET PAYMENT SETTING LIST -----------> //


    case actions.ActionTypes.GET_PAYMENT_SETTINGS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.GET_PAYMENT_SETTINGS_SUCCESS: {
      const tempMode = payload.data.map(modes => {
        const temp = new PaymentSetting(modes);
        return temp;
      });
      return Object.assign({}, state, {
        paymentMode: tempMode
      });
    }

    case actions.ActionTypes.GET_PAYMENT_SETTINGS_FAIL: {
      return Object.assign({}, state, {});
    }

// <------------ CART HANDLE  -----------> //

    case actions.ActionTypes.CART_HANDLE_ACTION: {
      let tempArray: any = [];
      const clonedPayload = cloneDeep(payload.products);
      /** store the available option as an array in the productDetail list
       * delete duplicate element and store the value
       * convert price or pricerefer value (string to number)
       **/
      if (payload.products[0]) {
        let arrayProductDetail: any;
        arrayProductDetail = clonedPayload;
        for (let i = 0; i < clonedPayload.length; i++) {
          const optionsSelected: any = payload.products[i]._optionValueArray;
          if (payload.products[i]._optionValueArray) {
            if (payload.products[i]._optionValueArray.length > 0) {
              for (
                let hh = 0;
                hh < clonedPayload[i]._optionValueArray.length;
                hh++
              ) {
                for (let w = 0; w < arrayProductDetail.length; w++) {
                  if (arrayProductDetail[w]) {
                    if (arrayProductDetail[w].productOption) {
                      for (
                        let y = 0;
                        y < arrayProductDetail[w].productOption.length;
                        y++
                      ) {
                        if (
                          arrayProductDetail[w].productOption[y].optionValue
                        ) {
                          const tempOptionValueArray: any =
                            arrayProductDetail[w].productOption[y].optionValue;
                          for (
                            let p = 0;
                            p < tempOptionValueArray.length;
                            p++
                          ) {
                            if (
                              tempOptionValueArray[p].optionValueName ===
                              clonedPayload[i]._optionValueArray[hh]
                            ) {
                              const object: any = {};
                              object.name =
                                arrayProductDetail[w].productOption[
                                  y
                                ].optionname;
                              object.value =
                                clonedPayload[i]._optionValueArray[hh];
                              object.amount =
                                tempOptionValueArray[p].price;
                              object.type = tempOptionValueArray[p].pricePrefix;
                              tempArray.push(object);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              // re-assign array with option name and option values
              const tempProductOptionsArray: any = [];
              if (clonedPayload[i].productOption) {
                for (
                  let gg = 0;
                  gg < clonedPayload[i].productOption.length;
                  gg++
                ) {
                  const productOption = clonedPayload[i].productOption;
                  if (clonedPayload[i].productOption[gg]['optionValue']) {
                    const optionValue = productOption[gg]['optionValue'];
                    for (let h = 0; h < optionValue.length; h++) {
                      const param: any = {};
                      param.productOptionId = productOption[gg].productOptionId;
                      param.productOptionValueId =
                        productOption[gg].optionValue[h].productOptionValueId;
                      param.name = productOption[gg].optionname;
                      param.value =
                        productOption[gg].optionValue[h].optionValueName;
                      param.type = productOption[gg].optiontype;
                      param.amount = productOption[gg].optionValue[h].price;
                      param.amountType = productOption[gg].optionValue[h].pricePrefix;

                      tempProductOptionsArray.push(param);
                    }
                  }
                }
              }
              clonedPayload[i].productOption = tempProductOptionsArray;
              let tempOptionsArray: any = [];
              for (let j = 0; j < clonedPayload[i].productOption.length; j++) {
                for (let k = 0; k < optionsSelected.length; k++) {
                  if (
                    clonedPayload[i].productOption[j].value ===
                    optionsSelected[k]
                  ) {
                    tempOptionsArray.push(clonedPayload[i].productOption[j]);

                  }
                }
              }
              clonedPayload[i].productOption = tempOptionsArray;

              tempOptionsArray = [];
            } else {
              const emptyValue: any = {};
              emptyValue.name = '';
              emptyValue.value = '';
              tempArray.push(emptyValue);
            }
            if (payload.products[i]._optionValueArray.length > 0) {

              for (let k = 0; k < tempArray.length; k++) {
                if (tempArray[k] && tempArray[k]['name']) {
                  for (let l = k + 1; l < tempArray.length; l++) {
                    if (tempArray[k]) {
                      if (tempArray[l]['name'] && tempArray[k]['name']) {
                        if (tempArray[k].name === tempArray[l].name) {
                          if (tempArray[k].value === tempArray[l].value) {
                            tempArray.splice(l, 1);
                            k--;
                            l--;
                          } else {
                            tempArray[k].value += ',' + tempArray[l].value;
                            tempArray.splice(l, 1);
                            k--;
                            l--;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            clonedPayload[i]._optionValueArray = tempArray;
            tempArray = [];
          }
        }
      }
      if (clonedPayload[0]) {
        for (let j = 0; j < clonedPayload.length; j++) {
          if (clonedPayload[j].pricerefer) {
            const tempPricePrefer = +parseFloat(clonedPayload[j].pricerefer).toFixed(2);
            clonedPayload[j].pricerefer = tempPricePrefer;
          } else {
            const tempPriceOne = +parseFloat(clonedPayload[j].price).toFixed(2);
            clonedPayload[j].price = tempPriceOne;
          }
        }
      } else {
        if (clonedPayload.pricerefer) {
          const tempPricePrefer = +parseFloat(clonedPayload.pricerefer).toFixed(2);
          clonedPayload.pricerefer = tempPricePrefer;
        } else {
          const tempPriceTwo = +parseFloat(clonedPayload.price).toFixed(2);
          payload.products.price = tempPriceTwo;
        }
      }
      const tempPrice = +parseFloat(clonedPayload.price).toFixed(2);
      payload.products.price = tempPrice;

      return Object.assign({}, state, {
        cartList: clonedPayload,
        cartCount: payload.productTotal,
        totalCartPrice: payload.totalPrice,
        checkedOut: {}
      });
    }


// <------------ PLACE THE ORDER -----------> //

    case actions.ActionTypes.DO_CHECKOUT: {
      return Object.assign({}, state, {
        checkedOut: {},
        checkoutLoading: true,
        checkoutLoaded: false,
        checkoutFailed: false
      });
    }

    case actions.ActionTypes.DO_CHECKOUT_SUCCESS: {
      return Object.assign({}, state, {
        checkedOut: payload.data,
        checkoutLoading: false,
        checkoutLoaded: true,
        checkoutFailed: false
      });
    }

    case actions.ActionTypes.DO_CHECKOUT_FAIL: {
      return Object.assign({}, state, {
        checkedOut: {},
        checkoutLoading: false,
        checkoutLoaded: true,
        checkoutFailed: true
      });
    }


// <------------ APPLY COUPON -----------> //

    case actions.ActionTypes.APPLY_COUPON: {
      return Object.assign({}, state, {
        applyCoupon: {},
        applyCouponLoading: true,
        applyCouponLoaded: false,
        applyCouponFailed: false
      });
    }

    case actions.ActionTypes.APPLY_COUPON_SUCCESS: {
      return Object.assign({}, state, {
        applyCoupon: payload,
        applyCouponLoading: false,
        applyCouponLoaded: true,
        applyCouponFailed: false
      });
    }

    case actions.ActionTypes.APPLY_COUPON_FAIL: {
      return Object.assign({}, state, {
        applyCoupon: {},
        applyCouponLoading: false,
        applyCouponLoaded: true,
        applyCouponFailed: true
      });
    }


    // selected options
    case actions.ActionTypes.DO_SELECTED_OPTIONS: {
      const tempArray: any = [];
      tempArray.push(payload._optionValueArray);
      return Object.assign({}, state, {
        selectedOptions: tempArray
      });
    }
    // available options
    case actions.ActionTypes.DO_AVAILABLE_OPTIONS: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_AVAILABLE_OPTIONS_SUCCESS: {
      return Object.assign({}, state, {
        optionsAvailable: payload
      });
    }


// <------------ CHECK PRODUCT AVAILABILITY WITH DELIVERY LOCATION -----------> //

    case actions.ActionTypes.CHECK_PRODUCT_AVAILABILITY: {
      return Object.assign({}, state, {
        checkProductAvailabilityData: {},
        checkProductAvailabilityLoading: true,
        checkProductAvailabilityLoaded: false,
        checkProductAvailabilityFailed: false
      });
    }

    case actions.ActionTypes.CHECK_PRODUCT_AVAILABILITY_SUCCESS: {
      return Object.assign({}, state, {
        checkProductAvailabilityData: payload,
        checkProductAvailabilityLoading: false,
        checkProductAvailabilityLoaded: true,
        checkProductAvailabilityFailed: false
      });
    }

    case actions.ActionTypes.CHECK_PRODUCT_AVAILABILITY_FAIL: {
      return Object.assign({}, state, {
        checkProductAvailabilityData: {},
        checkProductAvailabilityLoading: false,
        checkProductAvailabilityLoaded: true,
        checkProductAvailabilityFailed: true
      });
    }



// <------------  BOOK THE PRODUCT (IF PRODUCT COUNT LESS THAN MIN CART QUANTITY) -----------> //

    case actions.ActionTypes.DO_BACKORDER_CHECKOUT: {
      return Object.assign({}, state, {
        backorderCheckout: {},
        backorderCheckoutLoading: true,
        backorderCheckoutLoaded: false,
        backorderCheckoutFailed: false,
      });
    }

    case actions.ActionTypes.DO_BACKORDER_CHECKOUT_SUCCESS: {
      return Object.assign({}, state, {
        backorderCheckout: payload.data,
        backorderCheckoutLoading: false,
        backorderCheckoutLoaded: true,
        backorderCheckoutFailed: false,
      });
    }

    case actions.ActionTypes.DO_BACKORDER_CHECKOUT_FAIL: {
      return Object.assign({}, state, {
        backorderCheckout: {},
        backorderCheckoutLoading: false,
        backorderCheckoutLoaded: false,
        backorderCheckoutFailed: true,
      });
    }


// <------------ HANDLE BACKORDER -----------> //

    case actions.ActionTypes.HANDLE_BACKORDER_ACTION: {
      let tempProducts: any = {};
      let tempArray: any = [];

      if (payload.products) {
        tempProducts = payload.products;
      }

      if (payload.products) {
        let arrayProductDetail: any;
        arrayProductDetail = payload.products;
        const optionsSelected: any = tempProducts._optionValueArray;
        if (tempProducts._optionValueArray) {
          if (tempProducts._optionValueArray.length > 0) {
            for (
              let hh = 0;
              hh < tempProducts._optionValueArray.length;
              hh++
            ) {
              if (arrayProductDetail) {
                if (arrayProductDetail.productOption) {
                  for (
                    let y = 0;
                    y < arrayProductDetail.productOption.length;
                    y++
                  ) {
                    if (
                      arrayProductDetail.productOption[y].optionValue
                    ) {
                      const tempOptionValueArray: any =
                        arrayProductDetail.productOption[y].optionValue;
                      for (
                        let p = 0;
                        p < tempOptionValueArray.length;
                        p++
                      ) {
                        if (
                          tempOptionValueArray[p].optionValueName ===
                          tempProducts._optionValueArray[hh]
                        ) {
                          const object: any = {};
                          object.name =
                            arrayProductDetail.productOption[
                              y
                            ].optionname;
                          object.value =
                            tempProducts._optionValueArray[hh];
                          tempArray.push(object);
                        }
                      }
                    }
                  }
                }
              }

            }
            // re-assign array with option name and option values
            const tempProductOptionsArray: any = [];
            if (tempProducts.productOption) {
              for (
                let gg = 0;
                gg < tempProducts.productOption.length;
                gg++
              ) {
                const productOption = tempProducts.productOption;
                if (tempProducts.productOption[gg]['optionValue']) {
                  const optionValue = productOption[gg]['optionValue'];
                  for (let h = 0; h < optionValue.length; h++) {
                    const param: any = {};
                    param.productOptionId = productOption[gg].productOptionId;
                    param.productOptionValueId =
                      productOption[gg].optionValue[h].productOptionValueId;
                    param.name = productOption[gg].optionname;
                    param.value =
                      productOption[gg].optionValue[h].optionValueName;
                    param.type = productOption[gg].optiontype;
                    tempProductOptionsArray.push(param);
                  }
                }
              }
            }
            tempProducts.productOption = tempProductOptionsArray;
            let tempOptionsArray: any = [];
            for (let j = 0; j < tempProducts.productOption.length; j++) {
              for (let k = 0; k < optionsSelected.length; k++) {
                if (
                  tempProducts.productOption[j].value ===
                  optionsSelected[k]
                ) {
                  tempOptionsArray.push(tempProducts.productOption[j]);
                }
              }
            }
            tempProducts.productOption = tempOptionsArray;
            tempOptionsArray = [];
          } else {
            const emptyValue: any = {};
            emptyValue.name = '';
            emptyValue.value = '';
            tempArray.push(emptyValue);
          }
          if (tempProducts._optionValueArray.length > 0) {
            for (let k = 0; k < tempArray.length; k++) {
              if (tempArray[k] && tempArray[k]['name']) {
                for (let l = k + 1; l < tempArray.length; l++) {
                  if (tempArray[k]) {
                    if (tempArray[l]['name'] && tempArray[k]['name']) {
                      if (tempArray[k].name === tempArray[l].name) {
                        if (tempArray[k].value === tempArray[l].value) {
                          tempArray.splice(l, 1);
                          k--;
                          l--;
                        } else {
                          tempArray[k].value += ',' + tempArray[l].value;
                          tempArray.splice(l, 1);
                          k--;
                          l--;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          tempProducts._optionValueArray = cloneDeep(tempArray);
          tempArray = [];
        }
      }


      if (payload.products) {
        if (tempProducts.pricerefer) {
          const tempPricePrefer = +parseFloat(tempProducts.pricerefer).toFixed(2);
          tempProducts.pricerefer = tempPricePrefer;
        } else {
          const tempPriceTwo = +parseFloat(tempProducts.price).toFixed(2);
          tempProducts.price = tempPriceTwo;
        }
      }
      const tempPrice = +parseFloat(tempProducts.price).toFixed(2);
      tempProducts.price = tempPrice;
      return Object.assign({}, state, {
        backorderProduct: tempProducts,
        backorderTotal: payload.totalPrice,
      });
    }


    // selected options
    case actions.ActionTypes.DO_BACKORDER_SELECTED_OPTIONS: {
      const tempArray: any = [];
      tempArray.push(payload._optionValueArray);
      return Object.assign({}, state, {
        selectedBackorderOptions: tempArray
      });
    }

    case actions.ActionTypes.CLEAR_BACKORDER_CHECKOUT: {
      return Object.assign({}, state, {
        backorderCheckout: {},
      });
    }


// <------------ MAKE QUOTATION -----------> //

    case actions.ActionTypes.MAKE_QUATATION: {
      return Object.assign({}, state, {
        makeQuatation: {},
        makeQuatationLoading: true,
        makeQuatationLoaded: false,
        makeQuatationFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_QUATATION_SUCCESS: {
      return Object.assign({}, state, {
        makeQuatation: payload,
        makeQuatationLoading: false,
        makeQuatationLoaded: true,
        makeQuatationFailed: false,
      });
    }

    case actions.ActionTypes.MAKE_QUATATION_FAIL: {
      return Object.assign({}, state, {
        makeQuatation: {},
        makeQuatationLoading: false,
        makeQuatationLoaded: false,
        makeQuatationFailed: true,
      });
    }


    default: {
      return state;
    }
  }
}

export const getCartList = (state: ProductControlState) => state.cartList;
export const getCartListCount = (state: ProductControlState) => state.cartCount;
export const getTotalCartPrice = (state: ProductControlState) =>
  state.totalCartPrice;
export const getCheckedOut = (state: ProductControlState) => state.checkedOut;

export const getCheckoutLoading = (state: ProductControlState) =>
  state.checkoutLoading;
export const getCheckoutLoaded = (state: ProductControlState) =>
  state.checkoutLoaded;
export const getCheckoutFailed = (state: ProductControlState) =>
  state.checkoutFailed;

export const getOptionsAvailable = (state: ProductControlState) =>
  state.optionsAvailable;
export const getPaymentMode = (state: ProductControlState) => state.paymentMode;
export const getWhislistLoading = (state: ProductControlState) =>
  state.whislistLoading;
export const getCheckProductAvailability = (state: ProductControlState) => state.checkProductAvailabilityData;

export const getCheckProductAvailabilityLoading = (state: ProductControlState) =>
  state.checkProductAvailabilityLoading;
export const getCheckProductAvailabilityLoaded = (state: ProductControlState) =>
  state.checkProductAvailabilityLoaded;
export const getCheckProductAvailabilityFailed = (state: ProductControlState) =>
  state.checkProductAvailabilityFailed;
export const getApplyCoupon = (state: ProductControlState) => state.applyCoupon;

export const getApplyCouponLoading = (state: ProductControlState) =>
  state.applyCouponLoading;
export const getApplyCouponLoaded = (state: ProductControlState) =>
  state.applyCouponLoaded;
export const getApplyCouponFailed = (state: ProductControlState) =>
  state.applyCouponFailed;


export const backorderCheckout = (state: ProductControlState) =>
  state.backorderCheckout;
export const backorderCheckoutLoading = (state: ProductControlState) =>
  state.backorderCheckoutLoading;
export const backorderCheckoutLoaded = (state: ProductControlState) =>
  state.backorderCheckoutLoaded;

export const backorder = (state: ProductControlState) =>
  state.backorder;
export const backorderProduct = (state: ProductControlState) =>
  state.backorderProduct;
export const backorderTotal = (state: ProductControlState) =>
  state.backorderTotal;

export const makeQuatation = (state: ProductControlState) =>
  state.makeQuatation;
export const makeQuatationLoading = (state: ProductControlState) =>
  state.makeQuatationLoading;
export const makeQuatationLoaded = (state: ProductControlState) =>
  state.makeQuatationLoaded;

