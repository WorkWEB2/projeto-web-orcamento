// orders-table.component.ts

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
    // Dados mockados simulando consumo do backend
    this.orders = [
      {
        item: 'Camiseta Preta Masculina',
        date: '20/Mar/2023, 20:00',
        value: 75.0,
        status: 'ABERTO',
        description: 'Descrição detalhada do produto...',
        responsible: 'João Silva',
      },
      {
        item: 'Camiseta Branca Masculina',
        date: '21/Mar/2023, 21:00',
        value: 80.0,
        status: 'ORÇADO',
        description: 'Uma camiseta branca para homens',
        responsible: 'Maria Souza',
      },
      // mais pedidos aqui...
    ];
  }

  openOrderModal(order: any): void {
    this.selectedOrder = order;
  }

  closeOrderModal(): void {
    this.selectedOrder = null;
  }
}
