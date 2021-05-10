/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator } from '../../../theme/utils/app-validators';
import { ConfigService } from '../../../../core/service/config.service';
import { CommonSandbox } from '../../../../core/common/common.sandbox';
import { AccountSandbox } from '../../../../core/account/account.sandbox';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';
import { CustomValidators } from '../../../shared/password-validation/custom-password-validation';
import * as _ from 'lodash';




@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})

export class InformationComponent implements OnInit, OnDestroy {
    // reactive form
    public infoForm: FormGroup;
    public passwordForm: FormGroup;
    // ipload image
    public imageUrl: any;
    private userImage: any;
    public imagePath: string;
    // validation
    public ifSubmitted = false;
    public ifPasswordForm = false;
    // default image
    public ifImageAvailable: string;
    // subscription
    private subscriptions: Array<Subscription> = [];

   public imageTypeError = false;
   public imageSizeError = false;

    @ViewChild('filePath') filePath: ElementRef;

    constructor(public formBuilder: FormBuilder,
                public configService: ConfigService,
                public snackBar: MatSnackBar,
                public commonSandbox: CommonSandbox,
                public listsSandbox: ListsSandbox,
                public accountSandbox: AccountSandbox) {
    }

    // Initially calls initInfoForm,initPasswordForm,setProfile
    ngOnInit() {
        this.imagePath = this.configService.getImageUrl();
        this.initInfoForm();
        this.initPasswordForm();
        this.setProfile();
    }

    // build a form for info  by gouping the form control
    initInfoForm() {
        const nameValidationPattern = '[a-zA-Z \'-,;.]*';

        this.infoForm = this.formBuilder.group({
            'firstName': ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(32),
                Validators.pattern(nameValidationPattern),
            ])],
            'lastName': ['', Validators.compose([
                Validators.required,
                Validators.nullValidator,
                Validators.maxLength(32),
                Validators.pattern(nameValidationPattern),
            ])],
            'email': ['', Validators.compose([
                Validators.required,
                emailValidator,
                Validators.maxLength(96),
            ])],
            'phoneNumber': ['',  Validators.compose([
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(15),
            ])],
            'profileImage': ['',  Validators.compose([
                Validators.required
            ])],
        });
    }

    // build a form for change password  by gouping the form control

    initPasswordForm() {
        this.passwordForm = this.formBuilder.group({
                'currentPassword': ['', Validators.compose([ Validators.required])],
                'newPassword': ['',
                Validators.compose([
                    Validators.required,
                    // check whether the entered password has a number
                    CustomValidators.patternValidator(/((?=.*\d)|(?=.*[#$^+=!*()@%&]))/, { hasNumber: true }),
                     // check whether the entered password has upper case letter
                    CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
                     // check whether the entered password has a lower-case letter
                    CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
                     // Has a minimum length of 8 characters
                    Validators.minLength(8)
                  ]),
            ],
            }
        );
    }


    // set the user details to the form by fetching the profile details from sandbox
    setProfile() {
        this.subscriptions.push(this.commonSandbox.getProfile$.subscribe(profile => {
            if (profile) {
                this.infoForm.controls['firstName'].setValue(profile.firstName);
                this.infoForm.controls['lastName'].setValue(profile.lastName);
                this.infoForm.controls['email'].setValue(profile.email);
                this.infoForm.controls['phoneNumber'].setValue(profile.mobileNumber);
                this.imageUrl = this.imagePath + '?path=' + profile.avatarPath + '&name=' + profile.avatar + '&width=60&height=60';
                this.ifImageAvailable = profile.avatarPath;
                this.infoForm.controls['profileImage'].setValue(profile.avatar ? profile.avatar : '');
            }
        }));
    }

    /**
     * upload new user image
     *
     * @param el refer the HTMLElement filePath
     * it will activate the click function of el
     */
    uploadButtonClick() {
        const el: HTMLElement = this.filePath.nativeElement as HTMLElement;
        el.click();
    }

    // calls convertBase64 to convert data into base64 formt
    uploadChange($event): void {
        this.ifImageAvailable = 'avatar';
        this.convertBase64($event.target);
    }

    // convert image file into Base64 format
    convertBase64(inputValue: any) {
        this.imageTypeError = false;
        this.imageSizeError = false;
        if (inputValue.files && inputValue.files[0]) {
          const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!_.includes(allowed_types, inputValue.files[0].type)) {
          this.imageTypeError = true;
          this.filePath.nativeElement.value = '';
          this.ifImageAvailable = undefined;
          this.infoForm.controls['profileImage'].setValue('');
          return false;
        }
        const size = Math.round(inputValue.files[0].size / 1024);
        if (size > 2048) {
          this.imageSizeError = true;
          this.filePath.nativeElement.value = '';
          this.ifImageAvailable = undefined;
          this.infoForm.controls['profileImage'].setValue('');
           return;
        }
        this.imageTypeError = false;
        this.imageSizeError = false;
        const file: File = inputValue.files[0];
        this.infoForm.controls['profileImage'].setValue(file ? file.name : '');

        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.imageUrl = myReader.result;
            this.userImage = myReader.result;
        };
        myReader.readAsDataURL(file);
      }
    }

    // call edit user info functionality if the form is valid

    public onInfoFormSubmit(): void {
        if (this.infoForm.valid) {
            const params: any = this.infoForm.value;
            params.image = this.userImage;
            this.accountSandbox.doEditProfile(params);
            this.subscriptions.push(this.accountSandbox.getEditProfileLoaded$.subscribe(data => {
                if (data && data === true) {
                    this.ifSubmitted = false;
                    this.imageUrl = '';
                    this.infoForm.reset();
                    this.infoForm.clearValidators();
                }
            }));

        } else {
            this.ifSubmitted = true;
        }
    }

    // call change password functionality if the password form is valid
    public onPasswordFormSubmit(): void {
        if (this.passwordForm.valid) {
            this.accountSandbox.doChangepassword(this.passwordForm.value);
            this.subscriptions.push(this.accountSandbox.changePasswordLoaded$.subscribe(data => {
                if (data && data === true) {
                    this.ifPasswordForm = false;
                    this.passwordForm.reset();
                    this.passwordForm.clearValidators();
                }
            }));
        } else {
            this.ifPasswordForm = true;
        }
    }

    // reset form fields and clear validation
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

    // destroy the subscribed events while page destroy
    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }

}
