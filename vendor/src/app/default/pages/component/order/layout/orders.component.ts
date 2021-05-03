import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { OrderSandbox } from '../../../../../core/order/order.sandbox';

@Component({
  selector: 'app-order-layout',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, AfterViewInit {

  public config: SwiperConfigInterface = {};
  public sideMenuOpen = true;
  public val = true;

  constructor(public orderSandbox: OrderSandbox) { }

  ngOnInit() {
      this.getOrderCount();
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
        this.sideMenuOpen = !this.sideMenuOpen;
    }

    openOrder() {
        this.sideMenuOpen = false;
    }

    getOrderCount() {
        const params: any = {};
        this.orderSandbox.getOrderCount(params);
    }
}
