/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import * as actions from '../blogs-action/blog.action';
import {BloglistResponseModel} from '../blog-model/bloglist.response.model';
import {BlogaddResponseModel} from '../blog-model/blogadd.response.model';
import { BlogState, blogRecordState } from '../../blogs/blogs-store/blog.state';

export const initialState: BlogState = new blogRecordState() as unknown as BlogState;

export function reducer(state = initialState, {type, payload}: any): BlogState {
    if (!type) {
        return state;
    }
    switch (type) {


// <------------ BLOG LIST ---------------> //

        case actions.ActionTypes.DO_blog_LIST: {

            return Object.assign({}, state, {
                blogListLoaded: true,
                blogListFailed: false,
                blogListLoading: false
            });
        }
        case actions.ActionTypes.DO_blog_LIST_SUCCESS: {
            const blogListModel = payload.data.map(_bloglistModel => {
                const tempblogListModel = new BloglistResponseModel(_bloglistModel);
                return tempblogListModel;
            });
            return Object.assign({}, state, {
                blogListLoaded: true,
                blogListFailed: false,
                blogListLoading: false,
                blogList: blogListModel
            });
        }
        case actions.ActionTypes.DO_blog_LIST_FAIL: {
            return Object.assign({}, state, {
                blogListLoaded: false,
                blogListFailed: true,
                blogListLoading: false
            });
        }

// <------------ ADD BLOG LIST ---------------> //

        case actions.ActionTypes.DO_ADD_blog_ACTION: {
            return Object.assign({}, state, {
                blogAddLoaded: true,
                blogAddFailed: false,
                blogAddLoading: false,
            });
        }
        case actions.ActionTypes.DO_ADD_blog_SUCCESS: {
            const addblog = new BlogaddResponseModel(payload.data);
            return Object.assign({}, state, {
                blogAddLoaded: true,
                blogAddFailed: false,
                blogAddLoading: false,
                newBlog: payload,
                addBlog: addblog
            });
        }
        case actions.ActionTypes.DO_ADD_blog_FAIL: {
            return Object.assign({}, state, {
                blogAddLoaded: false,
                blogAddFailed: true,
                blogAddLoading: false,
            });
        }

// <------------ GET BLOG DETAILS ---------------> //


        case actions.ActionTypes.GET_BLOG: {

            return Object.assign({}, state, {
                blogLoaded: true,
                blogFailed: false,
                blogLoading: false
            });
        }
        case actions.ActionTypes.GET_BLOG_SUCCESS: {
            return Object.assign({}, state, {
                blogLoaded: true,
                blogFailed: false,
                blogLoading: false,
                blog: payload.data
            });
        }
        case actions.ActionTypes.GET_BLOG_FAIL: {
            return Object.assign({}, state, {
                blogLoaded: false,
                blogFailed: true,
                blogLoading: false,
            });
        }

// <------------ UPDATE BLOG ---------------> //

        case actions.ActionTypes.DO_UPDATE_blog_ACTION: {
            return Object.assign({}, state, {
                blogUpdateLoading: true,
                blogUpdateLoaded: false,
                blogUpdateFailed: false,
            });
        }
        case actions.ActionTypes.DO_UPDATE_blog_SUCCESS: {
            return Object.assign({}, state, {
                blogUpdateLoaded: true,
                blogUpdateFailed: false,
                blogUpdateLoading: false,
                updateBlog: payload
            });
        }
        case actions.ActionTypes.DO_UPDATE_blog_FAIL: {
            return Object.assign({}, state, {
                blogUpdateLoaded: false,
                blogUpdateFailed: true,
                blogUpdateLoading: false,
            });
        }

// <------------ DELETE BLOG ---------------> //

        case actions.ActionTypes.DO_DELETE_blog_ACTION: {
            return Object.assign({}, state, {

                blogDeleteLoading: true,
                blogDeleteLoaded: false,
                blogDeleteFailed: false
            });
        }
        case actions.ActionTypes.DO_DELETE_blog_SUCCESS: {
            return Object.assign({}, state, {
                blogDeleteLoaded: true,
                blogDeleteFailed: false,
                blogDeleteLoading: false,
                deleteblog: payload
            });
        }

        case actions.ActionTypes.DO_DELETE_blog_FAIL: {
            return Object.assign({}, state, {
                blogDeleteLoaded: false,
                blogDeleteFailed: true,
                blogDeleteLoading: false,
            });
        }


        case actions.ActionTypes.DO_blog_ACTIVE: {

            return Object.assign({}, state, {
                blogActiveLoaded: true,
                blogActiveFailed: false,
                blogActiveLoading: false
            });
        }
        case actions.ActionTypes.DO_blog_IN_ACTIVE: {

            return Object.assign({}, state, {
                blogInActiveLoaded: true,
                blogInActiveFailed: false,
                blogInActiveLoading: false
            });
        }
        case actions.ActionTypes.DO_blog_PAGINATION_ACTION: {
            return Object.assign({}, state, {
                blogCountLoading: true,
                blogCountLoaded: false,
                blogCountFailed: false,
            });
        }



        // # Success functions

        case actions.ActionTypes.ADD_RELATED_blog: {
            let update = [];
            if (payload.length) {
              update = [];
            } else {
              const currentBlog = state.blogList;
              update = currentBlog.filter(blog => {
                if (blog.id === payload.id) {
                  return false;
                } else {
                  return true;
                }
              });
            }
            return Object.assign({}, state, {
                blogList: update
            });
          }
          case actions.ActionTypes.REMOVE_RELATED_blog: {
            let tempArray = [];
              tempArray = state.blogList;
              tempArray.push(payload);
            return Object.assign({}, state, {
              blogList: tempArray
            });
          }

        case actions.ActionTypes.DO_blog_ACTIVE_SUCCESS: {
            const activeblog = payload.data;
            return Object.assign({}, state, {
                blogActiveLoaded: true,
                blogActiveFailed: false,
                blogActiveLoading: false,
                blogActive: activeblog
            });
        }

        case actions.ActionTypes.DO_blog_IN_ACTIVE_SUCCESS: {
            const inActiveblog = payload.data;
            return Object.assign({}, state, {
                blogInActiveLoaded: true,
                blogInActiveFailed: false,
                blogInActiveLoading: false,
                blogInActive: inActiveblog
            });
        }



        case actions.ActionTypes.DO_blog_PAGINATION_SUCCESS: {
            return Object.assign({}, state, {
                blogCountLoaded: true,
                blogCountFailed: false,
                blogCountLoading: false,
                blogPagination: payload.blogcount.data
            });
        }

        case actions.ActionTypes.DO_blog_ACTIVE_FAIL: {
            return Object.assign({}, state, {
                blogActiveLoaded: false,
                blogActiveFailed: true,
                blogActiveLoading: false,
            });
        }

        case actions.ActionTypes.DO_blog_IN_ACTIVE_FAIL: {
            return Object.assign({}, state, {
                blogInActiveLoaded: false,
                blogInActiveFailed: true,
                blogInActiveLoading: false,
            });
        }


        case actions.ActionTypes.DO_blog_PAGINATION_FAIL: {
            return Object.assign({}, state, {
                changePSW: payload,
                failed: true
            });
        }

        case actions.ActionTypes.DO_blog_BULK_DELETE: {
            return Object.assign({}, state, {});
        }
        case actions.ActionTypes.DO_blog_BULK_DELETE_SUCCESS: {
            return Object.assign({}, state, {

                deleteBlog: payload
            });
        }
        case actions.ActionTypes.DO_blog_BULK_DELETE_FAIL: {
            return Object.assign({}, state, {
            });
        }
        // get blog count

        case actions.ActionTypes.GET_BLOG_COUNT_SUCCESS: {

            return Object.assign({}, state, {
                totalBlogs: payload.data
            });
        }

        // get blog overall counts

        case actions.ActionTypes.GET_BLOG_COUNTS: {
            return Object.assign({}, state, {
                getBlogCounts: {},
                getBlogCountsLoading: true,
                getBlogCountsLoaded: false,
                getBlogCountsFailed: false,
            });
        }

        case actions.ActionTypes.GET_BLOG_COUNTS_SUCCESS: {
            return Object.assign({}, state, {
                getBlogCounts: payload.data,
                getBlogCountsLoading: false,
                getBlogCountsLoaded: true,
                getBlogCountsFailed: false,
            });
        }

        case actions.ActionTypes.GET_BLOG_COUNTS_FAIL: {
            return Object.assign({}, state, {
                getBlogCounts: {},
                getBlogCountsLoading: false,
                getBlogCountsLoaded: false,
                getBlogCountsFailed: true,
            });
        }
        default: {
            return state;
        }
    }
}

export const blogAddLoaded = (state: BlogState) => state.blogAddLoaded;
export const blogAddFailed = (state: BlogState) => state.blogAddFailed;
export const blogAddLoading = (state: BlogState) => state.blogAddLoading;

export const blogPagination = (state: BlogState) => state.blogPagination;

export const blogDetails = (state: BlogState) => state.blog;

export const blogListLoaded = (state: BlogState) => state.blogListLoaded;
export const blogListFailed = (state: BlogState) => state.blogListFailed;
export const blogListLoading = (state: BlogState) => state.blogListLoading;
export const blogList = (state: BlogState) => state.blogList;

export const newBlog = (state: BlogState) => state.newBlog;
export const addBlog = (state: BlogState) => state.addBlog;
export const updateBlog = (state: BlogState) => state.updateBlog;
export const deleteBlog = (state: BlogState) => state.deleteBlog;


export const blogActiveLoaded = (state: BlogState) => state.blogActiveLoaded;
export const blogActiveFailed = (state: BlogState) => state.blogActiveFailed;
export const blogActivetLoading = (state: BlogState) => state.blogActivetLoading;
export const blogInActiveLoaded = (state: BlogState) => state.blogInActiveLoaded;
export const blogInActiveFailed = (state: BlogState) => state.blogInActiveFailed;
export const blogInActivetLoading = (state: BlogState) => state.blogInActivetLoading;
export const getblogActive = (state: BlogState) => state.blogActive;
export const getblogInActive = (state: BlogState) => state.blogInActive;
export const getTotalBlogs = (state: BlogState) => state.totalBlogs;

export const getBlogCounts = (state: BlogState) => state.getBlogCounts;
export const getBlogCountsLoading = (state: BlogState) => state.getBlogCountsLoading;
export const getBlogCountsLoaded = (state: BlogState) => state.getBlogCountsLoaded;
export const getBlogCountsFailed = (state: BlogState) => state.getBlogCountsFailed;

export const blogDeleteLoaded = (state: BlogState) => state.blogDeleteLoaded;





