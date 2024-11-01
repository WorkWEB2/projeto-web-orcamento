import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando CommonModule

@Component({
  selector: 'app-admin-orders-table',
  standalone: true,
  imports: [CommonModule], // Incluindo CommonModule nos imports
  templateUrl: './admin-orders-table.component.html',
  styleUrls: ['./admin-orders-table.component.scss'],
})
export class AdminOrdersTableComponent implements OnInit {
  orders: Array<any> = [];

  constructor() {}

  ngOnInit(): void {
    // Dados mockados simulando consumo do backend
    this.orders = [
      {
        item: 'Mens Black T-Shirts',
        date: '20/Mar/2023, 20:00',
        client: 'Nome do cliente',
        status: 'ABERTA',
      },
      {
        item: 'Mens Black T-Shirts',
        date: '20/Mar/2023, 20:00',
        client: 'Nome do cliente',
        status: 'ABERTA',
      },
      {
        item: 'Mens Black T-Shirts',
        date: '20/Mar/2023, 20:00',
        client: 'Nome do cliente',
        status: 'ABERTA',
      },
      {
        item: 'Mens Black T-Shirts',
        date: '20/Mar/2023, 20:00',
        client: 'Nome do cliente',
        status: 'ABERTA',
      },
    ];
  }
}
