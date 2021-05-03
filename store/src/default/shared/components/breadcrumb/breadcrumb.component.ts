/*
 * spurtcommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  providers: [SidenavMenuService]
})


export class BreadcrumbComponent {


  @Input() layout;

  public pageInfo;
  public isProductDetail = false;
  public isProductPage = false;
  public isKeyword = false;
  public lastPath: any = '';
  public keyword: any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public title: Title,
    public sidenavMenuService: SidenavMenuService,
    public listSandbox: ListsSandbox
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          this.pageInfo = {};
          route.firstChild.url.subscribe(data => {
            if (data.length > 1) {
              this.lastPath = data[1].path;
            }
          });
          route.queryParams.subscribe(data => {
            if (data) {
              this.keyword = data.keyword;
            }
          });
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.isProductDetail = false;
        this.isProductPage = false;
        this.pageInfo = event;
        this.isCheck();
      });
  }

  isCheck() {
    if (this.pageInfo && Object.keys(this.pageInfo).length) {
      if (this.pageInfo.urls && this.pageInfo.urls) {
        this.pageInfo.urls.forEach(data => {

          if (data) {
            if (data.title === 'Product detail') {
                this.isProductDetail = true;
            } else {
              this.isProductDetail = false;
            }
            if (data.title === 'All Products' && this.lastPath != '') {
               this.isProductPage = true;
            } else {
              this.isProductPage = false;
            }
            if (data.title === 'All Products' && this.keyword) {
               this.isKeyword = true;
            } else {
              this.isKeyword = false;
            }
          }

        });
      }
    }
  }

  // close subMenus
  public closeSubMenus() {
    if (window.innerWidth < 960) {
      this.sidenavMenuService.closeAllSubMenus();
    }
  }

  isEmpty(data) {
    if (data && Object.keys(data).length) {
      return true;
    } else {
      return false;
    }
  }
}
