/*
 * SpurtCommerce API
 * version 2.1
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductSandbox} from '../../../../../../../core/admin/catalog/product/product.sandbox';
import {BrandSandbox} from '../../../../../../../core/admin/catalog/brand/brand.sandbox';


@Component({
    selector: 'app-catalog-brand-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})

export class BrandFilterComponent implements OnInit {

    public filterForm: FormGroup;
    public keyword: string;
    @Input() pageSize: any;
    private price = 0;
    public pagenationCount: boolean;
    private selectedLink = 'Min';
    @Output() progressEmit = new EventEmitter<string>();

    constructor(public fb: FormBuilder, public sandbox: ProductSandbox , public brandSandBox: BrandSandbox)  {}

    ngOnInit() {
        this.pageSize = localStorage.getItem('itemsPerPage');
        this.pagenationCount = true;
        this.initFilterForm();
    }

    initFilterForm() {
        this.filterForm = this.fb.group({
            keyword: ['', Validators.required]
        });
    }

    selectPrice(e: string): void {
        this.selectedLink = e;
    }

    resetFilter() {
        this.filterForm.reset();
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = '';
        this.progressEmit.emit(param);
    }

    applyFilter() {
        this.keyword = this.filterForm.value.keyword;
        const param: any = {};
        param.keyword = this.keyword;
        this.progressEmit.emit(param);

    }
}
