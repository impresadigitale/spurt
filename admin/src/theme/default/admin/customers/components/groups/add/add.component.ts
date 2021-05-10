/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersGroupSandbox } from '../../../../../../../core/admin/Customers/customers-group/customers-group.sandbox';
import { CustomersGroupService } from '../../../../../../../core/admin/Customers/customers-group/customers-group.service';

@Component({
  selector: 'app-spurt-orderstatus-add',
  templateUrl: './add.component.html',
  styleUrls: ['add.component.scss']
})
export class GroupsAddComponent implements OnInit {

  public updateTitle: number;
  private editOrderStatusId: string;
  public submitted = false;
  public orderStatusInfo: any = [];
  public colorRequire: boolean;
  // FormGroup Variable
  public customerGroupForm: FormGroup;
  public name: FormControl;
  public description: FormControl;
  public status: FormControl;
  public colorCode: FormControl;
  public id: number;
  public color = '';

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public appSandbox: CustomersGroupSandbox,
    private router: Router,
    public service: CustomersGroupService
  ) {}


  ngOnInit() {
    this.colorRequire = false;
    this.name = null;
    this.description = null;
    this.status = null;
    this.initForm();
    this.editOrderStatusId = this.route.snapshot.paramMap.get('id');
    this.editOrderStatusList();
  }

  initForm() {
    this.name = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(255)
    ]));
    this.description = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(160)
    ]));
    this.status = new FormControl('', [Validators.required]);
    this.colorCode = new FormControl('', [Validators.required]);
    this.customerGroupForm = this.fb.group({
      name: this.name,
      description: this.description,
      status: this.status,
      colorCode: this.colorCode
    });
  }

  backToList() {
    this.orderStatusInfo = null;
    this.orderStatusInfo = ' ';
    this.router.navigate(['/customers/groups/list']);
  }

  onSubmit() {
    this.submitted = true;
    if (this.color === '' || this.color === null) {
      this.colorRequire = true;
      return;
    }
    if (this.customerGroupForm.invalid) {
      return;
    }
    if (this.customerGroupForm.value.name !== '') {
      const params: any = {};
      params.name = this.customerGroupForm.value.name;
      params.description = this.customerGroupForm.value.description;
      params.status = this.customerGroupForm.value.status;
      params.colorcode = this.customerGroupForm.value.colorCode;
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].groupId) {
        params.id = this.orderStatusInfo[0].groupId;
        this.appSandbox.updateCustomersGroup(params);
      } else {
        this.appSandbox.addCustomersGroup(params);

      }
    }
  }

  editOrderStatusList() {
    this.orderStatusInfo.push(this.service.getOrderStatus());
    if (this.orderStatusInfo[0] !== null) {
      if (this.orderStatusInfo[0] && this.orderStatusInfo[0].name) {
        this.updateTitle = 1;
        this.customerGroupForm.controls['name'].setValue(
          this.orderStatusInfo[0].name
        );
        this.customerGroupForm.controls['description'].setValue(
          this.orderStatusInfo[0].description
        );
        this.customerGroupForm.controls['status'].setValue(
          this.orderStatusInfo[0].isActive
        );
        this.color = this.orderStatusInfo[0].colorCode;
        this.colorCode = this.orderStatusInfo[0].colorCode;
      }
    } else {
      this.orderStatusInfo = null;
    }
  }

  get f() {
    return this.customerGroupForm.controls;
  }

  onchange(a) {
    this.colorRequire = false;
    this.colorCode = a;
  }
}
