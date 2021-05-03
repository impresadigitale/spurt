/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { LayoutSandbox } from '../../../../../../../core/admin/Customers/layout/layout.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';

@Component({
  selector: 'app-customer-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class GroupsFilterComponent implements OnInit {

  public statusFilterForm: FormGroup;
  public keyword: FormControl;
  @Input() pageSize: any;
  public pagenationCount: boolean;
  @Output() progressEmits = new EventEmitter<string>();

  constructor(public fb: FormBuilder, public sandbox: CustomersGroupSandbox, public laySandbox: LayoutSandbox) {}


  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.pagenationCount = true;
    this.initForm();
  }

  initForm() {
    this.statusFilterForm = this.fb.group({
      keyword: ['', Validators.required]
    });
  }

  reset() {
    this.statusFilterForm.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    this.progressEmits.emit(param);
  }

  onSubmit() {
    this.keyword = this.statusFilterForm.value.keyword;
    const param: any = {};
    param.keyword = this.keyword;
    this.progressEmits.emit(param);

  }

}

