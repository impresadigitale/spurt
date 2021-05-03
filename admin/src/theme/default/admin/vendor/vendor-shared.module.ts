/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorHeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { VendorModule } from './vendor.module';
import { ComponentsModule } from '../shared/components';

@NgModule({
    declarations: [
        VendorHeaderComponent,
    ],
    exports: [
        VendorHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterModule, ComponentsModule
    ],
    bootstrap: [],
    entryComponents: []
})


export class VendorSharedModule {
    static forRoot(): ModuleWithProviders<VendorModule> {
        return {
            ngModule: VendorModule,
            providers: []
        };
    }
 }
