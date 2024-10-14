import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cepMask',
  standalone: true 
})
export class CepPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    value = value.replace(/\D/g, '');

    return value
      .replace(/^(\d{5})(\d{3})$/, '$1-$2') 
      .substring(0, 10); 
  }
}
