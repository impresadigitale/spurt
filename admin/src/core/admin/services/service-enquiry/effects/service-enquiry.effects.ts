/**
 * Created by piccosoft on 21/6/19.
 */
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError} from 'rxjs/operators';
import * as actions from '../actions/service-enquiry.action';
import { EnquiryService } from '../service-enquiry.service';
@Injectable()
export class ServiceEnquiryEffects {

    constructor(private action$: Actions, private enquiryService: EnquiryService) {
    }
    // CATEGORY LIST
    @Effect()
    serviceEnquiryList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_ENQUIRY_LIST),
            map((action: actions.GetEnquiryList) => action.payload),
            switchMap((state) => {
                return this.enquiryService.serviceEnquiryList(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.GetEnquiryListSuccess(list),
                        ]),
                        catchError(error => of(new actions.GetEnquiryListFail(error)))
                    );
            })
        );
    // CATEGORY LIST
    @Effect()
    serviceEnquiryListCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_ENQUIRY_COUNT),
            map((action: actions.GetEnquiryCount) => action.payload),
            switchMap((state) => {
                return this.enquiryService.serviceEnquiryListCount(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.GetEnquiryCountSuccess(list),
                        ]),
                        catchError(error => of(new actions.GetEnquiryCountFail(error)))
                    );
            })
        );

    //  DELETE SERVICE CATEGORY
    @Effect()
    doDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DELETE_ENQUIRY),
            map((action: actions.DeleteServiceEnquiry) => action.payload),
            switchMap((state) => {
                return this.enquiryService.deleteServiceEnquiry(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DeleteServiceEnquirySuccess((user)),
                        ]),
                        catchError(error => of(new actions.DeleteServiceEnquiryFail((error))))
                    );
            })
        );
    //  DELETE MULTIPLE SERVICE CATEGORY
    @Effect()
    doMultipleDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DELETE_MULTIPLE_ENQUIRY),
            map((action: actions.DeleteMultipleServiceEnquiry) => action.payload),
            switchMap((state) => {
                return this.enquiryService.deleteMultipleServiceEnquiry(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DeleteMultipleServiceEnquirySuccess((user)),
                        ]),
                        catchError(error => of(new actions.DeleteMultipleServiceEnquirySuccess((error))))
                    );
            })
        );
}
