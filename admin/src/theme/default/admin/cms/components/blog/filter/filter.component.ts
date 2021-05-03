/*
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {CategoriesSandbox} from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import {BlogSandbox } from '../../../../../../../core/admin/cms/blogs/blog.sandbox';


@Component({
    selector: 'app-spurt-cms-blog-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class BlogFilterComponent implements OnInit {


    @Output() progressEmit = new EventEmitter<string>();
    public filterForm: FormGroup;
    public categoryNameList: FormControl;
    public categoryListArray: any = [];
    public page: number;
    private offset = 0;
    public pageSize = '10';
    private keyword = '';
    public index: number;
    private currentPage: number;
    private sortOrder: number;

    constructor(public categorySandbox: CategoriesSandbox, public blogsandbox: BlogSandbox,
         public fb: FormBuilder, public layoutSandbox: LayoutsSandbox,
        ) {}

    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.categoryList();
        this.initFilterForm();
    }

    initFilterForm() {
        this.filterForm = this.fb.group({
            categoryNameList: [''],
            title: [''],
        });
    }

    filter() {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.categoryId = this.filterForm.value.categoryNameList;
        param.keyword = this.filterForm.value.title;
        this.progressEmit.emit(param);
    }

    reset() {
        this.filterForm.reset();
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = '';
        param.categoryId = '';
        this.progressEmit.emit(param);
    }

    categoryList() {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = this.offset;
        param.keyword = this.keyword;
        param.sortOrder = this.sortOrder;
        this.categorySandbox.categoryList(param);
        this.layoutSandbox.getCatalogCount();
    }
}
