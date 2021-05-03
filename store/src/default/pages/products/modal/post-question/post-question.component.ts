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
import { ListsSandbox } from '../../../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-post-question',
  templateUrl: 'post-question.component.html',
  styleUrls: ['post-question.component.scss']
})
export class PostQuestionComponent implements OnInit, OnDestroy {

  public questionList: any;
  public question: any;
  public error = false;
  public subscriptions: Array<Subscription> = [];

  constructor(
              public sandbox: ListsSandbox,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<PostQuestionComponent>) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.question) {
      this.error = false;
      const params: any = {};
      params.question = this.question;
      params.productId = this.data.productId;
      this.sandbox.postQuestion(params);
      this.subscriptions.push(this.sandbox.postQuestion$.subscribe(data => {
        if (data && data.status === 1) {
          this.dialogRef.close('success');
        }
      }));
    } else {
      this.error = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
   this.subscriptions.forEach(each => each.unsubscribe());
  }

}
