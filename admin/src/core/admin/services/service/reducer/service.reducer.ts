import {ServicesState, ServicesStateRecord} from './service.state';
import * as actions from '../action/service.action';
import { ServiceslistResponseModel } from '../models/serviceslist.response.model';


export const initialState: ServicesState = new ServicesStateRecord() as unknown as ServicesState;
export function reducer(state = initialState, {type, payload}: any): ServicesState {

    if (!type) {
        return state;
    }

    switch (type) {


// <--------------SERVICE LIST ---------------> //

        case actions.ActionTypes.DO_SERVICE_LIST: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.DO_SERVICE_LIST_SUCCESS: {
        const serviceListModel = payload.data.map(list => {
            const tempcategoriesModel = new ServiceslistResponseModel(list);
            return tempcategoriesModel;
        });
            return Object.assign({}, state, {
                servicesList: serviceListModel,
            });
        }

        case actions.ActionTypes.DO_SERVICE_LIST_FAIL: {
            return Object.assign({}, state, {});
        }


// <--------------SERVICE LIST COUNT ---------------> //


         case actions.ActionTypes.DO_SERVICE_LIST_COUNT: {
            return Object.assign({}, state, {});
        }

         case actions.ActionTypes.DO_SERVICE_LIST_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                servicesListCount: payload.data
            });
        }

         case actions.ActionTypes.DO_SERVICE_LIST_COUNT_FAIL: {
            return Object.assign({}, state, {});
        }



// <--------------ADD SERVICE  ---------------> //

         case actions.ActionTypes.DO_ADD_SERVICE: {
            return Object.assign({}, state, {});
        }

         case actions.ActionTypes.DO_ADD_SERVICE_SUCCESS: {
            return Object.assign({}, state, {
                servicesAdd: payload
            });
        }

         case actions.ActionTypes.DO_ADD_SERVICE_FAIL: {
            return Object.assign({}, state, {
            });
        }

// <--------------UPDATE SERVICE ---------------> //


        case actions.ActionTypes.DO_UPDATE_SERVICE: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.DO_UPDATE_SERVICE_SUCCESS: {
            return Object.assign({}, state, {
                servicesUpdate: payload
            });
        }

        case actions.ActionTypes.DO_UPDATE_SERVICE_FAIL: {
            return Object.assign({}, state, {
            });
        }


// <--------------DELETE SERVICE ---------------> //

        case actions.ActionTypes.DO_DELETE_SERVICE: {
            return Object.assign({}, state, {});
        }

         case actions.ActionTypes.DO_DELETE_SERVICE_SUCCESS: {
            return Object.assign({}, state, {
                servicesDelete: payload
            });
        }

         case actions.ActionTypes.DO_DELETE_SERVICE_FAIL: {
            return Object.assign({}, state, {
            });
        }


// <--------------BULK DELETE SERVICE ---------------> //

        case actions.ActionTypes.DELETE_MULTIPLE_SERVICE: {
            return Object.assign({}, state, {});
        }

         case actions.ActionTypes.DELETE_MULTIPLE_SERVICE_SUCCESS: {
            return Object.assign({}, state, {
                servicesMultiDelete: payload
            });
        }

         case actions.ActionTypes.DELETE_MULTIPLE_SERVICE_FAIL: {
            return Object.assign({}, state, {
            });
        }

// <--------------SERVICE DETAILS ---------------> //

        case actions.ActionTypes.GET_SERVICE_DETAILS: {
            return Object.assign({}, state, {
                serviceDetails: {},
                serviceDetailsLoading: false,
                serviceDetailsLoaded: false,
                serviceDetailsFailed: false,
            });
        }

         case actions.ActionTypes.GET_SERVICE_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                serviceDetails: payload.data,
                serviceDetailsLoading: false,
                serviceDetailsLoaded: false,
                serviceDetailsFailed: false,
            });
        }

         case actions.ActionTypes.GET_SERVICE_DETAILS_FAIL: {
            return Object.assign({}, state, {
                serviceDetails: {},
                serviceDetailsLoading: false,
                serviceDetailsLoaded: false,
                serviceDetailsFailed: false,
            });
        }


// <--------------SERVICE COUNT ---------------> //

        case actions.ActionTypes.GET_SERVICE_COUNT: {
            return Object.assign({}, state, {
                serviceCount: {},
                serviceCountLoading: true,
                serviceCountLoaded: false,
                serviceCountFailed: false,
            });
        }

         case actions.ActionTypes.GET_SERVICE_COUNT_SUCCESS: {
            return Object.assign({}, state, {
                serviceCount: payload.data,
                serviceCountLoading: false,
                serviceCountLoaded: true,
                serviceCountFailed: false,
            });
        }

        case actions.ActionTypes.GET_SERVICE_COUNT_FAIL: {
            return Object.assign({}, state, {
                serviceCount: {},
                serviceCountLoading: false,
                serviceCountLoaded: false,
                serviceCountFailed: true,
            });
        }

        default: {
            return state;
        }
    }
}

export const getServicesList = (state: ServicesState) => state.servicesList;
export const getServicesListCount = (state: ServicesState) => state.servicesListCount;
export const getServicesAdd = (state: ServicesState) => state.servicesAdd;
export const getServicesUpdate = (state: ServicesState) => state.servicesUpdate;
export const getServicesDelete = (state: ServicesState) => state.servicesDelete;
export const getServiceMultiDelete = (state: ServicesState) => state.servicesMultiDelete;

export const serviceDetails = (state: ServicesState) => state.serviceDetails;
export const serviceDetailsLoading = (state: ServicesState) => state.serviceDetailsLoading;
export const serviceDetailsLoaded = (state: ServicesState) => state.serviceDetailsLoaded;
export const serviceDetailsFailed = (state: ServicesState) => state.serviceDetailsFailed;

export const serviceCount = (state: ServicesState) => state.serviceCount;
export const serviceCountLoading = (state: ServicesState) => state.serviceCountLoading;
export const serviceCountLoaded = (state: ServicesState) => state.serviceCountLoaded;
export const serviceCountFailed = (state: ServicesState) => state.serviceCountFailed;
