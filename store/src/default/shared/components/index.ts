import { RicercaComponent } from './ricerca/ricerca.component';

/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

// components
import {MainCarouselComponent} from './main-carousel/main-carousel.component';
import {BrandsCarouselComponent} from './brands-carousel/brands-carousel.component';
import {CategoryListComponent} from './category-list/category-list.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {FooterComponent} from './footer/footer.component';
import {OptionsComponent} from './options/options.component';
import {SidenavMenuComponent} from './sidenav-menu/sidenav-menu.component';
import {MenuComponent} from './menu/menu.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {HeaderComponent} from './header/header.component';
import {HeaderMenuComponent} from './header-menu/header-menu.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {ControlsComponent} from './controls/controls.component';
import {ProductsCarouselComponent} from './products-carousel/products-carousel.component';
import {ProductDialogComponent} from './products-carousel/product-dialog/product-dialog.component';
import {CartNavComponent} from './cart/cart.component';
import {RelatedProductsComponent} from './related-products/related-products.component';
import {WidgetProductsComponent} from './widget-products/widget-products.component';
import { SpecificationControlsComponent } from './specification-controls/specification-controls.component';

// modules
import {PipesModule} from '../pipes/pipes.module';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {SharedModule} from '../shared.module';

// store
import {EffectsModule} from '@ngrx/effects';
import {ProductControlEffect} from '../../../core/product-control/effects/product-control.effect';
import {CommonEffect} from '../../../core/common/effects/common.effect';
import {ProductControlService} from '../../../core/product-control/product-control.service';
import {ProductControlSandbox} from '../../../core/product-control/product-control.sandbox';
import {CommonSandbox} from '../../../core/common/common.sandbox';
import {CommonService} from '../../../core/common/common.service';
import {TranslateModule} from '@ngx-translate/core';
import {GetDirectionsComponent} from '../get-directions/get-directions.component';
import {AgmCoreModule} from '@agm/core';
import {ProductCompareComponent} from './product-compare/product-compare.component';
import {CompareCountComponent} from './compare-count/compare-count.component';
import {RatingComponent} from './rating/rating.component';
import {CartPopupComponent} from './cart/modal/cart-popup/cart-popup.component';

// product details all controls
import {ControlsQuestionsComponent} from './controls-questions/controls-questions.component';
import {ControlsProductDetailComponent} from './controls-product-detail/controls-product-detail.component';
import {ReviewControlsComponent} from './review-controls/review-controls.component';
import {ControlsOptionsComponent} from './controls-options/controls-options.component';
import {ControlsVariantComponent} from './controls-variant/controls-variant.component';
import { WhyComponent } from './why/why.component';
import { CarParkComponent } from './car-park/car-park.component';



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    wheelPropagation: true,
    suppressScrollX: true
};

export const COMPONENTS = [
    MainCarouselComponent,
    CarParkComponent,
    RicercaComponent,
    WhyComponent,
    BrandsCarouselComponent,
    CategoryListComponent,
    BreadcrumbComponent,
    TopMenuComponent,
    MenuComponent,
    SidenavMenuComponent,
    OptionsComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    SideBarComponent,
    ControlsComponent,
    ProductsCarouselComponent,
    ProductDialogComponent,
    ControlsProductDetailComponent,
    GetDirectionsComponent,
    CartNavComponent,
    ProductCompareComponent,
    CompareCountComponent,
    RatingComponent,
    CartPopupComponent,
    ControlsQuestionsComponent,
    ReviewControlsComponent,
    ControlsOptionsComponent,
    RelatedProductsComponent,
    WidgetProductsComponent,
    ControlsVariantComponent,
    SpecificationControlsComponent
];

@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PipesModule,
        PerfectScrollbarModule,
        SharedModule,
        EffectsModule.forFeature([ProductControlEffect, CommonEffect]),
        TranslateModule.forChild(),
        AgmCoreModule,
    ],
    declarations: [COMPONENTS],

    exports: [COMPONENTS,
        PipesModule],
    entryComponents: [
        ProductDialogComponent,
        CartPopupComponent
    ],
    providers: [
        {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
        ProductControlService, ProductControlSandbox, CommonSandbox, CommonService
    ]
})
export class ComponentsModule {
}
