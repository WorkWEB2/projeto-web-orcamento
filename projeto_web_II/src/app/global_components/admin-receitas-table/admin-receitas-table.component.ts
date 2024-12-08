import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../shared/models/categoria.models';
import { ReceitaService } from '../../services/receita.service';
import { ReceitaCategoria } from '../../shared/models/receitaCategoria.models';
import { ReceitaPeriodo } from '../../shared/models/receitaPeriodo.models';

@Component({
  selector: 'app-admin-receitas-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-receitas-table.component.html',
  styleUrls: ['./admin-receitas-table.component.scss'],
})
export class AdminReceitasTableComponent implements OnInit {

  dataInicial: string = '';
  dataFinal: string = '';
  categorias: Array<ReceitaCategoria> = [];
  periodos: Array<ReceitaPeriodo> = [];

  constructor(private categoriaService: CategoriaService, private receitaService: ReceitaService ) {}

  ngOnInit(): void {
    this.receitaService.buscarTodas().subscribe((receitaCategoria: ReceitaCategoria[]) => {
      this.categorias = receitaCategoria;
    });

    this.receitaService.buscarPorPeriodo().subscribe((receitaPeriodo: ReceitaPeriodo[]) => {
      this.periodos = receitaPeriodo;
      console.log(this.periodos);
    });
  }
   
  gerarPDFReceitasPorCategoria(): void {
    const receitasPorCategoria: { [key: string]: number } = {};

    this.categorias.forEach((categoria) => {
      if (!receitasPorCategoria[categoria.nomeCategoria]) {
        receitasPorCategoria[categoria.nomeCategoria] = 0;
      }
      receitasPorCategoria[categoria.nomeCategoria] += categoria.valor;
    });

    const doc = new jsPDF();
    doc.text('Relatório de Receitas por Categoria', 14, 10);
    autoTable(doc, {
      head: [['Categoria', 'Receita Total']],
      body: Object.entries(receitasPorCategoria).map(([nomeCategoria, receitaTotal]) => [
        nomeCategoria,
        `R$ ${receitaTotal.toFixed(2)}`,
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
  }
  
    

  gerarPDFReceitasPorPeriodo(): void {
    const receitasAgrupadas = this.periodos.map(periodo => ({
      data: periodo.periodo,
      total: periodo.valor
    }));

    const doc = new jsPDF();
    doc.text('Relatório de Receitas', 14, 10);
    
    // Prepare the data for the table
    const body = receitasAgrupadas.map(({ data, total }) => [
      data.toString(),
      `R$ ${total.toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [['Data', 'Receita Total']],
      body: body,
    });

    // Calcula a soma total das receitas
    const totalReceita = receitasAgrupadas.reduce(
      (sum, { total }) => sum + total,
      0
    );

    // Adiciona a soma total ao PDF
    doc.text(
      `Valor Total: R$ ${totalReceita.toFixed(2)}`,
      14,
      (doc as any).autoTable.previous.finalY + 10
    );

    doc.save('relatorio_receitas.pdf');


  }

  
}
