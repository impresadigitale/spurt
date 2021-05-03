import { NgModule } from '@angular/core';
import { FilterPipe } from './category-search.pipe';
import { CustomCurrencyPipe } from './currency-symbol.pipe';

@NgModule({
    imports:        [],
    declarations:   [FilterPipe],
    exports:        [FilterPipe],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
}
