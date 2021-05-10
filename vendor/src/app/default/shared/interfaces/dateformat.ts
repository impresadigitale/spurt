import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { isNumber } from 'util';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {day: +(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {day: +(dateParts[0]), month: +(dateParts[1]), year: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        let dayCurrent: any;
        dayCurrent = dateParts[0];
        if (dateParts[0].toString().length === 1) {
          const temp = '0' + dateParts[0].toString();
          dayCurrent = +temp;
        }
        return {day: +(dayCurrent), month: +(dateParts[1]), year: +(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
        `${isNumber(date.day) ? (date.day) : ''}/${isNumber(date.month) ? (date.month) : ''}/${date.year}` :
        '';
  }
}
