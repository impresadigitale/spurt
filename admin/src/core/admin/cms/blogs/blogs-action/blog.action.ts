/*
* spurtcommerce
* version 2.2
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 piccosoft ltd
* Author piccosoft ltd <support@piccosoft.com>
* Licensed under the MIT license.
*/
import {type} from '../../../shared/utility/utilityHelpers';
import {Action} from '@ngrx/store';
import {BloglistModel} from '../blog-model/bloglist.model';
import {BlogdeleteModel} from '../blog-model/blogdelete.model';
import {BlogcountModel} from '../blog-model/blogcount.model';
import {BlogupdateModel} from '../blog-model/blogupdate.model';
import {
    DoProductBulkDelete,
    DoProductBulkDeleteFail,
    DoProductBulkDeleteSuccess
} from '../../../catalog/product/product-action/product.action';


export const ActionTypes = {
    DO_blog_LIST: type('[blog] Do blogList'),
    DO_blog_LIST_SUCCESS: type('[blog] Do blog Success'),
    DO_blog_LIST_FAIL: type('[blog] Do blog Fail'),

    GET_BLOG_COUNT: type('[blog] get total blogs'),
    GET_BLOG_COUNT_SUCCESS: type('[blog] get total blogs Success'),
    GET_BLOG_COUNT_FAIL: type('[blog] get total blogs Fail'),

    GET_BLOG: type('[blog] get blogs'),
    GET_BLOG_SUCCESS: type('[blog] get blogs Success'),
    GET_BLOG_FAIL: type('[blog] get blogs Fail'),

    DO_blog_ACTIVE: type('[blog] Do blog active'),
    DO_blog_ACTIVE_SUCCESS: type('[blog] Do blog active Success'),
    DO_blog_ACTIVE_FAIL: type('[blog] Do blog active Fail'),

    DO_blog_IN_ACTIVE: type('[blog] Do blog in-active'),
    DO_blog_IN_ACTIVE_SUCCESS: type('[blog] Do blog in-active Success'),
    DO_blog_IN_ACTIVE_FAIL: type('[blog] Do blog in-active Fail'),

    DO_blog_PAGINATION_ACTION: type('[blog Pagination] Do blog Paination '),
    DO_blog_PAGINATION_SUCCESS: type('[blog Pagination] Do blog Paination  Success'),
    DO_blog_PAGINATION_FAIL: type('[blog Pagination] Do blog Paination  Fail'),

    DO_ADD_blog_ACTION: type('[blog Add] Do blog Add '),
    DO_ADD_blog_SUCCESS: type('[blog Add] Do blog Add  Success'),
    DO_ADD_blog_FAIL: type('[blog Add] Do blog Add  Fail'),

    DO_UPDATE_blog_ACTION: type('[blog Update] Do blog Update '),
    DO_UPDATE_blog_SUCCESS: type('[blog Update] Do blog Update  Success'),
    DO_UPDATE_blog_FAIL: type('[blog Update] Do blog Update  Fail'),

    DO_DELETE_blog_ACTION: type('[blog Delete] Do blog Delete '),
    DO_DELETE_blog_SUCCESS: type('[blog Delete] Do blog Delete  Success'),
    DO_DELETE_blog_FAIL: type('[blog Delete] Do blog Delete  Fail'),

    DO_blog_BULK_DELETE: type('[blog BULK DELETE] DO blog Bulk Delete'),
    DO_blog_BULK_DELETE_SUCCESS: type('[blog BULK DELETE SUCCESS] Do blog Bulk Delete Success'),
    DO_blog_BULK_DELETE_FAIL: type('[blog BULK DELETE] Do blog Bulk Delete Fail'),
    ADD_RELATED_blog: type('[blog] add related blog'),
    REMOVE_RELATED_blog: type('[blog] remove related blog'),

    GET_BLOG_COUNTS: type('[blog] get blog counts'),
    GET_BLOG_COUNTS_SUCCESS: type('[blog] get blog counts Success'),
    GET_BLOG_COUNTS_FAIL: type('[blog] get blog counts Fail'),
};

// blog LIST

export class DoblogListAction implements Action {
    type = ActionTypes.DO_blog_LIST;

    constructor(public payload: BloglistModel) {
    }
}

export class DoblogListSuccessAction implements Action {
    type = ActionTypes.DO_blog_LIST_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoblogListFailAction implements Action {
    type = ActionTypes.DO_blog_LIST_FAIL;

    constructor(public payload: any = null) {
    }
}

export class AddRelatedBlog implements Action {
    type = ActionTypes.ADD_RELATED_blog;

    constructor(public payload: any) {
    }
}

export class RemoveRelatedBlog implements Action {
    type = ActionTypes.REMOVE_RELATED_blog;

    constructor(public payload: any) {
    }
}

// blog Active

export class DoblogActiveAction implements Action {
    type = ActionTypes.DO_blog_ACTIVE;

    constructor(public payload: BloglistModel) {
    }
}

export class DoblogACtiveSuccessAction implements Action {
    type = ActionTypes.DO_blog_ACTIVE_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoblogActiveFailAction implements Action {
    type = ActionTypes.DO_blog_ACTIVE_FAIL;

    constructor(public payload: any = null) {
    }
}

// blog count

export class GetBlogCount implements Action {
    type = ActionTypes.GET_BLOG_COUNT;

    constructor(public payload: BloglistModel) {
    }
}

export class GetBlogCountSuccess implements Action {
    type = ActionTypes.GET_BLOG_COUNT_SUCCESS;

    constructor(public payload: any) {

    }
}

export class GetBlogCountFail implements Action {
    type = ActionTypes.GET_BLOG_COUNT_FAIL;

    constructor(public payload: any = null) {
    }
}

// blog count

export class GetBlog implements Action {
    type = ActionTypes.GET_BLOG;

    constructor(public payload: any) {
    }
}

export class GetBlogSuccess implements Action {
    type = ActionTypes.GET_BLOG_SUCCESS;

    constructor(public payload: any) {

    }
}

export class GetBlogFail implements Action {
    type = ActionTypes.GET_BLOG_FAIL;

    constructor(public payload: any = null) {
    }
}

// blog In-Active

export class DoblogInActiveAction implements Action {
    type = ActionTypes.DO_blog_IN_ACTIVE;

    constructor(public payload: BloglistModel) {
    }
}

export class DoblogInACtiveSuccessAction implements Action {
    type = ActionTypes.DO_blog_IN_ACTIVE_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoblogInActiveFailAction implements Action {
    type = ActionTypes.DO_blog_IN_ACTIVE_FAIL;

    constructor(public payload: any = null) {
    }
}



// blog LIST  PAGINATION

export class DoblogPaginationAction implements Action {
    type = ActionTypes.DO_blog_PAGINATION_ACTION;

    constructor(public payload: BlogcountModel) {
    }
}

export class DoblogPaginationSuccessAction implements Action {
    type = ActionTypes.DO_blog_PAGINATION_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoblogPaginationFailAction implements Action {
    type = ActionTypes.DO_blog_PAGINATION_SUCCESS;

    constructor(public payload: any = null) {
    }
}


// Add blog ACTION

export class DoblogAddAction implements Action {
    type = ActionTypes.DO_ADD_blog_ACTION;

    constructor(public payload: any) {
    }
}

export class DoblogAddSuccessAction implements Action {
    type = ActionTypes.DO_ADD_blog_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoblogAddFailAction implements Action {
    type = ActionTypes.DO_ADD_blog_FAIL;

    constructor(public payload: any = null) {
    }
}

// # UPDATE blog ACTION

export class DoblogUpdateAction implements Action {
    type = ActionTypes.DO_UPDATE_blog_ACTION;

    constructor(public payload: BlogupdateModel) {
    }
}

export class DoblogUpdateSuccessAction implements Action {
    type = ActionTypes.DO_UPDATE_blog_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoblogUpdateFailAction implements Action {
    type = ActionTypes.DO_UPDATE_blog_FAIL;

    constructor(public payload: any = null) {
    }
}


// #  DELETE blog ACTION

export class DoblogDeleteAction implements Action {
    type = ActionTypes.DO_DELETE_blog_ACTION;

    constructor(public payload: BlogdeleteModel) {
    }
}

export class DoblogDeleteSuccessAction implements Action {
    type = ActionTypes.DO_DELETE_blog_SUCCESS;

    constructor(public payload: any) {

    }
}

export class DoblogDeleteFailAction implements Action {
    type = ActionTypes.DO_DELETE_blog_FAIL;

    constructor(public payload: any = null) {
    }
}

// Do blog Bulk Delete
export class DoblogBulkDelete implements Action {
    type = ActionTypes.DO_blog_BULK_DELETE;

    constructor(public payload: any = null) {
    }
}

export class DoblogBulkDeleteSuccess implements Action {
    type = ActionTypes.DO_blog_BULK_DELETE_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DoblogBulkDeleteFail implements Action {
    type = ActionTypes.DO_blog_BULK_DELETE_FAIL;

    constructor(public payload: any = null) {

    }
}


// get blogs  overall count

export class GetBlogCountsAction implements Action {
    type = ActionTypes.GET_BLOG_COUNTS;
    constructor(public payload: any = null) {
    }
}

export class GetBlogCountsSuccess implements Action {
    type = ActionTypes.GET_BLOG_COUNTS_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetBlogCountsFail implements Action {
    type = ActionTypes.GET_BLOG_COUNTS_FAIL;
    constructor(public payload: any = null) {

    }
}


export type Actions
    =
    DoblogListAction
    | DoblogListSuccessAction
    | DoblogListFailAction
    | DoblogPaginationAction
    | DoblogPaginationSuccessAction
    | DoblogPaginationSuccessAction
    | DoblogAddAction
    | DoblogAddSuccessAction
    | DoblogAddFailAction
    | DoblogUpdateAction
    | DoblogUpdateSuccessAction
    | DoblogUpdateFailAction
    | DoblogDeleteAction
    | DoblogDeleteSuccessAction
    | DoblogDeleteFailAction
    | DoblogActiveAction
    | DoblogACtiveSuccessAction
    |DoblogActiveFailAction
    |DoblogInActiveAction
    |DoblogInACtiveSuccessAction
    |DoblogInActiveFailAction
    | DoblogBulkDelete
    | DoblogBulkDeleteSuccess
    | DoblogBulkDeleteFail
    | GetBlogCountsAction
    | GetBlogCountsSuccess
    | GetBlogCountsFail
    ;
