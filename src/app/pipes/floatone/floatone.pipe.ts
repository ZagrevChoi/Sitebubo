import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatone'
})
export class FloatonePipe implements PipeTransform {

  transform(numberValue): any {
    if (numberValue) {
      return numberValue.toFixed(1);
    }
  }

}
