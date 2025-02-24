import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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

  constructor( private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.solicitacaoService.buscarTodas().subscribe(
      (result) => {
      this.orders = result
        .map((order) => {
        return {
          ...order,
          date: new Date(order.dtHrCriacao ?? ''),
        };
        })
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      this.cdr.detectChanges();
      },
      (error) => {
      console.error('Erro ao listar funcionários:', error);
      }
    );
  }

  openOrderModal(order: Solicitacao): void {
    this.selectedOrder = order;
  }

  closeOrderModal(): void {
    this.selectedOrder = null;
  }
}
