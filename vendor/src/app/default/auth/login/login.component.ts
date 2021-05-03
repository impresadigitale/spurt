import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { matchingPasswords, emailValidator } from '../../theme/utils/app-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;

  constructor(public formBuilder: FormBuilder, public authSandbox: AuthSandbox) { }

  ngOnInit() {
    this.initLoginForm();
  }

  public initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      loginId: ['',  Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.required]
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (!this.loginForm.valid) {
      this.validateAllFormFields(this.loginForm);
      return;
    }
    this.authSandbox.doLogin(this.loginForm.value);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });

  }
}
