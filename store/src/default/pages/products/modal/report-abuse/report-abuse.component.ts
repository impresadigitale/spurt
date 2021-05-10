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
import { ListsSandbox } from '../../../../../core/lists/lists.sandbox';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-report-abuse',
  templateUrl: 'report-abuse.component.html',
  styleUrls: ['report-abuse.component.scss']
})
export class ReportAbuseComponent implements OnInit, OnDestroy {


  public subscriptions: Array<Subscription> = [];
  public remark: any;
  public reasonId: any;
  public reportAbuseForm: FormGroup;
  public submitted = false;

  constructor(public sandbox: ListsSandbox,
              public fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ReportAbuseComponent>) {
  }

  ngOnInit() {
    this.initForm();
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.count = '';
    this.sandbox.getAbuseReasonList(params);
  }

  initForm() {
    this.reportAbuseForm = this.fb.group({
      remark: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  selectReason(event) {
    this.reasonId = event.target.id;
  }

  submit() {
    this.submitted = true;
    if (this.reportAbuseForm.valid) {
      const params: any = {};
      params.remark = this.reportAbuseForm.value.remark;
      params.answerId = this.data;
      params.reasonId = this.reportAbuseForm.value.reason;
      this.sandbox.reportAbuse(params);
      this.subscriptions.push(this.sandbox.reportAbuse$.subscribe(data => {
        if (data && data.status === 1) {
          this.dialogRef.close();
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
