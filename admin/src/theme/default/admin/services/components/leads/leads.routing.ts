import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeadsListComponent} from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';

const leadsRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: LeadsListComponent, canActivate: [AuthGuard],
    data: { permission: 'list-service-lead' }},

];

@NgModule({
    imports: [
        RouterModule.forChild(leadsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LeadsRouting {
}
