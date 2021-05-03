/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,

} from '@angular/forms';
import { FailedOrderSandbox } from '../../../../../../../../core/admin/sales/failed-order/failed-order-sandbox';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-failed-order-model',
  templateUrl: './failed-order-model.component.html',
  styleUrls: ['./failed-order-model.component.scss'],
})
export class FailedOrderModalComponent implements OnInit, AfterViewChecked {

  public params: any;
  public failedOrderForm: FormGroup;
  private subscriptions: Array<Subscription> = [];
  public submittedValues = false;
  public paymentId: any = '';
  public paymentSelected = false;

  constructor(
    private activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public sandbox: FailedOrderSandbox,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  ngOnInit() {
    this.initForm();
    this.getPaymentList();
  }

  ngAfterViewChecked() { this.cdr.detectChanges(); }

  initForm() {
    this.failedOrderForm = this.fb.group({
          paymentRefId: [''],
          paymentStatus: ['', Validators.required],
          paymentDetails: ['']
    });
  }

  getPaymentList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    params.keyword = 'payment';
    this.sandbox.getPaymentList(params);
  }

  getPaymentId(list) {
    this.paymentId = list.id;
    this.paymentSelected = true;

  }

  submit() {
    this.submittedValues = true;
    if (!this.failedOrderForm.valid) {
      this.validateAllFormFields(this.failedOrderForm);
      return;
    }
    if (this.paymentId === '') {
       this.paymentSelected = false;
       return;
    }
     const params: any = {};
     params.orderId = this.params.orderId;
     params.paymentStatus = +this.failedOrderForm.value.paymentStatus;
     params.paymentMethod	 = this.paymentId;
     params.paymentRefId = this.failedOrderForm.value.paymentRefId;
     params.paymentDetail	 = this.failedOrderForm.value.paymentDetails;
     this.sandbox.moveToMainOrder(params);
     this.subscriptions.push(this.sandbox.moveToMainOrder$.subscribe(data => {
       if (data && data.status === 1) {
         this.close();
         this.router.navigate(['/sales/orders']);
       }
     }));
  }

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

  close() {
    this.activeModal.close();
  }
}
