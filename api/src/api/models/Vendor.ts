/*
 * spurtcommerce API
 * version 4.4
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity, BeforeInsert, BeforeUpdate, PrimaryGeneratedColumn, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { BaseModel } from './BaseModel';
import moment = require('moment/moment');
import { Customer } from './Customer';
import { VendorProducts } from './VendorProducts';
import { VendorOrders } from './VendorOrders';
import { VendorOrderLog } from './VendorOrderLog';
import { VendorOrderArchive } from './VendorOrderArchive';
import { VendorOrderArchiveLog } from './VendorOrderArchiveLog';
import { VendorPayment } from './VendorPayment';
import { VendorPaymentArchive } from './VendorPaymentArchive';
import { VendorCoupon } from './VendorCoupon';
import { IsNotEmpty } from 'class-validator';

@Entity('vendor')
export class Vendor extends BaseModel {
    @IsNotEmpty()
    @PrimaryGeneratedColumn({ name: 'vendor_id' })
    public vendorId: number;

    @Column({ name: 'vendor_prefix_id' })
    public vendorPrefixId: string;
    @IsNotEmpty()
    @Column({ name: 'customer_id' })
    public customerId: number;

    @Column({ name: 'commission' })
    public commission: number;

    @Column({ name: 'contact_person_name' })
    public contactPersonName: string;

    @Column({ name: 'vendor_slug_name' })
    public vendorSlugName: string;

    @Column({ name: 'designation' })
    public designation: string;

    @Column({ name: 'company_name' })
    public companyName: string;

    @Column({ name: 'company_address1' })
    public companyAddress1: string;

    @Column({ name: 'company_address2' })
    public companyAddress2: string;

    @Column({ name: 'company_city' })
    public companyCity: string;

    @Column({ name: 'company_state' })
    public companyState: string;

    @Column({ name: 'company_country_id' })
    public companyCountryId: number;

    @Column({ name: 'pincode' })
    public pincode: number;

    @Column({ name: 'company_description' })
    public companyDescription: string;

    @Column({ name: 'company_mobile_number' })
    public companyMobileNumber: number;

    @Column({ name: 'company_email_id' })
    public companyEmailId: string;

    @Column({ name: 'company_website' })
    public companyWebsite: string;

    @Column({ name: 'company_gst_number' })
    public companyGstNumber: string;

    @Column({ name: 'company_pan_number' })
    public companyPanNumber: string;

    @Column({ name: 'company_logo' })
    public companyLogo: string;

    @Column({ name: 'company_logo_path' })
    public companyLogoPath: string;

    @Column({ name: 'payment_information' })
    public paymentInformation: string;

    @Column({ name: 'approval_flag' })
    public approvalFlag: number;

    @Column({ name: 'approved_by' })
    public approvedBy: number;

    @Column({ name: 'approved_date' })
    public approvalDate: string;

    @Column({ name: 'company_cover_image' })
    public companyCoverImage: string;

    @Column({ name: 'company_cover_image_path' })
    public companyCoverImagePath: string;

    @OneToOne(type => Customer)
    @JoinColumn({ name: 'customer_id' })
    public customer: Customer;

    @OneToMany(type => VendorProducts, vendorproducts => vendorproducts.product)
    public vendorProducts: VendorProducts[];

    @OneToMany(type => VendorOrders, vendororders => vendororders.vendor)
    public vendororder: VendorOrders[];

    @OneToMany(type => VendorOrderLog, vendororderlog => vendororderlog.vendor)
    public vendororderlog: VendorOrderLog[];

    @OneToMany(type => VendorOrderArchive, vendorOrderArchive => vendorOrderArchive.vendor)
    public vendorOrderArchive: VendorOrderArchive[];

    @OneToMany(type => VendorOrderArchiveLog, vendorOrderArchiveLog => vendorOrderArchiveLog.vendor)
    public vendorOrderArchiveLog: VendorOrderArchiveLog[];

    @OneToMany(type => VendorPayment, vendorPayment => vendorPayment.vendor)
    public vendorPayment: VendorPayment[];

    @OneToMany(type => VendorPaymentArchive, vendorPaymentArchive => vendorPaymentArchive.vendor)
    public vendorPaymentArchive: VendorPaymentArchive[];

    @OneToMany(type => VendorCoupon, vendorCoupon => vendorCoupon.vendor)
    public vendorCoupon: VendorCoupon[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
