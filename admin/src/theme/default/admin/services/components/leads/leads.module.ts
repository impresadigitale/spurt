import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../../../../default.material.module';
import {DefaultCommonModule} from '../../../../default.common.module';
import {CommonModule} from '@angular/common';
import {LeadsFilterComponent} from './filter/filter.component';
import {LeadsListComponent} from './list/list.component';
import {LeadsRouting} from './leads.routing';
import { EnquirySandbox } from '../../../../../../core/admin/services/service-enquiry/service-enquiry.sandbox';
import { ServiceEnquiryEffects } from '../../../../../../core/admin/services/service-enquiry/effects/service-enquiry.effects';
import { EnquiryService } from '../../../../../../core/admin/services/service-enquiry/service-enquiry.service';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        LeadsFilterComponent,
        LeadsListComponent
    ],
    imports: [
        CommonModule,
        DefaultCommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        EffectsModule.forFeature([ServiceEnquiryEffects]),
        LeadsRouting

    ],
    providers: [EnquirySandbox, EnquiryService],
    entryComponents: [],
})
export class LeadsModule {
}
