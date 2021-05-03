import {ServicesCategoryAddComponent} from './add/add.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ServicesCategoriesListComponent} from './list/list.component';
import { AuthGuard } from '../../../../../../core/admin/providers/auth.guard';
const servicesCategoryRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'add', component: ServicesCategoryAddComponent, canActivate: [AuthGuard],
    data: { permission: 'create-service-categpry' }},
    {path: 'list', component: ServicesCategoriesListComponent},
    {
        path: 'edit/:id',
        component: ServicesCategoryAddComponent, canActivate: [AuthGuard],
        data: { permission: 'edit-service-categpry' }
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(servicesCategoryRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ServicesCategoryRouting {
}
