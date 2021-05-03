/**
 * Created by piccosoft on 21/6/19.
 */


// store
import {Store} from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as serviceEnquiryActions from './actions/service-enquiry.action';

import {Injectable} from '@angular/core';

import { Router } from '@angular/router';
import { EnquiryListRequest } from './models/enquiry-list-request.model';
import { getServiceEnquiryList, getEnquiryListLoading,
     getEnquiryListLoaded, getEnquiryListFailed,
      getServiceEnquiryListCount,
      enquiryDelete,
      enquiryDeleteLoading,
      multipleEnquiryDelete,
      multipleEnquiryDeleteLoading} from './reducer/service-enquiry.selector';

@Injectable()

export class EnquirySandbox {

    public enquiryList$ = this.appState.select(getServiceEnquiryList);
    public enquiryLoading$ = this.appState.select(getEnquiryListLoading);
    public enquiryLoaded$ = this.appState.select(getEnquiryListLoaded);
    public enquiryFailed$ = this.appState.select(getEnquiryListFailed);
    public enquiryCount$ = this.appState.select(getServiceEnquiryListCount);
    public enquiryDelete$ = this.appState.select(enquiryDelete);
    public enquiryDeleteloading$ = this.appState.select(enquiryDeleteLoading);
    public multipleEnquiryDelete$ = this.appState.select(multipleEnquiryDelete);
    public multipleEnquiryDeleteLoading$ = this.appState.select(multipleEnquiryDeleteLoading);


    constructor(protected appState: Store<store.AppState> , private router: Router) {
    }


    public serviceEnquiryList(value) {
        this.appState.dispatch(new serviceEnquiryActions.GetEnquiryList(new EnquiryListRequest(value)));
    }
    public resetServiceEnquirylist() {
    }

    public serviceEnquiryListCount(value) {
        this.appState.dispatch(new serviceEnquiryActions.GetEnquiryCount(new EnquiryListRequest(value)));
    }

    public deleteServiceEnquiry(value) {
        this.appState.dispatch(new serviceEnquiryActions.DeleteServiceEnquiry((value)));
    }
    public deleteMultipleEnquiry(value) {
        this.appState.dispatch(new serviceEnquiryActions.DeleteMultipleServiceEnquiry((value)));
    }

}
