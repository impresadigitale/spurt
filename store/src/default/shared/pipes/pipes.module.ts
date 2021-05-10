/*
 * spurtcommerce
 * version 4.4
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2021 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterByIdPipe } from './filter-by-id.pipe';
import { FilterBrandsPipe } from './filter-brands.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FilterByIdPipe,
    FilterBrandsPipe,
    BrandSearchPipe,
    CurrencySymbolPipe,
    SafeHtmlPipe
  ],
  exports: [
    FilterByIdPipe,
    FilterBrandsPipe,
    BrandSearchPipe,
    CurrencySymbolPipe,
    SafeHtmlPipe
  ]
})
export class PipesModule {}
