import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchingPasswords, emailValidator } from '../../theme/utils/app-validators';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';

@Component({
  selector: 'app-vendor-reg',
  templateUrl: './vendor-reg.component.html',
  styleUrls: ['./vendor-reg.component.scss']
})
export class VendorRegComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;

  constructor( public formBuilder: FormBuilder, public authSandbox: AuthSandbox) { }

  ngOnInit() {
    const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
        const nameValidationPattern = '[a-zA-Z \'-,;.]*';
        this.registerForm = this.formBuilder.group({
            'fName': ['', Validators.compose([Validators.required, Validators.pattern(nameValidationPattern), Validators.minLength(3)])],
            'lName': ['', Validators.compose([Validators.required, Validators.pattern(nameValidationPattern)])],
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            'confirmPassword': ['', Validators.compose([Validators.required])],
            'phoneNumber': ['', Validators.compose([Validators.required, Validators.pattern(mobileValidationPattern)])]
        }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

  public onRegisterFormSubmit(values: Object): void {
    this.submitted = true;
    if (this.registerForm.valid) {
      const params = this.registerForm.value;
      this.authSandbox.doRegister(params);

    }
  }
}
