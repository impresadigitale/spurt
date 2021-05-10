

import {Map, Record} from 'immutable';


export interface ServicesState extends Map<string, any> {
    servicesListCount: number;
    servicesList: any;

    servicesDelete: any;
    servicesAdd: any;
    servicesUpdate: any;

    servicesaddLoading: boolean;
    servicesaddLoaded: boolean;
    servicesaddFailed: boolean;

    servicesupdateLoading: boolean;
    servicesupdateLoaded: boolean;
    servicesupdateFailed: boolean;

    servicesdeleteLoading: boolean;
    servicesdeleteLoaded: boolean;
    servicesdeleteFailed: boolean;
    servicesMultiDelete: any;

    serviceDetails: any;
    serviceDetailsLoading: boolean;
    serviceDetailsLoaded: boolean;
    serviceDetailsFailed: boolean;

    serviceCount: any;
    serviceCountLoading: boolean;
    serviceCountLoaded: boolean;
    serviceCountFailed: boolean;
}

export const ServicesStateRecord = Record({
    servicesListCount: 0,
    servicesList: {},

    servicesDelete: {},
    servicesAdd: {},
    servicesUpdate: {},

    servicesaddLoading: false,
    servicesaddLoaded: false,
    servicesaddFailed: false,

    servicesupdateLoading: false,
    servicesupdateLoaded: false,
    servicesupdateFailed: false,

    servicesdeleteLoading: false,
    servicesdeleteLoaded: false,
    servicesdeleteFailed: false,
    servicesMultiDelete: {},

    serviceDetails: {},
    serviceDetailsLoading: false,
    serviceDetailsLoaded: false,
    serviceDetailsFailed: false,

    serviceCount: {},
    serviceCountLoading: false,
    serviceCountLoaded: false,
    serviceCountFailed: false,
});
