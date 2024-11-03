import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderModalComponent } from '../order-modal/order-modal.component';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, OrderModalComponent],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent implements OnInit {
  orders: Array<any> = [];
  selectedOrder: any = null;

  constructor() {}

  ngOnInit(): void {
    this.orders = [
      {
        item: 'Camiseta Preta Masculina',
        date: '20/Mar/2023, 20:00',
        value: 75.0,
        status: 'ABERTO',
        description: 'Descrição detalhada do produto...',
        responsible: 'João Silva',
        history: [{ date: '20/Mar/2023, 20:00', status: 'ABERTO' }]
      },
      {
        item: 'Camiseta Branca Masculina',
        date: '21/Mar/2023, 21:00',
        value: 80.0,
        status: 'ORÇADO',
        description: 'Uma camiseta branca para homens',
        responsible: 'Maria Souza',
        history: [{ date: '21/Mar/2023, 21:00', status: 'ORÇADO' }]
      },
      // Outros pedidos podem ser adicionados aqui
    ];
  }

  openOrderModal(order: any): void {
    this.selectedOrder = order;
  }

  closeOrderModal(): void {
    this.selectedOrder = null;
  }
}
