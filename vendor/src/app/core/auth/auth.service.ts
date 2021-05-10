/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Api} from '../providers/api/api';


@Injectable()
export class AuthApiService extends Api {


    private base: string = this.getBaseUrl();

    /* call login api*/
    public doLogin(params: any): Observable<any> {
            return this.http.post(this.base + '/vendor/login', params);
    }

    /* call register api*/
    public doRegister(params: any): Observable<any> {
        return this.http.post(this.base + '/vendor/register', params);
    }

    /* call recover account api*/
    public doChangePassword(params: any): Observable<any> {
        return this.http.put(this.base + '/vendor/change-password', params);
    }

    /* call recover account api*/
    public doForgetPassword(params: any): Observable<any> {
        return this.http.post(this.base + '/vendor/forgot-password', params);
    }
}
