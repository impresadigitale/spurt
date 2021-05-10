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
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../../../../shared/components';
import { SettingSandbox } from '../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.sandbox';
import { SettingService } from '../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting.service';
import { EffectsModule } from '@ngrx/effects';
import { SettingEffects } from '../../../../../../../../core/admin/vendor/pages/vendor-setting/vendor-setting-effects/vendor-setting.effects';
import { VendorSettingsComponent } from './list/vendor-setting-list.component';
import { VendorSettingsDetailComponent } from './detail/vendor-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PipeModule } from '../../../../../shared/components/pipes/category-search.pipe.module';
import { MaterialModule } from '../../../../../../default.material.module';

const vendorRoutes: Routes = [
    {
        path: '', component: VendorSettingsComponent,
        children: [
            {
                path: 'detail/:id', component: VendorSettingsDetailComponent,
            },
        ]
    },
];
@NgModule({
    declarations: [
        VendorSettingsComponent,
        VendorSettingsDetailComponent
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        EffectsModule.forFeature([SettingEffects]),
        NgbModule,
        NumberAcceptModule,
        PipeModule,
        FormsModule, ReactiveFormsModule, MaterialModule],
    providers: [SettingSandbox, SettingService],
    bootstrap: [],
    entryComponents: []
})
export class VendorSettingModule { }
