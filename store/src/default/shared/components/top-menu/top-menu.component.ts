/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../core/service/config.service';
import { CommonSandbox } from '../../../../core/common/common.sandbox';
import { TranslateService } from '@ngx-translate/core';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductCompareSandbox } from '../../../../core/product-compare/product-compare.sandbox';
import { Subscription } from 'rxjs';
import { CartSandbox } from '../../../../core/cart/cart.sandbox';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {

  public imagePath: any;
  public accountMenuTrigger: any;
  public language: any;
  public index = 0;
  public languageList = [];
  private subscriptions: Array<Subscription> = [];
  public currentUser = JSON.parse(localStorage.getItem('storeUser'));

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public configService: ConfigService,
    public router: Router,
    public listSandbox: ListsSandbox,
    public compareSandbox: ProductCompareSandbox,
    public commonSandbox: CommonSandbox,
    public productControl: ProductControlSandbox,
    private translate: TranslateService,
    public snackBar: MatSnackBar, public cartSandbox: CartSandbox
  ) {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.count = true;
    if (this.currentUser) {
      this.cartSandbox.GetCartListList({});
      this.cartSandbox.getCartCounts(params);
      this.cartSandbox.cartList$.subscribe(data => {
        if (data) {
          this.productControl.clearCart();
         data.forEach(datas => {
          const param: any = {};
          param.totalOptions = datas._totalOptions;
          param._optionValueArray = datas._optionValueArray;
          this.productControl.addItemsToCartFromDatabase(datas, param);
         });
        }
      });
    }
  }

  /**calls commonSandbox doGetProfile with default param
   * after calls commonSandbox getWishlistCounts.
   *
   * */
  ngOnInit() {
    this.getLanguageList();
    this.subscribeLanguageList();
    this.imagePath = environment.imageUrl;
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('storeUserToken')) {
        this.commonSandbox.doGetProfile();
        const params: any = {};
        params.limit = '';
        params.offset = 0;
        params.count = true;
        this.commonSandbox.getWishlistCounts(params);
      }
      if (localStorage.getItem('compareId')) {
        this.compareSandbox.addCompareCount(
          JSON.parse(localStorage.getItem('compareId'))
        );
      }
    }
  }

  /**first clear the local storage data.
   * calls commonSandbox doSignout,
   * Then navigate to authentication module
   * */
  signOut() {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.removeItem('storeUser');
    localStorage.removeItem('storeUserToken');
    localStorage.removeItem('compareId');
    sessionStorage.clear();
    }
    this.compareSandbox.clearCompare([]);
    this.commonSandbox.doSignout();
    this.productControl.clearCart();
    this.router.navigate(['/auth']);
  }

  // change the  language based on selection
  public changeLanguage(data, indexValue) {
    this.index = indexValue;
    if (isPlatformBrowser(this.platformId)) {
      this.language = localStorage.getItem('language');
      this.language = data;
      if (this.language === 'Hindi') {
        localStorage.setItem('language', 'Hindi');
        this.translate.setDefaultLang('hi');
      } else if (this.language === 'English') {
        localStorage.setItem('language', 'english');
        this.translate.setDefaultLang('en');
      } else if (this.language === 'French') {
        localStorage.setItem('language', 'french');
        this.translate.setDefaultLang('fr');
      }
    }
  }

  /**calls commonSandbox getLanguageList with default param
   * after calls commonSandbox getLanguageList.
   *
   * */
  getLanguageList() {
    const params: any = {};
    params.limit = '';
    params.offset = 0;
    params.keyword = '';
    params.count = '';
    this.commonSandbox.getLanguageList(params);
    this.listSandbox.getSettings();
  }

  /**calls listSandbox subscribeLanguageList with default data
   * subscribed data
   *
   * */
  subscribeLanguageList() {
    this.subscriptions.push(
      this.listSandbox.settingDetail$.subscribe(datas => {
        if (datas) {
          this.language = datas.storeLanguageName;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('language', this.language);
          }
          this.languageList.forEach((item, index) => {
            if (item.name === this.language) {
              this.changeLanguage(this.language, index);
            }
          });
        }
      })
    );
    this.subscriptions.push(
      this.commonSandbox.getLanguageList$.subscribe(data => {
        if (data) {
          data.forEach((item, index) => {
            this.languageList.push({
              name: item.name,
              image: item.image,
              imagePath: item.imagePath
            });
            if (item.name === this.language) {
              this.changeLanguage(this.language, index);
            }
          });
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => {
      each.unsubscribe();
    });
  }
}
