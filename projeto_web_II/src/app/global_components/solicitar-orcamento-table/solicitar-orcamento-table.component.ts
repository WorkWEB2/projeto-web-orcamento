import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { v4 as uuidv4 } from 'uuid';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../shared/models/categoria.models';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../shared/models/Solicitacao.models';

@Component({
  selector: 'app-solicitar-orcamento-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './solicitar-orcamento-table.component.html',
  styleUrls: ['./solicitar-orcamento-table.component.scss'],
})
export class SolicitarOrcamentoTableComponent implements OnInit {
  categorias: Array<Categoria> = [];
  descricaoEquipamento: string = '';
  categoriaEquipamento?: Categoria;
  descricaoDefeito: string = '';
  solicitacao: Solicitacao = new Solicitacao();

  constructor(private ordersService: OrdersService, private router: Router, private categoriaService: CategoriaService,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    this.categoriaService.listar().subscribe(
      (categorias) => {
        this.categorias = categorias;
      },
      (error) => {
        console.error('Erro ao listar categorias:', error);
      }
    );
  }

  onSubmit(): void {
    this.solicitacao.descricaoEquipamento = this.descricaoEquipamento;
    this.solicitacao.categoria = this.categoriaEquipamento;
    this.solicitacao.descricaoProblema = this.descricaoDefeito;
    this.solicitacaoService.registrar(this.solicitacao).subscribe(
      (solicitacao) => {
        
        console.log('Solicitação registrada:', solicitacao);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Erro ao registrar solicitação:', error);
      }
    );
    /*
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
    };*/

    //this.router.navigate(['/home']);
  }
}
