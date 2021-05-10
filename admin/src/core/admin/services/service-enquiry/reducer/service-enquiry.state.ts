/**
 * Created by piccosoft on 21/6/19.
 */

import {Map, Record} from 'immutable';


export interface ServiceEnquiryState extends Map<string, any> {
    enquiryList: Array<any>;
    enquiryListLoading: boolean;
    enquiryListLoaded: boolean;
    enquiryListFailed: boolean;
    enquiryCount: number;
    enquiryDeleteLoading: boolean;
    enquiryDelete: any;
    enquiryMultipleDelete: any;
    enquiryMultipleDeleteLoading: boolean;
}


export const ServiceEnquiryRecord = Record({
    enquiryList: [],
    enquiryListLoading: false,
    enquiryListLoaded: false,
    enquiryListFailed: false,
    enquiryCount: 0,
    enquiryDeleteLoading: false,
    enquiryDelete: {},
    enquiryMultipleDelete: {},
    enquiryMultipleDeleteLoading: false
});
