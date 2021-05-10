import { DefaultCommonModule } from '../../default.common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../default.material.module';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../admin.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClient } from '@angular/common/http';
import { ServicesRouting } from './services.routing';
import { ServicesLayoutComponent } from './components/layout/layout.component';
import { ServicesHeaderComponent } from './components/header/header.component';
import { LayoutsSandbox } from '../../../../core/admin/catalog/layout/layout.sandbox';
import { EffectsModule } from '@ngrx/effects';
import { ServicesCategoriesEffect } from '../../../../core/admin/services/serivcesCategory/effect/servicesCategory.effect';
import { ServicesCategoriesService } from '../../../../core/admin/services/serivcesCategory/servicesCategory.service';
import { ServicesEffect } from '../../../../core/admin/services/service/effect/services.effect';
import { ServicesService } from '../../../../core/admin/services/service/service.Service';
import { ServicesCategoriesSandbox } from '../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';
import { ServiceEnquiryEffects } from '../../../../core/admin/services/service-enquiry/effects/service-enquiry.effects';
import { EnquirySandbox } from '../../../../core/admin/services/service-enquiry/service-enquiry.sandbox';
import { EnquiryService } from '../../../../core/admin/services/service-enquiry/service-enquiry.service';
import { ServicesSandbox } from '../../../../core/admin/services/service/service.Sandbox';
import { ComponentsModule } from '../shared/components';

@NgModule({
  declarations: [ServicesLayoutComponent, ServicesHeaderComponent],
  imports: [
    CommonModule,
    DefaultCommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
    ServicesRouting,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    CKEditorModule,
    EffectsModule.forFeature([
      ServicesCategoriesEffect,
      ServicesEffect,
      ServiceEnquiryEffects
    ])
  ],
  providers: [
    LayoutsSandbox,
    ServicesCategoriesService,
    ServicesCategoriesSandbox,
    EnquirySandbox,
    EnquiryService,
    ServicesSandbox,
    ServicesService
  ],
  entryComponents: []
})
export class ServicesModule {}
