
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

// components
import {SettingsComponent} from './layout/settings.component';
import {BusinessDetailsComponent} from './components/business-details/business-details.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';
import {ManageDeliveryComponent} from './components/manage-delivery/manage-delivery.component';
import { CommonSandbox } from '../../../../core/common/common.sandbox';
import { CommonService } from '../../../../core/common/common.service';
import { EffectsModule } from '@ngrx/effects';
import { AuthSandbox } from '../../../../core/auth/auth.sandbox';
import { AuthApiService } from '../../../../core/auth/auth.service';
import { ConfigService } from '../../../../core/services/config.service';
import { DataComponent } from './components/data/data.component';
import { AuditLogComponent } from './components/audit-log/audit-log.component';
import { DeliverySandbox } from '../../../../core/delivery/delivery.sandbox';
import { DeliveryService } from '../../../../core/delivery/delivery.service';
import { DeliveryEffect } from '../../../../core/delivery/delivery-effects/delivery.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentUpdateComponent } from './components/documents/document-update.component';
import { LocationComponent } from './components/manage-delivery/location/location.component';
import { PersonComponent } from './components/manage-delivery/person/person.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { CouponTrackingComponent } from './components/coupon-tracking/coupon-tracking.component';
import {CouponComponent} from './components/coupon/coupon.component';
import { SettingsSandbox } from '../../../../core/settings/settings.sandbox';
import { SettingsService } from '../../../../core/settings/settings.service';
import { SettingsEffect } from '../../../../core/settings/effects/settings.effect';

export const routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'list',
                component: BusinessDetailsComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Business Details'}]
                  }
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Change Password'}]
                }
            },
            {
                path: '',
                component: ManageDeliveryComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Delivery'}]
                }, children: [
                    {
                        path: '',
                        redirectTo: 'delivery-location',
                        pathMatch: 'full'
                    },
                    {path: 'delivery-person', component: PersonComponent},
                    {path: 'delivery-location', component: LocationComponent},
                ]
            },
            {
                path: 'data',
                component: DataComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Data Export'}]
                }
            },
            {
                path: 'audit-log',
                component: AuditLogComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Audit Log'}]
                }
            },
            {
                path: 'coupon',
                component: CouponComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Coupon'}]
                }
            },
            {
                path: 'add-coupon',
                component: AddCouponComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Add Coupon'}]
                }
            },
            {
                path: 'add-coupon/:id',
                component: AddCouponComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Add Coupon'}]
                }
            },
            {
                path: 'coupon-tracking',
                component: CouponTrackingComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Coupon Tracking'}]
                }
            },
            {
                path: 'coupon-tracking/:id',
                component: CouponTrackingComponent,
                data: {
                    title: 'Settings',
                    urls: [{ title: 'Home'}, {title: 'Settings'}, {title: 'Coupon Tracking'}]
                }
            },

        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        SharedModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        EffectsModule.forFeature([DeliveryEffect, SettingsEffect])
    ],
    declarations: [
        SettingsComponent,
        BusinessDetailsComponent,
        ChangePasswordComponent,
        ManageDeliveryComponent,
        CouponComponent,
        DocumentUpdateComponent,
        DataComponent, AuditLogComponent, LocationComponent, PersonComponent,
        CouponComponent,
        AddCouponComponent,
        CouponTrackingComponent
    ],
    providers: [CommonSandbox, CommonService, AuthSandbox, AuthApiService,
         ConfigService, DeliverySandbox, DeliveryService, SettingsSandbox, SettingsService]

})
export class SettingsModule {
}
