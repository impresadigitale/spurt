/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuestionDetailsComponent } from '../modals/question-details/question-details.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ProductSandbox } from '../../../../../../../core/admin/catalog/product/product.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { Subscription } from 'rxjs';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-question-products',
  templateUrl: 'question.component.html',
  styleUrls: ['question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy {

  public isquestion = false;
  public productId: any;
  public imageUrl = environment.imageUrl;
  public addQuestionForm: FormGroup;
  private subscriptions: Array<Subscription> = [];
  public submitted = false;

  constructor(public modalService: NgbModal,
              public route: ActivatedRoute,
              public sandbox: ProductSandbox,
              public fb: FormBuilder ) {
                this.subscriptions.forEach(each => each.unsubscribe());
                this.route.params.subscribe(data => {
                  this.productId = data.id;
                });
  }
ngOnInit() {
  this.initForm();
  if (this.productId) {
    this.sandbox.getProductDetail({Id: this.productId});
    this.getQuestionList();
  }
  this.subscribe();
  this.listSubscribe();
  this.statusSubscribe();
}

// initialize form

initForm() {
  this.addQuestionForm = this.fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required]
  });
}

// submit question and answer form

submit() {
  this.submitted = true;
  if (this.addQuestionForm.valid) {
    const form = this.addQuestionForm.value;
    const params: any = {};
    params.question = form.question;
    params.answer = form.answer;
    params.productId = this.productId;
    this.sandbox.addQuestion(params);
  }
}
// addQuestion

addQuestion() {
  this.isquestion = true;
}

// close model

remove() {
  this.isquestion = false;
  this.submitted = false;
}

viewAnswer(list) {
  const modalRef = this.modalService.open(QuestionDetailsComponent, {
      windowClass: 'question-details', centered: true});
      modalRef.componentInstance.questionList = list;
      modalRef.result.then((result) => {
        if (result) {
          // -----
        }
      });
}
// get question list

getQuestionList() {
  const params: any = {};
  params.limit = '';
  params.offset = '';
  params.keyword = '';
  params.productId = this.productId;
  this.sandbox.getQuestionList(params);
}

// delete question

deleteQuestion(id) {
  this.sandbox.deleteQuestion({questionId: id});
}

changeStatus(event, id) {
  const params: any = {};
  params.questionId = +id;
  if (event) {
    params.status = 1;
    this.sandbox.changeQuestionStatus(params);
  } else {
    params.status = 0;
    this.sandbox.changeQuestionStatus(params);
  }

}

subscribe() {
  this.subscriptions.push(this.sandbox.deleteQuestion$.subscribe(data => {
    if (data && data.status === 1) {
      this.getQuestionList();
    }
  }));

}

listSubscribe() {
  this.subscriptions.push(this.sandbox.addQuestion$.subscribe(data => {
    if (data && data.status === 1) {
      this.isquestion = false;
      this.getQuestionList();
      this.addQuestionForm.reset();
    }
  }));
}

statusSubscribe() {
  this.subscriptions.push(this.sandbox.changeQuestionStatus$.subscribe(data => {
    if (data && data.status === 1) {
      this.getQuestionList();
    }
  }));
}

ngOnDestroy() {
  this.subscriptions.forEach(each => each.unsubscribe());
  this.sandbox.clear();
}
}
