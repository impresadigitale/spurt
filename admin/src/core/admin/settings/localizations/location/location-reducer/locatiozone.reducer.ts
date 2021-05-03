/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import * as actions from '../../location/location-action/location.action';
import { LocationRecordState, LocationState } from './location.state';
import { LocationListResponseModel } from '../location-model/locationlist.response.model';

export const initialState: LocationState = new LocationRecordState() as unknown as LocationState;

export function reducer(
  state = initialState,
  { type, payload }: any
): LocationState {
  if (!type) {
    return state;
  }

  switch (type) {
    case actions.ActionTypes.DO_ADD_LOCATION: {
      return Object.assign({}, state, {
        addLoading: true,
        addLoaded: false,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_LOCATION: {
      return Object.assign({}, state, {
        updateLoading: true,
        updateLoaded: false,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_LOCATION_LIST: {
      return Object.assign({}, state, {
        listLoading: true,
        listLoaded: false,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_LOCATION_COUNT_ACTION: {
      return Object.assign({}, state, {
        countLoading: true,
        countLoaded: false,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_LOCATION_DELETE: {
      return Object.assign({}, state, {
        deleteLoading: true,
        deleteLoaded: false,
        deleteFailed: false
      });
    }
    case actions.ActionTypes.DO_ADD_LOCATION_SUCCESS: {
      return Object.assign({}, state, {
        newLocation: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: false
      });
    }
    case actions.ActionTypes.DO_UPDATE_LOCATION_SUCCESS: {
      return Object.assign({}, state, {
        updateLocation: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: false
      });
    }
    case actions.ActionTypes.GET_LOCATION_LIST_SUCCESS: {
      const locationList = payload.data.map(_location => {
        const tempListModel = new LocationListResponseModel(_location);
        return tempListModel;
      });
      return Object.assign({}, state, {
        locationList: locationList,
        listLoading: false,
        listLoaded: true,
        listFailed: false
      });
    }
    case actions.ActionTypes.GET_LOCATION_COUNT_SUCCESS: {
      return Object.assign({}, state, {
        locationPagination: payload.data,
        countLoading: false,
        countLoaded: true,
        countFailed: false
      });
    }
    case actions.ActionTypes.DO_LOCATION_DELETE_SUCCESS: {
      return Object.assign({}, state, {
        locationDelete: payload,
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: false
      });
    }

    case actions.ActionTypes.DO_ADD_LOCATION_FAIL: {
      return Object.assign({}, initialState, {
        newLocation: payload,
        addLoading: false,
        addLoaded: true,
        addFailed: true
      });
    }

    case actions.ActionTypes.DO_UPDATE_LOCATION_FAIL: {
      return Object.assign({}, initialState, {
        updateLocation: payload,
        updateLoading: false,
        updateLoaded: true,
        updateFailed: true
      });
    }
    case actions.ActionTypes.DO_LOCATION_DELETE_FAIL: {
      return Object.assign({}, initialState, {
        deleteLoading: false,
        deleteLoaded: true,
        deleteFailed: true
      });
    }
    case actions.ActionTypes.GET_LOCATION_COUNT_FAIL: {
      return Object.assign({}, initialState, {
        locationDelete: payload,
        countLoading: false,
        countLoaded: true,
        countFailed: true
      });
    }
    case actions.ActionTypes.GET_LOCATION_LIST_FAIL: {
      return Object.assign({}, initialState, {
        listLoading: false,
        listLoaded: true,
        listFailed: true
      });
    }
    default: {
      return state;
    }
  }
}

export const getnewlocation = (state: LocationState) => state.newLocation;
export const getupdatlocation = (state: LocationState) => state.updateLocation;
export const getlocationdelte = (state: LocationState) => state.locationDelete;
export const getlocationslist = (state: LocationState) => state.locationList;
export const getlocationpagination = (state: LocationState) => state.locationPagination;

export const getLocationListLoading = (state: LocationState) => state.listLoading;
export const getLocationListLoaded = (state: LocationState) => state.listLoaded;
export const getLocationListFailed = (state: LocationState) => state.listFailed;

export const getLocationCountLoading = (state: LocationState) => state.countLoading;
export const getLocationCountLoaded = (state: LocationState) => state.countLoaded;
export const getLocationCountFailed = (state: LocationState) => state.countFailed;

export const getLocationAddLoading = (state: LocationState) => state.addLoading;
export const getLocationAddLoaded = (state: LocationState) => state.addLoaded;
export const getLocationAddFailed = (state: LocationState) => state.addFailed;

export const getLocationUpdateLoading = (state: LocationState) => state.updateLoading;
export const getLocationUpdateLoaded = (state: LocationState) => state.updateLoaded;
export const getLocationUpdateFailed = (state: LocationState) => state.updateFailed;

export const getLocationDeleteLoading = (state: LocationState) => state.deleteLoading;
export const getLocationDeleteLoaded = (state: LocationState) => state.deleteLoaded;
export const getLocationDeleteFailed = (state: LocationState) => state.deleteFailed;
