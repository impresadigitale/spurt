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
// effects
import { Effect, Actions, ofType } from '@ngrx/effects';
// store
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
// actions
import * as actions from '../attributes-action/attributes.action';
import { catchError } from 'rxjs/operators';
// service
import { AttributeService } from '../attributes.service';

@Injectable()
export class AttributeEffect {
  constructor(
    private action$: Actions,
    private service: AttributeService
  ) {}

  // attribute list
  @Effect()
  attributeList$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ATTRIBUTE_LIST),
    map((action: actions.AttributeListAction) => action.payload),
    switchMap(state => {
      return this.service.attributeList(state).pipe(
        switchMap(product => [
          new actions.AttributeListSuccessAction(product)
        ]),
        catchError(error =>
          of(new actions.AttributeListFailAction(error))
        )
      );
    })
  );


  // attribute list delete
  @Effect()
  deleteAttribute$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DELETE_ATTRIBUTE),
    map((action: actions.DeleteAttributeAction) => action.payload),
    switchMap(state => {
      return this.service.deleteAttribute(state).pipe(
        switchMap(user => [
          new actions.DeleteAttributeSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DeleteAttributeFailAction(error))
        )
      );
    })
  );
  // Attribute add
  @Effect()
  addAttribute$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.ADD_ATTRIBUTE),
    map((action: actions.AddAttributeAction) => action.payload),
    switchMap(state => {
      return this.service.addAttribute(state).pipe(
        switchMap(user => [new actions.AddAttributeSuccessAction(user)]),
        catchError(error =>
          of(new actions.AddAttributeFailAction(error))
        )
      );
    })
  );


  // Attribute update
  @Effect()
  updateAttribute$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.UPDATE_ATTRIBUTE),
    map((action: actions.UpdateAttributeAction) => action.payload),
    switchMap(state => {
      return this.service.attributeUpdate(state).pipe(
        switchMap(user => [
          new actions.UpdateAttributeSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.UpdateAttributeFailAction(error))
        )
      );
    })
  );

    // Attribute get
    @Effect()
    getAttribute$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.GET_ATTRIBUTE),
      map((action: actions.GetAttributeAction) => action.payload),
      switchMap(state => {
        return this.service.getAttributeCount(state).pipe(
          switchMap(user => [
            new actions.GetAttributeSuccessAction(user)
          ]),
          catchError(error =>
            of(new actions.GetAttributeFailAction(error))
          )
        );
      })
    );

    // Group List
    @Effect()
    groupList$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.GROUP_LIST),
      map((action: actions.GroupListAction) => action.payload),
      switchMap(state => {
        return this.service.groupList(state).pipe(
          switchMap(user => [
            new actions.GroupListSuccessAction(user)
          ]),
          catchError(error =>
            of(new actions.GroupListFailAction(error))
          )
        );
      })
    );

       // attribute list details
  @Effect()
  detailsAttribute$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DETAILS_ATTRIBUTE),
    map((action: actions.DetailsAttributeAction) => action.payload),
    switchMap(state => {
      return this.service.detailsAttribute(state).pipe(
        switchMap(user => [
          new actions.DetailsAttributeSuccessAction(user)
        ]),
        catchError(error =>
          of(new actions.DetailsAttributeFailAction(error))
        )
      );
    })
  );
}
