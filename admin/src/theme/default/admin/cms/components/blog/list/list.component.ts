/*
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, ViewEncapsulation, ViewChild, OnDestroy} from '@angular/core';
import { BlogService } from '../../../../../../../core/admin/cms/blogs/blogs.service';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../../../../core/admin/service/config.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import {  BlogSandbox } from '../../../../../../../core/admin/cms/blogs/blog.sandbox';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-spurt-cms-blog-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BlogListComponent implements OnInit, OnDestroy {

    @ViewChild('paginator') paginator: MatPaginator;

    private keyword: any = '';
    public offset = 0;
    public pageSize = '10';
    public imageUrl: string;
    public pagenationCount: boolean;
    public blogListImage = {};
    public buttonCheck = true;
    public popoverContent: string;
    public index: number;
    public currentPage: number;
    public checkCondition: any = [];
    public checkmodules: any = [];
    public checkedData: any = [];
    public unCheckData: any = [];
    private sortOrder: number;
    public categoryId: any = '';
    private subscriptions: Array<Subscription> = [];


    constructor(public sandbox: BlogSandbox, public service: BlogService, public router: Router, private  configService: ConfigService,
        private toastr: ToastrManager) {
    }

    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.pagenationCount = true;
        this.regSubscriptionEvents();
        this.index = 0;
        this.imageUrl = this.configService.getImageUrl();
        this.blogList();
        this.blogListCount();

    }

    blogList() {
        const params: any = {};
        params.offset = this.offset;
        params.limit = this.pageSize;
        params.keyword = this.keyword;
        params.categoryId = this.categoryId;
        params.sortOrder = this.sortOrder;
        this.sandbox.getBlogList(params);
    }

    blogListCount() {
        const params: any = {};
        params.offset = this.offset;
        params.limit = this.pageSize;
        params.keyword = this.keyword;
        params.categoryId = this.categoryId;
        params.count = 1;
        this.sandbox.getBlogPagination(params);
    }

    deleteBlog(blogId, deletePop) {
        this.index = 0;
        this.popoverContent = deletePop;
        this.sandbox.deleteBlog({blogId: blogId});
        this.regSubscriptionEvents();
    }

    regSubscriptionEvents() {
        this.sandbox.blogDeleteLoaded$.subscribe(_delete => {
            if (_delete && _delete === true) {
                this.blogList();
                this.blogListCount();
            }
        });
    }

    bulkDelete() {
        this.index = 0;
        this.unCheckData = [];
        const param: any = {};
        param.blogId = this.checkedData;
        this.sandbox.bulkDelete(param);
        this.checkedData = [];
        this.sandbox.deleteBlog$.subscribe(_delete => {
            if (_delete) {
                if (_delete.status === 1) {
                    this.checkedData = [];
                    this.blogList();
                    this.blogListCount();
                }
            }
        });
    }


    selectChkBox(event, pageId) {
        if (event.target.checked === true) {
            this.checkedData.push(pageId);
        }
        if (event.target.checked === false) {
            this.unCheckData.push(pageId);
            this.unCheckData.forEach((value, index) => {
                this.checkedData = this.checkedData.filter(_value => {
                    if (value === _value) {
                        return false;
                    } else {
                        return true;
                    }
                });
            });
        }
        this.unCheckData = [];
    }

    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.offset = event.pageSize * event.pageIndex;
        this.blogList();
    }

    editBlog(blogData) {
        this.router.navigate(['/cms/blogs/edit', blogData.id]);

    }

    changeFilter(event) {
        this.buttonCheck = event.target.checked;
    }

    createBlog() {
        this.service.setBlogListData('');
        this.router.navigate(['/cms/blogs/add']);
    }

    blogListImageLoading(id) {
        this.blogListImage[id] = true;
    }

    // receive param from filter component .And calls categoriesPagination event
    receiveProgress(event) {
        this.index = 0;
        this.keyword = event.keyword;
        this.sortOrder = event.sortOrder;
        this.categoryId = event.categoryId;
        this.offset = 0;
        this.paginator.firstPage();
        this.blogListCount();
        this.blogList();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
    }
}

