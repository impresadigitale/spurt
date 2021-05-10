/**
 * Created by piccosoft on 21/6/19.
 */


// store
import {Store} from '@ngrx/store';
// app state
import * as store from '../../../app.state.interface';
// action
import * as serviceEnquiryActions from './actions/service-leads.action';

import {Injectable} from '@angular/core';

import { Router } from '@angular/router';
import { ServiceLeadsListRequest } from './models/service-leads.model';

@Injectable()

export class ServiceLeadsSandbox {


    constructor(protected appState: Store<store.AppState> , private router: Router) {
    }


    public serviceLeadslist(value) {
        this.appState.dispatch(new serviceEnquiryActions.GetServiceLeadList(new ServiceLeadsListRequest(value)));
    }
    public resetServiceEnquirylist() {
    }

    public serviceLeadslistCount(value) {
        this.appState.dispatch(new serviceEnquiryActions.GetServiceLeadCount(new ServiceLeadsListRequest(value)));
    }

}
