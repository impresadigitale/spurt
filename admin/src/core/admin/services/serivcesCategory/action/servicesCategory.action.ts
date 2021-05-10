/**
 * Created by piccosoft on 21/6/19.
 */
import {type} from '../../../shared/utility/utilityHelpers';
import {Action} from '@ngrx/store';
import {ServiceCategorylistForm} from '../models/serviceCategorylist.model';

export const ActionTypes = {
    DO_SERVICE_CATEGORIES_LIST: type('[List] Do Service Categorieslist'),
    DO_SERVICE_CATEGORIES_LIST_SUCCESS: type('[List] Do Service Categorieslist Success'),
    DO_SERVICE_CATEGORIES_LIST_FAIL: type('[List] Do Service Categorieslist Fail'),
    DO_SERVICE_CATEGORIES_LIST_COUNT: type('[List Count] Do Service Categorieslist Count'),
    DO_SERVICE_CATEGORIES_LIST_COUNT_SUCCESS: type('[List Count] Do Service Categorieslist Count Success'),
    DO_SERVICE_CATEGORIES_LIST_COUNT_FAIL: type('[List Count] Do Service Categorieslist Count Fail'),
    RESET_SERVICE_CATEGORIES_LIST: type('[Reset List ] Do Service Categorieslist Reset'),

    DO_DELETE_SERVICE_CATEGORIES: type('[Delete Service Category] Do DeleteService Category'),
    DO_DELETE_SERVICE_CATEGORIES_SUCCESS: type('[Delete Service Category] Do Delete Service Category Success'),
    DO_DELETE_SERVICE_CATEGORIES_FAIL: type('[Delete Service Category] Do Delete Service Category Fail'),

    DO_UPDATE_SERVICE_CATEGORIES: type('[Add Service Category] Do Update Service Category'),
    DO_UPDATE_SERVICE_CATEGORIES_SUCCESS: type('[Add Service Category] Do Update Service Category Success'),
    DO_UPDATE_SERVICE_CATEGORIES_FAIL: type('[Add] Do Update Service Category Fail'),

    DO_ADD_SERVICE_CATEGORIES: type('[Catalog Service Category] Do Add Service Category'),
    DO_ADD_SERVICE_CATEGORIES_SUCCESS: type('[Catalog Service Category] Do Add Service Category Success'),
    DO_ADD_SERVICE_CATEGORIES_FAIL: type('[Catalog Service Category] Do Add Service Category Fail'),

    DO_SERVICE_REMOVE_CATEGORIES_LIST: type('[ Service remove Category list]  Service remove Category list'),
    DO_SERVICE_ADD_CATEGORIES_LIST: type('[ Service add Category list]  Service add Category list'),

    GET_CATEGORY_DETAILS: type('[ Service Category Details]  Service Category Details'),
    GET_CATEGORY_DETAILS_SUCCESS: type('[ Service Category Details]  Service Category Details Success'),
    GET_CATEGORY_DETAILS_FAIL: type('[ Service Category Details]  Service Category Details Fail'),

};


// category list action
export class DoCategorieslistAction implements Action {
    type = ActionTypes.DO_SERVICE_CATEGORIES_LIST;

    constructor(public payload: ServiceCategorylistForm) {
    }
}

export class DoCategorieslistSuccessAction implements Action {
    type = ActionTypes.DO_SERVICE_CATEGORIES_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoCategorieslistFailAction implements Action {
    type = ActionTypes.DO_SERVICE_CATEGORIES_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}


// category remove list action
export class DoCategoriesRemovelistAction implements Action {
    type = ActionTypes.DO_SERVICE_REMOVE_CATEGORIES_LIST;

    constructor(public payload: ServiceCategorylistForm) {
    }
}


// product add List action
export class DoCategoriesAddlistAction implements Action {
    type = ActionTypes.DO_SERVICE_ADD_CATEGORIES_LIST;

    constructor(public payload: any) {
    }
}


// category list count action
export class DoCategorieslistCountAction implements Action {
    type = ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT;

    constructor(public payload: ServiceCategorylistForm) {
    }
}

export class DoCategorieslistCountSuccessAction implements Action {
    type = ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoCategorieslistCountFailAction implements Action {
    type = ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT_FAIL;

    constructor(public payload: any = null) {
    }
}

export class ResetCategorieslist implements Action {
    type = ActionTypes.RESET_SERVICE_CATEGORIES_LIST;

    constructor(public payload: any = null) {
    }
}


// service category delete action
export class DoDeleteServiceCategoriesAction implements Action {
    type = ActionTypes.DO_DELETE_SERVICE_CATEGORIES;

    constructor(public payload: any) {
    }
}

export class DoDeleteServiceCategoriesSuccessAction implements Action {
    type = ActionTypes.DO_DELETE_SERVICE_CATEGORIES_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoDeleteServiceCategoriesFailAction implements Action {
    type = ActionTypes.DO_DELETE_SERVICE_CATEGORIES_FAIL;

    constructor(public payload: any = null) {
    }
}

// service category add action
export class DoAddServiceCategoriesAction implements Action {
    type = ActionTypes.DO_ADD_SERVICE_CATEGORIES;

    constructor(public payload: any) {
    }
}

export class DoAddServiceCategoriesSuccessAction implements Action {
    type = ActionTypes.DO_ADD_SERVICE_CATEGORIES_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddServiceCategoriesFailAction implements Action {
    type = ActionTypes.DO_ADD_SERVICE_CATEGORIES_FAIL;

    constructor(public payload: any = null) {
    }
}

// service category update action
export class DoUpdateServiceCategoriesAction implements Action {
    type = ActionTypes.DO_UPDATE_SERVICE_CATEGORIES;

    constructor(public payload: any) {
    }
}

export class DoUpdateServiceCategoriesSuccessAction implements Action {
    type = ActionTypes.DO_UPDATE_SERVICE_CATEGORIES_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoUpdateServiceCategoriesFailAction implements Action {
    type = ActionTypes.DO_UPDATE_SERVICE_CATEGORIES_FAIL;

    constructor(public payload: any = null) {
    }
}

// category details

export class GetCategoryDetailsAction implements Action {
    type = ActionTypes.GET_CATEGORY_DETAILS;
    constructor(public payload: any) {
    }
}

export class GetCategoryDetailsSuccessAction implements Action {
    type = ActionTypes.GET_CATEGORY_DETAILS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetCategoryDetailsFailAction implements Action {
    type = ActionTypes.GET_CATEGORY_DETAILS_FAIL;
    constructor(public payload: any = null) {
    }
}


export type Actions
    =
    DoCategorieslistAction
    | DoCategorieslistSuccessAction
    | DoCategorieslistFailAction
    | DoCategorieslistCountAction
    | DoCategorieslistCountSuccessAction
    | DoCategorieslistCountFailAction
    | DoCategoriesAddlistAction
    | DoCategoriesRemovelistAction
    | GetCategoryDetailsAction
    | GetCategoryDetailsSuccessAction
    | GetCategoryDetailsFailAction;
