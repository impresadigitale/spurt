/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
// module
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../shared/components/index';
import {VendorComponent} from './vendor-signup.component';
import {TranslateModule} from '@ngx-translate/core';
import {NumberAcceptModule} from '../../shared/validation-directives/onlyNumber.module';


export const routes = [
    {path: '', component: VendorComponent, pathMatch: 'full'}
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        ComponentsModule,
        TranslateModule.forChild(),
        NumberAcceptModule,
        FormsModule
    ],
    declarations: [
        VendorComponent
    ]
})
export class VendorModule {
}
