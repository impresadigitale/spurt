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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { AccountSandbox } from '../../../../../../core/account/account.sandbox';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cancel-order',
  templateUrl: 'cancel-order.component.html',
  styleUrls: ['cancel-order.component.scss']
})
export class CancelOrderComponent implements OnInit, OnDestroy {

  public cancelOrderForm: FormGroup;
  public submitted = false;
  private subscriptions: Array<Subscription> = [];

  constructor( public sandbox: AccountSandbox,
               public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CancelOrderComponent>) {
  }

  ngOnInit() {
    this.initForm();
    this.reasonList();
  }

  initForm() {
    this.cancelOrderForm = this.fb.group({
      reason: ['', Validators.required],
      description: ['', Validators.required],
    });

  }

  reasonList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.sandbox.getCancelOrderReasonList(params);
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.submitted = true;
    if (this.cancelOrderForm.valid) {
        const params: any = {};
        params.reasonId = this.cancelOrderForm.value.reason;
        params.description = this.cancelOrderForm.value.description;
        params.orderProductId = this.data.orderProductId;
        this.sandbox.cancelOrder(params);
        this.subscriptions.push(this.sandbox.cancelOrderLoaded$.subscribe(data => {
          if (data === true) {
            this.dialogRef.close('success');
          }
        }));
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }

}
