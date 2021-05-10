/**
 * Created by piccosoft on 21/6/19.
 */
import {type} from '../../../shared/utility/utilityHelpers';
import {Action} from '@ngrx/store';
import { ServiceLeadsListRequest } from '../models/service-leads.model';

export const ActionTypes = {
    GET_SERVICE_LEAD_LIST: type('[List] get service leads list'),
    GET_SERVICE_LEAD_LIST_SUCCESS: type('[List] get service leads list Success'),
    GET_SERVICE_LEAD_LIST_FAIL: type('[List] get service leads list Fail'),

    GET_SERVICE_LEAD_COUNT: type('[List] get service leads list count'),
    GET_SERVICE_LEAD_COUNT_SUCCESS: type('[List] get service leads list count Success'),
    GET_SERVICE_LEAD_COUNT_FAIL: type('[List] get service leads list count Fail'),


};


// enquiry list action
export class GetServiceLeadList implements Action {
    type = ActionTypes.GET_SERVICE_LEAD_LIST;

    constructor(public payload: ServiceLeadsListRequest) {
    }
}

export class GetServiceLeadListSuccess implements Action {
    type = ActionTypes.GET_SERVICE_LEAD_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetServiceLeadListFail implements Action {
    type = ActionTypes.GET_SERVICE_LEAD_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}



// category list count action
export class GetServiceLeadCount implements Action {
    type = ActionTypes.GET_SERVICE_LEAD_COUNT;

    constructor(public payload: ServiceLeadsListRequest) {
    }
}

export class GetServiceLeadCountSuccess implements Action {
    type = ActionTypes.GET_SERVICE_LEAD_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetServiceLeadCountFail implements Action {
    type = ActionTypes.GET_SERVICE_LEAD_COUNT_FAIL;

    constructor(public payload: any = null) {
    }
}




export type Actions
    =
    GetServiceLeadList
    | GetServiceLeadListSuccess
    | GetServiceLeadListFail

    | GetServiceLeadCount
    | GetServiceLeadCountSuccess
    | GetServiceLeadCountFail;
