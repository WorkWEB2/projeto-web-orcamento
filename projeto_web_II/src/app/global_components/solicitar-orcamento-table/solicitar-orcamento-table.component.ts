import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  constructor() {}

  ngOnInit(): void {
    // Mock de categorias para o seletor
    this.categorias = [
      'Celular',
      'Notebook',
      'Tablet',
      'Televisão',
      'Console de Videogame',
    ];
  }

  onSubmit(): void {
    // Lógica para enviar os dados do formulário para o backend ou API
    const solicitacaoOrcamento = {
      descricaoEquipamento: this.descricaoEquipamento,
      categoriaEquipamento: this.categoriaEquipamento,
      descricaoDefeito: this.descricaoDefeito,
    };

    console.log('Orçamento solicitado:', solicitacaoOrcamento);
    // Aqui você pode chamar um serviço para enviar os dados ou processar a lógica
  }
}