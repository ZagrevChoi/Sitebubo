import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floattwo'
})
export class FloattwoPipe implements PipeTransform {

  transform(numberValue): any {
    if (numberValue) {
      return numberValue.toFixed(2);
    }
  }
}
