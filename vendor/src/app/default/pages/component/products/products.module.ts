
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductAddComponent } from './component/product-add/product-add.component';
import { ProductsComponent } from './layout/products.component';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffect } from '../../../../core/product/product-effects/product.effects';
import { ProductService } from '../../../../core/product/product.service';
import { ProductSandbox } from '../../../../core/product/product.sandbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from 'ng2-ckeditor';
import { NewlyAddedProductListComponent } from './component/newly-added-list /newly-added-list.component';
import { ActiveProductListComponent } from './component/active-product-list /active-product-list.component';
import { InActiveProductListComponent } from './component/inactive-product-list/inactive-product-list.component';
import { CustomCurrencyPipe } from '../../../../default/shared/pipe/currency-symbol.pipe';

export const routes = [
    {
        path: '',
        component: ProductsComponent,
        children: [
            {
                path: 'list',
                component: ProductListComponent,
                data: {
                    title: 'Products',
                    urls: [{ title: 'Home' }, { title: 'Products' }, { title: 'Product List' }]
                }
            },
            {
                path: 'new-lists',
                component: NewlyAddedProductListComponent,
                data: {
                    title: 'Products',
                    urls: [{ title: 'Home' }, { title: 'Products' }, { title: 'Newly Added Product List' }]
                }
            },
            {
                path: 'active-lists',
                component: ActiveProductListComponent,
                data: {
                    title: 'Products',
                    urls: [{ title: 'Home' }, { title: 'Products' }, { title: 'Active Product List' }]
                }
            },
            {
                path: 'inactive-lists',
                component: InActiveProductListComponent,
                data: {
                    title: 'Products',
                    urls: [{ title: 'Home' }, { title: 'Products' }, { title: 'Inactive Product List' }]
                }
            },
            {
                path: 'add',
                component: ProductAddComponent,
                data: {
                    title: 'Products',
                    urls: [{ title: 'Home' }, { title: 'Products' }, { title: 'Product Add' }]
                }
            },
            {
                path: 'edit/:id',
                component: ProductAddComponent,
                data: {
                    title: 'Products',
                    urls: [{ title: 'Home' }, { title: 'Products' }, { title: 'Product Update' }]
                }
            },
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        FormsModule,
        NgbModule,
        MatInputModule,
        MatStepperModule,
        MatIconModule,
        EffectsModule.forFeature([ProductEffect]),
        DataTablesModule,
        CKEditorModule
    ],
    declarations: [
        ProductsComponent,
        ProductListComponent,
        ProductAddComponent,
        NewlyAddedProductListComponent,
        ActiveProductListComponent,
        InActiveProductListComponent
    ],
    providers: [
        ProductEffect,
        ProductService,
        ProductSandbox,
        DatePipe, CustomCurrencyPipe,
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ]

})
export class ProductsModule {
}
