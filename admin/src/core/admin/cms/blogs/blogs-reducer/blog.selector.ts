/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {createSelector} from 'reselect';
import * as fromBlog from '../blogs-reducer/blog.reducer';
import {AppState} from '../../../../app.state.interface';
// *************************** PUBLIC API's ****************************
/**
 * Auth store functions
 */
export const getblogState = (state: AppState) => state.blog;

export const blogList = createSelector(getblogState, fromBlog.blogList);
export const blogPagination = createSelector(getblogState, fromBlog.blogPagination);

export const newBlog = createSelector(getblogState, fromBlog.newBlog);
export const addBlog = createSelector(getblogState, fromBlog.addBlog);
export const deleteBlog = createSelector(getblogState, fromBlog.deleteBlog);

export const blogAddLoading = createSelector(getblogState, fromBlog.blogAddLoading);
export const blogAddLoaded = createSelector(getblogState, fromBlog.blogAddLoaded);
export const blogDetails = createSelector(getblogState, fromBlog.blogDetails);

export const updateBlog = createSelector(getblogState, fromBlog.updateBlog);

export const blogActiveLoaded = createSelector(getblogState, fromBlog.blogActiveLoaded);
export const blogActiveFailed = createSelector(getblogState, fromBlog.blogActiveFailed);
export const blogActivetLoading = createSelector(getblogState, fromBlog.blogActivetLoading);


export const blogInActiveLoaded = createSelector(getblogState, fromBlog.blogInActiveLoaded);
export const blogInActiveFailed = createSelector(getblogState, fromBlog.blogInActiveFailed);
export const blogInActivetLoading = createSelector(getblogState, fromBlog.blogInActivetLoading);

export const getblogActive = createSelector(getblogState, fromBlog.getblogActive);

export const getblogInActive = createSelector(getblogState, fromBlog.getblogInActive);
export const totalBlogs = createSelector(getblogState, fromBlog.getTotalBlogs);

export const getBlogCounts = createSelector(getblogState, fromBlog.getBlogCounts);
export const getBlogCountsLoading = createSelector(getblogState, fromBlog.getBlogCountsLoading);
export const getBlogCountsLoaded = createSelector(getblogState, fromBlog.getBlogCountsLoaded);
export const getBlogCountsFailed = createSelector(getblogState, fromBlog.getBlogCountsFailed);

export const blogDeleteLoaded = createSelector(getblogState, fromBlog.blogDeleteLoaded);
