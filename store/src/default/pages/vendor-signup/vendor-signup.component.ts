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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomValidators } from '../../shared/password-validation/custom-password-validation';


@Component({
    selector: 'app-vendor-signup',
    templateUrl: './vendor-signup.component.html',
    styleUrls: ['./vendor-signup.component.scss']
})

export class VendorComponent implements OnInit {

    public vendorForm: FormGroup;
    public policy = false;
    public submitted = false;


    constructor(public formBuilder: FormBuilder, public toaster: MatSnackBar,
                public listSandbox: ListsSandbox) { }


    ngOnInit() {
        this.initVendorForm();
    }

    initVendorForm() {
        const nameValidationPattern = '[a-zA-Z \'-,;.]*';

        this.vendorForm = this.formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator,
                Validators.minLength(3),
                Validators.maxLength(32),
                Validators.pattern(nameValidationPattern),

            ])],
            contactPerson: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator,
                Validators.minLength(3),
                Validators.maxLength(32),
                Validators.pattern(nameValidationPattern),
            ])],
            lastName: ['', Validators.compose([
                Validators.maxLength(32),
                Validators.pattern(nameValidationPattern),
            ])],
            email: ['', Validators.compose([
                Validators.required,
                emailValidator,
                Validators.maxLength(96),

            ])],
            phone: ['',
            Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15),
            ])],
            password: ['',
            Validators.compose([
                Validators.required,
                // check whether the entered password has a number
                CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
                 // check whether the entered password has upper case letter
                CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                 // check whether the entered password has a lower-case letter
                CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                 // Has a minimum length of 8 characters
                Validators.minLength(8),
                Validators.maxLength(50),

              ]),
        ],
            confirmPassword: ['', Validators.compose([Validators.required])],
        }, {validator: matchingPasswords('password', 'confirmPassword')});
    }


    // call contact us function from sand box if the contact form is valid
    public onVendorFormSubmit(values: Object): void {
        this.submitted = true;
        if (this.vendorForm.valid && this.policy === false) {
            this.toaster.open('Please agree the privacy policy', '×', {
                panelClass: 'error',
                verticalPosition: 'top',
                horizontalPosition: 'right',
                duration: 3000
              });
           return;
        }
        if (this.vendorForm.valid) {
            this.submitted = false;
            const params: any = {};
            params.firstName = this.vendorForm.value['name'];
            params.lastName = this.vendorForm.value['lastName'];
            params.contactPersonName = this.vendorForm.value['contactPerson'];
            params.password = this.vendorForm.value['password'];
            params.confirmPassword = this.vendorForm.value['confirmPassword'];
            params.emailId = this.vendorForm.value['email'];
            params.phoneNumber = this.vendorForm.value['phone'];

            this.listSandbox.vendorSignup(params);
        }
    }


    onKeyPress(e, field) {
        const val = this.vendorForm.controls[field].value;
        const string = val.replace(/  +/g, ' ');
        this.vendorForm.controls[field].setValue(string);
    }

}
