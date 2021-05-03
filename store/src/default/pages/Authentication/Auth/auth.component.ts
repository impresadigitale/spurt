/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {emailValidator, matchingPasswords} from '../../../theme/utils/app-validators';
import {AuthSandbox} from '../../../../core/auth/auth.sandbox';
import {Title} from '@angular/platform-browser';
import { CustomValidators } from '../../../shared/password-validation/custom-password-validation';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    public registerForm: FormGroup;
    public submitted = false;

    constructor(public formBuilder: FormBuilder,
                public router: Router,
                public snackBar: MatSnackBar,
                public authSandbox: AuthSandbox,
                private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Login');
        const mobileValidationPattern = '^-?[0-9]\\d*(\\.\\d{1,2})?$';
        const nameValidationPattern = '[a-zA-Z \'-,;.]*';

        this.registerForm = this.formBuilder.group({

            'name': ['', Validators.compose([
                    Validators.required,
                    Validators.pattern(nameValidationPattern),
                    Validators.minLength(3),
                    Validators.maxLength(32)
                    ])],
            'lastName': ['', Validators.compose([
                    Validators.required,
                    Validators.pattern(nameValidationPattern),
                    Validators.maxLength(32)
                    ])],
            'email': ['', Validators.compose([
                    Validators.required,
                    emailValidator,
                    Validators.maxLength(96)

                    ])],
            'password': ['', Validators.compose([
                    Validators.required,
                    CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
                    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                    Validators.minLength(8),
                    Validators.maxLength(50)
                    ])],
            'confirmPassword': ['', Validators.compose([
                    Validators.required,
                    ])],
            'phoneNumber': ['', Validators.compose([
                    Validators.required,
                    Validators.pattern(mobileValidationPattern),
                    Validators.maxLength(15),
                    Validators.minLength(4)
                    ])],
        }, {validator: matchingPasswords('password', 'confirmPassword')});
    }

    /** calls authSandbox doRegister if tthe from is valid.
     Then calls resetAllFormFields for reset **/
    public onRegisterFormSubmit(values: Object): void {
        if (this.registerForm.valid) {
            this.authSandbox.doRegister(this.registerForm.value);
            this.submitted = false;
            this.registerForm.reset();
        } else {
            this.submitted = true;
        }
    }

    // reset the values
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

    // validate the reactive form
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
