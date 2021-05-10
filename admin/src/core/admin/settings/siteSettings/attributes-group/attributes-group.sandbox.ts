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
// store
import { Store } from '@ngrx/store';
// actions
import * as productActions from './attributes-group-action/attributes-group.action';
// app state
import * as store from '../../../../app.state.interface';
// router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/index';
// notifications
import { ToastrManager } from 'ng6-toastr-notifications';

import { attributeList, attributeAdd, attributeUpdate, attributeDelete, attributeListLoaded,
  attributeGet, attributeDetails} from './attributes-group-reducer/attributes-group.selector';

@Injectable()
export class AttributeGroupSandbox {
  public attributeGroupList$ = this.appState.select(attributeList);
  public attributeAdd$ = this.appState.select(attributeAdd);
  public attributeUpdate$ = this.appState.select(attributeUpdate);
  public attributeDelete$ = this.appState.select(attributeDelete);
  public attributeGroupListLoaded$ = this.appState.select(attributeListLoaded);
  public groupCount$ = this.appState.select(attributeGet);
  public attributeDetails$ = this.appState.select(attributeDetails);



  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router,
    private toastr: ToastrManager
  ) {
    this.subscribe();
  }

  public getAttributeList(value) {
    this.appState.dispatch(
      new productActions.AttributeListAction(value)
    );
  }

  public getAttribute(value) {
    this.appState.dispatch(
      new productActions.GetAttributeAction(value)
    );
  }

  public attributeDelete(value) {
    this.appState.dispatch(
      new productActions.DeleteAttributeAction(value)
    );
  }

  public attributeAdd(value) {
    this.appState.dispatch(
      new productActions.AddAttributeAction(value)
    );
  }

  public attributeUpdate(value) {
    this.appState.dispatch(
      new productActions.UpdateAttributeAction(value)
    );
  }

  public attributeGroupDetails(value) {
    this.appState.dispatch(
      new productActions.DetailsAttributeAction(value)
    );
  }


  subscribe() {
    this.subscriptions.push(this.attributeAdd$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/settings/sitesettings/attributes-group']);
      }
    }));
    this.subscriptions.push(this.attributeUpdate$.subscribe(data => {
      if (data && data.status === 1) {
        this.router.navigate(['/settings/sitesettings/attributes-group']);
      }
    }));
  }
}
