/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
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
import { EmailTempSandbox } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.sandbox';
import { EmailTempService } from '../../../../../../../../core/admin/settings/localizations/emailtemplate/emailtemp.service';

@Component({
  selector: 'app-spurt-addemail',
  templateUrl: 'add.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class EmailTempAddComponent implements OnInit {

  public emailTemplateForm: FormGroup;
  public title: FormControl;
  public subject: FormControl;
  public content: FormControl;
  public status: FormControl;
  public updateTitle: number;
  private editEmailTempId: string;
  private editEmailTemplateInfo: any = [];
  public price: string;
  public submitted = false;

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public sandbox: EmailTempSandbox,
    private router: Router,
    public service: EmailTempService
  ) {}

  get f() {
    return this.emailTemplateForm.controls;
  }

  ngOnInit() {
    this.initForm();
    this.editEmailTempId = this.route.snapshot.paramMap.get('id');
    this.setDefaultValues();
    this.editEmailtempList();
  }

  beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }

    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  setDefaultValues() {
    this.emailTemplateForm.patchValue({ postalcode: 'Yes', tc: true });
  }

  initForm() {
    this.emailTemplateForm = this.fb.group({
      title: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      content: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });
  }

  cancel() {
    this.router.navigate(['/settings/local/emailtemp']);
  }

  /**
   * Handles form 'submit' event. Calls sandbox EmailtempAdd  and EmailtempUpdate function if form is valid.
   *
   * @param emailTemplateForm entire form value
   * @param para storing entire value
   */
  onSubmit(data) {
    this.submitted = true;
    if (this.emailTemplateForm.invalid) {
      return;
    }
    const para: any = {};
    para.title = this.emailTemplateForm.value.title;
    para.subject = this.emailTemplateForm.value.subject;
    para.content = this.emailTemplateForm.value.content;
    para.status = this.emailTemplateForm.value.status;

    if (this.editEmailTemplateInfo && this.editEmailTemplateInfo[0]) {
      para.id = this.editEmailTemplateInfo[0].emailTemplateId;
      this.sandbox.updateEmailTemplate(para);
    } else {
      this.sandbox.addEmailTemplate(para);
    }
  }

  editEmailtempList() {
    this.editEmailTemplateInfo.push(this.service.getemailtemplistdata());
    if (this.editEmailTemplateInfo[0] !== null) {
      if (this.editEmailTemplateInfo[0] && this.editEmailTemplateInfo[0].title) {
        this.updateTitle = 1;
        this.emailTemplateForm.controls['title'].setValue(
          this.editEmailTemplateInfo[0].title
        );
        this.emailTemplateForm.controls['subject'].setValue(
          this.editEmailTemplateInfo[0].subject
        );
        this.emailTemplateForm.controls['content'].setValue(
          this.editEmailTemplateInfo[0].content
        );
        this.emailTemplateForm.controls['status'].setValue(
          this.editEmailTemplateInfo[0].isActive
        );
      }
    } else {
      this.emailTemplateForm = null;
    }
  }
}
