import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersSource = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSource.asObservable();

  constructor() {}

  addOrder(order: any) {
    console.log('Adicionando pedido:', order);
    const currentOrders = this.ordersSource.value;
    this.ordersSource.next([...currentOrders, order]);
    console.log('Pedidos:', this.ordersSource.value);
  }

  getOrderById(id: string): any | undefined {
    const currentOrders = this.ordersSource.value;
    return currentOrders.find((order) => order.id === id);
  }

  updateOrder(updatedOrder: any): void {
    const currentOrders = this.ordersSource.value;
    const index = currentOrders.findIndex(
      (order) => order.id === updatedOrder.id
    );

    if (index !== -1) {
      currentOrders[index] = updatedOrder;
      this.ordersSource.next([...currentOrders]);
      console.log('Pedido atualizado:', updatedOrder);
    } else {
      console.log('Pedido não encontrado para atualização:', updatedOrder);
    }
  }
}
