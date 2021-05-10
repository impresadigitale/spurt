import {ServicesCategoriesState, ServicesCategoriesStateRecord} from './serviceCategory.state';
import * as actions from '../action/servicesCategory.action';
import {ServiceCategorylistResponseModel} from '../models/serviceCategorylist.response.model';

/**
 * Created by piccosoft on 21/6/19.
 */

export const initialState: ServicesCategoriesState = new ServicesCategoriesStateRecord() as unknown as ServicesCategoriesState;

export function reducer(state = initialState, {type, payload}: any): ServicesCategoriesState {

    if (!type) {
        return state;
    }

    switch (type) {

// <--------------SERVICE CATEGORY LIST ---------------> //

        case actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST_SUCCESS: {
            const serviceCategoriesModel = payload.data.map(list => {
                const tempcategoriesModel = new ServiceCategorylistResponseModel(list);
                return tempcategoriesModel;
            });
            let serviceCategoriesFilterModel = [];
            if (!state.serviceCategoryList) {
                serviceCategoriesFilterModel = payload.data.map(list => {
                    const tempcategoriesFilterModel = new ServiceCategorylistResponseModel(list);
                    return tempcategoriesFilterModel;
                });
            } else {
                serviceCategoriesFilterModel = state.serviceCategoryListFilter;
            }
            return Object.assign({}, state, {

                serviceCategoryList: serviceCategoriesModel,
                serviceCategoryListFilter: serviceCategoriesFilterModel

            });
        }

        case actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST_FAIL: {
            return Object.assign({}, state, {});
        }

// <--------------SERVICE CATEGORY LIST COUNT ---------------> //

        case actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT: {
            return Object.assign({}, state, {});
        }

        case actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT_SUCCESS: {
            return Object.assign({}, state, {

                serviceCategoryListCount: payload.data,

            });
        }

        case actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT_FAIL: {
            return Object.assign({}, state, {});
        }

// <--------------RESET SERVICE CATEGORY LIST ---------------> //

        case actions.ActionTypes.RESET_SERVICE_CATEGORIES_LIST: {
            return Object.assign({}, state, {
                serviceCategoryList: '',
                serviceCategoryListCount: 0,
                serviceCategoryListFilter: ''
            });
        }

// <--------------DELETE SERVICE CATEGORY ---------------> //

        case actions.ActionTypes.DO_DELETE_SERVICE_CATEGORIES: {
            return Object.assign({}, state, {
            });
        }

        case actions.ActionTypes.DO_DELETE_SERVICE_CATEGORIES_SUCCESS: {
            return Object.assign({}, state, {
                serviceCategoryDelete: payload,
            });
        }

        case actions.ActionTypes.DO_DELETE_SERVICE_CATEGORIES_FAIL: {
            return Object.assign({}, state, {
                serviceCategoryDelete: payload,

            });
        }

// <--------------ADD SERVICE CATEGORY ---------------> //

        case actions.ActionTypes.DO_ADD_SERVICE_CATEGORIES: {
            return Object.assign({}, state, {
            });
        }

        case actions.ActionTypes.DO_ADD_SERVICE_CATEGORIES_SUCCESS: {
            return Object.assign({}, state, {
                serviceCategoryAdd: payload
            });
        }

        case actions.ActionTypes.DO_ADD_SERVICE_CATEGORIES_FAIL: {
            return Object.assign({}, state, {
                serviceCategoryAdd: payload
            });
        }


// <--------------UPDATE SERVICE CATEGORY ---------------> //


        case actions.ActionTypes.DO_UPDATE_SERVICE_CATEGORIES: {
            return Object.assign({}, state, {

            });
        }

        case actions.ActionTypes.DO_UPDATE_SERVICE_CATEGORIES_SUCCESS: {
            return Object.assign({}, state, {
                serviceCategoryUpdate: payload
            });
        }

        case actions.ActionTypes.DO_UPDATE_SERVICE_CATEGORIES_FAIL: {
            return Object.assign({}, state, {
                serviceCategoryUpdate: payload
            });
        }


// <--------------REMOVE SERVICE CATEGORY ---------------> //

        case actions.ActionTypes.DO_SERVICE_REMOVE_CATEGORIES_LIST: {
            const Data: any = state.serviceCategoryList;
            for (let i = 0; i < Data.length; i++) {
                if (i === payload) {
                    Data.splice(payload, 1);
                }
            }
            return Object.assign({}, state, {
                categoryRemoveLists: Data,
                categoryRemoveListResponse: false,
                categoryRemoveListRequestLoading: true,
                categoryRemoveListRequestLoaded: false,
                categoryRemoveListRequestFailed: false,
            });
        }


// <--------------ADD SERVICE CATEGORY ---------------> //

        case actions.ActionTypes.DO_SERVICE_ADD_CATEGORIES_LIST: {
            const Data: any = state.serviceCategoryList;
            Data.push(payload);
            return Object.assign({}, state, {
                serviceCategoryList: Data,
                categoryAddListResponse: false,
                categoryAddListRequestLoading: true,
                categoryAddListRequestLoaded: false,
                categoryAddListRequestFailed: false,
            });
        }

// <--------------SERVICE CATEGORY DETAILS---------------> //

        case actions.ActionTypes.GET_CATEGORY_DETAILS: {
            return Object.assign({}, state, {
                categoryDetailsLoading: false,
                categoryDetailsLoaded: false,
                categoryDetailsFailed: false,
            });
        }

        case actions.ActionTypes.GET_CATEGORY_DETAILS_SUCCESS: {
            return Object.assign({}, state, {
                categoryDetailsLoading: false,
                categoryDetailsLoaded: false,
                categoryDetailsFailed: false,
                categoryDetails: payload.data
            });
        }

        case actions.ActionTypes.GET_CATEGORY_DETAILS_FAIL: {
            return Object.assign({}, state, {
                categoryDetailsLoading: false,
                categoryDetailsLoaded: false,
                categoryDetailsFailed: false,
            });
        }


        default: {
            return state;
        }

    }
}

export const getServiceCategoriesList = (state: ServicesCategoriesState) => state.serviceCategoryList;
export const getServiceCategoriesListFilter = (state: ServicesCategoriesState) => state.serviceCategoryListFilter;
export const getServiceCategoriesListCount = (state: ServicesCategoriesState) => state.serviceCategoryListCount;
export const getServiceCategoriesAdd = (state: ServicesCategoriesState) => state.serviceCategoryAdd;
export const getServiceCategoriesUpdate = (state: ServicesCategoriesState) => state.serviceCategoryUpdate;
export const getServiceCategoriesDelete = (state: ServicesCategoriesState) => state.serviceCategoryDelete;
export const getServicecategoryRemoveLists = (state: ServicesCategoriesState) => state.categoryRemoveLists;

export const categoryDetails = (state: ServicesCategoriesState) => state.categoryDetails;
export const categoryDetailsLoading = (state: ServicesCategoriesState) => state.categoryDetailsLoading;
export const categoryDetailsLoaded = (state: ServicesCategoriesState) => state.categoryDetailsLoaded;
export const categoryDetailsFailed = (state: ServicesCategoriesState) => state.categoryDetailsFailed;
