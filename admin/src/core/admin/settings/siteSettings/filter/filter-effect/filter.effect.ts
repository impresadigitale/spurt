/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../filter-action/filter.action';
import { FilterService } from '../filter.service';
import { Router } from '@angular/router';

@Injectable()
export class FilterEffect {
  constructor(private action$: Actions, private filter: FilterService, public router: Router) {}

    // LIST-FILTERLIST
    @Effect()
    doFilterList$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.GET_FILTER_LIST),
      map((action: actions.DoFilterListAction) => action.payload),
      switchMap(state => {
        return this.filter.filterlist(state).pipe(
          map(analysis => new actions.DoFilterListSuccessAction(analysis)),
          catchError(error => of(new actions.DoFilterListFailAction(error)))
        );
      })
    );
    // FILTER LIST PAGINATION
    @Effect()
    dofilterpagination$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.DO_FILTER_COUNT_ACTION),
      map((action: actions.DoFilterPaginationAction) => action.payload),
      switchMap(state => {
        return this.filter.filterpagiantion(state).pipe(
          switchMap(user => [new actions.DoFilterPaginationSuccessAction(user)]),
          catchError(error => of(new actions.DoFilterPaginationFailAction(error)))
        );
      })
    );
  // varientList
  @Effect()
  varientList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_VARIENT_LIST),
    map((action: actions.DoVarientListAction) => action.payload),
    switchMap(state => {
      return this.filter.varientList(state).pipe(
        map(analysis => new actions.DoVarientListSuccessAction(analysis)),
        catchError(error => of(new actions.DoVarientListFailAction(error)))
      );
    })
  );
  // attributeList
  @Effect()
  attributeList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_ATTRIBUTE_LIST),
    map((action: actions.DoAttributeListAction) => action.payload),
    switchMap(state => {
      return this.filter.attributeList(state).pipe(
        map(analysis => new actions.DoAttributeListSuccessAction(analysis)),
        catchError(error => of(new actions.DoAttributeListFailAction(error)))
      );
    })
  );
  // NEW SOCIAL EFFECT
  @Effect()
  doAddfilter$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_NEW_FILTER),
    map((action: actions.DoNewFilterAction) => action.payload),
    switchMap(state => {
      return this.filter.createfilter(state).pipe(
        tap(res => {
          if (res) {
            this.router.navigate(['/settings/sitesettings/filter/list']);
          }
        }),
        switchMap(user => [new actions.DoNewFilterSuccessAction(user)]),
        catchError(error => of(new actions.DoNewFilterFailAction(error)))
      );
    })
  );

  // GET SOCIAL EFFECT
  @Effect()
  doGetFilter$: Observable<Action> = this.action$
    .pipe(
      ofType(actions.ActionTypes.DO_GET_FILTER),
      map((action: actions.DoGetFilterAction) => action.payload),
      switchMap((state) => {
          return this.filter.getFilter(state)
            .pipe(
              map((user) =>
                new actions.DoGetFilterSuccessAction(user),
              ),
              tap((res) => {
               }),
              catchError(error => of(new actions.DoGetFilterFailAction(error.error)))
            );
        }
      )
    );
  // FilterDelete
  @Effect()
  filterDelate$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_FILTER),
    map((action: actions.DeleteFilter) => action.payload),
    switchMap(state => {
      return this.filter.DeleteFilter(state).pipe(
        switchMap(user => [new actions.DeleteFilterSuccess(user)]),
        catchError(error => of(new actions.DeleteFilterFail(error)))
      );
    })
  );
  // updateFilter
  @Effect()
  updateFilter$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_FILTER),
    map((action: actions.UpdateFilterAction) => action.payload),
    switchMap(state => {
      return this.filter.updateFilter(state).pipe(
        tap(res => {
          if (res) {
            this.router.navigate(['/settings/sitesettings/filter/list']);
          }
        }),
        switchMap(user => [new actions.UpdateFilterSuccessAction(user)]),
        catchError(error => of(new actions.UpdateFilterFailAction(error)))
      );
    })
  );
}


