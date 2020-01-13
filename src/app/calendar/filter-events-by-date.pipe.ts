import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filterEventsByDate'
})
export class FilterEventsByDatePipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value || value.length === 0) {
      return items;
    }

    return items.filter(it => {
      console.log(it[field]);
      console.log(moment(value).format('MM/DD/YYYY').toLocaleString());
      console.log(it[field] ===
        value);

      return it[field] ===
      value;
    });

  }
}
