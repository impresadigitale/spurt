import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      if (it.title) {
        return it.title.toLowerCase().includes(searchText);
      }
      if (it.name) {
        return it.name.toLowerCase().includes(searchText);
      }
      if (it.categoryName) {
        return it.categoryName.toLowerCase().includes(searchText);
      }

    });
  }
}
