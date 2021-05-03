/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {Map, Record} from 'immutable';


export interface BlogState extends Map<string, any> {

    blogList: any;
    blog: any;
    blogPagination: any;
    newBlog: any;
    updateBlog: any;
    deleteBlog: any;
    blogActive: any;
    addBlog: any;
    blogInActive: any;
    blogListLoaded: boolean;
    blogListFailed: boolean;
    blogListLoading: boolean;
    blogLoaded: boolean;
    blogFailed: boolean;
    blogLoading: boolean;
    blogAddLoaded: boolean;
    blogAddFailed: boolean;
    blogAddLoading: boolean;
    blogUpdateLoading: boolean;
    blogUpdateLoaded: boolean;
    blogUpdateFailed: boolean;
    blogDeleteLoading: boolean;
    blogDeleteLoaded: boolean;
    blogDeleteFailed: boolean;
    blogCountLoading: boolean;
    blogCountLoaded: boolean;
    blogCountFailed: boolean;
    blogActiveLoaded: boolean;
    blogActiveFailed: boolean;
    blogActivetLoading: boolean;
    blogInActiveLoaded: boolean;
    blogInActiveFailed: boolean;
    blogInActivetLoading: boolean;
    totalBlogs: number;

    getBlogCounts: any;
    getBlogCountsLoading: boolean;
    getBlogCountsLoaded: boolean;
    getBlogCountsFailed: boolean;
}

export const blogRecordState = Record({

    blogList: [],
    blog: [],
    blogPagination: {},
    newBlog: {},
    updateBlog: {},
    deleteBlog: {},
    blogInActive: {},
    addBlog: {},
    blogActive: {},
    blogListLoaded: false,
    blogInActiveLoaded: false,
    blogInActiveFailed: false,
    blogInActivetLoading: false,
    blogListFailed: false,
    blogActiveLoaded: false,
    blogActiveFailed: false,
    blogActivetLoading: false,
    blogListLoading: false,
    blogAddLoaded: false,
    blogAddFailed: false,
    blogAddLoading: false,
    blogUpdateLoading: false,
    blogUpdateLoaded: false,
    blogUpdateFailed: false,
    blogDeleteLoading: false,
    blogDeleteLoaded: false,
    blogDeleteFailed: false,
    blogCountLoading: false,
    blogCountLoaded: false,
    blogCountFailed: false,
    blogLoading: false,
    blogLoaded: false,
    blogFailed: false,
    totalBlogs: 0,

    getBlogCounts: {},
    getBlogCountsLoading: false,
    getBlogCountsLoaded: false,
    getBlogCountsFailed: false,

});
