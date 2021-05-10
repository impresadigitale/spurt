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
import { Store } from '@ngrx/store';
import * as locationActions from '../location/location-action/location.action';
import * as countryActions from '../country/country-action/country.action';
import { Subscription } from 'rxjs/index';
import * as store from '../../../../app.state.interface';
import { Router } from '@angular/router';
import { LocationForm } from './location-model/location.model';
import {
  newLocation,
  updateLocation,
  locationDelete,
  locationPagination,
  locationList,
  LocationAddFailed,
  LocationAddLoaded,
  LocationAddLoading,
  LocationCountFailed,
  LocationCountLoaded,
  LocationCountLoading,
  LocationDeleteFailed,
  LocationDeleteLoaded,
  LocationDeleteLoading,
  LocationListFailed,
  LocationListLoaded,
  LocationListLoading,
  LocationUpdateFailed,
  LocationUpdateLoaded,
  LocationUpdateLoading
} from './location-reducer/location.selector';
import { LocationlistForm } from './location-model/locationlist.model';
import { CountryListForm } from '../country/country-model/countrylist.model';

@Injectable()
export class LocationSandbox {
  public locationList$ = this.appState.select(locationList);
  public locationPagination$ = this.appState.select(locationPagination);
  public newLocation$ = this.appState.select(newLocation);
  public updateLocation$ = this.appState.select(updateLocation);
  public deleteLocation$ = this.appState.select(locationDelete);

  public locationListLoading$ = this.appState.select(LocationListLoading);
  public locationListLoaded$ = this.appState.select(LocationListLoaded);
  public locationListFailed$ = this.appState.select(LocationListFailed);

  public locationDeleteLoading$ = this.appState.select(LocationDeleteLoading);
  public locationDeleteLoaded$ = this.appState.select(LocationDeleteLoaded);
  public locationDeleteFailed$ = this.appState.select(LocationDeleteFailed);

  public locationCountLoading$ = this.appState.select(LocationCountLoading);
  public locationCountLoaded$ = this.appState.select(LocationCountLoaded);
  public locationCountFailed$ = this.appState.select(LocationCountFailed);

  public locationAddLoading$ = this.appState.select(LocationAddLoading);
  public locationAddLoaded$ = this.appState.select(LocationAddLoaded);
  public locationAddFailed$ = this.appState.select(LocationAddFailed);

  public locationUpdateLoading$ = this.appState.select(LocationUpdateLoading);
  public locationUpdateLoaded$ = this.appState.select(LocationUpdateLoaded);
  public locationUpdateFailed$ = this.appState.select(LocationUpdateFailed);

  private subscriptions: Array<Subscription> = [];

  constructor(
    protected appState: Store<store.AppState>,
    private router: Router
  ) {
    this.subscribe();
  }

  public addNewLocation(data) {
    this.appState.dispatch(new locationActions.DoNewLocationAction(data));
  }

  public updateLocation(value) {
    this.appState.dispatch(
      new locationActions.DoUpdateLocationAction(value)
    );
  }

  public getLocationList(value: any) {
    this.appState.dispatch(
      new locationActions.GetLocationListAction(new LocationlistForm(value))
    );
  }

  public locationDelete(value) {
    this.appState.dispatch(new locationActions.DoLocationDeleteAction(value));
  }

  public getlocationpagination(value) {
    this.appState.dispatch(
      new locationActions.GetLocationCountAction(new LocationlistForm(value))
    );
  }

  public getcountrieslist(value: any) {
    this.appState.dispatch(
      new countryActions.GetCountrylistAction(new CountryListForm(value))
    );
  }

  subscribe() {
    this.subscriptions.push(
      this.updateLocation$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/delivery-location']);
        }
      })
    );
    this.subscriptions.push(
      this.newLocation$.subscribe(data => {
        if (data && data.status === 1) {
          this.router.navigate(['/settings/local/delivery-location']);
        }
      })
    );
  }
}
