import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SettingsSandbox } from '../../../../../../core/settings/settings.sandbox';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit, AfterViewInit, OnDestroy {

    public limit = 10;
    public offset = 0;
    public currentPage = 1;
    public currencySymbol: any = JSON.parse(localStorage.getItem('vendor-settings'));
    public config: SwiperConfigInterface = {};
    private subscriptions: Array<Subscription> = [];


    constructor(public sandbox: SettingsSandbox,
                public router: Router) { }

    ngOnInit() {
        this.clear();
        this.getCouponList();
        this.getCouponsListCount();
        this.subscribe();
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

    getCouponList() {
        const params: any = {};
        params.limit = this.limit;
        params.offset = this.offset;
        params.count = '';
        params.keyword = '';
        this.sandbox.getCouponList(params);
    }

    getCouponsListCount() {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = 1;
        params.keyword = '';
        this.sandbox.getCouponListCount(params);
    }

    goToTrackDetails(list) {
        event.stopPropagation();
        this.router.navigate(['/settings/coupon-tracking', list]);
    }

    search(event) {
        const params: any = {};
        params.limit = '';
        params.offset = '';
        params.count = '';
        params.keyword = event.target.value;
        this.sandbox.getCouponList(params);
    }

    deleteCoupon(id) {
        event.stopPropagation();
        const params: any = {};
        params.vendorCouponId = id;
        this.sandbox.deleteCoupon(params);
    }

    goToEdit(id) {
        event.stopPropagation();
        this.router.navigate(['/settings/add-coupon', id]);
    }

    subscribe() {
        this.subscriptions.push(this.sandbox.deleteCoupon$.subscribe(data => {
            if (data && data.status === 1) {
                this.getCouponList();
                this.getCouponsListCount();
            }
        }));
    }

    clear() {
        this.sandbox.clear();
    }

    pageChange(event) {
        this.currentPage = event;
        this.offset = this.limit * (event - 1);
        this.getCouponList();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(each => each.unsubscribe());
    }
}
