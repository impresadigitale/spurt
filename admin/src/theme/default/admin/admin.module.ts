/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DefaultRoutingModule } from './admin-routing.module';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './admin.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../core/app.reducers';
import {
  HTTPStatus,
  RequestInterceptor
} from '../../../core/admin/providers/CommonInterceptor';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy
} from '@angular/common';
import { MaterialModule } from '../default.material.module';
import { AppApiClient } from '../../../core/appApiClient.service';
import { AuthGuard } from '../../../core/admin/providers/auth.guard';
import { EditprofileComponent } from './layout/editprofile/editprofile.component';
import { AuthService } from '../../../core/admin/auth/auth.service';
import { AuthSandbox } from '../../../core/admin/auth/auth.sandbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { EditprofileService } from '../../../core/admin/profile/editprofile/editprofile.service';
import { EditprofileSandbox } from '../../../core/admin/profile/editprofile/editprofile.sandbox';
import { ConfigService } from '../../../core/admin/service/config.service';
import { ToastrModule } from 'ng6-toastr-notifications';

import { ComponentsModule } from './shared/components';
import { DefaultCommonModule } from '../default.common.module';

// Components
import { CONTAINERS, ContainersModule } from './layout/index';
import { EditprofileEffect } from '../../../core/admin/profile/editprofile/effect/editprofile.effect';
import { ImagemanagerpopupComponent } from './shared/model-popup/ImageManagerPopup/imagemanagerpopup.component';
import { OrderstatusEffects } from '../../../core/admin/settings/localizations/orderstatus/orderstatus-effects/orderstatus.effects';
import { OrderstatusSandbox } from '../../../core/admin/settings/localizations/orderstatus/orderstatus.sandbox';
import { OrderstatusApiClientService } from '../../../core/admin/settings/localizations/orderstatus/orderstatus-ApiClientService';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberAcceptModule } from '../../../core/admin/shared/validation-directives/onlyNumber.module';
import { PagerComponent } from './shared/components/pagination/pager.component';
import { StockEffects } from '../../../core/admin/settings/localizations/stockStatus/stock-effect/stock.effect';
import { StockService } from '../../../core/admin/settings/localizations/stockStatus/stock.service';
import { StockSandbox } from '../../../core/admin/settings/localizations/stockStatus/stock.sandbox';
import { MediaEffects } from '../../../core/admin/catalog/media/effects/media.effect';
import { MediaService } from '../../../core/admin/catalog/media/media.service';
import { MediaSandbox } from '../../../core/admin/catalog/media/media.sandbox';
import { DeleteConfirmationDialogComponent } from './shared/model-popup/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { SellerSandbox } from '../../../core/admin/vendor/pages/seller/seller.sandbox';
import { SellerService } from '../../../core/admin/vendor/pages/seller/seller.service';
import { VendorProductSandbox } from '../../../core/admin/vendor/pages/vendor-product/vendor-product.sandbox';
import { ProductService } from '../../../core/admin/catalog/product/product.service';
import { TaxService } from '../../../core/admin/settings/localizations/tax/tax.service';
import { TaxSandbox } from '../../../core/admin/settings/localizations/tax/tax.sandbox';
import { TaxEffect } from '../../../core/admin/settings/localizations/tax/tax-effect/tax.effects';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/');
}


// ConfigService
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AdminComponent,
    PagerComponent,
    EditprofileComponent,
    ImagemanagerpopupComponent,
    DeleteConfirmationDialogComponent,
    CONTAINERS.AuthLayoutComponent,
    CONTAINERS.CommonLayoutComponent
  ],
  imports: [
    BrowserModule,
    DefaultRoutingModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    FormsModule,
    ContainersModule,
    ComponentsModule,
    DefaultCommonModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot([
      MediaEffects,
      EditprofileEffect,
      OrderstatusEffects,
      StockEffects,
      TaxEffect
    ]),
    CKEditorModule,
    NgbModule,
    NumberAcceptModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    ConfigService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    HTTPStatus,
    AppApiClient,
    AuthGuard,
    AuthService,
    AuthSandbox,
    SellerSandbox,
    SellerService,
    VendorProductSandbox,
    ProductService,
    StockService,
    StockSandbox,
    EditprofileSandbox,
    EditprofileService,
    OrderstatusSandbox,
    OrderstatusApiClientService,
    MediaSandbox,
    MediaService, TaxService, TaxSandbox
  ],

  bootstrap: [AdminComponent],
  entryComponents: [ImagemanagerpopupComponent, DeleteConfirmationDialogComponent]
})
export class AdminModule {}
