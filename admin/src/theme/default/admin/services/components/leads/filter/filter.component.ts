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
import {FormBuilder, FormGroup} from '@angular/forms';


@Component({
    selector: 'app-services-leads-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class LeadsFilterComponent implements OnInit {

    public filterForm: FormGroup;
    public keyword: string;
    @Input() pageSize: any;
    private price = 0;
    public pagenationCount: boolean;
    private selectedLink = 'Min';
    @Output() progressEmits = new EventEmitter<string>();

    constructor(public fb: FormBuilder)  {}

    ngOnInit() {
        this.initFilterForm();
    }

    initFilterForm() {
        this.filterForm = this.fb.group({
            keyword: [''],
        });
    }

    filter() {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = this.filterForm.value.keyword;
        this.progressEmits.emit(param);
    }

    reset() {
        this.filterForm.reset();
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = '';
        this.progressEmits.emit(param);
    }
}
