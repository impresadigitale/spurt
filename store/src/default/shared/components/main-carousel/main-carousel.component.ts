/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input, NgModule } from '@angular/core';
import {
  SwiperConfigInterface,
  SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { ConfigService } from '../../../../core/service/config.service';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { RicercaComponent } from '../ricerca/ricerca.component';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})

export class MainCarouselComponent implements OnInit, AfterViewInit {


  public config: SwiperConfigInterface = {};
  public imagePath: string;
  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(
    private configService: ConfigService,
    private router: Router,
    public listSandbox: ListsSandbox
  ) {}

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
  }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 'auto',
      pagination: this.pagination,
      autoplay: true,
      observer: true,
      navigation: true,
      grabCursor: true,
      lazy: {
        loadPrevNext: true
      },
      speed: 700,
      effect: 'slide'
    };
  }

  public allProducts() {
    this.router.navigate(['/products/', 'All']);
  }
}
