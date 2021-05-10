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
import { TaxSandbox } from '../../../../../../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxService } from '../../../../../../../../core/admin/settings/localizations/tax/tax.service';

@Component({
  selector: 'app-spurt-taxadd',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class TaxAddComponent implements OnInit {


  public taxForm: FormGroup;
  public title: FormControl;
  public value: FormControl;
  public status: FormControl;
  private params: any = {};
  private editedValueTax: any = {};
  public taxId: number;
  private editTaxId: string;
  public submitted = false;
  public rupeeError = [];


  constructor(
    private fb: FormBuilder,
    private sandbox: TaxSandbox,
    private route: ActivatedRoute,
    private taxService: TaxService,
    private router: Router
  ) {}

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  // initially calls loadForm,editTaxForm
  ngOnInit() {
    this.loadForm();
    this.editTaxId = this.route.snapshot.paramMap.get('id');
    this.editTaxForm();
  }

  // reactive form
  loadForm() {
    this.title = new FormControl('', Validators.required);
    this.value = new FormControl('', Validators.compose([Validators.required]));
    this.status = new FormControl('', Validators.required);

    this.taxForm = this.fb.group({
      title: this.title,
      value: this.value,
      status: this.status
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox updateTax  and addtax function if form is valid.
   *
   * @param taxForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (!this.taxForm.valid) {
      this.validateAllFormFields(this.taxForm);
      return;
    }
    if (this.rupeeError['left'] || this.rupeeError['right']) {
      return;
    }
    this.params.title = this.taxForm.value.title;
    this.params.code = this.taxForm.value.code;
    this.params.symbolLeft = this.taxForm.value.symbolLeft;
    this.params.symbolRight = this.taxForm.value.symbolRight;
    this.params.value = this.taxForm.value.value;
    this.params.status = this.taxForm.value.status;
    if (this.editedValueTax) {
      this.params.taxId = this.editedValueTax.taxId;
      this.sandbox.updateTax(this.params);
      this.sandbox.taxUpdateLoaded$.subscribe(val => {
        if (val === true) {
          this.router.navigate(['/settings/local/tax']);
        }
      });
    } else {
      this.sandbox.addtax(this.params);
      this.sandbox.taxAddLoaded$.subscribe(val => {
        if (val === true) {
          this.router.navigate(['/settings/local/tax']);
        }
      });
    }
  }

  // validation for reactive form
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

  // Assign editedValueTax values  in reactive form
  editTaxForm() {
    this.editedValueTax = this.taxService.getEditedValue();
    if (this.editedValueTax) {
      this.taxId = this.editedValueTax.taxId;
      this.title.setValue(this.editedValueTax.title);
      this.value.setValue(this.editedValueTax.value);
      this.status.setValue(this.editedValueTax.isActive);
    }
  }

  // navigate to tax component
  cancel() {
    this.taxService.setEditedValue('');
    this.router.navigate(['/settings/local/tax']);
  }
    // number only event
    numberOnly(event): boolean {
      const percentage = event.target.value + event.key;

      if (percentage > 100) {
          return false;
      }
      const charCode = event.which ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
}
