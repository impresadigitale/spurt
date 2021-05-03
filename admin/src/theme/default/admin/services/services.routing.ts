import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServicesLayoutComponent} from './components/layout/layout.component';

const servicesRoutes: Routes = [
    {path: '', redirectTo: 'servicesList', pathMatch: 'full'},
    {
        path: '',
        component: ServicesLayoutComponent,
        children: [
            {
                path: 'servicesList',
                loadChildren: () => import('./components/servicesList/servicesList.module').then(m => m.ServicesListModule)
            },
            {
                path: 'servicesCategory',
                loadChildren: () => import('./components/categories/serviceCategories.module').then(m => m.ServicesCategoryModule)
            },
            {
                path: 'enquiry',
                loadChildren: () => import('./components/enquiry/enquiry.module').then(m => m.EnquiryModule)
            },
            {
                path: 'leads',
                loadChildren: () => import('./components/leads/leads.module').then(m => m.LeadsModule)

            }
        ]

    }
];

@NgModule({
    imports: [
        RouterModule.forChild(servicesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ServicesRouting {
}
