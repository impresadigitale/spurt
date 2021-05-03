import {ServiceEnquiryState, ServiceEnquiryRecord} from './service-enquiry.state';
import * as actions from '../actions/service-enquiry.action';

/**
 * Created by piccosoft on 21/6/19.
 */

export const initialState: ServiceEnquiryState = new ServiceEnquiryRecord() as unknown as ServiceEnquiryState;

export function reducer(state = initialState, {type, payload}: any): ServiceEnquiryState {

    if (!type) {
        return state;
    }

    switch (type) {


// <--------------ENQUIRY LIST ---------------> //

        case actions.ActionTypes.GET_ENQUIRY_LIST: {
            return Object.assign({}, state, {
                enquiryListLoading: true,
                enquiryListLoaded: false,
                enquiryListFailed: false
            });
        }

        case actions.ActionTypes.GET_ENQUIRY_LIST_SUCCESS: {
            return Object.assign({}, state, {
                enquiryList: payload.data,
                enquiryListLoading: false,
                enquiryListLoaded: true,
                enquiryListFailed: false
            });
        }

        case actions.ActionTypes.GET_ENQUIRY_LIST_FAIL: {
            return Object.assign({}, state, {
                enquiryListLoading: false,
                enquiryListLoaded: true,
                enquiryListFailed: true
            });
        }

// <--------------ENQUIRY LIST COUNT---------------> //


        case actions.ActionTypes.GET_ENQUIRY_COUNT: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.GET_ENQUIRY_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                enquiryCount: payload.data,
            });
        }

        case actions.ActionTypes.GET_ENQUIRY_COUNT_FAIL: {
            return Object.assign({}, state, {});
        }

// <--------------ENQUIRY DELETE ---------------> //

        case actions.ActionTypes.DELETE_ENQUIRY: {
            return Object.assign({}, state, {
                enquiryDeleteLoading: true
            });
        }

        case actions.ActionTypes.DELETE_ENQUIRY_SUCCESS: {
            return Object.assign({}, state, {
                enquiryDelete: payload,
                enquiryDeleteLoading: false,
            });
        }

        case actions.ActionTypes.DELETE_ENQUIRY_FAIL: {
            return Object.assign({}, state, {
                enquiryDeleteLoading: false
            });
        }

// <--------------BULK DELETE ENQUIRY LIST ---------------> //

        case actions.ActionTypes.DELETE_MULTIPLE_ENQUIRY: {
            return Object.assign({}, state, {
                enquiryMultipleDeleteLoading: true
            });
        }

        case actions.ActionTypes.DELETE_MULTIPLE_ENQUIRY_SUCCESS: {
            return Object.assign({}, state, {
                enquiryMultipleDelete: payload,
                enquiryMultipleDeleteLoading: false,
            });
        }

        case actions.ActionTypes.DELETE_MULTIPLE_ENQUIRY_FAIL: {
            return Object.assign({}, state, {
                enquiryMultipleDeleteLoading: false
            });
        }


        default: {
            return state;
        }

    }
}

export const getEnquiryList = (state: ServiceEnquiryState) => state.enquiryList;
export const getEnquiryListLoading = (state: ServiceEnquiryState) => state.enquiryListLoading;
export const getEnquiryListLoaded = (state: ServiceEnquiryState) => state.enquiryListLoaded;
export const getEnquiryListFailed = (state: ServiceEnquiryState) => state.enquiryListFailed;

export const getEnquiryCount = (state: ServiceEnquiryState) => state.enquiryCount;
export const getDeleteLoading = (state: ServiceEnquiryState) => state.enquiryDeleteLoading;
export const enquiryDeleteLoading = (state: ServiceEnquiryState) => state.enquiryCount;
export const enquiryDelete = (state: ServiceEnquiryState) => state.enquiryDelete;

export const multipleEnquiryDelete = (state: ServiceEnquiryState) => state.enquiryMultipleDelete;
export const multipleEnquiryDeleteLoading = (state: ServiceEnquiryState) => state.enquiryMultipleDeleteLoading;
