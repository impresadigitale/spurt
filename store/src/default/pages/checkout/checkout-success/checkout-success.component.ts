/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-checkout-success',
    templateUrl: './checkout-success.component.html',
    styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

   public orderId: any;

    constructor(public activeRoute: ActivatedRoute, public router: Router) {
        this.activeRoute.params.subscribe(routes => {
            if (routes['id']) {
                this.orderId = routes['id'];
            }
        });
    }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigate(['/']);
       }, 5000);
    }
}
