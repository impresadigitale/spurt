/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WidgetSandbox } from '../../../../../../../core/admin/cms/widgets/widgets.sandbox';

@Component({
  selector: 'app-widgets-layout',
  templateUrl: './widgets-layout.component.html',
  styleUrls: ['./widgets-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetLayoutComponent implements OnInit {

  constructor(public sandbox: WidgetSandbox) {}

  ngOnInit() {
    this.getWidgetHeaderCount();
  }

  getWidgetHeaderCount() {
    this.sandbox.getWidgetCount();
  }
}
