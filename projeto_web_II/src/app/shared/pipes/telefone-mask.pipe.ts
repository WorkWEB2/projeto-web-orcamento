import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefoneMask',
  standalone: true // Adicione standalone: true aqui
})
export class TelefonePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
      .substring(0, 15);
  }
}
