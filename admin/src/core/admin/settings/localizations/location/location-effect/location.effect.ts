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
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import * as actions from '../location-action/location.action';
import { LocationService } from '../location.service';

@Injectable()
export class LocationEffect {
  constructor(private action$: Actions, private service: LocationService) {}

  // NEW LOCATION
  @Effect()
  doAddLocation$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_LOCATION),
    map((action: actions.DoNewLocationAction) => action.payload),
    switchMap(state => {
      return this.service.addLocation(state).pipe(
        switchMap(location => [new actions.DoNewLocationSuccessAction(location)]),
        catchError(error => of(new actions.DoNewLocationFailAction(error)))
      );
    })
  );
  // Update Location
  @Effect()
  doUpdateLocation$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_LOCATION),
    map((action: actions.DoUpdateLocationAction) => action.payload),
    switchMap(state => {
      return this.service.updateLocation(state).pipe(
        map(analysis => new actions.DoUpdateLocationSuccessAction(analysis)),
        catchError(error => of(new actions.DoUpdateLocationFailAction(error)))
      );
    })
  );

  // LOCATION LIST PAGINATION
  @Effect()
  dolocationpagination$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_LOCATION_COUNT_ACTION),
    map((action: actions.GetLocationCountAction) => action.payload),
    switchMap(state => {
      return this.service.locationPagiantion(state).pipe(
        switchMap(user => [new actions.GetLocationCountSuccessAction(user)]),
        catchError(error => of(new actions.GetLocationCountFailAction(error)))
      );
    })
  );
  // LOCATION LIST
  @Effect()
  dolocationlists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_LOCATION_LIST),
    map((action: actions.GetLocationListAction) => action.payload),
    switchMap(state => {
      return this.service.locationList(state).pipe(
        switchMap(user => [new actions.GetLocationListSuccessAction(user)]),
        catchError(error => of(new actions.GetLocationListFailAction(error)))
      );
    })
  );
  // Location Delete
  @Effect()
  doLocationDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_LOCATION_DELETE),
    map((action: actions.DoLocationDeleteAction) => action.payload),
    switchMap(state => {
      const locationId = state.locationId;
      return this.service.deleteLocation(state, locationId).pipe(
        switchMap(user => [new actions.DoLocationDeleteSuccessAction(user)]),
        catchError(error => of(new actions.DoLocationDeleteFailAction(error)))
      );
    })
  );
}
