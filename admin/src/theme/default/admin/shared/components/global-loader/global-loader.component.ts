/*
 * SpurtCommerce
 * version 4.3
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HTTPStatus } from '../../../../../../core/admin/providers/CommonInterceptor';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html'
})
export class GlobalLoaderComponent implements OnInit, OnDestroy {

  private subscriptions: Array<Subscription> = [];
  public loader = false;


  constructor(private httpStatus: HTTPStatus) {
    this.getHttpResponse();
  }

  ngOnInit(): void {}

  getHttpResponse() {
    this.subscriptions.push(this.httpStatus.getHttpStatus().subscribe((status: boolean) => {
      this.loader = status;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(each => each.unsubscribe());
  }
}
