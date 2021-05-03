import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {DefaultCommonModule} from '../../../../default.common.module';
import {MaterialModule} from '../../../../default.material.module';
import {EnquiryListComponent} from './list/list.component';
import {EnquiryFilterComponent} from './filter/filter.component';
import {EnquiryRouting} from './enquiry.routing';
import { EnquirySandbox } from '../../../../../../core/admin/services/service-enquiry/service-enquiry.sandbox';
import { EnquiryService } from '../../../../../../core/admin/services/service-enquiry/service-enquiry.service';
import { EffectsModule } from '@ngrx/effects';
import { ServiceEnquiryEffects } from '../../../../../../core/admin/services/service-enquiry/effects/service-enquiry.effects';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../shared/components';

@NgModule({
    declarations: [
        EnquiryListComponent,
        EnquiryFilterComponent,

    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateModule,
        ComponentsModule,
        EffectsModule.forFeature([ServiceEnquiryEffects]),
        EnquiryRouting
    ],
    providers: [EnquirySandbox, EnquiryService],
    entryComponents: [],
})
export class EnquiryModule {
}
