/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
// module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { ComponentsModule } from '../../shared/components/index';
import { TranslateModule } from '@ngx-translate/core';
// component
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ShareButtonModule } from '@ngx-share/button';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { NumberAcceptModule } from '../..//shared/validation-directives/onlyNumber.module';
import { ProductQuestionComponent } from './product-question/product-question.component';
import { AnswerListComponent } from './modal/answer-list/answer-list.component';
import { PostAnswerComponent } from './modal/post-answer/post-answer.component';
import { ReportAbuseComponent } from './modal/report-abuse/report-abuse.component';
import { PostQuestionComponent } from './modal/post-question/post-question.component';
import { MakeQuatationComponent } from './modal/make-quatation/make-quatation.component';

export const routes = [
  {
    path: '',
    component: ProductsComponent,
    pathMatch: 'full',
    data: {
      urls: [{ title: 'All Products'}]
    }
  },
  {
    path: 'products',
    component: ProductsComponent,
    pathMatch: 'full',
    data: {
      urls: [{ title: 'All Products'}]
    }
  },
  {
    path: 'productdetails/:id',
    component: ProductComponent,
    pathMatch: 'full',
    data: {
      urls: [
        { title: 'Products', url: '/products' },
        { title: 'Product detail', url: '' }
      ]
    }
  },
  {
    path: 'product-questions',
    component: ProductQuestionComponent,
    pathMatch: 'full',
    data: {
      urls: [{ title: 'Product Details'}]
    }
  },
  {
    path: 'product-questions/:id',
    component: ProductQuestionComponent,
    pathMatch: 'full',
    data: {
      urls: [{ title: 'Product Details'}]
    }
  },
];
const icons = [
  faFacebookSquare,
  faTwitter
];

library.add(...icons);

const shareProp = {
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    ComponentsModule,
    PipesModule,
    TranslateModule.forChild(),
    JwSocialButtonsModule,
    ShareButtonModule.withConfig({ prop: shareProp }),
    HttpClientModule,
    HttpClientJsonpModule,
    NumberAcceptModule,
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductZoomComponent,
    ProductFilterComponent,
    ProductQuestionComponent,
    AnswerListComponent,
    PostAnswerComponent,
    ReportAbuseComponent,
    PostQuestionComponent,
    MakeQuatationComponent
  ],
  entryComponents: [ProductZoomComponent, AnswerListComponent, PostAnswerComponent, ReportAbuseComponent,
    PostQuestionComponent,
    MakeQuatationComponent],
  providers: []
})
export class ProductsModule {}
