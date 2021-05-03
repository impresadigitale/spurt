/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ServicesCategoriesSandbox} from '../../../../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';
import { Router } from '@angular/router';
import { ServicesCategoriesService } from '../../../../../../../core/admin/services/serivcesCategory/servicesCategory.service';
import { environment } from '../../../../../../../environments/environment';
import { ServicesSandbox } from '../../../../../../../core/admin/services/service/service.Sandbox';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-brandlist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']

})
export class ServicesCategoriesListComponent  implements OnInit, OnDestroy {

    @ViewChild('paginator') paginator: MatPaginator;


    public page: number;
    private offset = 0;
    public pageSize = '10';
    private keyword = '';
    public index: number;
    private currentPage: number;
    private sortOrder = 0;
    private edit: any;
    public buttonCheck = true;
    public categoryImage: any = [];
    public imageUrl: string;
    private subscriptions:  Array<Subscription> = [];


    constructor(public serviceCategorySandBox: ServicesCategoriesSandbox,
        private serviceCategoryService: ServicesCategoriesService,
        private router: Router,
        public serviceSandbox: ServicesSandbox) {
    }

    ngOnInit() {
        this.imageUrl = environment.imageUrl;
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.serviceCategoryList();
    }

    changeFilter(event) {
        this.buttonCheck = event.target.checked;
    }

    serviceCategoryList() {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = this.offset;
        param.keyword = this.keyword;
        param.sortOrder = this.sortOrder;
        this.serviceCategorySandBox.serviceCategorylist(param);
        this.serviceCategorylistCount();
    }

    serviceCategorylistCount() {
        const param: any = {};
        param.limit = '';
        param.offset = '';
        param.keyword = this.keyword;
        param.sortOrder = '';
        param.count = true;
        this.serviceCategorySandBox.serviceCategorylistCount(param);
    }

    onPageChange(event: any) {
        this.currentPage = event.offset;
        this.pageSize = event.pageSize;
        this.index = event.pageIndex;
        this.offset = event.pageSize * event.pageIndex;
        this.serviceCategoryList();
    }

    // receive param from filter component .And calls categoriesPagination event
    receiveProgress(event) {
        this.index = 0;
        this.keyword = event.keyword;
        this.sortOrder = event.sortOrder;
        this.offset = 0;
        this.paginator.firstPage();
        this.serviceCategoryList();
        this.serviceCategorylistCount();
    }


    editServiceCategory(data) {
        this.edit = data;
        this.router.navigate(['/services/servicesCategory/edit', data.serviceCategoryId]);
    }


    addServiceCategory() {
        this.serviceCategoryService.setServicecategories('');
        this.router.navigate(['/services/servicesCategory/add']);
    }

    deleteServiceCategory(id) {
        const params: any = {};
        params.serviceCategoryId = id;
        this.serviceCategorySandBox.deleteServiceCategory(params);
        this.subscriptions.push(this.serviceCategorySandBox.getServiceCategoriesDelete$.subscribe(_delete => {
            if (_delete) {
                if (_delete.status === 1) {
                    this.serviceCategoryList();
                    this.serviceCategorylistCount();
                    this.serviceSandbox.getServiceCount();

                }
            }
        }));
    }

    categoryImageLoading(id) {
        this.categoryImage[id] = true;
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
        this.serviceCategorySandBox.resetServiceCategorylist();
    }
}
