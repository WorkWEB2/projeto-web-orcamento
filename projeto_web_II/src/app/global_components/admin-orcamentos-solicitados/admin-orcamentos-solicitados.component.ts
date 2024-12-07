import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import { CategoriaService } from '../../services/categoria.service';
import { FuncionarioService } from '../../services/funcionario.service';
import { Categoria } from '../../shared/models/categoria.models';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../shared/models/Solicitacao.models';

@Component({
  selector: 'app-admin-orcamentos-solicitados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orcamentos-solicitados.component.html',
  styleUrls: ['./admin-orcamentos-solicitados.component.scss'],
})
export class AdminOrcamentosSolicitadosComponent implements OnInit {

  constructor(private categoriaService: CategoriaService, private funcionarioService:FuncionarioService, private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router, private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef) {}

  categorias: Array<string> = [];
  responsaveis: Array<string> = [];

  clientName: string = '';
  descricaoEquipamento: string = '';
  categoriaEquipamento: string = '';
  descricaoDefeito: string = '';
  responsavelSelecionado: string = '';
  valorOrcamento: string = '';

  orderId: string = '';
  order: Array<Solicitacao> = []; // Armazena o pedido atual
  solicitacaoAtual: Solicitacao = new Solicitacao();

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id') || '';
    //console.log(this.orderId);
    this.solicitacaoService.findById(Number(this.orderId)).subscribe((result: any) => {
      this.order = result;
      this.cdr.detectChanges();
      console.log(this.order);

      if (this.order) {
        this.clientName = result.cliente.nome || '';
        this.descricaoEquipamento = result.descricaoEquipamento || '';
        this.categoriaEquipamento = result.categoria?.nome || '';
        this.descricaoDefeito = result.descricaoProblema || '';
        this.responsavelSelecionado = result.funcionario || '';
        this.valorOrcamento = result.orcamento?.valorOrcamento ? result.orcamento?.valorOrcamento.toString() : '';
      }
      this.solicitacaoAtual = result;
    });


    this.categoriaService.listar().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias.map(categoria => categoria.nome);
    });
    this.funcionarioService.listar().subscribe((funcionarios: any) => {
      this.responsaveis = funcionarios.map((funcionario: any) => funcionario.nome);
    });
  }

  salvarOrcamento(): void {
    if (this.responsavelSelecionado && this.valorOrcamento) {
      // Garante que a propriedade orcamento existe
      this.solicitacaoAtual.orcamento = this.solicitacaoAtual.orcamento || {};
      this.solicitacaoAtual.orcamento.valorOrcamento = Number(this.valorOrcamento);
      
      // Caso seja necessário, também atualize o responsável
      // const selectedResponsavel = this.responsaveis.find(responsavel => responsavel.nome === this.responsavelSelecionado);
      // if (selectedResponsavel) {
      //   this.solicitacaoAtual.funcionario = selectedResponsavel;
      // }
  
      this.solicitacaoService.efetuarOrcamento(this.solicitacaoAtual).subscribe(
        (result) => {
          console.log("Orcamento efetuado com sucesso!", result);
          alert('Orçamento salvo com sucesso!');
          this.router.navigate(['/admin/home']);
        },
        (error: any) => {
          console.error('Erro ao efetuar orçamento', error);
        }
      );
    } else {
      alert('Por favor, preencha todos os campos antes de salvar.');
    }
  }
  

  // getStatusClass(status: string): string {
  //   const statusColors: { [key: string]: string } = {
  //     ABERTA: 'cinza',
  //     ORÇADO: 'marrom',
  //     REJEITADO: 'vermelho',
  //     APROVADO: 'amarelo',
  //     REDIRECIONADO: 'roxo',
  //     'AGUARDANDO PAGAMENTO': 'azul',
  //     PAGO: 'laranja',
  //     FINALIZADO: 'verde',
  //   };
  //   return statusColors[status] || '';
  // }
}

