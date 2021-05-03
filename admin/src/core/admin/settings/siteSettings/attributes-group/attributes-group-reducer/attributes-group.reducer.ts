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
import * as actions from '../attributes-group-action/attributes-group.action';
// state
import {
  AttributeGroupState,
  AttributeGroupStateRecord
} from './attributes-group.state';

export const initialState: AttributeGroupState = new AttributeGroupStateRecord() as unknown as AttributeGroupState;

export function reducer(
  state = initialState,
  { type, payload }: any
): AttributeGroupState {
  if (!type) {
    return state;
  }

  switch (type) {


    // Attribute add action
    case actions.ActionTypes.ADD_ATTRIBUTE: {
      return Object.assign({}, state, {
        attributeAdd: {},
        addLoading: false,
        addLoaded:  false,
        addFailed: false,
      });
    }
    case actions.ActionTypes.ADD_ATTRIBUTE_SUCCESS: {
      return Object.assign({}, state, {
        attributeAdd: payload,
        addLoading: false,
        addLoaded:  false,
        addFailed: false,
      });
    }

    // product list action
    case actions.ActionTypes.ATTRIBUTE_LIST: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: false,
      });
    }
    case actions.ActionTypes.ATTRIBUTE_LIST_SUCCESS: {
      return Object.assign({}, state, {
        attributeList: payload.data,
        listLoading: false,
        listLoaded: true,
        listFailed: false,
      });
    }

    // update
    case actions.ActionTypes.UPDATE_ATTRIBUTE: {
      return Object.assign({}, state, {
        attributeUpdate: {},
        updateLoading:  false,
        updateLoaded: false,
        updateFailed:  false,
      });
    }
    case actions.ActionTypes.UPDATE_ATTRIBUTE_SUCCESS: {
      return Object.assign({}, state, {
        attributeUpdate: payload,
        updateLoading:  false,
        updateLoaded: false,
        updateFailed:  false,
      });
    }


    // product delete action
    case actions.ActionTypes.DELETE_ATTRIBUTE: {
      return Object.assign({}, state, {
        attributeDelete: {},
        deleteLoading:  false,
        deleteLoaded:  false,
        deleteFailed:  false,
      });
    }
    case actions.ActionTypes.DELETE_ATTRIBUTE_SUCCESS: {
      return Object.assign({}, state, {
        attributeDelete: payload,
        deleteLoading:  false,
        deleteLoaded:  false,
        deleteFailed:  false,
      });
    }

    // get attribute
    case actions.ActionTypes.GET_ATTRIBUTE: {
      return Object.assign({}, state, {
        attributeGet: {},
        getAttributeLoading:false,
        getAttributeLoaded: false,
        getAttributeFailed:false,
      });
    }
    case actions.ActionTypes.GET_ATTRIBUTE_SUCCESS: {
      return Object.assign({}, state, {
        attributeGet: payload.data,
        getAttributeLoading: false,
        getAttributeLoaded: false,
        getAttributeFailed: false,
      });
    }


    // product delete action
    case actions.ActionTypes.DETAILS_ATTRIBUTE: {
      return Object.assign({}, state, {
        attributeDetails: {},
        detailsLoading:  false,
        detailsLoaded:  false,
        detailsFailed:  false,
      });
    }
    case actions.ActionTypes.DETAILS_ATTRIBUTE_SUCCESS: {
      return Object.assign({}, state, {
        attributeDetails: payload.data,
        detailsLoading:  false,
        detailsLoaded:  false,
        detailsFailed:  false,
      });
    }

    default: {
      return state;
    }
  }
}

// product list action
export const attributeList = (state: AttributeGroupState) => state.attributeList;
export const attributeListLoading = (state: AttributeGroupState) =>
  state.listLoading;
export const attributeListLoaded = (state: AttributeGroupState) =>
  state.listLoaded;


// product delete action
export const attributeDelete = (state: AttributeGroupState) =>
  state.attributeDelete;
export const attributeDeleteLoading = (state: AttributeGroupState) =>
  state.deleteLoading;
export const attributeDeleteLoaded = (state: AttributeGroupState) =>
  state.deleteLoaded;


// product add action
export const attributeAdd = (state: AttributeGroupState) => state.attributeAdd;
export const attributeAddLoading = (state: AttributeGroupState) =>
  state.addLoading;
export const attributeAddLoaded = (state: AttributeGroupState) =>
  state.addLoaded;


// product update action
export const attributeUpdate = (state: AttributeGroupState) =>
  state.attributeUpdate;
export const attributeUpdateLoading = (state: AttributeGroupState) =>
  state.updateLoading;
export const attributeUpdateLoaded = (state: AttributeGroupState) =>
  state.updateLoaded;

// product update action
export const attributeGet = (state: AttributeGroupState) =>
  state.attributeGet;
export const attributeGetLoading = (state: AttributeGroupState) =>
  state.getAttributeLoading;
export const attributeGetLoaded = (state: AttributeGroupState) =>
  state.getAttributeLoaded;

  export const attributeDetails = (state: AttributeGroupState) =>
  state.attributeDetails;
