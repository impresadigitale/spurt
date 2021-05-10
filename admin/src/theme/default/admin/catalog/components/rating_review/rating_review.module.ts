/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../../../../default.material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberAcceptModule } from '../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { DefaultCommonModule } from '../../../../default.common.module';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HttpLoaderFactory } from '../../../admin.module';
import { RatingReviewRoutingModule } from './rating_review.routing';
import { RatingReviewFilterComponent } from './filter/filter.component';
import { RatingReviewListComponent } from './list/list.component';
import { CategoriesSandbox } from '../../../../../../core/admin/catalog/category/categories.sandbox';
import { ProductSandbox } from '../../../../../../core/admin/catalog/product/product.sandbox';
import { LayoutSandbox } from '../../../../../../core/admin/layout/layout.sandbox';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
  declarations: [RatingReviewFilterComponent, RatingReviewListComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RatingReviewRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NumberAcceptModule,
    ComponentsModule
  ],
  bootstrap: [],
  entryComponents: [],
  providers: [CategoriesSandbox, ProductSandbox, LayoutSandbox]
})
export class RatingReviewModule {}
