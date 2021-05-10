/*
 * spurtcommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Map, Record} from 'immutable';

export interface BlogsState extends Map<string, any> {
    blogListLoading: boolean;
    blogListLoaded: boolean;
    blogListFailed: boolean;
    blogList: Array<any>;
    relatedBlogListLoading: boolean;
    relatedBlogListLoaded: boolean;
    relatedBlogListFailed: boolean;
    relatedBlogList: Array<any>;

    blogDetailLoading: boolean;
    blogDetailLoaded: boolean;
    blogDetailFailed: boolean;
    blogDetail: any;

}

export const blogsRecord = Record({
    blogList: [],
    blogListLoading: false,
    blogListLoaded: false,
    blogListFailed: false,
    relatedBlogList: [],
    relatedBlogListLoading: false,
    relatedBlogListLoaded: false,
    relatedBlogListFailed: false,

    blogDetailLoading: false,
    blogDetailLoaded: false,
    blogDetailFailed: false,
    blogDetail: {},
});
