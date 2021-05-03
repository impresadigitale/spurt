/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// observable
import { Subscription } from 'rxjs';
// reactive forms
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
// sandbox
import { AttributeSandbox } from '../../../../../../../../core/admin/settings/siteSettings/attributes/attributes.sandbox';
import { AttributeService } from '../../../../../../../../core/admin/settings/siteSettings/attributes/attributes.service';
import { Router } from '@angular/router';
// environment

@Component({
  selector: 'app-addproduct-option',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .dark-modal .modal-content {
        background-color: #009efb;
        color: white;
      }

      .dark-modal .close {
        color: white;
      }

      .light-blue-backdrop {
        background-color: #5cb3fd;
      }

      .image-manager .modal-dialog {
        max-width: 70%;
      }
    `
  ]
})
export class AttributesAddComponent implements OnInit, OnDestroy {

  public attributeForm: FormGroup;
  public attributeName: FormControl;
  public groupId: FormControl;
  public sortOrder: FormControl;
  public productOptionsEditedValue: any;
  public submittedValues = false;
  public closeResult: string;
  public attributeId: any = '';
  public editData: any;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public formBuilder: FormBuilder,
    public sandbox: AttributeSandbox,
    private changeDetectRef: ChangeDetectorRef,
    public router: Router,
    public route: ActivatedRoute,
    public service: AttributeService
  ) {}


  ngOnInit() {
    this.groupList();
    this.groupSubscribe();
    this.initProductOptionsForm();
    this.route.params.subscribe(data => {
      if (data) {
        this.attributeId = data.id ? data.id : '';
      }
    });
  }

  groupSubscribe() {
    this.subscriptions.push(this.sandbox.groupListLoaded$.subscribe(data => {
      if (data === true) {
        if (this.attributeId !== '') {
          const params: any = {};
          params.id = this.attributeId;
          this.sandbox.attributeDetails(params);
          this.subscribe();
        }      }
    }));
  }

  subscribe() {
    this.subscriptions.push(this.sandbox.attributeDetails$.subscribe(data => {
      if (data && Object.keys(data).length) {
        this.editAttribute(data);
      }
    }));
  }

  initProductOptionsForm() {
    this.attributeName = new FormControl('', [Validators.required]);
    this.groupId = new FormControl('');
    this.sortOrder = new FormControl('', [Validators.required]);
    this.attributeForm = this.formBuilder.group({
      attributeName: this.attributeName,
      groupId: this.groupId,
      sortOrder: this.sortOrder,
    });
  }

  groupList() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.count = '';
    this.sandbox.groupList(param);
  }

  addAttribute() {
    this.submittedValues = true;
    if (!this.attributeForm.valid) {
      this.validateAllFormFields(this.attributeForm);
      return;
    }
    const params: any = {};
    params.attributeName = this.attributeForm.value.attributeName;
    params.groupId = this.attributeForm.value.groupId;
    params.sortOrder = this.attributeForm.value.sortOrder;
    if (this.attributeId) {
      params.attributeId = this.attributeId;
      this.sandbox.attributeUpdate(params);
    } else {
      this.sandbox.attributeAdd(params);
    }
  }

  editAttribute(details) {
      this.attributeForm.controls['attributeName'].setValue(details.attributeName);
      this.attributeForm.controls['sortOrder'].setValue(details.sortOrder);
      this.attributeForm.controls['groupId'].setValue(details.groupId);
  }


  // validation for the formGroup
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
