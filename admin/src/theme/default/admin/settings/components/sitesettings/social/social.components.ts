/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { SocialSandbox } from '../../../../../../../core/admin/settings/siteSettings/social/social.sandbox';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-sitesettings-social',
  templateUrl: './social.component.html',
  styles: [`
  .settings-right-wrapper {
    margin-top: 0px !important;
}`]
})
export class SocialComponent implements OnInit {


  private subscriptions: Array<Subscription> = [];
  public socialForm: FormGroup;
  public facebook: FormControl;
  public google: FormControl;
  public twitter: FormControl;
  public instagram: FormControl;
  public submitted = false;

  constructor(
    public socialsandbox: SocialSandbox,
    public fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit() {
    this.initForm();
    this.subscribe();
    this.getSocialInfo();
  }

  initForm() {
    this.facebook = new FormControl('');
    this.google = new FormControl('');
    this.twitter = new FormControl('');
    this.instagram = new FormControl('');
    this.socialForm = this.fb.group({
      facebook: this.facebook,
      google: this.google,
      twitter: this.twitter,
      instagram: this.instagram
    });
  }

  /**
   * Handles form 'submit' event. Calls sandbox Social  createSocial function if form is valid.
   *
   * @param socialForm entire form value
   * @param params storing entire value
   */
  onSubmit() {
    this.submitted = true;
    if (this.socialForm.invalid) {
      return;
    }
    const params: any = {};
    params.facebook = this.socialForm.value.facebook;
    params.google = this.socialForm.value.google;
    params.twitter = this.socialForm.value.twitter;
    params.instagram = this.socialForm.value.instagram;
    this.socialsandbox.createSocial(params);
  }

  /**
   * Handles form 'list' event. Calls sandbox Social  getSocial function.
   *
   */
  getSocialInfo() {
    this.socialsandbox.getSocial();
  }

  // Subscribe Social Data bind from control
  subscribe() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
    this.subscriptions.push(
      this.socialsandbox.getSocial$.subscribe(data => {
        if (data && data[0]) {
          this.socialForm.controls['facebook'].setValue(data[0].facebook);
          this.socialForm.controls['google'].setValue(data[0].google);
          this.socialForm.controls['twitter'].setValue(data[0].twitter);
          this.socialForm.controls['instagram'].setValue(data[0].instagram);
        }
      })
    );
  }

  // Social Cancle navigate to Dashboard
  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
