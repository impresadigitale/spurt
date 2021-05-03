/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {BloglistModel} from './blog-model/bloglist.model';
import {BlogcountModel} from './blog-model/blogcount.model';
import {BlogupdateModel} from './blog-model/blogupdate.model';
import {BlogaddModel} from './blog-model/blogadd.model';
import {Api} from '../../providers/api/api';


@Injectable()
export class BlogService extends Api {

    params: any = {};
    private url: string = this.getBaseUrl();
    blogEditdata: any;


    // blog edit service
    setBlogListData(data) {
        this.blogEditdata = data;
    }

    getBlogListdata() {
        return this.blogEditdata;
    }

    // list
    public blogList(params: BloglistModel): Observable<any> {

        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/blog/blog-list', {params: reqOpts});

    }
   // list
   public getBlog(params: BloglistModel): Observable<any> {

    let reqOpts: any = {};
    reqOpts = params;
    return this.http.get(this.url + '/blog/blog-detail', {params: reqOpts});

}
    //  Pagination
    public blogPagiantion(params: BlogcountModel): Observable<any> {

        let reqOpts: any = {};
        reqOpts = params;
        return this.http.get(this.url + '/blog/blog-list', {params: reqOpts});

    }

// Update
    public updateblog(param: BlogupdateModel, Id: number): Observable<any> {
        return this.http.put(this.url + '/blog/update-blog/' + Id, param);
    }

// add
    addblog(param: BlogaddModel) {
        return this.http.post(this.url + '/blog/add-blog', param);


    }

// delete
    public deleteblog(param: any, Id: number): Observable<any> {
        return this.http.delete(this.url + '/blog/delete-blog/' + Id, param);
    }

    /**
     * Handles 'blogBulkDelete' function. Calls post method with specific api address
     * along its param.
     *
     * @param param from Model
     */
    blogBulkDelete(param) {
        return this.http.post(this.url + '/blog/delete-multiple-blog', param);

    }

    public getBlogCounts(): Observable<any> {
        return this.http.get(this.url + '/blog/blog-count');

    }
}
