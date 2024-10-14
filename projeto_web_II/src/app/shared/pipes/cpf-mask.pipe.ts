import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfMask',
  standalone: true // Adicione standalone: true aqui
})
export class CpfPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      .substring(0, 14);
  }
}
