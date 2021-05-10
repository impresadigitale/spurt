import {type} from '../../../shared/utility/utilityHelpers';
import {Action} from '@ngrx/store';
import {ServiceslistForm} from '../models/servicelist.model';
import {AddserviceForm} from '../models/add service.model';

export const ActionTypes = {
    DO_SERVICE_LIST: type('[Servive List] Do Service list'),
    DO_SERVICE_LIST_SUCCESS: type('[Servive  List] Do Service list Success'),
    DO_SERVICE_LIST_FAIL: type('[Servive  List] Do Service list Fail'),
    DO_SERVICE_LIST_COUNT: type('[Servive  List Count] Do Service list Count'),
    DO_SERVICE_LIST_COUNT_SUCCESS: type('[Servive  List Count] Do Service list Count Success'),
    DO_SERVICE_LIST_COUNT_FAIL: type('[Servive  List Count] Do Service list Count Fail'),

    DO_DELETE_SERVICE: type('[Delete Service] Do DeleteService'),
    DO_DELETE_SERVICE_SUCCESS: type('[Delete Service ] Do Delete Service  Success'),
    DO_DELETE_SERVICE_FAIL: type('[Delete Service ] Do Delete Service  Fail'),

    DO_UPDATE_SERVICE: type('[Add Service ] Do Update Service '),
    DO_UPDATE_SERVICE_SUCCESS: type('[Add Service ] Do Update Service  Success'),
    DO_UPDATE_SERVICE_FAIL: type('[Add] Do Update Service  Fail'),

    DO_ADD_SERVICE: type('[Catalog Service ] Do Add Service '),
    DO_ADD_SERVICE_SUCCESS: type('[Catalog Service ] Do Add Service  Success'),
    DO_ADD_SERVICE_FAIL: type('[Catalog Service ] Do Add Service  Fail'),

    EXPORT_SERVICE: type('[export Service ] service  export'),
    EXPORT_SERVICE_SUCCESS: type('[export Service ] service  export success'),
    EXPORT_SERVICE_FAIL: type('[export Service ] service  export  Fail'),

    DELETE_MULTIPLE_SERVICE: type('[delete Service ] service multiple delete'),
    DELETE_MULTIPLE_SERVICE_SUCCESS: type('[delete Service ] service multiple delete success'),
    DELETE_MULTIPLE_SERVICE_FAIL: type('[delete Service ] service multiple delete  Fail'),

    GET_SERVICE_DETAILS: type('[Service Details ] Service Details'),
    GET_SERVICE_DETAILS_SUCCESS: type('[Service Details ] Service Details success'),
    GET_SERVICE_DETAILS_FAIL: type('[Service Details ] Service Details  Fail'),

    GET_SERVICE_COUNT: type('[Service] Service Count'),
    GET_SERVICE_COUNT_SUCCESS: type('[Service] Service Count success'),
    GET_SERVICE_COUNT_FAIL: type('[Service] Service Count Fail'),

};


// Services list action
export class DoServiceslistAction implements Action {
    type = ActionTypes.DO_SERVICE_LIST;

    constructor(public payload: ServiceslistForm) {
    }
}

export class DoServiceslistSuccessAction implements Action {
    type = ActionTypes.DO_SERVICE_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoServiceslistFailAction implements Action {
    type = ActionTypes.DO_SERVICE_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}

// Services list count action
export class DoServiceslistCountAction implements Action {
    type = ActionTypes.DO_SERVICE_LIST_COUNT;

    constructor(public payload: ServiceslistForm) {
    }
}

export class DoServiceslistCountSuccessAction implements Action {
    type = ActionTypes.DO_SERVICE_LIST_COUNT_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoServiceslistCountFailAction implements Action {
    type = ActionTypes.DO_SERVICE_LIST_COUNT_FAIL;

    constructor(public payload: any = null) {
    }
}


// service  delete action
export class DoDeleteServicesAction implements Action {
    type = ActionTypes.DO_DELETE_SERVICE;

    constructor(public payload: any) {
    }
}

export class DoDeleteServicesSuccessAction implements Action {
    type = ActionTypes.DO_DELETE_SERVICE_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoDeleteServicesFailAction implements Action {
    type = ActionTypes.DO_DELETE_SERVICE_FAIL;

    constructor(public payload: any = null) {
    }
}

// service category add action
export class DoAddServicesAction implements Action {
    type = ActionTypes.DO_ADD_SERVICE;

    constructor(public payload: AddserviceForm) {
    }
}

export class DoAddServicesSuccessAction implements Action {
    type = ActionTypes.DO_ADD_SERVICE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoAddServicesFailAction implements Action {
    type = ActionTypes.DO_ADD_SERVICE_FAIL;

    constructor(public payload: any = null) {
    }
}


// service category update action
export class DoUpdateServicesAction implements Action {
    type = ActionTypes.DO_UPDATE_SERVICE;

    constructor(public payload: any) {
    }
}

export class DoUpdateServicesSuccessAction implements Action {
    type = ActionTypes.DO_UPDATE_SERVICE_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoUpdateServicesFailAction implements Action {
    type = ActionTypes.DO_UPDATE_SERVICE_FAIL;

    constructor(public payload: any = null) {
    }
}

// service category export action
export class ExportServiceList implements Action {
    type = ActionTypes.EXPORT_SERVICE;

    constructor(public payload: any) {
    }
}

export class ExportServiceListSuccess implements Action {
    type = ActionTypes.EXPORT_SERVICE_SUCCESS;

    constructor(public payload: any) {

    }
}

export class ExportServiceListFail implements Action {
    type = ActionTypes.EXPORT_SERVICE_FAIL;

    constructor(public payload: any = null) {
    }
}
// service category update action
export class DeleteMultipleService implements Action {
    type = ActionTypes.DELETE_MULTIPLE_SERVICE;

    constructor(public payload: any) {
    }
}

export class DeleteMultipleServiceSuccess implements Action {
    type = ActionTypes.DELETE_MULTIPLE_SERVICE_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DeleteMultipleServiceFail implements Action {
    type = ActionTypes.DELETE_MULTIPLE_SERVICE_FAIL;

    constructor(public payload: any = null) {
    }
}

// service details

export class GetServiceDetailsAction implements Action {
    type = ActionTypes.GET_SERVICE_DETAILS;
    constructor(public payload: any) {
    }
}

export class GetServiceDetailsSuccess implements Action {
    type = ActionTypes.GET_SERVICE_DETAILS_SUCCESS;
    constructor(public payload: any) {

    }
}

export class GetServiceDetailsFail implements Action {
    type = ActionTypes.GET_SERVICE_DETAILS_FAIL;
    constructor(public payload: any = null) {
    }
}

// service count

export class GetServiceCountAction implements Action {
    type = ActionTypes.GET_SERVICE_COUNT;
    constructor(public payload: any = null) {
    }
}

export class GetServiceCountSuccess implements Action {
    type = ActionTypes.GET_SERVICE_COUNT_SUCCESS;
    constructor(public payload: any) {

    }
}

export class GetServiceCountFail implements Action {
    type = ActionTypes.GET_SERVICE_COUNT_FAIL;
    constructor(public payload: any = null) {
    }
}

