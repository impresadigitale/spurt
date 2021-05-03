/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit } from '@angular/core';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';

@Component({
  selector: 'app-spurt-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  public sidenavMenuItems: Array<any>;
  public sidenav: any;

  constructor(public sidenavMenuService: SidenavMenuService) {}

  ngOnInit() {
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
  }
}
