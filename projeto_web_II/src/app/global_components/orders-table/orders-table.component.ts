import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderModalComponent } from '../order-modal/order-modal.component';
import { OrdersService } from '../../services/orders.service';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../shared/models/Solicitacao.models';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, OrderModalComponent],
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersTableComponent implements OnInit {
  orders: Array<Solicitacao> = [];
  selectedOrder: any = null;

  constructor( private solicitacaoService: SolicitacaoService) {}

  ngOnInit(): void {
    this.solicitacaoService.buscarTodas().subscribe(
      (orders) => {
        this.orders = [...orders];
        console.log(orders);
      },
      (error) => {
        console.error('Erro ao listar funcionários:', error);
      }
    );
    /*
    console.log('OrdersTableComponent initialized');
    this.solicitacaoService.buscarTodas.subscribe((orders) => {
      this.orders = orders
        .map((order) => {
          return {
            ...order,
            date: new Date(order.date),
          };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    });
    console.log('Orders:', this.orders);*/
  }

  openOrderModal(order: any): void {
    this.selectedOrder = order;
  }

  closeOrderModal(): void {
    this.selectedOrder = null;
  }
}
