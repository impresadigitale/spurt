import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestInterceptor, HTTPStatus } from './core/providers/interceptor/request.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './default/shared/shared.module';
import { LayoutComponent } from './default/common/layout/layout.component';
import { reducers, metaReducers } from '../app/core/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './core/providers/guards/auth-guard';
import { MediaSandbox } from './core/media/media.sandbox';
import { MediaService } from './core/media/media.service';
import { MediaEffects } from './core/media/effects/media.effect';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CommonSandbox } from './core/common/common.sandbox';
import { CommonService } from './core/common/common.service';
import { CommonEffect } from './core/common/effects/common.effect';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SwiperModule,
    SharedModule,
    BrowserAnimationsModule,

    HttpClientModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([MediaEffects, CommonEffect]),

    ToastrModule.forRoot({
      timeOut: 2000,
      easing: 'ease-in',
      positionClass: 'toast-top-right',
      preventDuplicates: true,
  }),
  ],
  providers: [
    HTTPStatus,
    MediaSandbox,
    MediaService,
    CommonSandbox,
    CommonService,
    AuthGuard,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
  },
  {provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true},
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
