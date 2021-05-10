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
import { CategoriesSandbox } from '../../../../../../../core/admin/catalog/category/categories.sandbox';
import { CategoriesService } from '../../../../../../../core/admin/catalog/category/categories.service';
import { LayoutsSandbox } from '../../../../../../../core/admin/catalog/layout/layout.sandbox';
import { environment } from '../../../../../../../environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spurt-catalog-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class CategoriesListComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator: MatPaginator;

  public categoryImage: any = [];
  public page: number;
  private offset = 0;
  public pageSize = '10';
  private keyword = '';
  public index: number;
  private currentPage: number;
  private sortOrder: number;
  private edit: any;
  public buttonCheck = true;
  public imageUrl: string;
  private subscriptions: Array<Subscription> = [];


  constructor(
    private categoryService: CategoriesService,
    public categorySandbox: CategoriesSandbox,
    public layoutSandbox: LayoutsSandbox,
    private route: Router
  ) {}

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.pageSize = localStorage.getItem('itemsPerPage')
      ? localStorage.getItem('itemsPerPage')
      : this.pageSize;
    this.categoryList();
    this.index = 0;
    this.getCategoryListCount();
    this.layoutSandbox.getCatalogCount();

  }

  /**
   * Handles  'categorylist' event. Calls sandbox categorylist function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  categoryList() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.sortOrder = this.sortOrder;
    this.categorySandbox.categoryList(param);
  }

  /**
   * Handles  'categorycountdata' event. Calls categorySandbox categorycountdata function .
   *
   * @param pageSize form pagination
   *  @param offset form offset
   */
  getCategoryListCount() {
    const param: any = {};
    param.limit = this.pageSize;
    param.offset = this.offset;
    param.keyword = this.keyword;
    param.count = 1;
    this.categorySandbox.getCategoryListCount(param);
  }

  /**
   * Handles  'editCategory' event. Calls categoryService setEditcategories function .
   *  @param data  form value
   */

  editCategory(data) {
    this.edit = data;
    this.route.navigate(['/catalog/categories/edit', data.categoryId]);
  }

  /**
   * Handles  'addCategories' event. Calls categoryService setEditcategories function .
   *  @param edit  with empty value
   */
  addCategories() {
    this.route.navigate(['/catalog/categories/add']);
  }

  // shows the filter component
  changeFilter(event) {
    this.buttonCheck = event.target.checked;
  }

  /**
   * Handles  'onPageChange' event. Calls categorylist function .
   *  @param event  from material paginator value
   */

  onPageChange(event: any) {
    this.currentPage = event.offset;
    this.pageSize = event.pageSize;
    this.index = event.pageIndex;
    this.offset = event.pageSize * event.pageIndex;
    this.categoryList();
  }

  /**
   * Handles  'deleteCategory' event. Calls categorySandbox categorydelete function,
   * (Calls  categorylist function if (_delete)).
   *  @param id  from material paginator value.
   */

  deleteCategory(id) {
    const params: any = {};
    params.categoryId = id;
    this.categorySandbox.deleteCategory(params);
    this.subscriptions.push(this.categorySandbox.getCategoriesDelete$.subscribe(_delete => {
      if (_delete) {
        if (_delete.user.status === 1) {
          this.categoryList();
          this.getCategoryListCount();
          this.layoutSandbox.getCatalogCount();

        }
      }
    }));
  }

  // receive param from filter component .And calls categoriesPagination event
  receiveProgress(event) {
    this.index = 0;
    this.keyword = event.keyword;
    this.sortOrder = event.sortOrder;
    this.offset = 0;
    this.paginator.firstPage();
    this.categoryList();
    this.getCategoryListCount();
  }

  categoryImageLoading(id) {
    this.categoryImage[id] = true;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
