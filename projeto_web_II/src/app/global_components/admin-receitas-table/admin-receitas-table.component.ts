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

  constructor() {}

  ngOnInit(): void {
    // Mock de dados de receitas
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

  formatarData(event: any, field: string) {
    const value = event.target.value;

    // Add your date formatting logic here

    if (field === 'dataInicial') {
      this.dataInicial = value;
    } else if (field === 'dataFinal') {
      this.dataFinal = value;
    }
  }

  gerarPDF(): void {
    const doc = new jsPDF();
    doc.text('Relatório de Receitas', 14, 10);
    autoTable(doc, {
      head: [['Serviço', 'Categoria', 'Data/Hora', 'Receita']],
      body: this.receitasFiltradas.map((r) => [
        r.servico,
        r.categoria,
        new Date(r.dataHora).toLocaleDateString('pt-BR') +
          ', ' +
          new Date(r.dataHora).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        `R$ ${r.receita.toFixed(2)}`,
      ]),
    });

    // Calcula a soma das receitas filtradas
    const totalReceita = this.receitasFiltradas.reduce(
      (sum, r) => sum + r.receita,
      0
    );

    // Adiciona a soma das receitas ao PDF
    doc.text(
      `Valor Total: R$ ${totalReceita.toFixed(2)}`,
      14,
      (doc as any).autoTable.previous.finalY + 10
    );

    doc.save('relatorio_receitas.pdf');
  }
}
