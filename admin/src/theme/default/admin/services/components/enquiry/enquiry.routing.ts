import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EnquiryListComponent} from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const enquiryRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: EnquiryListComponent, canActivate: [AuthGuard],
    data: { permission: 'list-service-enquiry' }},

];

@NgModule({
    imports: [
        RouterModule.forChild(enquiryRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class EnquiryRouting {
}
