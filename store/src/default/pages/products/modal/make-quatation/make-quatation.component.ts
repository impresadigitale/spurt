/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ProductControlSandbox } from '../../../../../core/product-control/product-control.sandbox';


@Component({
  selector: 'app-make-quatation',
  templateUrl: 'make-quatation.component.html',
  styleUrls: ['make-quatation.component.scss']
})
export class MakeQuatationComponent implements OnInit, OnDestroy {

  public subscriptions: Array<Subscription> = [];
  public imageUrl = environment.imageUrl;
  public quationForm: FormGroup;
  public currency: any = {};
  public submitted = false;

  constructor(
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public sandbox: ProductControlSandbox,
              private dialogRef: MatDialogRef<MakeQuatationComponent>) {
  }

  ngOnInit() {
    this.initForm();
    this.currency = JSON.parse(localStorage.getItem('currency'));
  }

  initForm() {
    this.quationForm = this.fb.group({
      quantity: ['', Validators.required],
      unit: ['', Validators.required],
      totalOrder: ['', Validators.required],
      purpose: ['', Validators.required],
      comments: ['']
    });
  }

  submit() {
    this.submitted = true;
    if (this.quationForm.valid) {
      const params: any = {};
      params.quantity = this.quationForm.value.quantity;
      params.quantityUnit = this.quationForm.value.unit;
      params.orderValue = this.quationForm.value.totalOrder;
      params.purpose = this.quationForm.value.purpose;
      params.comments = this.quationForm.value.comments;
      params.productId = this.data.productId;
      this.sandbox.makeQuatation(params);
      this.subscriptions.push(this.sandbox.makeQuatation$.subscribe(data => {
          if (data && data.status === 1) {
              this.close();
          }
      }));

    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
   this.subscriptions.forEach(each => each.unsubscribe());
  }

}
