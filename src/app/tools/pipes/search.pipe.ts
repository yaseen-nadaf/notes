import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(listToSearch: any[], searchText: string): any[] {
    if (!listToSearch) { return []; }
    if (!searchText) { return listToSearch; }

    return listToSearch.filter(item => {
      return item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.title.toLowerCase().includes(searchText.toLowerCase()) &&
      item.description.toLowerCase().includes(searchText.toLowerCase()));
    });
  }

}
