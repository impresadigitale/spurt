/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// shared modules
import {SharedModule} from '../../shared/shared.module';
import {ComponentsModule} from '../../shared/components/index';
import {NumberAcceptModule} from './../../shared/validation-directives/onlyNumber.module';

// components
import {AccountComponent} from './account.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {InformationComponent} from './information/information.component';
import {MyordersComponent} from './myorders/myorders.component';
import {BuyAgainComponent} from './buyagain/buyagain.component';
import {OrderDetailsComponent} from './order-details/order-details.component';
import {ReviewComponent} from './review/review.component';
import {TrackComponent} from './track/track.component';
import { CancelOrderComponent } from './myorders/model/cancel-order/cancel-order.component';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
// store services
import {EffectsModule} from '@ngrx/effects';
import {CommonEffect} from '../../../core/common/effects/common.effect';
import {AccountEffect} from '../../../core/account/effect/account.effect';
import {CommonSandbox} from '../../../core/common/common.sandbox';
import {AccountSandbox} from '../../../core/account/account.sandbox';
import {CommonService} from '../../../core/common/common.service';
import {TranslateModule} from '@ngx-translate/core';
import {AddressesComponent} from './addresses/addresses.component';
import {AddaddressesComponent} from './addaddresses/addaddresses.component';
import {ListsSandbox} from '../../../core/lists/lists.sandbox';
import {ListsService} from '../../../core/lists/lists.service';
import {ListsEffect} from '../../../core/lists/effects/lists.effect';


export const routes = [
    {
        path: '',
        component: AccountComponent, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: DashboardComponent, data: {breadcrumb: 'Dashboard'}},
        {path: 'information', component: InformationComponent, data: {breadcrumb: 'Information'}},
        {path: 'addresses', component: AddressesComponent, data: {breadcrumb: 'Addresses'}},
        {path: 'addaddresses', component: AddaddressesComponent, data: {breadcrumb: 'Add Address'}},
        {
            path: 'addaddresses_edit/:id',
            component: AddaddressesComponent
        },
        { path: 'myorders', component: MyordersComponent, data: {  breadcrumb: 'My Orders' } },
        { path: 'buyagain', component: BuyAgainComponent, data: {  breadcrumb: 'Buy Again' } },
        { path: 'order-details', component: OrderDetailsComponent, data: {  breadcrumb: 'Order Details' } },
        { path: 'order-details/:id', component: OrderDetailsComponent, data: {  breadcrumb: 'Order Details' } },
        { path: 'review', component: ReviewComponent, data: {  breadcrumb: 'Review' } },
        { path: 'review/:id', component: ReviewComponent, data: {  breadcrumb: 'Review' } },
        { path: 'track', component: TrackComponent, data: {  breadcrumb: 'Track' } },
        { path: 'track/:id', component: TrackComponent, data: {  breadcrumb: 'Track' } },
        { path: 'quotation-list', component: QuotationListComponent, data: {  breadcrumb: 'Quotation Request List' } },

    ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        ComponentsModule,
        EffectsModule.forFeature([AccountEffect, CommonEffect, ListsEffect]),
        TranslateModule.forChild(),
        NumberAcceptModule,
        FormsModule
    ],
    declarations: [
        AccountComponent,
        DashboardComponent,
        InformationComponent,
        AddressesComponent,
        AddaddressesComponent,
        MyordersComponent,
        BuyAgainComponent,
        OrderDetailsComponent,
        ReviewComponent,
        TrackComponent,
        CancelOrderComponent,
        QuotationListComponent
    ],
    providers: [CommonSandbox,
        AccountSandbox,
        CommonService,
        ListsSandbox,
        ListsService
    ],
    entryComponents: [
        CancelOrderComponent
    ]
})
export class AccountModule {
}
