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
} from '@angular/core';
// reactive forms
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
// sandbox
import { Router, ActivatedRoute } from '@angular/router';
// environment
import { Subscription} from 'rxjs';
import { AttributeGroupSandbox } from '../../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.sandbox';
import { AttributeGroupService } from '../../../../../../../../core/admin/settings/siteSettings/attributes-group/attributes-group.service';
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
export class AttributesGroupAddComponent implements OnInit {

  public groupForm: FormGroup;
  public groupName: FormControl;
  public sortOrder: FormControl;
  public editData: any;
  public submittedValues = false;
  public closeResult: string;
  public attributeGroupId: any;
  private subscriptions: Array<Subscription> = [];


  constructor(
    public formBuilder: FormBuilder,
    public sandbox: AttributeGroupSandbox,
    public service: AttributeGroupService,
    public router: Router,
    public route: ActivatedRoute
  ) {}



  // initially initialaize reactive form.And calls edit the form if data is available
  ngOnInit() {
    this.initProductOptionsForm();
    this.route.params.subscribe(data => {
      if (data) {
        this.attributeGroupId = data.id;
      }
    });

    if (this.attributeGroupId) {
      const params: any =  {};
      params.id = this.attributeGroupId;
      this.sandbox.attributeGroupDetails(params);
      this.subscriptions.push(this.sandbox.attributeDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.editGroup(data);
        }
      }))
    }
  }

  // getting value from reactive form
  initProductOptionsForm() {
    this.groupName = new FormControl('', [Validators.required]);
    this.sortOrder = new FormControl('', [Validators.required]);
    this.groupForm = this.formBuilder.group({
      groupName: this.groupName,
      sortOrder: this.sortOrder,
    });
  }


  /**
   * calls sandbox doProductOptionsAdd,with parameters
   * @param name from reactive form
   * @param type from reactive form
   * @param sortOrder from reactive form
   * @param name from reactive form
   * @param image from reactive form
   * @param sortOrder from reactive form
   * */
  addGroup() {
    this.submittedValues = true;
    if (!this.groupForm.valid) {
      this.validateAllFormFields(this.groupForm);
      return;
    }
    const params: any = {};
    params.attributeGroupName = this.groupForm.value.groupName;
    params.sortOrder = this.groupForm.value.sortOrder;

    if (this.attributeGroupId) {
      params.groupId = this.attributeGroupId;
      this.sandbox.attributeUpdate(params);
    } else {
      this.sandbox.attributeAdd(params);
    }
  }

  editGroup(details) {
    if (details) {
      this.groupForm.controls['groupName'].setValue(details.attributeGroupName);
      this.groupForm.controls['sortOrder'].setValue(details.sortOrder);
    }

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

  // cancel add product options
  cancel() {
    this.router.navigate(['/settings/sitesettings/attributes-group']);
  }
}
