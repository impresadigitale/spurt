/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
    Component,
    ChangeDetectionStrategy, OnInit
} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-services-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesHeaderComponent implements OnInit {


    constructor(public titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Services');
    }


}
