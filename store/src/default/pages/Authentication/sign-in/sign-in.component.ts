/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator } from '../../../theme/utils/app-validators';
import { AuthSandbox } from '../../../../core/auth/auth.sandbox';
import { AuthService } from '../../../../default/shared/social-login/auth.service';
import { CartSandbox } from '../../../../core/cart/cart.sandbox';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  providers: [AuthService]
})

export class SignInComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public submitted = false;
  private subscriptions: Array<Subscription> = [];

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    public authSandbox: AuthSandbox, public cartSandbox: CartSandbox,     public productControl: ProductControlSandbox
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        emailValidator,
        Validators.maxLength(96)
      ])],
      password: ['', Validators.compose([
        Validators.required])
      ]
    });
  }

  /**social login **/
  public socialSignIn(socialPlatform: string) {
    const params: any = {};
    params.type = socialPlatform;
    this.authSandbox.doLogin(params);
  }

  /** calls authSandbox  doLogin if the form is valid.
   *
   * Then calls resetAllFormFields to reset the form fields .
   */
  public onLoginFormSubmit(values: Object): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      const params = this.loginForm.value;
      params.type = 'normal';
      this.authSandbox.doLogin(params);
      this.submitted = false;
    }
  }

  // reset the form fields
  resetAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.reset();
        control.clearValidators();
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.resetAllFormFields(control);
      }
    });
  }

  // validate the form fields
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

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
