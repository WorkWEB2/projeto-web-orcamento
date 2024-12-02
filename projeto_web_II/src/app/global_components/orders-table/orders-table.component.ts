import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, OrderModalComponent],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit {
  orders: Array<any> = [];
  selectedOrder: any = null;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    console.log('OrdersTableComponent initialized');
    this.ordersService.orders$.subscribe((orders) => {
      this.orders = orders
        .map((order) => {
          return {
            ...order,
            date: new Date(order.date),
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    });
    console.log('Orders:', this.orders);
  }

  openOrderModal(order: any): void {
    this.selectedOrder = order;
  }

  closeOrderModal(): void {
    this.selectedOrder = null;
  }
}
