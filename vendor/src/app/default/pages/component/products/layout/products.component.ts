import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductSandbox } from '../../../../../core/product/product.sandbox';

@Component({
  selector: 'app-product-layout',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {
  public config: SwiperConfigInterface = {};
  public sideMenuOpen = true;
  public val = true;
  constructor(public productSandbox: ProductSandbox) { }

  ngOnInit() {
      this.getTotalProductCount();
      this.getActiveProductCount();
      this.getInactiveProductCount();
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

// get total product count event
getTotalProductCount() {
    const params: any = {};
    params.count = 1;
    this.productSandbox.getProductListCount(params);
}

// get active product count event
getActiveProductCount() {
    const params: any = {};
    params.count = 1;
    params.status = '1';
    this.productSandbox.getActiveProductListCount(params);
}

// get inactive product count event
getInactiveProductCount() {
    const params: any = {};
    params.count = 1;
    params.status = '0';
    this.productSandbox.getInActiveProductListCount(params);
}

}
