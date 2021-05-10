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
  selector: 'app-post-answer',
  templateUrl: 'post-answer.component.html',
  styleUrls: ['post-answer.component.scss']
})

export class PostAnswerComponent implements OnInit, OnDestroy {

  public questionList: any;
  public answer: any;
  public error = false;
  public subscriptions: Array<Subscription> = [];

  constructor(
              public sandbox: ListsSandbox,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<PostAnswerComponent>) {
  }

  ngOnInit() {
  }

  submit() {
    if (this.answer) {
      this.error = false;
      const params: any = {};
      params.answer = this.answer;
      params.questionId = this.data.questionId;
      this.sandbox.postAnswer(params);
      this.subscriptions.push(this.sandbox.postAnswer$.subscribe(data => {
        if (data && data.status === 1) {
          this.dialogRef.close();
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
