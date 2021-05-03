/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// Routing Module
import { Router } from '@angular/router';
// Store Module
import { CouponSandbox } from '../../../../../../../core/admin/catalog/coupon/coupon.sandbox';
import { CouponService } from '../../../../../../../core/admin/catalog/coupon/coupon.service';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spurt-catalog-coupon-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CouponListComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;


  public couponImage: any = [];
  public page: number;
  private offset = 0;
  public pageSize = '20';
  private keyword = '';
  public index: number;
  private currentPage: number;
  private sortOrder: number;
  private edit: any;
  public buttonCheck = true;
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];


  constructor(
    private couponService: CouponService,
    public couponSandbox: CouponSandbox,
    public layoutSandbox: LayoutsSandbox,
    private route: Router
  ) {}

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.couponList();
    this.index = 0;
    this.couponPagination();
  }

  couponList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.sortOrder = this.sortOrder;
    this.couponSandbox.couponList(param);
  }

  couponPagination() {
    const param: any = {};
    param.limit = '';
    param.offset = '';
    param.keyword = this.keyword;
    param.sortOrder = this.sortOrder;
    param.count = 1;
    this.couponSandbox.couponListCount(param);
  }

  editCoupon(data) {
    this.edit = data;
    this.route.navigate(['/catalog/coupon/edit/' + this.edit.vendorCouponId]);
  }

  addCoupon() {
    this.edit = ' ';
    this.couponService.setEditcoupon(this.edit);
    this.route.navigate(['/catalog/coupon/add']);
  }

  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.couponList();
  }

  deleteCoupon(id) {
    const params: any = {};
    params.couponId = id;
    this.couponSandbox.couponDelete(params);
    this.subscriptions.push(this.couponSandbox.getCouponDelete$.subscribe(_delete => {
      if (_delete) {
        if (_delete.user.status === 1) {
          this.couponList();
          this.couponPagination();
        }
      }
    }));
  }

  // receive param from filter component .And calls couponPagination event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.offset = 0;
    this.paginator.firstPage();
    this.couponList();
    this.couponPagination();
  }

  couponImageLoading(id) {
    this.couponImage[id] = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
