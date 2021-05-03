/*
 * spurtcommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Action} from '@ngrx/store';
import {type} from '../../shared/utility/utilityHelpers';

export const ActionTypes = {
    GET_BLOG_LIST: type('[bloglist] get bloglist'),
    GET_BLOG_LIST_SUCCESS: type('[bloglist] get bloglist success'),
    GET_BLOG_LIST_FAIL: type('[bloglist] get bloglist fail'),

    GET_RELATED_BLOG_LIST: type('[bloglist] get related bloglist'),
    GET_RELATED_BLOG_LIST_SUCCESS: type('[bloglist] get related bloglist success'),
    GET_RELATED_BLOG_LIST_FAIL: type('[bloglist] get related bloglist fail'),

    GET_BLOG_DETAIL: type('[blogdetail] get blog list'),
    GET_BLOG_DETAIL_SUCCESS: type('[blogdetail] get blog list success'),
    GET_BLOG_DETAIL_FAIL: type('[blogdetail] get blog list fail'),
};
/* get blog list action*/

export class GetBlogList implements Action {
    type = ActionTypes.GET_BLOG_LIST;

    constructor(public payload: any) {
    }
}

export class GetBlogListSuccess implements Action {
    type = ActionTypes.GET_BLOG_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}
export class GetBlogListFail implements Action {
    type = ActionTypes.GET_BLOG_LIST_FAIL;

    constructor(public payload: any) {
    }
}
/* get related blog list action*/

export class GetRelatedBlogList implements Action {
    type = ActionTypes.GET_RELATED_BLOG_LIST;

    constructor(public payload: any) {
    }
}

export class GetRelatedBlogListSuccess implements Action {
    type = ActionTypes.GET_RELATED_BLOG_LIST_SUCCESS;

    constructor(public payload: any) {
    }
}
export class GetRelatedBlogListFail implements Action {
    type = ActionTypes.GET_RELATED_BLOG_LIST_FAIL;

    constructor(public payload: any) {
    }
}
/*get blog detail action*/

export class GetBlogDetail implements Action {
    type = ActionTypes.GET_BLOG_DETAIL;

    constructor(public payload: any) {
    }
}

export class GetBlogDetailSuccess implements Action {
    type = ActionTypes.GET_BLOG_DETAIL_SUCCESS;

    constructor(public payload: any) {
    }
}
export class GetBlogDetailFail implements Action {
    type = ActionTypes.GET_BLOG_DETAIL_FAIL;

    constructor(public payload: any) {
    }
}

export type Actions
    = GetBlogList|
    GetBlogListSuccess|
    GetBlogListFail|
    GetRelatedBlogList|
    GetRelatedBlogListSuccess|
    GetRelatedBlogListFail|
    GetBlogDetail|
    GetBlogDetailSuccess|
    GetBlogDetailFail;
