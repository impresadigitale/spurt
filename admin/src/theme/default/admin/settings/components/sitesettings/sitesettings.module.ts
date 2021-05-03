/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {SideSettingLayoutComponent} from './layout/layout.component';
import {RouterModule, Routes} from '@angular/router';

const Routers: Routes = [
    {path: '', redirectTo: 'appearence', pathMatch: 'full'},
    {
        path: '',
        component: SideSettingLayoutComponent,
        children: [
            {
                path: 'seo',
                loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule)
            },
            {
                path: 'social',
                loadChildren: () => import('./social/social.module').then(m => m.SocialModule)
            },
            {
                path: 'filter',
                loadChildren: () => import('./filter/filter.module').then(m => m.FilterModule)
            },
            {
                path: 'size-chart-template',
                loadChildren: () => import('./size-chart/size-chart.module').then(m => m.SizeChartModule)
            },
            {
                path: '',
                redirectTo: 'seo',
                pathMatch: 'full'
            },
            {
                path: 'attributes',
                loadChildren: () => import('./attributes/attributes.module').then(m => m.AttributesModule)
            },
            {
                path: 'attributes-group',
                loadChildren: () => import('./attributes-group/attributes-group.module').then(m => m.AttributesGroupModule)
            },
            {
                path: 'variants',
                loadChildren: () => import('./variants/variants.module').then(m => m.VariantsModule)
            },
        ]
    }


];
@NgModule({
    declarations: [SideSettingLayoutComponent],
    imports: [
        RouterModule.forChild(Routers)
    ],
    providers: [],
    exports: [RouterModule]
})
export class SiteSettingsModule {

}
