/*
 * spurtcommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpHeaders, HttpParams} from '@angular/common/http';

import {Api} from '../providers/api/api';

@Injectable()
export class BlogsService extends Api {

    private base: string = this.getBaseUrl();

    /* get blog list api*/
    public getBlogList(params: any): Observable<any> {
        return this.http.get(this.base + 'list/blog/blog-list', {params: params});
    }
        /* get related blog list api*/
        public getRelatedBlogList(params: any): Observable<any> {
            return this.http.get(this.base + 'list/related-blog-list', {params: params});
        }
    /* get blog detail api*/
    public getBlogDetail(params: any): Observable<any> {
        return this.http.get(this.base + 'list/blog/blog-detail/' + params.id);
    }
}
