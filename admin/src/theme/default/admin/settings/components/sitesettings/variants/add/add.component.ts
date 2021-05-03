/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// observable
import { Subscription } from 'rxjs';
// reactive forms
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
// sandbox
import { VariantsSandbox } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.sandbox';
import { VariantsService } from '../../../../../../../../core/admin/settings/siteSettings/variants/variants.service';
import { Router, ActivatedRoute } from '@angular/router';
// environment

@Component({
  selector: 'app-addproduct-option',
  templateUrl: 'add.component.html',
  styleUrls: ['./add.component.scss'],
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
export class VariantsAddComponent implements OnInit, OnDestroy {

  public variantsForm: FormGroup;
  public optionName: FormControl;
  public type: FormControl;
  public sortOrder: FormControl;
  public optionNameImage: FormControl;
  public sortOrderImage: FormControl;
  public optionValue: FormArray;
  public productOptionsEditedValue: any;
  public submittedValues = false;
  public optionsArray: any = ['Select', 'Radio'];
  public closeResult: string;
  private subscriptions: Array<Subscription> = [];
  public variantId: any;

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    public sandbox: VariantsSandbox,
    private changeDetectRef: ChangeDetectorRef,
    public service: VariantsService,
    public router: Router,
    public route: ActivatedRoute
  ) {}




  // initially initialaize reactive form.And calls edit the form if data is available
  ngOnInit() {
    this.initVariantsForm();
    this.route.params.subscribe(data => {
      if (data) {
        this.variantId = data.id;      }
    });
    this.changeDetectRef.detectChanges();

    if (this.variantId) {
      const params: any = {};
      params.id = this.variantId;
      this.sandbox.getVariantDetails(params);
      this.subscriptions.push(this.sandbox.variantsDetails$.subscribe(data => {
        if (data && Object.keys(data).length) {
          this.setVariantForm(data);
        }
      }));
    }
  }

  // getting value from reactive form
  initVariantsForm() {
    this.optionName = new FormControl('', [Validators.required]);
    this.type = new FormControl('');
    this.sortOrder = new FormControl('', [Validators.required]);
    this.variantsForm = this.formBuilder.group({
      optionName: this.optionName,
      type: this.type,
      sortOrder: this.sortOrder,
      optionValue: this.formBuilder.array([this.optionsGroup()])
    });
  }

  // from group for form array
  optionsGroup() {
    return this.formBuilder.group({
      optionValueId: [''],
      optionNameImage: ['', Validators.required],
      sortOrderImage: [''],
    });
  }

  get optionArray() {
    return <FormArray>(this.variantsForm.get('optionValue'));
  }

  /**
   * calls sandbox doVariantsAdd,with parameters
   * @param name from reactive form
   * @param type from reactive form
   * @param sortOrder from reactive form
   * @param name from reactive form
   * @param image from reactive form
   * @param sortOrder from reactive form
   * */
  addVariants(productOptions) {
    this.submittedValues = true;
    if (!this.variantsForm.valid) {
      this.validateAllFormFields(this.variantsForm);
      return;
    }
    const params: any = {};
    let formarray: any = [];
    params.name = productOptions.optionName;
    params.type = productOptions.type;
    params.sortOrder = productOptions.sortOrder;

    if (this.variantId) {
      formarray = productOptions.optionValue.map(value => {
        return {
          valueName: value.optionNameImage,
          sortOrder: value.sortOrderImage,
          id: value.optionValueId
        };
      });
      params.varientsValue = formarray;
      params.variantId = this.variantId;
      this.sandbox.doVariantsUpdate(params);
    } else {
      formarray = productOptions.optionValue.map(value => {
        return {
          valueName: value.optionNameImage,
          sortOrder: value.sortOrderImage
        };
      });
      params.varientsValue = formarray;
      this.sandbox.doVariantsAdd(params);
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

  // editing the reactive form Option Value
  setVariantForm(details) {
        this.optionArray.removeAt(0);
            if (
              details.varientsValue.length > 0 &&
              details.varientsValue[0].id
            ) {
              const controlArray = <FormArray>(
                this.variantsForm.get('optionValue')
              );
              details.varientsValue.forEach(value => {
                controlArray.push(
                  this.formBuilder.group({
                    optionValueId: value.id,
                    optionNameImage: value.valueName,
                    sortOrderImage: value.sortOrder,
                  })
                );
              });
            }
            this.changeDetectRef.detectChanges();


      this.optionName.setValue(details.name);
      this.type.setValue(details.type);
      this.sortOrder.setValue(details.sortOrder);

      const groupItems: any = (this.variantsForm.get('optionValue') as FormArray).controls;
      for (const item of groupItems) {
        item.controls['optionNameImage'].setValidators(Validators.required);
        item.controls['optionNameImage'].updateValueAndValidity();
    }

  }


  // add options in form array
  addOptions() {
    this.changeDetectRef.detectChanges();
    const control = <FormArray>this.variantsForm.controls['optionValue'];
    if (control.length < 5) {
      control.push(this.optionsGroup());
    }
  }

  // delete options  in form array
  deleteOptions(index) {
    const control = <FormArray>this.variantsForm.controls.optionValue;
    control.removeAt(index);
  }

  // cancel add product options
  cancel() {
    this.variantsForm.reset();
    this.router.navigate(['/settings/sitesettings/variants']);
  }
  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());

  }
}
