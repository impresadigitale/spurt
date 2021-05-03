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
import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-track-order',
    templateUrl: './track-order.component.html',
    styleUrls: ['./track-order.component.scss']
})
export class TrackOrderComponent implements OnInit {


    public trackHistory = false;
    public trackForm: FormGroup;
    public submitted = false;
    public aaa: any;
    private subscription: Array<Subscription> = [];
    public trackId: any;



    constructor(public formBuilder: FormBuilder,
                public listSandbox: ListsSandbox) { }


    ngOnInit() {
        this.initTrackForm();
        const array = ['a', 'b', 'c'];

    }


    initTrackForm() {
        this.trackForm = this.formBuilder.group({
            orderPrefixId: ['', Validators.required],
        });
     }

     public onTrackFormSubmit(values: Object): void {
        this.submitted = true;
        if (this.trackForm.valid) {
            this.trackId = this.trackForm.value['orderPrefixId'];
            this.submitted = false;
            const params: any = {};
            params.orderPrefixId = this.trackForm.value['orderPrefixId'];
            this.listSandbox.trackOrder(params);
            this.subscription.push(this.listSandbox.trackOrderDetail$.subscribe(data => {
                if (data) {
                    this.trackHistory = true;
                }
              }));

        }
    }
}
