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
    selector: 'app-services-enquiry-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']


})
export class EnquiryFilterComponent implements OnInit {

    public filterForm: FormGroup;
    public keyword: string;
    @Input() pageSize: any;
    @Output() progressEmits = new EventEmitter<string>();

    constructor(public fb: FormBuilder)  {
    }

    ngOnInit() {
        this.initFilterForm();
    }

    initFilterForm() {
        this.filterForm = this.fb.group({
            keyword: [''],
            sortOrder: [''],
        });
    }

    filter() {
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = this.filterForm.value.keyword;
        this.progressEmits.emit(param);
    }

    /**
     * Handles reset function  . Calls categorySandbox categorylist function .
     *
     * @param param with only one limit value .
     */

    reset() {
        this.filterForm.reset();
        const param: any = {};
        param.limit = this.pageSize;
        param.offset = '';
        param.keyword = '';
        this.progressEmits.emit(param);

    }

}
