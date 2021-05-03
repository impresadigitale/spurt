/**
 * Created by piccosoft on 21/6/19.
 */
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError} from 'rxjs/operators';
import * as actions from '../actions/service-leads.action';
import { ServiceLeadsService } from '../service-leads.service';
@Injectable()
export class ServiceLeadsEffects {

    constructor(private action$: Actions, private leadsService: ServiceLeadsService) {
    }
    // CATEGORY LIST
    @Effect()
    serviceLeadList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_SERVICE_LEAD_LIST),
            map((action: actions.GetServiceLeadList) => action.payload),
            switchMap((state) => {
                return this.leadsService.serviceLeadsList(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.GetServiceLeadListSuccess(list),
                        ]),
                        catchError(error => of(new actions.GetServiceLeadListFail(error)))
                    );
            })
        );
    // CATEGORY LIST
    @Effect()
    serviceLeadListCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.GET_SERVICE_LEAD_COUNT),
            map((action: actions.GetServiceLeadCount) => action.payload),
            switchMap((state) => {
                return this.leadsService.serviceLeadsListCount(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.GetServiceLeadCountSuccess(list),
                        ]),
                        catchError(error => of(new actions.GetServiceLeadCountFail(error)))
                    );
            })
        );

}
