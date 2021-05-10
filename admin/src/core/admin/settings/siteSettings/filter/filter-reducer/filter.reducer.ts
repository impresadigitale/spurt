/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../filter-action/filter.action';
import { FilterState, FilterRecordState } from './filter.state';
import { FilterResponseModel } from '../filter-model/filter.response.model';

export const initialState: FilterState = new FilterRecordState() as unknown as FilterState;

export function reducer(
  state = initialState,
  { type, payload }: any
): FilterState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.GET_FILTER_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_FILTER_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_NEW_FILTER: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIENT_LIST: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.GET_ATTRIBUTE_LIST: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.GET_FILTER_LIST_SUCCESS: {
      return Object.assign({}, state, {
        filterList: payload.data,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.DO_FILTER_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        userpagination: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.GET_VARIENT_LIST_SUCCESS: {
      var varientData = [];


      varientData = payload.data.map((item) =>
      Object.assign({}, item, {checkData: false}, {disableData: false}, {addedData: 0}, {variantParentId: 'var' + item.id}),
      );

      varientData.forEach(element => {
        element.varientsValue = element.varientsValue.map((item) =>
        Object.assign({}, item, {checkData: false})
        );
      });

      return Object.assign({}, state, {
        varientList: varientData,
        tempVarientList: varientData
      });
    }
    case actions.ActionTypes.GET_ATTRIBUTE_LIST_SUCCESS: {
      var attributeData = [];
      attributeData = payload.data.map((item) =>
      Object.assign({}, item, {checkData: false})
      );
      attributeData.forEach(element => {
        element.attribute = element.attribute.map((item1) =>
      Object.assign({}, item1, {checkData: false}, {disableData: false}, {addedData: 0})
      );
      });

      return Object.assign({}, state, {
        attributeList: attributeData,
        tempAttributeList: attributeData,
      });
    }
    case actions.ActionTypes.DO_NEW_FILTER_SUCCESS: {
      return Object.assign({}, initialState, {
        newFilter: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }

    case actions.ActionTypes.GET_FILTER_LIST_FAIL: {
      return Object.assign({}, state, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    case actions.ActionTypes.GET_VARIENT_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }
    case actions.ActionTypes.GET_ATTRIBUTE_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }


    case actions.ActionTypes.GET_FILTER_LIST_FAIL: {
      return Object.assign({}, state, {
      });
    }

    case actions.ActionTypes.DO_GET_FILTER: {
      return Object.assign({}, state, {
        getFilterLoaded: false,
      });
    }
    case actions.ActionTypes.DO_GET_FILTER_SUCCESS: {
      return Object.assign({}, state, {
        getFilterLoaded: true,
        getFilter: payload.data,
      });
    }
    case actions.ActionTypes.DO_GET_FILTER_FAIL: {
      return Object.assign({}, initialState, {
        getFilterLoaded: false,
      });
    }
    //  CLEAR_VARIENT_DATA
    case actions.ActionTypes.CLEAR_VARIENT_DATA: {
      return Object.assign({}, initialState, {
        getFilter: {}
      });
    }
    // Delete Filter
    case actions.ActionTypes.DELETE_FILTER: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.DELETE_FILTER_SUCCESS: {
      return Object.assign({}, state, {
        filterDelete: payload
      });
    }
    case actions.ActionTypes.DELETE_FILTER_FAIL: {
      return Object.assign({}, state, {});
    }
    // Update Filter
    case actions.ActionTypes.UPDATE_FILTER: {
      return Object.assign({}, state, {});
    }
    case actions.ActionTypes.UPDATE_FILTER_SUCCESS: {
      return Object.assign({}, state, {
        updateFilter: payload.data
      });
    }
    // SEARCH_VARIENT
    case actions.ActionTypes.SEARCH_VARIENT:
    let varientData1 = state.tempVarientList;
    let varientData2 = state.varientList;
    if (varientData1 && varientData1.length > 0) {
      const search = payload.toLowerCase();
      varientData1 = varientData1.filter((data) => {
        return data.name.toLowerCase().includes(search);
      });
    }
    return Object.assign({}, state, {
      varientList: varientData1
    });
    // SEARCH_ATTRIBUTE
    case actions.ActionTypes.SEARCH_ATTRIBUTE:
    let attributeData1 = state.tempAttributeList;
    let attributeData2 = state.attributeList;
    if (attributeData1 && attributeData1.length > 0) {
      const search = payload.toLowerCase();
      attributeData1 = attributeData1.filter((data) => {
        return data.attributeGroupName.toLowerCase().includes(search);
      });
    }
    return Object.assign({}, state, {
      attributeList: attributeData1
    });
    default: {
      return state;
    }
  }
}

export const getNewFilter = (state: FilterState) => state.newfilter;
export const getFilter = (state: FilterState) => state.getFilter;
export const filterList = (state: FilterState) => state.filterList;


export const getFilterListLoading = (state: FilterState) => state.listLoading;
export const getFilterListLoaded = (state: FilterState) => state.listLoaded;
export const getFilterListFailed = (state: FilterState) => state.listFailed;

export const varientList = (state: FilterState) => state.varientList;
export const attributeList = (state: FilterState) => state.attributeList;

export const filterDelete = (state: FilterState) => state.filterDelete;

export const updateFilter = (state: FilterState) => state.updateFilter;
export const getFilterLoaded = (state: FilterState) => state.getFilterLoaded;
export const userpagination = (state: FilterState) => state.userpagination;
