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
import { VendorLayoutComponent } from './layout/layout.component';
import { ComponentsModule } from '../../../shared/components';
import { VendorSharedModule } from '../../vendor-shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { HttpClient } from '@angular/common/http';
// Store Actions
import { EffectsModule } from '@ngrx/effects';
import { LayoutService } from '../../../../../../core/admin/catalog/layout/layout.service';
import { LayoutsSandbox } from '../../../../../../core/admin/catalog/layout/layout.sandbox';
import { LayoutEffects } from '../../../../../../core/admin/catalog/layout/effects/layout.effect';
import { RatingReviewEffect } from '../../../../../../core/admin/catalog/ratingReview/ratingReview-effect/ratingReview.effect';
import { RatingReviewSandbox } from '../../../../../../core/admin/catalog/ratingReview/ratingReview.sandbox';
import { RatingReviewService } from '../../../../../../core/admin/catalog/ratingReview/ratingReview.service';
import { VendorProductEffects } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product-effects/vendor-product.effects';
import { VendorProductSandbox } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { VendorProductService } from '../../../../../../core/admin/vendor/pages/vendor-product/vendor-product.service';
import { DocumentSandbox } from '../../../../../../core/admin/vendor/pages/documents/document.sandbox';
import { DocumentService } from '../../../../../../core/admin/vendor/pages/documents/document.service';
import { DocumentEffects } from '../../../../../../core/admin/vendor/pages/documents/document-effects/document.effects';

const vendorRoutes: Routes = [
    {
        path: '', component: VendorLayoutComponent,
        children: [
            {
            path: 'seller',
            loadChildren: () => import('./pages/seller/seller.module').then(m => m.SellerModule)
           },
            { path: 'product',
            loadChildren: () => import('./pages/vendor-products/vendor-product.module').then(m => m.VendorProductModule)
        },
            { path: 'settings',
            loadChildren: () => import('./pages/vendor-settings/vendor-setting.module').then(m => m.VendorSettingModule)
         },
            { path: '', redirectTo: 'seller', pathMatch: 'full' }
        ]
    },
];
@NgModule({
    declarations: [
        VendorLayoutComponent,
    ],
    imports: [
        RouterModule.forChild(vendorRoutes),
        CommonModule,
        ComponentsModule,
        VendorSharedModule,
        NgbModule,
        ComponentsModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
          EffectsModule.forFeature([
            LayoutEffects, VendorProductEffects,
            RatingReviewEffect, DocumentEffects
          ])],
    providers: [
        LayoutService,
        LayoutsSandbox,
        RatingReviewSandbox,
        RatingReviewService, VendorProductService, VendorProductSandbox, DocumentSandbox, DocumentService ],
    bootstrap: [],
    entryComponents: []
})
export class VendorsModule { }
