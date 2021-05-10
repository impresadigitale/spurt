/**
 * Created by piccosoft on 21/6/19.
 */
import {type} from '../../../shared/utility/utilityHelpers';
import {Action} from '@ngrx/store';
import { EnquiryListRequest } from '../models/enquiry-list-request.model';

export const ActionTypes = {
    GET_ENQUIRY_LIST: type('[List] get enquiry list'),
    GET_ENQUIRY_LIST_SUCCESS: type('[List] get enquiry list Success'),
    GET_ENQUIRY_LIST_FAIL: type('[List] get enquiry list Fail'),

    GET_ENQUIRY_COUNT: type('[List] get enquiry list count'),
    GET_ENQUIRY_COUNT_SUCCESS: type('[List] get enquiry list count Success'),
    GET_ENQUIRY_COUNT_FAIL: type('[List] get enquiry list count Fail'),

    DELETE_ENQUIRY: type('[Delete Service Enquiry] Do DeleteService Enquiry'),
    DELETE_ENQUIRY_SUCCESS: type('[Delete Service Enquiry] Do Delete Service Enquiry Success'),
    DELETE_ENQUIRY_FAIL: type('[Delete Service Enquiry] Do Delete Service Enquiry Fail'),

    DELETE_MULTIPLE_ENQUIRY: type('[Delete Service Enquiry] Do DeleteService multiple Enquiry'),
    DELETE_MULTIPLE_ENQUIRY_SUCCESS: type('[Delete Service Enquiry] Do Delete Service multiple Enquiry Success'),
    DELETE_MULTIPLE_ENQUIRY_FAIL: type('[Delete Service Enquiry] Do Delete Service multiple Enquiry Fail'),

};


// enquiry list action
export class GetEnquiryList implements Action {
    type = ActionTypes.GET_ENQUIRY_LIST;

    constructor(public payload: EnquiryListRequest) {
    }
}

export class GetEnquiryListSuccess implements Action {
    type = ActionTypes.GET_ENQUIRY_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetEnquiryListFail implements Action {
    type = ActionTypes.GET_ENQUIRY_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}

// enquiry list count action
export class GetEnquiryCount implements Action {
    type = ActionTypes.GET_ENQUIRY_COUNT;

    constructor(public payload: EnquiryListRequest) {
    }
}

export class GetEnquiryCountSuccess implements Action {
    type = ActionTypes.GET_ENQUIRY_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetEnquiryCountFail implements Action {
    type = ActionTypes.GET_ENQUIRY_COUNT_FAIL;

    constructor(public payload: any = null) {
    }
}

// enquiry delete action
export class DeleteServiceEnquiry implements Action {
    type = ActionTypes.DELETE_ENQUIRY;

    constructor(public payload: any) {
    }
}

export class DeleteServiceEnquirySuccess implements Action {
    type = ActionTypes.DELETE_ENQUIRY_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteServiceEnquiryFail implements Action {
    type = ActionTypes.DELETE_ENQUIRY_FAIL;

    constructor(public payload: any = null) {
    }
}

// enquiry delete action
export class DeleteMultipleServiceEnquiry implements Action {
    type = ActionTypes.DELETE_MULTIPLE_ENQUIRY;

    constructor(public payload: any) {
    }
}

export class DeleteMultipleServiceEnquirySuccess implements Action {
    type = ActionTypes.DELETE_MULTIPLE_ENQUIRY_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteMultipleServiceEnquiryFail implements Action {
    type = ActionTypes.DELETE_MULTIPLE_ENQUIRY_FAIL;

    constructor(public payload: any = null) {
    }
}



export type Actions
    =
    GetEnquiryList
    | GetEnquiryListSuccess
    | GetEnquiryListFail

    | GetEnquiryCount
    | GetEnquiryCountSuccess
    | GetEnquiryCountFail;
