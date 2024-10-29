import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe],
})
export class OrderModalComponent {
  @Input() order: any;
  @Output() close = new EventEmitter<void>();

  statuses = [
    'ABERTO',
    'ORÇADO',
    'REJEITADO',
    'APROVADO',
    'REDIRECIONADO',
    'AGUARDANDO PAGAMENTO',
    'PAGO',
    'FINALIZADO',
  ];

  get statusesToDisplay(): string[] {
    const currentIndex = this.statuses.indexOf(this.order.status);
    return this.statuses.slice(0, currentIndex + 1);
  }

  getStatusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      ABERTO: 'cinza',
      ORÇADO: 'marrom',
      REJEITADO: 'vermelho',
      APROVADO: 'amarelo',
      REDIRECIONADO: 'roxo',
      'AGUARDANDO PAGAMENTO': 'azul',
      PAGO: 'alaranjado',
      FINALIZADO: 'verde',
    };
    return statusColors[status] || '';
  }

  logHistory(status: string) {
    const date = new DatePipe('en-US').transform(new Date(), 'short');
    this.order.history.push({ date, status });
  }

  aprovarPedido() {
    this.logHistory('AGUARDANDO PAGAMENTO');
    this.order.status = 'AGUARDANDO PAGAMENTO';
    this.close.emit();
  }

  rejeitarPedido() {
    this.logHistory('REJEITADO');
    this.order.status = 'REJEITADO';
    this.close.emit();
  }

  resgatarPedido() {
    this.logHistory('ORÇADO');
    this.order.status = 'ORÇADO';
    this.close.emit();
  }

  pagarPedido() {
    this.logHistory('PAGO');
    this.order.status = 'PAGO';
    this.close.emit();
  }
}
