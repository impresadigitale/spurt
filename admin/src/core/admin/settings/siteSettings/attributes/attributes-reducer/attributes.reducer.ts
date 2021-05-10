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
import * as actions from '../attributes-action/attributes.action';
// state
import {
  AttributeState,
  AttributeStateRecord
} from './attributes.state';

export const initialState: AttributeState = new AttributeStateRecord() as unknown as AttributeState;

export function reducer(
  state = initialState,
  { type, payload }: any
): AttributeState {
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

     // get attribute
     case actions.ActionTypes.GROUP_LIST: {
      return Object.assign({}, state, {
        groupListLoding: true,
        groupListLoded: false,
        groupListFailed: false,

      });
    }
    case actions.ActionTypes.GROUP_LIST_SUCCESS: {
      return Object.assign({}, state, {
        groupList: payload.data,
        groupListLoding: false,
        groupListLoded: true,
        groupListFailed: false,

      });
    }

        // product details action
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
export const attributeList = (state: AttributeState) => state.attributeList;
export const attributeListLoading = (state: AttributeState) =>
  state.listLoading;
export const attributeListLoaded = (state: AttributeState) =>
  state.listLoaded;


// product delete action
export const attributeDelete = (state: AttributeState) =>
  state.attributeDelete;
export const attributeDeleteLoading = (state: AttributeState) =>
  state.deleteLoading;
export const attributeDeleteLoaded = (state: AttributeState) =>
  state.deleteLoaded;


// product add action
export const attributeAdd = (state: AttributeState) => state.attributeAdd;
export const attributeAddLoading = (state: AttributeState) =>
  state.addLoading;
export const attributeAddLoaded = (state: AttributeState) =>
  state.addLoaded;


// product update action
export const attributeUpdate = (state: AttributeState) =>
  state.attributeUpdate;
export const attributeUpdateLoading = (state: AttributeState) =>
  state.updateLoading;
export const attributeUpdateLoaded = (state: AttributeState) =>
  state.updateLoaded;

// product update action
export const attributeGet = (state: AttributeState) =>
  state.attributeGet;
export const attributeGetLoading = (state: AttributeState) =>
  state.getAttributeLoading;
export const attributeGetLoaded = (state: AttributeState) =>
  state.getAttributeLoaded;


  export const groupList = (state: AttributeState) =>
  state.groupList;
  export const groupListLoded = (state: AttributeState) =>
  state.groupListLoded;

  export const attributeDetails = (state: AttributeState) =>
  state.attributeDetails;
