import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ReportAbuseComponent } from '../../../pages/products/modal/report-abuse/report-abuse.component';
import { PostQuestionComponent } from '../../../pages/products/modal/post-question/post-question.component';
import { AnswerListComponent } from '../../../pages/products/modal/answer-list/answer-list.component';
import { PostAnswerComponent } from '../../../pages/products/modal/post-answer/post-answer.component';
import {  Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';


@Component({
  selector: 'app-controls-questions',
  templateUrl: './controls-questions.component.html',
  styleUrls: ['./controls-questions.component.scss']
})
export class ControlsQuestionsComponent implements OnInit {


  @Input() questionList: any;
  @Input() productDetails: any;
  @Input() questionLoading: any;
  @Input() questionLoaded: any;

  public user: any;


  constructor(public dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    public listSandbox: ListsSandbox
    ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('storeUser'));
    }
  }

  // view all questions

  viewAllQuestions(list) {
    this.router.navigate(['/products/product-questions', list]);
   }

  postAnswer(list) {
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }
    if (currentUser) {
      const dialogRef = this.dialog.open(PostAnswerComponent, {
        width: '60%',
        data: list
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  viewAnswer(list) {
    const dialogRef = this.dialog.open(AnswerListComponent, {
      width: '90%',
      data: list
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  likeOrDislike(event, list) {
     if (this.user) {
      const params: any = {};
      params.answerId = list.answerList.answerId;
      params.ansType = 1;
      if (event.target.textContent === 'thumb_up') {
        if (list.answerList.likeType !== 1) {
          params.type = 1;
          this.listSandbox.likeOrDislikeAnswer(params);
        }
      } else {
        if (list.answerList.likeType !== 2) {
          params.type = 2;
          this.listSandbox.likeOrDislikeAnswer(params);
        }
      }
     } else {
       this.router.navigate(['/auth']);
     }
  }

  reportAbuse(list) {
    const answerId = list.answerList.answerId;
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }
    if (currentUser) {
      const dialogRef = this.dialog.open(ReportAbuseComponent, {
        width: '60%',
        data: answerId
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }

  addQuestion(list) {
    let currentUser: any;
    if (isPlatformBrowser(this.platformId)) {
      currentUser = JSON.parse(localStorage.getItem('storeUser'));
    }
    if (currentUser) {
      const dialogRef = this.dialog.open(PostQuestionComponent, {
        width: '60%',
        data: list
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
        }
      });
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
