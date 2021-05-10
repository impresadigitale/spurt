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


@Component({
    selector: 'app-serviceslist-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class ServicesListFilterComponent implements OnInit {

   public servicesfilterForm: FormGroup;
   public keyword: string;
   @Output() progressEmits = new EventEmitter<string>();
   public pageSize: any = 500;
   private selectedLink = 'Min';
   private price = 0;


   constructor(public fb: FormBuilder)  {}

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.servicesfilterForm = this.fb.group({
            name: [''],
            status: [''],
        });
    }

    selectPrice(e: string): void {
        this.selectedLink = e;
    }

    applyFilter() {
          const params: any = {};
        params.keyword = this.servicesfilterForm.value.name;
        params.offset = 0;
        params.price = this.servicesfilterForm.value.price;
        params.status = this.servicesfilterForm.value.status || '';
        if (this.selectedLink === 'Min') {
            params.price = 1;
        }
        if (this.selectedLink === 'Max') {
            params.price = 2;
        }
        this.progressEmits.emit(params);
    }

    resetForm() {
         this.servicesfilterForm.reset();
         const params: any = {};
         params.keyword = '';
         params.offset = 0;
         params.sortOrder = 0;
         params.price = 0;
         params.status = '';
         this.progressEmits.emit(params);
    }
}
