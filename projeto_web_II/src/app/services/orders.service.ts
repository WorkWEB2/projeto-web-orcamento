import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersSource = new BehaviorSubject<any[]>([]);
  orders$ = this.ordersSource.asObservable();

  constructor() { }

  addOrder(order: any) {
    console.log('Adicionando pedido:', order);
    const currentOrders = this.ordersSource.value;
    this.ordersSource.next([...currentOrders, order]);
    console.log('Pedidos:', this.ordersSource.value);
  }
}
