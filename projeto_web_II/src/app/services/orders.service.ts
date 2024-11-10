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

// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class OrdersService {
//   private initialOrders = [
//     {
//       item: 'Produto A',
//       date: new Date('2023-10-01T10:00:00'),
//       clientName: 'Cliente 1',
//       status: 'ABERTA',
//       id: '1',
//       history: [
//         {
//           date: new Date(),
//           status: 'ABERTA',
//         },
//       ],
//     },
//     {
//       item: 'Produto B',
//       date: new Date('2023-10-02T11:00:00'),
//       clientName: 'Cliente 2',
//       status: 'ORÇADO',
//       id: '2',
//       history: [
//         {
//           date: new Date(),
//           status: 'ABERTA',
//         },
//       ],
//     },
//     {
//       item: 'Produto C',
//       date: new Date('2023-10-03T12:00:00'),
//       clientName: 'Cliente 3',
//       status: 'ORÇADA',
//       id: '3',
//       valorOrcamento: 100,
//       history: [
//         {
//           date: new Date(),
//           status: 'ORÇADA',
//         },
//       ],
//     },
//   ];

//   private ordersSource = new BehaviorSubject<any[]>(this.initialOrders);
//   orders$ = this.ordersSource.asObservable();

//   constructor() {}

//   addOrder(order: any) {
//     console.log('Adicionando pedido:', order);
//     const currentOrders = this.ordersSource.value;

//     // Assegure-se de que o pedido tenha um ID único
//     if (!order.id) {
//       return;
//     }

//     this.ordersSource.next([...currentOrders, order]);
//     console.log('Pedidos:', this.ordersSource.value);
//   }

//   getOrderById(id: string): any | undefined {
//     const currentOrders = this.ordersSource.value;
//     return currentOrders.find((order) => order.id === id);
//   }

//   updateOrder(updatedOrder: any): void {
//     const currentOrders = this.ordersSource.value;
//     const index = currentOrders.findIndex(
//       (order) => order.id === updatedOrder.id
//     );

//     if (index !== -1) {
//       currentOrders[index] = updatedOrder;
//       this.ordersSource.next([...currentOrders]);
//       console.log('Pedido atualizado:', updatedOrder);
//     } else {
//       console.log('Pedido não encontrado para atualização:', updatedOrder);
//     }
//   }
// }
