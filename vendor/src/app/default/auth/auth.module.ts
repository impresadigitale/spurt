import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SWIPER_CONFIG, SwiperConfigInterface, SwiperModule } from 'ngx-swiper-wrapper';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { VendorRegComponent } from './vendor-reg/vendor-reg.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../../core/auth/effects/auth.effect';
import { AuthSandbox } from '../../core/auth/auth.sandbox';
import { AuthApiService } from '../../core/auth/auth.service';
import { RequestInterceptor } from '../../core/providers/interceptor/request.interceptor';
import { SharedModule } from '../shared/shared.module';
import { RecoverpasswordComponent } from './recover-password/recover-password.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

export const routes = [
  {
    path: 'register',
    component: VendorRegComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login/:id',
    component: LoginComponent,
  },
  {
    path: 'recover-password',
    component: RecoverpasswordComponent,
  },
  {
    path: '',
    redirectTo: 'login',
  },
];
@NgModule({
  declarations: [
    LoginComponent,
    VendorRegComponent,
    RecoverpasswordComponent
  ],
  imports: [
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    FormsModule,
    SwiperModule,
    HttpClientModule,
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthSandbox,
    AuthApiService,
    AuthEffects,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },

  ],
  bootstrap: []
})
export class AuthModule { }
