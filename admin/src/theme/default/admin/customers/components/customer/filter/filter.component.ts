/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { CustomerSandbox } from '../../../../../../../core/admin/Customers/customers/customer.sandbox';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';

@Component({
  selector: 'app-customer-filter',
  templateUrl: 'filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class CustomerFilterComponent implements OnInit {

  public custftrform: FormGroup;
  public custdate: FormControl;
  public customergroup: FormControl;
  public email: FormControl;
  public customername: FormControl;
  public pageSize: any = 10;
  public offset = 0;
  public pagination = 1;
  @Output() ProgressEmit = new EventEmitter<string>();

  constructor(
    public fb: FormBuilder,
    public sandbox: CustomerSandbox,
    public Sandbox: CustomersGroupSandbox
  ) {}


  ngOnInit() {
    this.pageSize = localStorage.getItem('itemsPerPage');
    this.initForm();
    this.customersGroupList();
  }

  customersGroupList() {
    const param: any = {};
    param.limit = 10;
    param.offset = 0;
    param.keyword = '';
    param.count = '';
    this.Sandbox.customersGroupList(param);
  }

  initForm() {
    this.custftrform = this.fb.group({
      customergroup: [null, [Validators.required]],
      email: [null, [Validators.required]],
      custdate: [null, [Validators.required]],
      customername: [null, [Validators.required]]
    });
  }

  reset() {
    this.custftrform.reset();
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = '';
    param.keyword = '';
    param.pageSize = this.pageSize;
    this.ProgressEmit.emit(param);
  }

  onSubmit() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.name = this.custftrform.value.customername;
    param.email = this.custftrform.value.email;
    param.customerGroup = this.custftrform.value.customergroup;
    param.date = this.custftrform.value.custdate;
    this.ProgressEmit.emit(param);
  }
}
