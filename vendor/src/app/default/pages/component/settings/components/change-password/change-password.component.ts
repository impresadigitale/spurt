import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { MustMatch } from '../../../../../shared/validation/confirm.password';
import { Subscription } from 'rxjs';
import { AuthSandbox } from '../../../../../../core/auth/auth.sandbox';
import { CustomValidators } from '../../../../../shared/validation/custom-password-validation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, AfterViewInit, OnDestroy {

    public changePasswordForm: FormGroup;
    public submitted = false;
    private subscriptions: Array<Subscription> = [];
    public config: SwiperConfigInterface = {};  constructor(private formbuilder: FormBuilder, public authSandbox: AuthSandbox) { }

    ngOnInit() {
        this.changePasswordForm = this.formbuilder.group({
            newpassword: ['',
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
            confirmpassword: ['', Validators.compose([Validators.required])]
        }, {
            validator: MustMatch('newpassword', 'confirmpassword')
        });
    }
    ngAfterViewInit() {
        this.config = {
            observer: true,
            slidesPerView: 6,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: true,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1500: {
                    slidesPerView: 5,
                }
            }
        };
    }

    submitChangePassword() {
        this.submitted = true;
        if (!this.changePasswordForm.valid) {
            this.validateAllFormFields(this.changePasswordForm);
            return;
        }
        const params: any = {};
        params.newPassword = this.changePasswordForm.value.newpassword;
        this.authSandbox.changePassword(params);
        this.subscriptionEvent();
    }

    subscriptionEvent() {
        this.subscriptions.push(
            this.authSandbox.changePasswordLoaded$.subscribe(data => {
                if (data === true) {
                        this.changePasswordForm.reset();
                }
            })
        );
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

    ngOnDestroy() {
        this.subscriptions.forEach(each => {
            each.unsubscribe();
        });
    }


}
