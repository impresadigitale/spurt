/*
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Injectable, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {ToastrManager} from 'ng6-toastr-notifications';
import * as BlogActions from './blogs-action/blog.action';
import {Subscription} from 'rxjs/index';
import * as store from '../../../app.state.interface';
import {Router} from '@angular/router';
import {
    getblogInActive,
    getblogActive,
    totalBlogs,
    getBlogCounts,
    getBlogCountsLoading,
    blogList,
    blogPagination,
    newBlog,
    addBlog,
    blogDetails,
    updateBlog,
    deleteBlog,
    blogDeleteLoaded
} from './blogs-reducer/blog.selector';
import {BloglistModel} from './blog-model/bloglist.model';
import {BlogdeleteModel} from './blog-model/blogdelete.model';
import {BlogcountModel} from './blog-model/blogcount.model';
import * as pagesActions from '../pages/pagesaction/page.action';
import { BlogaddModel } from './blog-model/blogadd.model';
import { BlogupdateModel } from './blog-model/blogupdate.model';


@Injectable()
export class BlogSandbox implements OnDestroy {

    public blogList$ = this.appState.select(blogList);
    public blogDetails$ = this.appState.select(blogDetails);
    public blogPagination$ = this.appState.select(blogPagination);
    public getAddNewBlog$ = this.appState.select(newBlog);
    public getaddBlog$ = this.appState.select(addBlog);
    public updateBlog$ = this.appState.select(updateBlog);
    public deleteBlog$ = this.appState.select(deleteBlog);

    public getblogActive$ = this.appState.select(getblogActive);
    public getblogInActive$ = this.appState.select(getblogInActive);
    public totalBlogs$ = this.appState.select(totalBlogs);
    public getBlogCounts$ = this.appState.select(getBlogCounts);
    public getBlogCountsLoading$ = this.appState.select(getBlogCountsLoading);

    public blogDeleteLoaded$ = this.appState.select(blogDeleteLoaded);



    private subscriptions: Array<Subscription> = [];

    constructor(protected appState: Store<store.AppState>, private router: Router, private toastr: ToastrManager) {

        this.subscribe();
    }

    public getBlogList(value: any) {
        this.appState.dispatch(new BlogActions.DoblogListAction(new BloglistModel(value)));
    }
    public getBlogCount(value: any) {
        this.appState.dispatch(new BlogActions.GetBlogCount(new BloglistModel(value)));
    }
    public getBlog(value: any) {
        this.appState.dispatch(new BlogActions.GetBlog(value));
    }
    public getBlogActive(value: any) {
        this.appState.dispatch(new BlogActions.DoblogActiveAction(new BloglistModel(value)));
    }
    public getBlogInActive(value: any) {
        this.appState.dispatch(new BlogActions.DoblogInActiveAction(new BloglistModel(value)));
    }

    public getBlogPagination(value: any) {
        this.appState.dispatch(new BlogActions.DoblogPaginationAction(new BlogcountModel(value)));
    }

    public addBlog(data) {
        this.appState.dispatch(new BlogActions.DoblogAddAction(new BlogaddModel(data)));

    }
    public addRelatedBlog(data) {
        this.appState.dispatch(new BlogActions.AddRelatedBlog(data));
    }
    public removeRelatedBlog(data) {
        this.appState.dispatch(new BlogActions.RemoveRelatedBlog(data));
    }
    public UpdateBlog(data) {
        this.appState.dispatch(new BlogActions.DoblogUpdateAction(new BlogupdateModel(data)));

    }

    public deleteBlog(data) {
        this.appState.dispatch(new BlogActions.DoblogDeleteAction(new BlogdeleteModel(data)));

    }

    // Do Blog Bulk Delete
    public bulkDelete(value) {
        this.appState.dispatch(new BlogActions.DoblogBulkDelete(value));
    }

    // get blogs overall counts

    public getBlogCounts() {
        this.appState.dispatch(new BlogActions.GetBlogCountsAction());
    }


    subscribe() {

        this.subscriptions.push(this.getAddNewBlog$.subscribe(data => {
            if (data) {
                if (data.message) {
                    this.router.navigate(['/cms/blogs/list']);
                }
            }
        }));

        this.subscriptions.push(this.updateBlog$.subscribe(data => {
            if (data) {
                if (data.message) {
                    this.router.navigate(['/cms/blogs/list']);
                }
            }
        }));

    }

    public ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

}






