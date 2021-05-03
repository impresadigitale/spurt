/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as actions from '../blogs-action/blog.action';
import { catchError } from 'rxjs/operators';
import { BlogService } from '../blogs.service';
import { BlogcountResponseModel } from '../blog-model/blogcount.response.model';
import { BloglistModel } from '../blog-model/bloglist.model';
import * as BlogActions from '../blogs-action/blog.action';
import { Store } from '@ngrx/store';
import * as store from '../../../../app.state.interface';

@Injectable()
export class BlogEffect {
  constructor(
    private action$: Actions,
    private service: BlogService,
    protected appState: Store<store.AppState>
  ) {}

  // blog List
  @Effect()
  doblogLists$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_blog_LIST),
    map((action: actions.DoblogListAction) => action.payload),
    switchMap(state => {
      return this.service.blogList(state).pipe(
        switchMap(user => [new actions.DoblogListSuccessAction(user)]),
        catchError(error => of(new actions.DoblogListFailAction(error)))
      );
    })
  );

  // blog LIST PAGINATION
  @Effect()
  doblogPagination$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_blog_PAGINATION_ACTION),
    map((action: actions.DoblogPaginationAction) => action.payload),
    switchMap(state => {
      return this.service.blogPagiantion(state).pipe(
        switchMap(user => [
          new actions.DoblogPaginationSuccessAction(
            new BlogcountResponseModel(user)
          )
        ]),
        catchError(error => of(new actions.DoblogPaginationFailAction(error)))
      );
    })
  );

  // ADD blog
  @Effect()
  doAddblog$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_ADD_blog_ACTION),
    map((action: actions.DoblogAddAction) => action.payload),
    switchMap(state => {
      return this.service.addblog(state).pipe(
        tap(res => {
          this.appState.dispatch(
            new BlogActions.GetBlogCount(new BloglistModel({ count: 1 }))
          );
          this.appState.dispatch(
            new BlogActions.DoblogInActiveAction(
              new BloglistModel({ count: 1, status: 0 })
            )
          );
          this.appState.dispatch(
            new BlogActions.DoblogActiveAction(
              new BloglistModel({ count: 1, status: 1 })
            )
          );
        }),
        map(active => new actions.DoblogAddSuccessAction(active)),
        catchError(error => of(new actions.DoblogAddSuccessAction(error)))
      );
    })
  );

  //  blog count
  @Effect()
  totalBlogCount$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_BLOG_COUNT),
    map((action: actions.GetBlogCount) => action.payload),
    switchMap(state => {
      return this.service.blogList(state).pipe(
        map(states => new actions.GetBlogCountSuccess(states)),
        catchError(error => of(new actions.GetBlogCountFail(error)))
      );
    })
  );
  //

  //  blog count
  @Effect()
  getBlog$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.GET_BLOG),
    map((action: actions.GetBlog) => action.payload),
    switchMap(state => {
      return this.service.getBlog(state).pipe(
        map(states => new actions.GetBlogSuccess(states)),
        catchError(error => of(new actions.GetBlogFail(error)))
      );
    })
  );
  @Effect()
  doblogactive$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_blog_ACTIVE),
    map((action: actions.DoblogActiveAction) => action.payload),
    switchMap(state => {
      return this.service.blogList(state).pipe(
        map(states => new actions.DoblogACtiveSuccessAction(states)),
        catchError(error => of(new actions.DoblogActiveFailAction(error)))
      );
    })
  );

  //  blog In-active
  @Effect()
  doblogInactive$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_blog_IN_ACTIVE),
    map((action: actions.DoblogInActiveAction) => action.payload),
    switchMap(state => {
      return this.service.blogList(state).pipe(
        map(states => new actions.DoblogInACtiveSuccessAction(states)),
        catchError(error => of(new actions.DoblogInActiveFailAction(error)))
      );
    })
  );

  // Update
  @Effect()
  doUpdateblog$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_UPDATE_blog_ACTION),
    map((action: actions.DoblogUpdateAction) => action.payload),
    switchMap(state => {
      const Id = state.blogId;
      if (state.image === '') {
        delete state.image;
      }
      return this.service.updateblog(state, Id).pipe(
        tap(res => {
          this.appState.dispatch(
            new BlogActions.GetBlogCount(new BloglistModel({ count: 1 }))
          );

          this.appState.dispatch(
            new BlogActions.DoblogInActiveAction(
              new BloglistModel({ count: 1, status: 0 })
            )
          );
          this.appState.dispatch(
            new BlogActions.DoblogActiveAction(
              new BloglistModel({ count: 1, status: 1 })
            )
          );
        }),
        switchMap(user => [new actions.DoblogUpdateSuccessAction(user)]),
        catchError(error => of(new actions.DoblogUpdateFailAction(error)))
      );
    })
  );

  // // Delete
  @Effect()
  doDeleteblog$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_DELETE_blog_ACTION),
    map((action: actions.DoblogDeleteAction) => action.payload),
    switchMap(state => {
      const blogId = state.blogId;
      return this.service.deleteblog(state, blogId).pipe(
        tap(res => {
          this.appState.dispatch(
            new BlogActions.GetBlogCount(new BloglistModel({ count: 1 }))
          );

          this.appState.dispatch(
            new BlogActions.DoblogInActiveAction(
              new BloglistModel({ count: 1, status: 0 })
            )
          );
          this.appState.dispatch(
            new BlogActions.DoblogActiveAction(
              new BloglistModel({ count: 1, status: 1 })
            )
          );
        }),
        map(update => new actions.DoblogDeleteSuccessAction(update)),
        catchError(error => of(new actions.DoblogDeleteFailAction(error)))
      );
    })
  );

  // Product Bulk Delete
  @Effect()
  doProductblogDelete$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.DO_blog_BULK_DELETE),
    map((action: actions.DoblogBulkDelete) => action.payload),
    switchMap(state => {
      return this.service.blogBulkDelete(state).pipe(
        tap(res => {
          this.appState.dispatch(
            new BlogActions.GetBlogCount(new BloglistModel({ count: 1 }))
          );

          this.appState.dispatch(
            new BlogActions.DoblogInActiveAction(
              new BloglistModel({ count: 1, status: 0 })
            )
          );
          this.appState.dispatch(
            new BlogActions.DoblogActiveAction(
              new BloglistModel({ count: 1, status: 1 })
            )
          );
        }),
        switchMap(user => [new actions.DoblogBulkDeleteSuccess(user)]),
        catchError(error => of(new actions.DoblogBulkDeleteFail(error)))
      );
    })
  );



    // blog counts

    @Effect()
    blogCounts$: Observable<Action> = this.action$.pipe(
      ofType(actions.ActionTypes.GET_BLOG_COUNTS),
      map((action: actions.GetBlogCountsAction) => action.payload),
      switchMap(state => {
        return this.service.getBlogCounts().pipe(
          switchMap(user => [new actions.GetBlogCountsSuccess(user)]),
          catchError(error => of(new actions.GetBlogCountsFail(error)))
        );
      })
    );
}
