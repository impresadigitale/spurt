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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultCommonModule } from '../../../default.common.module';

// custom directive component
import { NavigationComponent } from './navigation/navigation.component';
import { ProfileBarComponent } from './profile-bar/profile.bar.component';
import { MaterialModule } from '../../../default.material.module';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';
import { RatingComponent } from './rating/rating.component';
import { PipeModule } from './pipes/category-search.pipe.module';
import { PermissionServices } from './services/permission.services';
import { MyDisableIfUnauthorizedDirective } from './directives/disable-if-unauthorized.directive';
import { MyHideIfUnauthorizedDirective } from './directives/hide-if-unauthorized.directive';
import { SalesCountComponent } from '../components/directives/sales-count/count.component';
import { LayoutsSandbox } from '../../../../../core/admin/sales/layout/layout.sandbox';
import { PagesLayoutComponent } from './pages-layout/pages-layout.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';


export const COMPONENTS = [
  NavigationComponent,
  ProfileBarComponent,
  CurrencySymbolPipe,
  RatingComponent,
  MyDisableIfUnauthorizedDirective,
  MyHideIfUnauthorizedDirective,
  SalesCountComponent,
  PagesLayoutComponent,
  GlobalLoaderComponent

];

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DefaultCommonModule,
    MaterialModule,
    PipeModule,
    TranslateModule.forChild(),
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
  entryComponents: [],
  providers: [PermissionServices,
    LayoutsSandbox
  ]
})
export class ComponentsModule {}
