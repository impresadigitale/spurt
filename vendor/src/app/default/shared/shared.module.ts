import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'ngx-swiper-wrapper';

// components
import { CommonHeaderComponent } from '../../default/shared/components/common-header/common-header.component';
import { FooterComponent } from '../../default/shared/components/footer/footer.component';
import { SidebarComponent } from '../../default/shared/components/sidebar/sidebar.component';
import { BreadcrumbsComponent } from '../../default/shared/components/breadcrumbs/breadcrumbs.component';
import { ImagemanagerpopupComponent } from './popup/ImageManagerPopup/imagemanagerpopup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ProductSuccessComponent } from './popup/product-success/product-success.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NodataComponent } from './components/nodata/nodata.component';
import { NumberAcceptModule } from './validation-directives/onlyNumber.module';
import { AppMaterial } from '../../app.material.module';
import { PagerComponent } from './components/pager/pager.component';
import { AddCouponComponent } from './popup/add-coupon/add-coupon.component';
import { AddDeliveryComponent } from './popup/add-delivery/add-delivery.component';
import { PipeModule } from './pipe/pipe.module';
import { UpcommingComponent } from './components/upcomming-page/upcomming-page.component';
import { DeletePopupComponent } from './popup/delete-popup/delete-popup.component';
import { CurrencyPipeModule } from './pipe/currency.module';
import { ConfirmationDialogComponent } from './popup/Confirmation-dialog/confirmation-dialog.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SwiperModule,
        NgbModule,
        FormsModule,
        NumberAcceptModule,
        AppMaterial,
        PipeModule, CurrencyPipeModule
    ],
    exports: [
        CommonModule,
        RouterModule,
        SwiperModule,
        NumberAcceptModule,
        CommonHeaderComponent,
        FooterComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ProductSuccessComponent,
        LoaderComponent,
        NodataComponent,
        AppMaterial,
        PipeModule, CurrencyPipeModule,
        PagerComponent, UpcommingComponent
    ],
    declarations: [
        CommonHeaderComponent,
        FooterComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ImagemanagerpopupComponent,
        ProductSuccessComponent,
        LoaderComponent,
        NodataComponent,
        PagerComponent, ConfirmationDialogComponent,
        AddCouponComponent, AddDeliveryComponent, UpcommingComponent, DeletePopupComponent
    ],
    entryComponents: [ImagemanagerpopupComponent, ProductSuccessComponent, AddCouponComponent, AddDeliveryComponent, DeletePopupComponent, ConfirmationDialogComponent],
    providers: [],
})
export class SharedModule {
}
