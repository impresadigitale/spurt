/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import {
  Component,
  AfterViewInit,
  EventEmitter,
  Output,
  Input,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit, OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userDetails: any;
  @Output() logout: EventEmitter<any> = new EventEmitter();
  public language: string;

  constructor(public translate: TranslateService) {}

  ngAfterViewInit() {
    // ----
  }
  openplugin() {
    window.open(environment.pluginUrl);
  }
  ngOnInit(): void {}
}
