import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ServicesComponent } from './services.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceDetailComponent } from './service-detail/service-detail.component';
import { ServiceCategoryComponent } from './service-category/service-category.component';
import { EnquiryDialogComponent } from './enquiry-dialog/enquiry-dialog.component';
import { EnquirySuccessComponent } from './enquiry-success/enquiry-success.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export const routes = [
  {
    path: '',
    component: ServicesComponent,

    children: [
      {
        path: '',
        component: ServiceCategoryComponent,
        data: {
          urls: [{ title: 'Service Category', url: '/services' }]
        }
      },
      {
        path: 'list/:id',
        component: ServiceListComponent,
        data: {
          urls: [
            { title: 'Service Category', url: '/services' },
            { title: 'Services' }
          ]
        }
      },
      {
        path: 'detail/:id/:serviceId',
        component: ServiceDetailComponent,
        data: {
          urls: [
            { title: 'Service Category', url: '/services' },
            { title: 'Service Detail' }
          ]
        }
      }
    ]
  },
  {
    path: 'enquiry-success',
    component: EnquirySuccessComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    ServicesComponent,
    ServiceListComponent,
    ServiceDetailComponent,
    ServiceCategoryComponent,
    EnquirySuccessComponent,
    EnquiryDialogComponent
  ],
  providers: [
    {
      provide: MAT_DIALOG_DATA,
      useValue: {} // Add any data you wish to test if it is passed/used correctly
    }
  ],
  entryComponents: [EnquiryDialogComponent]
})
export class ServicesModule {}
