/*
 * spurtcommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import * as actions from '../action/blogs.action';
import { BlogsState, blogsRecord } from './blogs.state';
import { BlogListModel } from '../models/blog-list.model';

export const initialState: BlogsState = (new blogsRecord() as unknown) as BlogsState;

export function reducer(
  state = initialState,
  { type, payload }: any
): BlogsState {
  if (!type) {
    return state;
  }
  switch (type) {

// <------------ GET BLOG LIST -----------> //

    case actions.ActionTypes.GET_BLOG_LIST: {
      return Object.assign({}, state, {
        blogList: [],
        blogListLoading: true,
        blogListLoaded: false,
        blogListFailed: false
      });
    }

    case actions.ActionTypes.GET_BLOG_LIST_SUCCESS: {
      const tempList = payload.data.map(list => {
        const blog = new BlogListModel(list);
        return blog;
      });
      return Object.assign({}, state, {
        blogList: tempList,
        blogListLoading: false,
        blogListLoaded: true,
        blogListFailed: false
      });
    }

    case actions.ActionTypes.GET_BLOG_LIST_FAIL: {
      return Object.assign({}, state, {
        blogList: [],
        blogListLoading: false,
        blogListLoaded: true,
        blogListFailed: true
      });
    }


// <------------ GET RELATED BLOG LIST -----------> //

    case actions.ActionTypes.GET_RELATED_BLOG_LIST: {
      return Object.assign({}, state, {
        relatedBlogListLoading: true,
        relatedBlogListLoaded: false,
        relatedBlogListFailed: false
      });
    }
    case actions.ActionTypes.GET_RELATED_BLOG_LIST_SUCCESS: {
      return Object.assign({}, state, {
        relatedBlogList: payload.data,
        relatedBlogListLoading: false,
        relatedBlogListLoaded: true,
        relatedBlogListFailed: false
      });
    }
    case actions.ActionTypes.GET_RELATED_BLOG_LIST_FAIL: {
      return Object.assign({}, state, {
        relatedBlogListLoading: false,
        relatedBlogListLoaded: true,
        relatedBlogListFailed: true
      });
    }

// <------------ GET BLOG DETAILS -----------> //

    case actions.ActionTypes.GET_BLOG_DETAIL: {
      return Object.assign({}, state, {
        blogDetailLoading: true,
        blogDetailLoaded: false,
        blogDetailFailed: false
      });
    }
    case actions.ActionTypes.GET_BLOG_DETAIL_SUCCESS: {
      return Object.assign({}, state, {
        blogDetail: payload.data,
        blogDetailLoading: false,
        blogDetailLoaded: true,
        blogDetailFailed: false
      });
    }
    case actions.ActionTypes.GET_BLOG_DETAIL_FAIL: {
      return Object.assign({}, state, {
        blogDetail: {},
        blogDetailLoading: false,
        blogDetailLoaded: true,
        blogDetailFailed: true
      });
    }

    default: {
      return state;
    }
  }
}

export const getBlogListLoading = (state: BlogsState) => state.blogListLoading;
export const getBlogListLoaded = (state: BlogsState) => state.blogListLoaded;
export const getBlogListFailed = (state: BlogsState) => state.blogListFailed;
export const getBlogList = (state: BlogsState) => state.blogList;

export const getRelatedBlogListLoading = (state: BlogsState) => state.relatedBlogListLoading;
export const getRelatedBlogListLoaded = (state: BlogsState) => state.relatedBlogListLoaded;
export const getRelatedBlogListFailed = (state: BlogsState) => state.relatedBlogListFailed;
export const getRelatedBlogList = (state: BlogsState) => state.relatedBlogList;

export const getBlogDetailLoading = (state: BlogsState) =>
  state.blogDetailLoading;
export const getBlogDetailLoaded = (state: BlogsState) =>
  state.blogDetailLoaded;
export const getBlogDetailFailed = (state: BlogsState) =>
  state.blogDetailFailed;
export const getBlogDetail = (state: BlogsState) => state.blogDetail;
