/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleSandbox } from '../../../../../../../core/admin/settings/role/role.sandbox';
import { RoleApiClientService } from '../../../../../../../core/admin/settings/role/role.ApiClientService';

@Component({
  selector: 'app-spurt-settings-role-add',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'add.component.html',
  styles: [
    `
      .settings-right-wrapper {
        margin-top: 0px !important;
      }

      .setting1-inner-header {
        margin-top: 40px !important;
      }
    `
  ]
})
export class RoleAddComponent implements OnInit {

  public roleForm: FormGroup;
  public roleName: FormControl;
  public isActive: FormControl;
  public roleInfo: any = [];
  public submitted = false;
  private value: number;
  private isChecked: boolean;
  private editRoleId: string;

  constructor(
    public fb: FormBuilder,
    public appSandbox: RoleSandbox,
    private route: ActivatedRoute,
    private router: Router,
    public service: RoleApiClientService
  ) {}

  ngOnInit() {
    this.value = 0;
    this.roleName = null;
    this.isActive = null;
    this.initForm();
    this.editRoleId = this.route.snapshot.paramMap.get('id');
    this.editRoleList();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  initForm() {
    this.roleName = new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(64)
    ]));
    this.isActive = new FormControl('');
    this.roleForm = this.fb.group({
      roleName: this.roleName,
      isActive: this.isActive
    });
  }

  cancel() {
    this.roleInfo = null;
    this.roleInfo = ' ';
    this.router.navigate(['/settings/role']);
  }

  onChangestatus(evt) {
    this.isChecked = evt.target.checked;
    if (this.isChecked === true) {
      this.value = 1;
    } else if (this.isChecked === false) {
      this.value = 0;
    }
  }

  /**
   * Handles form 'submit' event. Calls sandbox Role updateRole and addRole function if form is valid.
   *
   * @param roleForm entire form value
   * @param params storing entire value
   */
  onSubmit(role) {
    this.submitted = true;
    if (this.roleForm.invalid) {
      return;
    }
    if (this.roleForm.value.name !== '') {
      const params: any = {};
      params.name = this.roleForm.value.roleName;
      params.status = this.value;
      if (this.roleInfo && this.roleInfo[0] && this.roleInfo[0].groupId) {
        params.groupId = this.roleInfo[0].groupId;
        this.appSandbox.updateRole(params);
      } else {
        this.appSandbox.addRole(params);
      }
    }
  }

  editRoleList() {
    this.roleInfo.push(this.service.rolegetdata());
    if (this.roleInfo[0] !== null) {
      if (this.roleInfo[0] && this.roleInfo[0].name) {
        if (this.editRoleId) {
          this.roleName = this.roleInfo[0].name;
          this.isActive = this.roleInfo[0].isActive;
          this.roleForm.controls['roleName'].setValue(this.roleInfo[0].name);
          if (this.roleInfo[0].isActive === 1) {
            this.roleForm.controls['isActive'].setValue(true);
          } else if (this.roleInfo[0].isActive === 0) {
            this.roleForm.controls['isActive'].setValue(false);
          }
        }
      }
    } else {
      this.roleInfo = null;
    }
  }

  get f() {
    return this.roleForm.controls;
  }
}
