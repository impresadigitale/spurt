/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerListComponent } from './list/seller-list.component';
import { SellerAddComponent } from './add/seller-add.component';
import {  ViewVendorComponent } from './viewvendor/viewvendor.component';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { SellerEffects } from '../../../../../../../../core/admin/vendor/pages/seller/seller-effects/seller.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../../../default.material.module';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ScrollToModule } from '../../../../../../../../core/admin/vendor/pages/shared/validation-directives/error.module';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';
import { ComponentsModule } from '../../../../../../../default/admin/shared/components';


const sellerRoutes: Routes = [
    { path: '', component: SellerListComponent},
    { path: 'add', component: SellerAddComponent, canActivate: [AuthGuard],
    data: { permission: 'create-vendor' }},
    { path: 'view/:id', component: ViewVendorComponent, canActivate: [AuthGuard],
    data: { permission: 'view-vendor' } },
    {
        path: 'edit/:id',
        component: SellerAddComponent, canActivate: [AuthGuard],
        data: { permission: 'edit-vendor' }
      }
];
@NgModule({
    declarations: [
        SellerListComponent,
        SellerAddComponent,
        ViewVendorComponent,
    ],
    imports: [
        RouterModule.forChild(sellerRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        NumberAcceptModule,
        ScrollToModule,
        FormsModule,
        CKEditorModule,
        ComponentsModule,
        ReactiveFormsModule,
        EffectsModule.forFeature([
            SellerEffects
          ])
    ],
    providers: [
    ],
    bootstrap: [],
    entryComponents: []
})
export class SellerModule { }
