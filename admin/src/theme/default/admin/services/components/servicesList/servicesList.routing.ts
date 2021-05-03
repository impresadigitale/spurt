import {ServicesListAddComponent} from './add/add.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServicesListComponent} from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const servicesListRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'add', component: ServicesListAddComponent, canActivate: [AuthGuard],
    data: { permission: 'create-service' }},
    {path: 'list', component: ServicesListComponent},
    {
        path: 'edit/:id',
        component: ServicesListAddComponent, canActivate: [AuthGuard],
        data: { permission: 'edit-service' }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(servicesListRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ServicesListRouting {
}
