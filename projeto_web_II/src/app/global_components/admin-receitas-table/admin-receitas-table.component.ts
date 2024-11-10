import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-admin-receitas-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-receitas-table.component.html',
  styleUrls: ['./admin-receitas-table.component.scss'],
})
export class AdminReceitasTableComponent implements OnInit {
  receitas: Array<any> = [];
  receitasFiltradas: Array<any> = [];
  categorias: Array<string> = [];
  filtroCategoria: string = '';
  dataInicial: string = '';
  dataFinal: string = '';
  historicoAcoes: Array<string> = []; // Armazena o histórico de ações

  constructor() {}

  ngOnInit(): void {
    this.receitas = [
      {
        servico: 'Conserto de TV',
        categoria: 'Eletrônicos',
        dataHora: '2023-10-01T10:30',
        receita: 300.0,
      },
      {
        servico: 'Reparo de Notebook',
        categoria: 'Computadores',
        dataHora: '2023-10-05T14:20',
        receita: 450.0,
      },
      {
        servico: 'Troca de Tela de Smartphone',
        categoria: 'Celulares',
        dataHora: '2023-10-10T09:15',
        receita: 200.0,
      },
      {
        servico: 'Manutenção de Console de Videogame',
        categoria: 'Videogames',
        dataHora: '2023-10-15T11:45',
        receita: 350.0,
      },
      {
        servico: 'Reparo de Sistema de Som',
        categoria: 'Áudio',
        dataHora: '2023-10-20T16:00',
        receita: 400.0,
      },
    ];

    // Obtém categorias únicas
    this.categorias = Array.from(
      new Set(this.receitas.map((r) => r.categoria))
    );

    // Inicializa receitas filtradas
    this.receitasFiltradas = [...this.receitas];
  }

  filtrarReceitas(): void {
    this.receitasFiltradas = this.receitas.filter((receita) => {
      const matchCategoria = this.filtroCategoria
        ? receita.categoria === this.filtroCategoria
        : true;
      const matchDataInicial = this.dataInicial
        ? new Date(receita.dataHora) >= new Date(this.dataInicial)
        : true;
      const matchDataFinal = this.dataFinal
        ? new Date(receita.dataHora) <= new Date(this.dataFinal)
        : true;
      return matchCategoria && matchDataInicial && matchDataFinal;
    });
  }

  // Nova função para agrupar receitas por dia
  agruparReceitasPorDia(receitas: Array<any>): { [key: string]: number } {
    const agrupadas: { [key: string]: number } = {};
    
    receitas.forEach(receita => {
      const data = new Date(receita.dataHora).toLocaleDateString('pt-BR'); // Formato: dd/MM/yyyy
      if (!agrupadas[data]) {
        agrupadas[data] = 0;
      }
      agrupadas[data] += receita.receita;
    });
    
    return agrupadas;
  }

  gerarPDFReceitas(): void {
    const receitasAgrupadas = this.agruparReceitasPorDia(this.receitasFiltradas);

    const doc = new jsPDF();
    doc.text('Relatório de Receitas', 14, 10);
    
    // Prepare the data for the table
    const body = Object.entries(receitasAgrupadas).map(([data, total]) => [
      data,
      `R$ ${total.toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [['Data', 'Receita Total']],
      body: body,
    });

    // Calcula a soma total das receitas
    const totalReceita = Object.values(receitasAgrupadas).reduce(
      (sum, receita) => sum + receita,
      0
    );

    // Adiciona a soma total ao PDF
    doc.text(
      `Valor Total: R$ ${totalReceita.toFixed(2)}`,
      14,
      (doc as any).autoTable.previous.finalY + 10
    );

    doc.save('relatorio_receitas.pdf');

    // Registra a ação no histórico
    this.registrarAcao('PDF de receitas gerado.');
  }

  gerarPDFReceitasPorCategoria(): void {
    const receitasPorCategoria: { [key: string]: number } = {};

    this.receitas.forEach((receita) => {
      if (!receitasPorCategoria[receita.categoria]) {
        receitasPorCategoria[receita.categoria] = 0;
      }
      receitasPorCategoria[receita.categoria] += receita.receita;
    });

    const doc = new jsPDF();
    doc.text('Relatório de Receitas por Categoria', 14, 10);
    autoTable(doc, {
      head: [['Categoria', 'Receita Total']],
      body: Object.entries(receitasPorCategoria).map(([categoria, receita]) => [
        categoria,
        `R$ ${receita.toFixed(2)}`,
      ]),
    });

    const totalReceita = Object.values(receitasPorCategoria).reduce(
      (sum, receita) => sum + receita,
      0
    );

    doc.text(
      `Valor Total: R$ ${totalReceita.toFixed(2)}`,
      14,
      (doc as any).autoTable.previous.finalY + 10
    );

    doc.save('relatorio_receitas_por_categoria.pdf');

    // Registra a ação no histórico
    this.registrarAcao('PDF de receitas por categoria gerado.');
  }

  registrarAcao(acao: string): void {
    this.historicoAcoes.push(`${new Date().toLocaleString('pt-BR')}: ${acao}`);
  }
}
