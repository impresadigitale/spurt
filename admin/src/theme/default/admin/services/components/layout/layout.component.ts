/*
 * SpurtCommerce
 * version 2.2
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
    Component,
    ChangeDetectionStrategy, OnInit
} from '@angular/core';
import { ServicesSandbox } from '../../../../../../core/admin/services/service/service.Sandbox';
import { ServicesCategoriesSandbox } from '../../../../../../core/admin/services/serivcesCategory/servicesCategory.sandbox';
import { EnquirySandbox } from '../../../../../../core/admin/services/service-enquiry/service-enquiry.sandbox';

@Component({
    selector: 'app-servies-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesLayoutComponent implements OnInit {

    constructor(public serviceListSandbox: ServicesSandbox,
        public servieCategorySandbox: ServicesCategoriesSandbox,
        public serviceEnquirySandbox: EnquirySandbox) {
    }

    /**
     * Handles form 'ngOnInit' event. calls layoutSandbox(getProductListCount,getActiveProductListCount
     *getInActiveProductListCount,getCatagoryListCount,getFeaturedProductListCount).
     *
     * @param count default value.
     * @param status default value.
     */
    ngOnInit() {
        this.serviceListSandbox.servicesListCount({count: true});
        this.serviceListSandbox.getServiceCount();
    }

}
