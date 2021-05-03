/*
 * spurtcommerce
 * version 4.4
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
import {TranslateModule} from '@ngx-translate/core';
import {NumberAcceptModule} from '../../shared/validation-directives/onlyNumber.module';
import { StockCheckoutComponent } from './stock-checkout.component';

// services and store

import { ListsSandbox } from '../../../core/lists/lists.sandbox';
import { AccountSandbox } from '../../../core/account/account.sandbox';
import { AccountEffect } from '../../../core/account/effect/account.effect';
import { AccountService } from '../../../core/account/account.service';
import { EffectsModule } from '@ngrx/effects';
import { ProductControlSandbox } from '../../../core/product-control/product-control.sandbox';
import { AuthSandbox } from '../../../core/auth/auth.sandbox';
import { CommonSandbox } from '../../../core/common/common.sandbox';



export const routes = [
    {path: '', component: StockCheckoutComponent, pathMatch: 'full'}
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
        EffectsModule.forFeature([AccountEffect]),
        FormsModule

    ],
    declarations: [
        StockCheckoutComponent
    ],
    providers: [
        ListsSandbox,
        AccountSandbox,
        AccountService,
        ProductControlSandbox,
        AuthSandbox,
        CommonSandbox
    ]
})
export class StockCheckoutModule {
}
