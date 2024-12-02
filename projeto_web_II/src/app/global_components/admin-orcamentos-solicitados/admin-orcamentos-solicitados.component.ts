import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-admin-orcamentos-solicitados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orcamentos-solicitados.component.html',
  styleUrls: ['./admin-orcamentos-solicitados.component.scss'],
})
export class AdminOrcamentosSolicitadosComponent implements OnInit {
  categorias: Array<string> = [];
  responsaveis: Array<string> = [];

  clientName: string = '';
  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';
  responsavelSelecionado: string = '';
  valorOrcamento: string = '';

  orderId: string = '';
  order: any; // Armazena o pedido atual

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';

    this.order = this.ordersService.getOrderById(this.orderId);

    if (this.order) {
      this.clientName = this.order.clientName;
      this.descricaoEquipamento = this.order.item;
      this.categoriaEquipamento = this.order.categoriaEquipamento;
      this.descricaoDefeito = this.order.description;
      this.responsavelSelecionado = this.order.responsible || '';
      this.valorOrcamento = this.order.value ? this.order.value.toString() : '';
    }

    this.categorias = [
      'Celular',
      'Notebook',
      'Tablet',
      'Televisão',
      'Console de Videogame',
    ];
    this.responsaveis = ['Técnico 1', 'Técnico 2', 'Técnico 3'];
  }

  salvarOrcamento(): void {
    if (!this.responsavelSelecionado || !this.valorOrcamento) {
      alert('Por favor, preencha todos os campos antes de salvar.');
      return;
    }

    if (this.order) {
      // Atualiza o pedido com os novos dados
      this.order.responsible = this.responsavelSelecionado;
      this.order.value = parseFloat(this.valorOrcamento);
      this.order.status = 'ORÇADO';

      // Adiciona o novo status ao histórico
      const now = new Date();
      this.order.history = this.order.history || [];
      this.order.history.push({
        date: now,
        status: 'ORÇADO',
      });

      this.ordersService.updateOrder(this.order);

      alert('Orçamento salvo com sucesso!');
      this.router.navigate(['/admin/home']);
    } else {
      console.error('Pedido não encontrado para atualização.');
    }
  }

  getStatusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      ABERTA: 'cinza',
      ORÇADO: 'marrom',
      REJEITADO: 'vermelho',
      APROVADO: 'amarelo',
      REDIRECIONADO: 'roxo',
      'AGUARDANDO PAGAMENTO': 'azul',
      PAGO: 'laranja',
      FINALIZADO: 'verde',
    };
    return statusColors[status] || '';
  }
}
