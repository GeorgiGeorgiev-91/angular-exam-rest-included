import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'betterDate'
})
export class BetterDatePipe implements PipeTransform {

  transform(value: string): unknown {
    let year = value.substring(0,4);
    let month = value.substring(5,7);
    let day = value.substring(8,10);

    return day+'.'+month+'.'+year;
  }

}
