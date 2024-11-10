import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(private ordersService: OrdersService, private router: Router) {}

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
    const randomStatus =
      statusOptions[Math.floor(Math.random() * statusOptions.length)];

    const solicitacaoOrcamento = {
      clientName: 'Cliente',
      item: this.descricaoEquipamento,
      date: new Date(),
      value: null,
      status: randomStatus,
      description: this.descricaoDefeito,
      categoriaEquipamento: this.categoriaEquipamento,
      responsible: null,
      history: [{ date: new Date(), status: randomStatus }],
      id: uuidv4(),
    };

    this.ordersService.addOrder(solicitacaoOrcamento);
    this.router.navigate(['/home']);
    console.log('Orçamento solicitado:', solicitacaoOrcamento);
  }
}
