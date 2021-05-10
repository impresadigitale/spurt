/**
 * Created by piccosoft on 21/6/19.
 */
import {Action} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {catchError} from 'rxjs/operators';
import {ServicesCategoriesService} from '../servicesCategory.service';
import * as actions from '../action/servicesCategory.action';
@Injectable()
export class ServicesCategoriesEffect {

    constructor(private action$: Actions, private serviceCategoryService: ServicesCategoriesService) {
    }
    // CATEGORY LIST
    @Effect()
    serviceCategoriesList$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST),
            map((action: actions.DoCategorieslistAction) => action.payload),
            switchMap((state) => {
                return this.serviceCategoryService.serviceCategoryList(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.DoCategorieslistSuccessAction(list),
                        ]),
                        catchError(error => of(new actions.DoCategorieslistFailAction(error)))
                    );
            })
        );
    // CATEGORY LIST
    @Effect()
    serviceCategoriesListCount$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_SERVICE_CATEGORIES_LIST_COUNT),
            map((action: actions.DoCategorieslistCountAction) => action.payload),
            switchMap((state) => {
                return this.serviceCategoryService.serviceCategoryListCount(state)
                    .pipe(
                        switchMap((list) => [
                            new actions.DoCategorieslistCountSuccessAction(list),
                        ]),
                        catchError(error => of(new actions.DoCategorieslistCountFailAction(error)))
                    );
            })
        );

     // DELETE SERVICE CATEGORY
    @Effect()
    doDelete$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_DELETE_SERVICE_CATEGORIES),
            map((action: actions.DoDeleteServiceCategoriesAction) => action.payload),
            switchMap((state) => {
                return this.serviceCategoryService.deleteServiceCategory(state)
                    .pipe(
                        switchMap((user) => [
                            new actions.DoDeleteServiceCategoriesSuccessAction((user)),
                        ]),
                        catchError(error => of(new actions.DoDeleteServiceCategoriesFailAction((error))))
                    );
            })
        );


    @Effect()
    doaddServiceCategory$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_ADD_SERVICE_CATEGORIES),
            map((action: actions.DoAddServiceCategoriesAction) => action.payload),
            switchMap((state) => {
                return this.serviceCategoryService.addServiceCategory(state)
                    .pipe(
                        switchMap((add) => {
                            return [
                                new actions.DoAddServiceCategoriesSuccessAction(add),
                            ];
                        }),
                        catchError(error => of(new actions.DoAddServiceCategoriesFailAction(error)))
                    );
            })
        );

    @Effect()
    doupdateServiceCategory$: Observable<Action> = this.action$
        .pipe(
            ofType(actions.ActionTypes.DO_UPDATE_SERVICE_CATEGORIES),
            map((action: actions.DoUpdateServiceCategoriesAction) => action.payload),
            switchMap((state) => {
                return this.serviceCategoryService.updateServiceCategory(state)
                    .pipe(
                        switchMap((add) => {
                            return [
                                new actions.DoUpdateServiceCategoriesSuccessAction(add),
                            ];
                        }),
                        catchError(error => of(new actions.DoUpdateServiceCategoriesFailAction(error)))
                    );
            })
        );

       // SERVICE CATEGORY DETAILS
       @Effect()
       categoryDetails$: Observable<Action> = this.action$
           .pipe(
               ofType(actions.ActionTypes.GET_CATEGORY_DETAILS),
               map((action: actions.GetCategoryDetailsAction) => action.payload),
               switchMap((state) => {
                   return this.serviceCategoryService.getCategoryDetails(state)
                       .pipe(
                           switchMap((user) => [
                               new actions.GetCategoryDetailsSuccessAction((user)),
                           ]),
                           catchError(error => of(new actions.GetCategoryDetailsFailAction((error))))
                       );
               })
           );
}
