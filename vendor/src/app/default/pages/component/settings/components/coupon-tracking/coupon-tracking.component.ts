import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { SettingsSandbox } from '../../../../../../core/settings/settings.sandbox';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-coupon-tracking',
  templateUrl: './coupon-tracking.component.html',
  styleUrls: ['./coupon-tracking.component.scss']
})
export class CouponTrackingComponent implements OnInit, AfterViewInit {

    public couponId: any;
    public couponList: any;

    public config: SwiperConfigInterface = {};
    constructor(public sandbox: SettingsSandbox,
                public route: ActivatedRoute) {
                    this.route.params.subscribe(data => {
                        this.couponList = data;
                      this.couponId = data.vendorCouponId;
                    });
                 }

    ngOnInit() {
        this.getCouponUsageList();
    }

    ngAfterViewInit() {
        this.config = {
            observer: true,
            slidesPerView: 6,
            spaceBetween: 16,
            keyboard: true,
            navigation: true,
            pagination: false,
            grabCursor: true,
            loop: true,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            breakpoints: {
                480: {
                    slidesPerView: 1
                },
                740: {
                    slidesPerView: 2,
                },
                960: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
                1500: {
                    slidesPerView: 5,
                }
            }
        };
    }

    getCouponUsageList() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = '';
        params.couponId = this.couponId;
        this.sandbox.getCouponUsageList(params);
    }

}
