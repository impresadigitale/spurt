
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// components
import { PaymentsComponent } from './layout/payments.component';
import { PaymentComponent } from './components/payments/payments.component';
import { EarningsComponent } from './components/earnings/earnings.component';
import { SharedModule } from '../../../shared/shared.module';
import { PaymentSandbox } from '../../../../core/payment/payment.sandbox';
import { PaymentService } from '../../../../core/payment/payment.service';
import { PaymentEffect } from '../../../../core/payment/payment-effects/payment.effects';
import { EffectsModule } from '@ngrx/effects';
import { ArchivePaymentsComponent } from './components/archive-payments/archive-payments.component';

export const routes = [
    {
        path: '',
        component: PaymentsComponent,
        children: [
            {
                path: 'list',
                component: PaymentComponent,
                data: {
                    title: 'Payments',
                    urls: [{ title: 'Home'}, {title: 'Payments'}, {title: 'Payments'}]
                  }
            },
            {
                path: 'earnings',
                component: EarningsComponent,
                data: {
                    title: 'Payments',
                    urls: [{ title: 'Home'}, {title: 'Payments'}, {title: 'Earnings'}]
                  }
            },
            {
                path: 'archive',
                component: ArchivePaymentsComponent,
                data: {
                    title: 'Payments',
                    urls: [{ title: 'Home'}, {title: 'Payments'}, {title: 'Archive'}]
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
        SharedModule,
        FormsModule,
        EffectsModule.forFeature([PaymentEffect]),
        NgbModule
    ],
    declarations: [
        PaymentsComponent,
        PaymentComponent,
        EarningsComponent,
        ArchivePaymentsComponent
    ],
    providers: [PaymentSandbox, PaymentService]

})
export class PaymentsModule {
}
