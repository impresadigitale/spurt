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
import { VendorProductListComponent } from './list/vendor-product-list.component';
import { VendorProductAddComponent } from './add/vendor-product-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../../../admin.module';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../../../../../../default.material.module';
// Store Actions
import { CategoriesService } from '../../../../../../../../core/admin/catalog/category/categories.service';
import { CKEditorModule } from 'ng2-ckeditor';
import { DatePipe } from '@angular/common';
import { CategoriesSandbox } from '../../../../../../../../core/admin/catalog/category/categories.sandbox';
import { NumberAcceptModule } from '../../../../../../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PipeModule } from '../../../../../../admin/shared/components/pipes/category-search.pipe.module';
import { AuthGuard } from '../../../../../../../../core/admin/providers/auth.guard';
import { ComponentsModule } from '../../../../../../../default/admin/shared/components';

const productRoutes: Routes = [
    { path: '', component: VendorProductListComponent},
    { path: 'add', component: VendorProductAddComponent, canActivate: [AuthGuard],
    data: { permission: 'create-market-place-product' }},
    {
        path: 'edit/:id',
        component: VendorProductAddComponent, canActivate: [AuthGuard],
        data: { permission: 'edit-market-place-product' }
      }
];
@NgModule({
    declarations: [
        VendorProductListComponent,
        VendorProductAddComponent
    ],
    imports: [
        RouterModule.forChild(productRoutes),
        CommonModule,
        NgbModule,
        MaterialModule,
        CKEditorModule,
        ComponentsModule,
        PipeModule,
        FormsModule, ReactiveFormsModule,
        TranslateModule.forChild({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
          NumberAcceptModule

    ],
    providers: [
        DatePipe,
        CategoriesSandbox,
        CategoriesService,

    ],
    bootstrap: [],
    entryComponents: []
})
export class VendorProductModule { }
