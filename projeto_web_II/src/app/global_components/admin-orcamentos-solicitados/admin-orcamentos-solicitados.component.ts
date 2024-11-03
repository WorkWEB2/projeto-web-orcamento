import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-orcamentos-solicitados',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-orcamentos-solicitados.component.html',
  styleUrls: ['./admin-orcamentos-solicitados.component.scss'],
})
export class AdminOrcamentosSolicitadosComponent implements OnInit {
  categorias: Array<string> = [];
  responsaveis: Array<string> = [];

  // Dados mockados
  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';
  responsavelSelecionado: string = '';
  valorOrcamento: string = '';

  constructor() {}

  ngOnInit(): void {
    // Dados mockados para categorias e responsáveis
    this.categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
    this.responsaveis = ['Técnico 1', 'Técnico 2', 'Técnico 3'];

    // Atribuindo valores mockados aos campos desabilitados
    this.descricaoEquipamento = 'Descrição fictícia do equipamento para teste.';
    this.categoriaEquipamento = this.categorias[0]; // Selecionando a primeira categoria como exemplo
    this.descricaoDefeito = 'Descrição fictícia do defeito identificado.';
  }
}
