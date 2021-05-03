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
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { LocationlistForm } from './location-model/locationlist.model';
import { LocationForm } from './location-model/location.model';
import { Api } from '../../../providers/api/api';

@Injectable()
export class LocationService extends Api {
  locationlistdata: any;
  private url: string = this.getBaseUrl();

  setlocationlistdata(data) {
    this.locationlistdata = data;
  }

  getlocationlistdata() {
    return this.locationlistdata;
  }

  // Location list Pagination

  public locationPagiantion(params: LocationlistForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/admin-delivery-location/delivery-location-list', { params: reqOpts });
  }

  // ZOne list

  public locationList(params: LocationlistForm): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/admin-delivery-location/delivery-location-list', { params: reqOpts });
  }

  // Location delete
  public deleteLocation(param: any, Id: number): Observable<any> {
    return this.http.delete(this.url + '/admin-delivery-location/delete-delivery-location/' + Id, param);
  }

  // new location
  addLocation(param: LocationForm): Observable<any> {
    return this.http.post(this.url + '/admin-delivery-location/add-delivery-location', param);
  }

  // update location
  updateLocation(params) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: { deliveryLocationId: params.deliveryLocationId }
    };
    return this.http.put(
      this.url + '/admin-delivery-location/update-delivery-location/' + params.deliveryLocationId,
      params
    );
  }
}
