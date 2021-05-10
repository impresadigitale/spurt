
/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Directive, ElementRef, AfterViewInit } from '@angular/core';


@Directive({
    selector: '[appScrollTo]'
})
export class ScrollToDirective implements AfterViewInit {
  constructor(private elRef: ElementRef) {}
  ngAfterViewInit() {
    this.elRef.nativeElement.scrollHeight();

  }
}
