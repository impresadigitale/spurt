/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { SeoSandbox } from '../../../../../../../core/admin/settings/siteSettings/seo/seo-sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-sitesettings-seo',
  templateUrl: './seo.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
   }
   .validationcolor {
    border-color: red !important;
   }
`]
})
export class SeoComponent implements OnInit {


  private subscriptions: Array<Subscription> = [];
  public seoForm: FormGroup;
  public submitted = false;
  public metaTitle: FormControl;
  public metaTagDescription: FormControl;
  public metaTagKeyword: FormControl;

  constructor(
    public fb: FormBuilder,
    public seoSandbox: SeoSandbox,
    private router: Router
  ) {}

  // initially calls initForm,getseoinfo,subscribe
  ngOnInit() {
    this.initForm();
    this.getseoinfo();
    this.subscribe();
  }

  // Subscribe getSeoinfo Bind formcontrol
  subscribe() {
    this.subscriptions.push(this.seoSandbox.newSeo$.subscribe(data => {}));
    this.subscriptions.push(
      this.seoSandbox.getSeo$.subscribe(data => {
        if (data && data[0]) {
          this.seoForm.controls['metaTagDescription'].setValue(
            data[0].metaTagDescription
          );
          this.seoForm.controls['metaTagKeyword'].setValue(
            data[0].metaTagKeywords
          );
          this.seoForm.controls['metaTitle'].setValue(data[0].metaTagTitle);
        }
      })
    );
  }

  /**
   * Handles form 'list' event. Calls sandbox Seo getSeo  function .
   *
   */
  getseoinfo() {
    this.seoSandbox.getSeo();
  }

  // Init Form Group
  initForm() {
    this.metaTitle = new FormControl('', Validators.compose([
      Validators.maxLength(60)
    ]));
    this.metaTagDescription = new FormControl('', Validators.compose([
      Validators.maxLength(160)
    ]));
    this.metaTagKeyword = new FormControl('', Validators.compose([
      Validators.maxLength(255)
    ]));
    this.seoForm = this.fb.group({
      metaTitle: this.metaTitle,
      metaTagDescription: this.metaTagDescription,
      metaTagKeyword: this.metaTagKeyword
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Seo createSeo function if form is valid.
   *
   * @param seoForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.seoForm.invalid) {
      return;
    }

    const params: any = {};
    params.metaTagTitle = this.seoForm.value.metaTitle;
    params.metaTagDescription = this.seoForm.value.metaTagDescription;
    params.metaTagKeywords = this.seoForm.value.metaTagKeyword;
    this.seoSandbox.createSeo(params);
  }

  // Cancle navigate to dashboard
  seoCancel() {
    this.router.navigate(['/dashboard']);
  }
}
