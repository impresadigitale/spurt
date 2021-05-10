/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

// action
import * as actions from '../variants-action/variants.action';
// state
import {
  VariantsState,
  VariantsStateRecord
} from './variants.state';

export const initialState: VariantsState = new VariantsStateRecord() as unknown as VariantsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): VariantsState {
  if (!type) {
    return state;
  }

  switch (type) {
    // product add action
    case actions.ActionTypes.DO_VARIANTS_ADD: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_VARIANTS_ADD_SUCCESS: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: true,
        addFailed: false,
        variantsAdded: payload
      });
    }
    case actions.ActionTypes.DO_VARIANTS_ADD_FAIL: {
      return Object.assign({}, state, {
        addLoading: false,
        addLoaded: false,
        addFailed: true
      });
    }
    // product list action
    case actions.ActionTypes.GET_VARIANTS_LIST: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: false,
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_SUCCESS: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
        variantsList: payload.data
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: false,
        listFailed: true
      });
    }
    // product list count action
    case actions.ActionTypes.GET_VARIANTS_LIST_COUNT: {
      return Object.assign({}, state, {
        listCountLoading: true,
        listCountLoaded: false,
        listCountFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        listCountLoading: false,
        listCountLoaded: true,
        listCountFailed: false,
        variantsListCount: payload.data
      });
    }
    case actions.ActionTypes.GET_VARIANTS_LIST_COUNT_FAIL: {
      return Object.assign({}, state, {
        listCountLoading: false,
        listCountLoaded: false,
        listCountFailed: true
      });
    }

    // product delete action
    case actions.ActionTypes.DO_VARIANTS_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_VARIANTS_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false,
        variantsDelete: payload
      });
    }
    case actions.ActionTypes.DO_VARIANTS_DELETE_FAIL: {
      return Object.assign({}, state, {
        deleteLoading: false,
        deleteLoaded: false,
        deleteFailed: true,
      });
    }
    // product update action
    case actions.ActionTypes.DO_VARIANTS_UPDATE: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.DO_VARIANTS_UPDATE_SUCCESS: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false,
        variantsUpdate: payload
      });
    }
    case actions.ActionTypes.DO_VARIANTS_UPDATE_FAIL: {
      return Object.assign({}, state, {
        updateLoading: false,
        updateLoaded: false,
        updateFailed: true
      });
    }


    case actions.ActionTypes.GET_VARIANTS_DETAILS: {
      return Object.assign({}, state, {
        variantsDetails: {},
        detailsLoading: true,
        detailsLoaded: false,
        detailsFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_DETAILS_SUCCESS: {
      return Object.assign({}, state, {
        variantsDetails: payload.data,
        detailsLoading: false,
        detailsLoaded: true,
        detailsFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIANTS_DETAILS_FAIL: {
      return Object.assign({}, state, {
        detailsLoading: false,
        detailsLoaded: false,
        detailsFailed: true
      });
    }

    case actions.ActionTypes.RESET_VARIANTS: {
      return Object.assign({}, state, {
        variantsUpdate: {}
      });
    }
    default: {
      return state;
    }
  }
}

// product list action
export const getProductList = (state: VariantsState) => state.variantsList;
export const getProductListCount = (state: VariantsState) =>
  state.variantsListCount;
export const getProductListLoading = (state: VariantsState) =>
  state.listLoading;
export const getProductListLoaded = (state: VariantsState) =>
  state.listLoaded;
export const getProductListFailed = (state: VariantsState) =>
  state.listFailed;

// product delete action
export const getProductDelete = (state: VariantsState) =>
  state.variantsDelete;
export const getProductDeleteLoading = (state: VariantsState) =>
  state.deleteLoading;
export const getProductDeleteLoaded = (state: VariantsState) =>
  state.deleteLoaded;
export const getProductDeleteFailed = (state: VariantsState) =>
  state.deleteFailed;

// product add action
export const getProductAdd = (state: VariantsState) => state.variantsAdded;
export const getProductAddLoading = (state: VariantsState) =>
  state.addLoading;
export const getProductAddLoaded = (state: VariantsState) =>
  state.addLoaded;
export const getProductAddFailed = (state: VariantsState) =>
  state.addFailed;

// product update action
export const getProductUpdate = (state: VariantsState) =>
  state.variantsUpdate;
export const getProductUpdateLoading = (state: VariantsState) =>
  state.updateLoading;
export const getProductUpdateLoaded = (state: VariantsState) =>
  state.updateLoaded;
export const getProductUpdateFailed = (state: VariantsState) =>
  state.updateFailed;


  export const variantsDetails = (state: VariantsState) =>
  state.variantsDetails;



