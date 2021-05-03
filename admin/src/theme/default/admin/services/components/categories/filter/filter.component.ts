/*
 * SpurtCommerce API
 * version 2.1
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ServicesCategoriesSandbox} from '../../../../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';


@Component({
    selector: 'app-servicescategory-filters',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']


})
export class ServicesCategoryFilterComponent implements OnInit {

    public serviceCategoryfilterForm: FormGroup;
    public keyword: string;
    @Output() progressEmits = new EventEmitter<string>();
    public filterForm: FormGroup;
    public pageSize: any = 500;

    constructor(public fb: FormBuilder, public serviceCategorySandBox: ServicesCategoriesSandbox )  {}

    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.initFilterForm();
    }

    initFilterForm() {
        this.serviceCategoryfilterForm = this.fb.group({
            serviceCategoryNameList: [''],
            sortOrder: [''],
        });
    }

    filter() {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = this.serviceCategoryfilterForm.value.serviceCategoryNameList;
        param.sortOrder = this.serviceCategoryfilterForm.value.sortOrder;
        this.progressEmits.emit(param);
    }

    reset() {
        this.serviceCategoryfilterForm.reset();
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = '';
        this.progressEmits.emit(param);
    }


}
