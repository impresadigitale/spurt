/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { ListsSandbox } from '../../../core/lists/lists.sandbox';

@Component({
    selector: 'app-chi-siamo',
    templateUrl: './chi-siamo.component.html',
    styleUrls: ['./chi-siamo.component.scss']
})
export class ChiSiamoComponent implements OnInit {

    public contactForm: FormGroup;
    public submitted = false;


    constructor(public formBuilder: FormBuilder,
                public listSandbox: ListsSandbox) { }


    ngOnInit() {
        this.initContactForm();
    }

    initContactForm() {
        this.contactForm = this.formBuilder.group({
            name: ['', Validators.compose([Validators.required, Validators.nullValidator])],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            phone: ['', Validators.required],
            message: ['', Validators.required]
        });
    }

    public onContactFormSubmit(values: Object): void {
        this.submitted = true;
        if (this.contactForm.valid) {
            this.submitted = false;
            this.listSandbox.contactUs(this.contactForm.value);
        }
    }

    onKeyPress(e, field) {
        const val = this.contactForm.controls[field].value;
        const string = val.replace(/  +/g, ' ');
        this.contactForm.controls[field].setValue(string);
    }

}
