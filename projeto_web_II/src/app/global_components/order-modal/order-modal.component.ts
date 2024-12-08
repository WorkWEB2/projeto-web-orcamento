import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../shared/models/Solicitacao.models';
import { EstadoSolicitacao } from '../../shared/models/EstadoSolicitacao.models';
import { Movimentacao } from '../../shared/models/Movimentacao.models';
import { Usuario } from '../../shared/models';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal.component.html',
  styleUrls: ['./order-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, DatePipe],
})
export class OrderModalComponent implements OnInit {

  @Input() order: Solicitacao | undefined;
  @Output() close = new EventEmitter<void>();

  statuses =  EstadoSolicitacao;
  descricaoEquipamento:string = '';
  descricaoProblema:string = '';
  dtHrCriacao:Date = new Date();
  funcionario: Usuario = {nome: '', email: '',   cpf: '', endereco: '',  id: 0, cep: '',  cidade: '',  estado: '', numero: 0, celular: '', role: ''};
  valorOrcamento: number | string = "-";
  historicoMovimentacao: Movimentacao[] = [];

  constructor( private solicitacaoService: SolicitacaoService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.descricaoEquipamento = this.order?.descricaoEquipamento ?? '';
    this.descricaoProblema = this.order?.descricaoProblema ?? '';
    this.dtHrCriacao = this.order?.dtHrCriacao ?? this.dtHrCriacao;
    this.funcionario = this.order?.funcionario ?? this.funcionario;
    this.valorOrcamento = this.order?.orcamento?.valorOrcamento ?? this.valorOrcamento;
    this.historicoMovimentacao = this.order?.historicoMovimentacao?.reverse() ?? [];
  }

  getStatusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      aberta: 'cinza',
      orçada: 'marrom',
      rejeitada: 'vermelho',
      aprovada: 'amarelo',
      redirecionada: 'roxo',
     'aguardando pagamento': 'azul',
      paga: 'alaranjado',
      finalizada: 'verde',
    };
    return statusColors[status] || '';
  }

  logHistory(status: EstadoSolicitacao) {
    // const date = new DatePipe('en-US').transform(new Date(), 'short');
    const date = new Date();
    this.order?.historicoMovimentacao?.push(new Movimentacao ( date, status));
  }


  aprovarPedido() {
    this.solicitacaoService.aprovar(Number(this.order?.id)).subscribe(
      (data) => {
        console.log("Solicitação aprovada!", data);
        alert(`Serviço Aprovado no Valor R$ ${this.valorOrcamento}`);
      },
      (error) => {
        console.log(error);
      }
    );
    
    this.logHistory(EstadoSolicitacao.aprovada);
    if (this.order) {
      this.order.estadoAtual = EstadoSolicitacao.aprovada;
    }
    this.close.emit();
  }

  rejeitarPedido() {
    let motivo: string | null = '';
    
    while (!motivo) {
      motivo = prompt('Por favor, insira o motivo da rejeição:');
      if (motivo === null) {
        return;
      }
      motivo = motivo.trim();
      if (!motivo) {
        alert('O motivo da rejeição é obrigatório.');
      }
    }
  
    if (this.order) {
      // Se orcamento não existe, cria um objeto vazio
      this.order.orcamento = this.order.orcamento || {};
      // Atribui a justificativa de rejeição
      this.order.orcamento.justificativaRejeicao = motivo;
  
      // Faz a requisição ao serviço passando o order atualizado
      this.solicitacaoService.rejeitar(this.order).subscribe({
        next: (data) => {
          console.log("Solicitação rejeitada!", data);
          alert('Serviço Rejeitado');
          this.close.emit();

          
        },
        error: (error) => {
          console.log(error);
        }
      });

      // Altera o estado e o histórico
      this.logHistory(EstadoSolicitacao.rejeitada);
      this.order.estadoAtual = EstadoSolicitacao.rejeitada;
    }
  }

  resgatarPedido() {
    this.solicitacaoService.resgatar(Number(this.order?.id)).subscribe(
      (data) => {
        console.log("Solicitação resgatada!", data);
        alert('Serviço resgatado!');
      },
      (error) => {
        console.log(error);
      }
    );
    this.logHistory(EstadoSolicitacao.aprovada);
    if (this.order){
      this.order.estadoAtual = EstadoSolicitacao.aprovada;
    }
    this.close.emit();
  }

  pagarPedido() {
    this.solicitacaoService.pagar(Number(this.order?.id)).subscribe(
      (data) => {
        console.log("Solicitação paga!", data);
        alert('Serviço Pago!');
      },
      (error) => {
        console.log(error);
      }
    );
    this.logHistory(EstadoSolicitacao.paga);
    if (this.order) {
    this.order.estadoAtual = EstadoSolicitacao.paga;
    }
    this.close.emit();
  }
}
