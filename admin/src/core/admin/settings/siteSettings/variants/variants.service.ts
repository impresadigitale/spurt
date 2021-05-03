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
import { Api } from '../../../providers/api/api';


@Injectable()
export class VariantsService extends Api {
  // for get method
  public params: any = {};
  // url
  private basUrl = this.getBaseUrl();


  variantsList(param) {
    let reqOpts: any = {};
    reqOpts = param;
    return this.http.get(this.basUrl + '/varients/varientslist', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productOptionsList' function. Calls get method with specific api address
   * along its param.
   *
   * @param params from VariantsListModel
   */
  public variantsListCount(params: any): Observable<any> {
    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.basUrl + '/varients/varientslist', {
      params: reqOpts
    });
  }

  /**
   * Handles 'productOptionsDelete' function. Calls delete method with specific api address
   * along its param.
   *
   * @param params from VariantsDeleteModel
   */
  variantsDelete(params: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: false,
      body: { optionId: params.optionId }
    };

    return this.http.delete(
      this.basUrl + '/varients/delete-varient/' + params.id,
      httpOptions
    );
  }

  /**
   * Handles 'productOptionsAdd' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  variantsAdd(param) {
    return this.http.post(this.basUrl + '/varients/add-varients', param);
  }

  /**
   * Handles 'productOptionsUpdate' function. Calls post method with specific api address
   * along its param.
   *
   * @param param from Model
   */
  variantsUpdate(param) {
    return this.http.put(this.basUrl + '/varients/update-varients/' + param.variantId, param);
  }

  variantsDetails(param) {
    return this.http.get(this.basUrl + '/varients/varients-detail', {params: param});
  }

}
