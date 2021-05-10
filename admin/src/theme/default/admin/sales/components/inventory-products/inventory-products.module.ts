/*
 * SpurtCommerce
 * version 4.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { InventoryProductsComponent } from './list/list.component';

// Store Actions
import { InventoryProductSandbox } from '../../../../../../core/admin/sales/inventory-products/inventory-products.sandbox';
import { InventoryProductService } from '../../../../../../core/admin/sales/inventory-products/inventory-products.service';
import { InventoryProductEffect } from '../../../../../../core/admin/sales/inventory-products/effects/inventory-products.effect';
import { EffectsModule } from '@ngrx/effects';

// Routing Module
import { InventoryProductsRoutingModule } from './inventory-products.routing';

// Shared Module
import { MaterialModule } from '../../../../default.material.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [
    InventoryProductsComponent
  ],
  imports: [
    InventoryProductsRoutingModule,
    CommonModule,
    DefaultCommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EffectsModule.forFeature([InventoryProductEffect]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    InventoryProductSandbox,
    InventoryProductService
  ],
  bootstrap: [],
  entryComponents: []
})
export class InventroyProductsModule {}
