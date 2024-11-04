import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-solicitar-orcamento-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitar-orcamento-table.component.html',
  styleUrls: ['./solicitar-orcamento-table.component.scss'],
})
export class SolicitarOrcamentoTableComponent implements OnInit {
  categorias: Array<string> = [];
  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';

  constructor(private ordersService: OrdersService, private router:Router) {}

  ngOnInit(): void {
    this.categorias = [
      'Celular',
      'Notebook',
      'Tablet',
      'Televisão',
      'Console de Videogame',
    ];
  }

  onSubmit(): void {
    console.log('Solicitando orçamento...');
    const statusOptions = ['ABERTA', 'ORÇADO'];
    const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const solicitacaoOrcamento = {
      item: this.descricaoEquipamento,
      date: new Date().toLocaleString(),
      value: 50,
      status: randomStatus,
      description: this.descricaoDefeito,
      categoriaEquipamento: this.categoriaEquipamento,
      responsible: 'João Silva',
      history: [{ date: '20/Mar/2023, 20:00', status: randomStatus }]
    };

    this.ordersService.addOrder(solicitacaoOrcamento);
    this.router.navigate(['/home']);
    console.log('Orçamento solicitado:', solicitacaoOrcamento);
  }
}