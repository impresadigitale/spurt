/*
 * SpurtCommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit = 1000,
    completeWords = false,
    ellipsis = '....'
  ) {
    if (completeWords) {
      limit = value.substr(0, 20).lastIndexOf(' ');
    }
    return `${value.substr(0, limit)} ${ellipsis}`;
  }
}
