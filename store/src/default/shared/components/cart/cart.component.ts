/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input, PLATFORM_ID, Inject } from '@angular/core';
import { SidenavMenuService } from '../sidenav-menu/sidenav-menu.service';
import { ProductControlSandbox } from '../../../../core/product-control/product-control.sandbox';
import { ProductControlService } from '../../../../core/product-control/product-control.service';
import { ConfigService } from '../../../../core/service/config.service';
import { Router } from '@angular/router';
import { ListsSandbox } from '../../../../core/lists/lists.sandbox';
import { CartSandbox } from '../../../../core/cart/cart.sandbox';
import { CartPopupComponent } from './modal/cart-popup/cart-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-spurt-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [ProductControlService, ProductControlSandbox]
})


export class CartNavComponent implements OnInit {

  public imagePath: string;
  public flagValue = '0';
  @Input()
  ngSwitch: any;
  public currentUser = JSON.parse(localStorage.getItem('storeUser'));

  constructor(
    public sidenavMenuService: SidenavMenuService,
    public cartSandbox: ProductControlSandbox,
    public cartBaseSandbox: CartSandbox,
    public router: Router,
    public listSandbox: ListsSandbox,
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService,
    public dialog: MatDialog,

  ) {}

  ngOnInit() {
    this.imagePath = this.configService.getImageUrl();
  }

  viewCartPopup() {
    const dialogRef = this.dialog.open(CartPopupComponent, {
      panelClass: 'make-quotation'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
      }
    });
  }
}
