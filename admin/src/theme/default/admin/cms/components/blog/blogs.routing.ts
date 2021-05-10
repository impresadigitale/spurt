/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {
    RouterModule,
    Routes
} from '@angular/router';

// Component
import { BlogListComponent } from './list/list.component';
import { BlogAddComponent } from './add/add.component';

const blogsRoutes: Routes = [
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'list', component: BlogListComponent},
    {path: 'add', component: BlogAddComponent},
    {
        path: 'edit/:id',
        component: BlogAddComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(blogsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BlogsRoutingModule {
}
