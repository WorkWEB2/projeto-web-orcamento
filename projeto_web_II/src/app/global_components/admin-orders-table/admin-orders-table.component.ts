// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { OrdersService } from '../../services/orders.service'; // Importe o serviço
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-admin-orders-table',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './admin-orders-table.component.html',
//   styleUrls: ['./admin-orders-table.component.scss'],
// })
// export class AdminOrdersTableComponent implements OnInit {
//   orders: Array<any> = [];

//   constructor(private ordersService: OrdersService) {} // Injete o serviço

//   ngOnInit(): void {
//     this.ordersService.orders$.subscribe((orders) => {
//       // Converte as datas para objetos Date e ordena
//       this.orders = orders
//         .map((order) => ({
//           ...order,
//           date: new Date(order.date),
//         }))
//         .sort((a, b) => a.date.getTime() - b.date.getTime());
//     });
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-admin-orders-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-orders-table.component.html',
  styleUrls: ['./admin-orders-table.component.scss'],
})
export class AdminOrdersTableComponent implements OnInit {
  orders: Array<any> = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // Subscrição aos pedidos do OrdersService
    this.ordersService.orders$.subscribe((orders) => {
      // Converte strings de data em objetos Date, se necessário
      this.orders = orders.map((order) => ({
        ...order,
        date: new Date(order.date),
      }));

      // Ordena os pedidos: primeiro os com status 'ABERTA', depois por data/hora
      this.orders.sort((a, b) => {
        // Se um pedido tiver status 'ABERTA' e o outro não, o 'ABERTA' vem primeiro
        if (a.status === 'ABERTA' && b.status !== 'ABERTA') {
          return -1;
        } else if (a.status !== 'ABERTA' && b.status === 'ABERTA') {
          return 1;
        } else {
          // Se ambos tiverem o mesmo status, ordena por data/hora
          return a.date.getTime() - b.date.getTime();
        }
      });
    });
  }
}
