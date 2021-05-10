/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../widgets-action/widgets.action';
import { WidgetState, WidgetRecordState } from './widgets.state';
import {cloneDeep} from 'lodash';



export const initialState: WidgetState = new WidgetRecordState() as unknown as WidgetState;

export function reducer(
  state = initialState,
  { type, payload }: any
): WidgetState {
  if (!type) {
    return state;
  }
  switch (type) {


// <------------------WIDGET LIST ---------------> //

    case actions.ActionTypes.DO_WIDGET_LIST: {
      return Object.assign({}, state, {
        bListCountLoaded: true,
        widgetListCountFailed: false,
        widgetListCountLoading: false
      });
    }

    case actions.ActionTypes.DO_WIDGET_LIST_SUCCESS: {
      return Object.assign({}, state, {
        widgetListLoaded: true,
        widgetListFailed: false,
        widgetListLoading: false,
        widgetList: payload.data
      });
    }

    case actions.ActionTypes.DO_WIDGET_LIST_FAIL: {
      return Object.assign({}, state, {
        widgetListLoaded: false,
        widgetListFailed: true,
        widgetListLoading: false
      });
    }

// <------------------WIDGET LIST COUNT---------------> //

    case actions.ActionTypes.DO_WIDGET_LIST_COUNT: {
      return Object.assign({}, state, {
        widgetListCountLoaded: true,
        widgetListCountFailed: false,
        widgetListCountLoading: false
      });
    }

    case actions.ActionTypes.DO_WIDGET_LIST_SUCCESS_COUNT: {
      return Object.assign({}, state, {
        widgetListCount: payload.data,
        widgetListCountLoaded: true,
        widgetListCountFailed: false,
        widgetListCountLoading: false
      });
    }

    case actions.ActionTypes.DO_WIDGET_LIST_FAIL_COUNT: {
      return Object.assign({}, state, {
        widgetListCountLoaded: true,
        widgetListCountFailed: false,
        widgetListCountLoading: false
      });
    }

// <------------------ADD WIDGET ---------------> //

    case actions.ActionTypes.DO_ADD_WIDGET_ACTION: {
      return Object.assign({}, state, {
        widgetAddLoaded: true,
        widgetAddFailed: false,
        widgetAddLoading: false
      });
    }

    case actions.ActionTypes.DO_ADD_WIDGET_SUCCESS: {
      return Object.assign({}, state, {
        widgetAddLoaded: true,
        widgetAddFailed: false,
        widgetAddLoading: false,
        newWidget: payload,
      });
    }

    case actions.ActionTypes.DO_ADD_WIDGET_FAIL: {
      return Object.assign({}, state, {
        widgetAddLoaded: false,
        widgetAddFailed: true,
        widgetAddLoading: false,
      });
    }

// <------------------UPDATE WIDGET ---------------> //

    case actions.ActionTypes.DO_UPDATE_WIDGET_ACTION: {
      return Object.assign({}, state, {
        widgetUpdateLoading: true,
        widgetUpdateLoaded: false,
        widgetUpdateFailed: false
      });
    }

    case actions.ActionTypes.DO_UPDATE_WIDGET_SUCCESS: {
      return Object.assign({}, state, {
        widgetUpdateLoaded: true,
        widgetUpdateFailed: false,
        widgetUpdateLoading: false,
        updateWidget: payload
      });
    }

    case actions.ActionTypes.DO_UPDATE_WIDGET_FAIL: {
      return Object.assign({}, state, {
        widgetUpdateLoaded: false,
        widgetUpdateFailed: true,
        widgetUpdateLoading: false,
        updateWidget: payload
      });
    }

// <------------------DELETE WIDGET ---------------> //

    case actions.ActionTypes.DO_DELETE_WIDGET_ACTION: {
      return Object.assign({}, state, {
        deleteWidget: {},
        widgetDeleteLoading: true,
        widgetDeleteLoaded: false,
        widgetDeleteFailed: false
      });
    }

    case actions.ActionTypes.DO_DELETE_WIDGET_SUCCESS: {
      return Object.assign({}, state, {
        widgetDeleteLoaded: true,
        widgetDeleteFailed: false,
        widgetDeleteLoading: false,
        deleteWidget: payload
      });
    }

    case actions.ActionTypes.DO_WIDGET_PAGINATION_SUCCESS: {
      return Object.assign({}, state, {
        widgetCountLoaded: true,
        widgetCountFailed: false,
        widgetCountLoading: false,
        widgetPagination: payload.widgetcount.data
      });
    }

// <------------------WIDGET LIST BULK DELETE---------------> //

    case actions.ActionTypes.DO_WIDGET_BULK_DELETE: {
      return Object.assign({}, state, {});
    }

    case actions.ActionTypes.DO_WIDGET_BULK_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteWidget: payload
      });
    }

    case actions.ActionTypes.DO_WIDGET_BULK_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteWidget: payload
      });
    }

// <------------------WIDGET LIST OVERALL COUNT (FOR LAYOUT)---------------> //

    case actions.ActionTypes.GET_WIDGET_COUNT: {
      return Object.assign({}, state, {
        getWidgetCount: {},
        getWidgetCountLoading: true,
        getWidgetCountLoaded: false,
        getWidgetCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_WIDGET_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        getWidgetCount: payload.data,
        getWidgetCountLoading: false,
        getWidgetCountLoaded: true,
        getWidgetCountFailed: false,
      });
    }

    case actions.ActionTypes.GET_WIDGET_COUNT_FAIL: {
      return Object.assign({}, state, {
        getWidgetCount: {},
        getWidgetCountLoading: false,
        getWidgetCountLoaded: false,
        getWidgetCountFailed: true,
      });
    }


// <------------------WIDGET DETAILS---------------> //

    case actions.ActionTypes.GET_WIDGET_DETAILS: {
      return Object.assign({}, state, {
        getWidgetDetailsLoaded: false,
        getWidgetDetailsFailed: false,
        getWidgetDetailsLoading: false,
      });
    }

    case actions.ActionTypes.GET_WIDGET_DETAILS_SUCCESS: {
      const productArray = state.productList;
      const categoryArray = state.categoryList;
      let selectedCategoryArray = [];
      let selectedProductArray = [];
      if (payload && payload.data.refId.length > 0) {
        if (payload.data.widgetLinkType === 1) {
         selectedCategoryArray = payload.data.refId.map(data => {
           return { ...data, isChecked: true };
         });
         categoryArray.map(data => {
           selectedCategoryArray.forEach(item => {
             if (data.categoryId === item.categoryId) {
               const opts = { ...data, isChecked: true};
               Object.assign(data, opts);
             }
           });
         });
        } else {
          if (payload.data.widgetLinkType === 2) {
            selectedProductArray = payload.data.refId.map(data => {
              return { ...data, isChecked: true };
            });
            productArray.map(data => {
              selectedProductArray.forEach(item => {
                if (data.productId === item.productId) {
                  const opts = { ...data, isChecked: true};
                  Object.assign(data, opts);
                }
              });
            });
        }
      }

      }
      return Object.assign({}, state, {
        getWidgetDetails: payload.data,
        selectedProductList: selectedProductArray,
        selectedCategoryList: selectedCategoryArray,
        selectedCategoryListOriginal: selectedCategoryArray,
        selectedProductListOriginal: selectedProductArray,
        getWidgetDetailsLoaded: false,
        getWidgetDetailsFailed: false,
        getWidgetDetailsLoading: false,
      });
    }

    case actions.ActionTypes.GET_WIDGET_DETAILS_FAIL: {
      return Object.assign({}, state, {
        getWidgetDetailsLoaded: false,
        getWidgetDetailsFailed: false,
        getWidgetDetailsLoading: false,
      });
    }


// <------------------GET PRODUCT LIST FOR WIDGET---------------> //

    case actions.ActionTypes.DO_PRODUCT_LIST: {
      return Object.assign({}, state, {
        productListLoading: true,
        productListLoaded: false,
        productListFailed: false,
        productRefresh: payload.isRefresh
      });
    }

    case actions.ActionTypes.DO_PRODUCT_LIST_SUCCESS: {
      let selectedProdList = [];
      selectedProdList = state.selectedProductListOriginal;
      let productListArray = [];
      productListArray = state.tempProductList;
      let tempProduct = [];
      let concatArray = [];
      if (payload.data && payload.data.length > 0) {
        tempProduct = payload.data.map(data => {
          return { ...data, isChecked: false };

      });
      }
      if (selectedProdList) {
        tempProduct.map(data => {
          selectedProdList.forEach(item => {
            if (data.productId === item.productId) {
              const opts = { ...data, isChecked: true};
              Object.assign(data, opts);
            }
          });
        });
      }
      if (state.tempProductList && !state.productRefresh) {
        concatArray = [...productListArray, ...tempProduct];
      } else {
        concatArray = tempProduct;
      }

      if (selectedProdList) {
        concatArray = JSON.parse(JSON.stringify(concatArray));
        concatArray.map(data => {
          selectedProdList.forEach(item => {
            if (data.productId === item.productId) {
              const opts = { ...data, isChecked: true};
              Object.assign(data, opts);
            }
          });
        });
      }
      return Object.assign({}, state, {
        productList: concatArray,
        tempProductList: concatArray,
        productListLoading: false,
        productListLoaded: true,
        productListFailed: false,
      });
    }

    case actions.ActionTypes.DO_PRODUCT_LIST_FAIL: {
      return Object.assign({}, state, {
        productListLoading: false,
        productListLoaded: false,
        productListFailed: true,
      });
    }

// <------------------CATEGORY LIST FOR WIDGET---------------> //

    case actions.ActionTypes.DO_CATEGORY_LIST: {
      return Object.assign({}, state, {
        categoryListLoading: true,
        categoryListLoaded: false,
        categoryListFailed: false,
        catSearch: payload.isSearch
      });
    }

    case actions.ActionTypes.DO_CATEGORY_LIST_SUCCESS: {
      let selectedCatList = [];
      selectedCatList = state.selectedCategoryListOriginal;
      let categoryListArray = [];
      categoryListArray = state.tempCategoryList;
      let tempCategory = [];
      let concatCatArray = [];
      if (payload.data && payload.data.length > 0) {
        tempCategory = payload.data.map(data => {
          return { ...data, isChecked: false };

        });
      }
      if (selectedCatList) {
        tempCategory.map(data => {
          selectedCatList.forEach(item => {
            if (data.categoryId === item.categoryId) {
              const opts = { ...data, isChecked: true};
              Object.assign(data, opts);
            }
          });
        });
      }
      if (state.tempCategoryList && !state.catSearch) {
        concatCatArray = [...categoryListArray, ...tempCategory];
      } else {
        concatCatArray = tempCategory;
      }
      return Object.assign({}, state, {
        categoryList: concatCatArray,
        tempCategoryList: concatCatArray,
        categoryListLoading: false,
        categoryListLoaded: true,
        categoryListFailed: false,
      });
    }

    case actions.ActionTypes.DO_CATEGORY_LIST_FAIL: {
      return Object.assign({}, state, {
        categoryListLoading: false,
        categoryListLoaded: false,
        categoryListFailed: true,
      });
    }

// <------------------SELECT PRODUCT WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.SELECT_PRODUCT: {
     let tempSelectedProduct: any = [];
     let changedProductList = state.tempProductList;
     if (state.selectedProductList) {
      tempSelectedProduct = state.selectedProductList;
     }
      if (payload) {
        if (payload.checked) {
         changedProductList = changedProductList.map(data => {
           if (data.productId === payload.product.productId) {
            const opts = { ...data, isChecked: true};
            tempSelectedProduct.push(opts);
             return opts;
           } else {
             return data;
           }
         });
        } else {
          tempSelectedProduct = tempSelectedProduct.filter(data => {
            if (data.productId === payload.product.productId) {
              const opts = { ...data, isChecked: false};
              Object.assign(data, opts);
              return false;
            } else {
              const opts = { ...data, isChecked: true};
              Object.assign(data, opts);
              return true;
            }
          });

        }
      }
      return Object.assign({}, state, {
        selectedProductList: tempSelectedProduct,
        selectedProductListOriginal: tempSelectedProduct
      });
    }

// <------------------SEARCH PRODUCT WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.SEARCH_PRODUCT: {
      const originalarray = state.tempProductList;
      let tempFiltered = [];
      if (payload) {
        tempFiltered = originalarray.filter((item) => {
          return item.name.toLowerCase().includes(payload.keyword.toLowerCase());
        });
      }
      return Object.assign({}, state, {
        productList: tempFiltered
      });
    }


// <------------------SEARCH SELECTED PRODUCT WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.SEARCH_SELECTED_PRODUCT: {
      const originalarray = state.selectedProductListOriginal;
      let tempFiltered = [];
      if (payload) {
        tempFiltered = originalarray.filter((item) => {
          return item.name.toLowerCase().includes(payload.keyword.toLowerCase());
        });
      }
      return Object.assign({}, state, {
        selectedProductList: tempFiltered
      });
    }


// <------------------REMOVE SELECTED PRODUCT WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.CLEAR_SELECTED_PRODUCT: {
     let array = JSON.parse(JSON.stringify(state.tempProductList));
     array = array.map(data => {
      return { ...data, isChecked: false };
     });
      return Object.assign({}, state, {
        selectedProductList: [],
        selectedProductListOriginal: [],
        productList: array,
        tempProductList: array
      });
    }


// <------------------SELECT CATEGORY WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.SELECT_CATEGORY: {
      let tempSelectedCategory: any = [];
      let changedCategoryList = state.tempCategoryList;
      if (state.selectedCategoryList) {
        tempSelectedCategory = state.selectedCategoryList;
      }
       if (payload) {
         if (payload.checked) {
          changedCategoryList = changedCategoryList.map(data => {
            if (data.categoryId === payload.category.categoryId) {
              const opts = { ...data, isChecked: true};
              tempSelectedCategory.push(opts);
              return data;
            } else {
              return data;
            }
          });
         } else {
          tempSelectedCategory = tempSelectedCategory.filter(data => {
             if (data.categoryId === payload.category.categoryId) {
              const opts = { ...data, isChecked: false};
              Object.assign(data, opts);
              return false;
             } else {
              const opts = { ...data, isChecked: true};
              Object.assign(data, opts);
            }
           });
         }
       }
       return Object.assign({}, state, {
         selectedCategoryList: tempSelectedCategory,
         selectedCategoryListOriginal: tempSelectedCategory
       });
     }

// <------------------SEARCH CATEGORY WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.SEARCH_CATEGORY: {
      const originalarray = state.tempCategoryList;
      let tempFiltered = [];
      if (payload) {
        tempFiltered = originalarray.filter((item) => {
          return item.name.toLowerCase().includes(payload.keyword.toLowerCase());
        });
      }
      return Object.assign({}, state, {
        categoryList: tempFiltered
      });
    }

// <------------------SELECT SELECTED CATEGORY WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.SEARCH_SELECTED_CATEGORY: {
      const originalarray = state.selectedCategoryListOriginal;
      let tempFiltered = [];
      if (payload) {
        tempFiltered = originalarray.filter((item) => {
          return item.name.toLowerCase().includes(payload.keyword.toLowerCase());
        });
      }
      return Object.assign({}, state, {
        selectedCategoryList: tempFiltered
      });
    }

// <------------------SELECT SELECTED CATEGORY WHILE ADD WIDGET---------------> //

    case actions.ActionTypes.CLEAR_SELECTED_CATEGORY: {
      let array = JSON.parse(JSON.stringify(state.tempCategoryList));
      array = array.map(data => {
        const opts = { ...data, isChecked: false};
        return opts;
      });
       return Object.assign({}, state, {
         selectedCategoryList: [],
         selectedCategoryListOriginal: [],
         categoryList: array,
         tempCategoryList: array
       });
     }

// <------------------CLEAR WIDGET---------------> //

     case actions.ActionTypes.CLEAR: {
       return Object.assign({}, state, {
        categoryList: [],
        productList: [],
        tempProductList: [],
        tempCategoryList: [],
        selectedCategoryList: [],
        selectedCategoryListOriginal: [],
        selectedProductList: [],
        selectedProductListOriginal: [],
        getWidgetDetails: {}
       });
     }

    default: {
      return state;
    }
  }
}

export const widgetAddLoaded = (state: WidgetState) => state.widgetAddLoaded;
export const widgetAddFailed = (state: WidgetState) => state.widgetAddFailed;
export const widgetAddLoading = (state: WidgetState) =>
  state.widgetAddLoading;

export const widgetUpdateLoading = (state: WidgetState) =>
  state.widgetUpdateLoading;
export const widgetUpdateLoaded = (state: WidgetState) =>
  state.widgetUpdateLoaded;
export const widgetUpdateFailed = (state: WidgetState) =>
  state.widgetUpdateFailed;

export const widgetDeleteLoading = (state: WidgetState) =>
  state.widgetDeleteLoading;
export const widgetDeleteLoaded = (state: WidgetState) =>
  state.widgetDeleteLoaded;
export const widgetDeleteFailed = (state: WidgetState) =>
  state.widgetDeleteFailed;

export const widgetPagination = (state: WidgetState) =>
  state.widgetPagination;
export const widgetCountLoading = (state: WidgetState) =>
  state.widgetCountLoading;
export const widgetCountLoaded = (state: WidgetState) =>
  state.widgetCountLoaded;
export const widgetCountFailed = (state: WidgetState) =>
  state.widgetCountFailed;

export const widgetListLoaded = (state: WidgetState) =>
  state.widgetListLoaded;
export const widgetListFailed = (state: WidgetState) =>
  state.widgetListFailed;
export const widgetListLoading = (state: WidgetState) =>
  state.widgetListLoading;
export const widgetList = (state: WidgetState) => state.widgetList;

export const getAddWidget = (state: WidgetState) => state.newWidget;
export const updateWidget = (state: WidgetState) => state.updateWidget;
export const deleteWidget = (state: WidgetState) => state.deleteWidget;

export const widgetListCount = (state: WidgetState) => state.widgetListCount;
export const widgetListCountLoaded = (state: WidgetState) =>
  state.widgetListCountLoaded;
export const widgetListCountFailed = (state: WidgetState) =>
  state.widgetListCountFailed;
export const widgetListCountLoading = (state: WidgetState) =>
  state.widgetListCountLoading;

export const widgetListActive = (state: WidgetState) =>
  state.widgetListActive;

export const widgetListInActive = (state: WidgetState) =>
  state.widgetListInActive;

export const getWidgetCount = (state: WidgetState) =>
  state.getWidgetCount;
export const getWidgetCountLoading = (state: WidgetState) =>
  state.getWidgetCountLoading;
export const getWidgetCountLoaded = (state: WidgetState) =>
  state.getWidgetCountLoaded;
export const getWidgetCountFailed = (state: WidgetState) =>
  state.getWidgetCountFailed;


export const getWidgetDetails = (state: WidgetState) =>
  state.getWidgetDetails;
export const getWidgetDetailsLoaded = (state: WidgetState) =>
  state.getWidgetDetailsLoaded;
export const getWidgetDetailsLoading = (state: WidgetState) =>
  state.getWidgetDetailsLoading;
export const getWidgetDetailsFailed = (state: WidgetState) =>
  state.getWidgetDetailsFailed;

export const productList = (state: WidgetState) =>
  state.productList;
export const productListLoading = (state: WidgetState) =>
  state.productListLoading;
export const productListLoaded = (state: WidgetState) =>
  state.productListLoaded;
export const productListFailed = (state: WidgetState) =>
  state.productListFailed;

export const categoryList = (state: WidgetState) =>
  state.categoryList;
export const categoryListLoading = (state: WidgetState) =>
  state.categoryListLoading;
export const categoryListLoaded = (state: WidgetState) =>
  state.categoryListLoaded;
export const categoryListFailed = (state: WidgetState) =>
  state.categoryListFailed;

  export const selectedProductList = (state: WidgetState) =>
  state.selectedProductList;

 export const selectedCategoryList = (state: WidgetState) =>
  state.selectedCategoryList;

