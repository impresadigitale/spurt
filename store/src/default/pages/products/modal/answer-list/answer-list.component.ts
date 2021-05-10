/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Inject } from '@angular/core';
import { ListsSandbox } from '../../../../../core/lists/lists.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ReportAbuseComponent } from '../report-abuse/report-abuse.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-answer-list',
  templateUrl: 'answer-list.component.html',
  styleUrls: ['answer-list.component.scss']
})
export class AnswerListComponent implements OnInit {

  public questionList: any;
  public user: any;
  public subscriptions: Array<Subscription> = [];

  constructor( public sandbox: ListsSandbox,
               public router: Router,
               public dialog: MatDialog,
               @Inject(MAT_DIALOG_DATA) public data: any,
               private dialogRef: MatDialogRef<AnswerListComponent>) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('storeUser'));
    this.getAnswerList();
  }

  getAnswerList() {
    const params: any = {};
    params.limit = '';
    params.offset = '';
    params.keyword = '';
    params.count = '';
    params.questionId = this.data.questionId;
    this.sandbox.getAnswerList(params);
  }

   likeOrDislike(event, list) {
     if (this.user) {
      const params: any = {};
      params.answerId = list.answerId;
      params.ansType = 2;
      if (event.target.textContent === 'thumb_up') {
        if (list.likeType !== 1) {
          params.type = 1;
          this.sandbox.likeOrDislikeAnswer(params);
        }
      } else {
        if (list.likeType !== 2) {
          params.type = 2;
          this.sandbox.likeOrDislikeAnswer(params);
        }
      }
     } else {
      this.dialogRef.close();
       this.router.navigate(['/auth']);
     }
  }

  reportAbuse(list) {
    const answerId = list.answerId;
    if (this.user) {
      const dialogRef = this.dialog.open(ReportAbuseComponent, {
        width: '60%',
        data: answerId
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
        }
      });
    } else {
      this.dialogRef.close();
      this.router.navigate(['/auth']);
    }
  }

  close() {
    this.dialogRef.close();

  }

}
