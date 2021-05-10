import { Component, OnInit, AfterViewInit } from '@angular/core';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import { PaymentSandbox } from '../../../../../core/payment/payment.sandbox';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit, AfterViewInit {


    public sideMenuOpen = true;
    public val = true;
    public config: SwiperConfigInterface = {};

    constructor(public paymentSandbox: PaymentSandbox) { }

    ngOnInit() {
        this.getPaymentCount();
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

    closeSideMenu() {
        this.val = !this.val;
        this.sideMenuOpen = this.val;
    }

    getPaymentCount() {
        const params: any = {};
        this.paymentSandbox.getPaymentListCount(params);
    }

}
