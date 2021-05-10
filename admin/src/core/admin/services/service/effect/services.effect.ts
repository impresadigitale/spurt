import {ServicesService} from '../../../../../core/admin/services/service/service.Service';
import * as actions from '../action/service.action';
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError} from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Injectable()
export class ServicesEffect {

    constructor(private action$: Actions, private servicesService: ServicesService) {
    }

    // SERVICES LIST
    @Effect()
    serviceCategoriesList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_SERVICE_LIST),
            map((action: actions.DoServiceslistAction) => action.payload),
            switchMap((state) => {
                return this.servicesService.servicesList(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.DoServiceslistSuccessAction(list),
                        ]),
                        catchError(error => of(new actions.DoServiceslistFailAction(error)))
                    );
            })
        );
    // SERVICES  LIST COUNT
    @Effect()
    serviceCategoriesListCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_SERVICE_LIST_COUNT),
            map((action: actions.DoServiceslistCountAction) => action.payload),
            switchMap((state) => {
                return this.servicesService.servicesListCount(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.DoServiceslistCountSuccessAction(list),
                        ]),
                        catchError(error => of(new actions.DoServiceslistCountFailAction(error)))
                    );
            })
        );


    // DELETE SERVICE
    @Effect()
    doDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_DELETE_SERVICE),
            map((action: actions.DoDeleteServicesAction) => action.payload),
            switchMap((state) => {
                return this.servicesService.deleteServices(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoDeleteServicesSuccessAction((user)),
                        ]),
                        catchError(error => of(new actions.DoDeleteServicesFailAction((error))))
                    );
            })
        );


    @Effect()
    doaddService$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_SERVICE),
            map((action: actions.DoAddServicesAction) => action.payload),
            switchMap((state) => {
                return this.servicesService.addServices(state)
                    .pipe(
                        switchMap((add) => {
                            return [
                                new actions.DoAddServicesSuccessAction(add),
                            ];
                        }),
                        catchError(error => of(new actions.DoAddServicesFailAction(error)))
                    );
            })
        );

    @Effect()
    doupdateService$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_UPDATE_SERVICE),
            map((action: actions.DoUpdateServicesAction) => action.payload),
            switchMap((state) => {
                return this.servicesService.updateServices(state)
                    .pipe(
                        switchMap((add) => {
                            return [
                                new actions.DoUpdateServicesSuccessAction(add),
                            ];
                        }),
                        catchError(error => of(new actions.DoUpdateServicesFailAction(error)))
                    );
            })
        );
        @Effect()
    doExportService$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.EXPORT_SERVICE),
            map((action: actions.ExportServiceList) => action.payload),
            switchMap((state) => {
                return this.servicesService.serviceExcel(state)
                    .pipe(
                        tap(data => {
                            const filename = 'service_list_' + Date.now() + '.xlsx';
                            const blob = new Blob([data], {type: 'text/xlsx'});
                            saveAs(blob, filename);
                        }),
                        switchMap((add) => {
                            return [
                                new actions.ExportServiceListSuccess(add),
                            ];
                        }),
                        catchError(error => of(new actions.ExportServiceListFail(error)))
                    );
            })
        );
        @Effect()
        doMultipleDeleteService$: Observable<Action> = this.action$
            .pipe(
                ofType(actions.ActionTypes.DELETE_MULTIPLE_SERVICE),
                map((action: actions.DeleteMultipleService) => action.payload),
                switchMap((state) => {
                    return this.servicesService.deleteMultipleService(state)
                        .pipe(
                            switchMap((add) => {
                                return [
                                    new actions.DeleteMultipleServiceSuccess(add),
                                ];
                            }),
                            catchError(error => of(new actions.DeleteMultipleServiceFail(error)))
                        );
                })
            );
        @Effect()
        serviceDetails$: Observable<Action> = this.action$
            .pipe(
                ofType(actions.ActionTypes.GET_SERVICE_DETAILS),
                map((action: actions.GetServiceDetailsAction) => action.payload),
                switchMap((state) => {
                    return this.servicesService.getServiceDetails(state)
                        .pipe(
                            switchMap((add) => {
                                return [
                                    new actions.GetServiceDetailsSuccess(add),
                                ];
                            }),
                            catchError(error => of(new actions.GetServiceDetailsFail(error)))
                        );
                })
            );

        @Effect()
        serviceCount$: Observable<Action> = this.action$
            .pipe(
                ofType(actions.ActionTypes.GET_SERVICE_COUNT),
                map((action: actions.GetServiceCountAction) => action.payload),
                switchMap((state) => {
                    return this.servicesService.getServiceCount()
                        .pipe(
                            switchMap((add) => {
                                return [
                                    new actions.GetServiceCountSuccess(add),
                                ];
                            }),
                            catchError(error => of(new actions.GetServiceCountFail(error)))
                        );
                })
            );
}

