/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input } from '@angular/core';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-spurt-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})

export class HeaderMenuComponent implements OnInit {


  public category = { name: 'Select Category' };
  @Input() categories: any;
  public searchValue: any = '';
  public imageUrl: any;


  constructor(
    public sidenavMenuService: SidenavMenuService,
    public router: Router,
    public formBuilder: FormBuilder,
    public listSandbox: ListsSandbox,

  ) {}

  ngOnInit() {
    this.imageUrl = environment.imageUrl;
    this.listSandbox.getSettings();
  }

  // seacrh the data in the product list
  public search() {
    this.router.navigate(['/products'], {
      queryParams: { keyword: this.searchValue }
    });
  }

  // send the search value to product through navigation.If no value send 1 as default value.
  public searchData(value) {
    this.searchValue = value;
    if (!value) {
      this.router.navigate(['/products'], {
        queryParams: { keyword: this.searchValue }
      });
    } else {
      this.router.navigate(['/products'], {
        queryParams: { keyword: this.searchValue }
      });
    }
  }

  // select the product from product list
  public changeCategory(event) {
    if (event) {
      this.router.navigate(['/products/', event]);
    }
    if (window.innerWidth < 960) {
      this.stopClickPropagate(event);
    }
  }

  // style purpose
  public stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  // style purpose
  public closeSubMenus() {
    if (window.innerWidth < 960) {
      this.sidenavMenuService.closeAllSubMenus();
    }
  }
}