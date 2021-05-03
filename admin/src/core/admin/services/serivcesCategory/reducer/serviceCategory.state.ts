/**
 * Created by piccosoft on 21/6/19.
 */

import {Map, Record} from 'immutable';


export interface ServicesCategoriesState extends Map<string, any> {
    serviceCategoryListCount: any;
    serviceCategoryList: any;
    serviceCategoryListFilter: any;

    categoryRemoveLists: any;
    categoryList: any;

    serviceCategoryDelete: any;
    serviceCategoryAdd: any;
    serviceCategoryUpdate: any;

    serviceCategoryaddLoading: boolean;
    serviceCategoryaddLoaded: boolean;
    serviceCategoryaddFailed: boolean;

    serviceCategoryupdateLoading: boolean;
    serviceCategoryupdateLoaded: boolean;
    serviceCategoryupdateFailed: boolean;

    serviceCategorydeleteLoading: boolean;
    serviceCategorydeleteLoaded: boolean;
    serviceCategorydeleteFailed: boolean;

    categoryRemoveListResponse: boolean;
    categoryRemoveListRequestLoading: boolean;
    categoryRemoveListRequestLoaded: boolean;
    categoryRemoveListRequestFailed: boolean;

    categoryAddListResponse: boolean;
    categoryAddListRequestLoading: boolean;
    categoryAddListRequestLoaded: boolean;
    categoryAddListRequestFailed: boolean;

    categoryDetailsLoading: boolean;
    categoryDetailsLoaded: boolean;
    categoryDetailsFailed: boolean;
    categoryDetails: any;

}


export const ServicesCategoriesStateRecord = Record({
    serviceCategoryListCount: {},
    serviceCategoryList: {},
    serviceCategoryListFilter: {},

    serviceCategoryDelete: {},
    serviceCategoryAdd: {},
    serviceCategoryUpdate: {},

    categoryRemoveLists: [],
    categoryList: [],

    serviceCategoryaddLoading: false,
    serviceCategoryaddLoaded: false,
    serviceCategoryaddFailed: false,

    serviceCategoryupdateLoading: false,
    serviceCategoryupdateLoaded: false,
    serviceCategoryupdateFailed: false,

    serviceCategorydeleteLoading: false,
    serviceCategorydeleteLoaded: false,
    serviceCategorydeleteFailed: false,

    categoryRemoveListResponse: false,
    categoryRemoveListRequestLoading: true,
    categoryRemoveListRequestLoaded: false,
    categoryRemoveListRequestFailed: false,

    categoryAddListResponse: false,
    categoryAddListRequestLoading: true,
    categoryAddListRequestLoaded: false,
    categoryAddListRequestFailed: false,

    categoryDetailsLoading: false,
    categoryDetailsLoaded: false,
    categoryDetailsFailed: false,
    categoryDetails: {}


});
