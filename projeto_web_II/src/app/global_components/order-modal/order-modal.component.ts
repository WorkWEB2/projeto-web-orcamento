import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SolicitacaoService } from '../../services/solicitacao.service';
import { Solicitacao } from '../../shared/models/Solicitacao.models';
import { EstadoSolicitacao } from '../../shared/models/estadoSolicitacao.models';
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
    this.historicoMovimentacao = this.order?.historicoMovimentacao ?? [];
  }


  // get statusesToDisplay(): string[] {
  //   const currentIndex = this.statuses.indexOf(this.order?.estadoAtual?? EstadoSolicitacao.aberta);
  //   return this.statuses.slice(0, currentIndex + 1);
  // }

  getStatusClass(status: string): string {
    const statusColors: { [key: string]: string } = {
      Estado: 'cinza',
      ORÇADO: 'marrom',
      REJEITADO: 'vermelho',
      APROVADO: 'amarelo',
      REDIRECIONADO: 'roxo',
      'AGUARDANDO PAGAMENTO': 'azul',
      PAGO: 'alaranjado',
      FINALIZADO: 'verde',
    };
    return statusColors[status] || '';
  }

  logHistory(status: EstadoSolicitacao) {
    // const date = new DatePipe('en-US').transform(new Date(), 'short');
    const date = new Date();
    this.order?.historicoMovimentacao?.push(new Movimentacao ( date, status));
  }


  aprovarPedido() {
    const valor = this.order?.orcamento;
    alert(`Serviço Aprovado no Valor R$ ${valor}`);
    this.logHistory(EstadoSolicitacao.aprovada);
    if (this.order) {
      this.order.estadoAtual = EstadoSolicitacao.aprovada;
    }
    this.close.emit(); // Redireciona para RF003 após clicar em OK
  }

  rejeitarPedido() {
    let motivo: string | null = '';

    // Continua solicitando o motivo enquanto estiver vazio ou nulo
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

    // Armazena o motivo da rejeição
    if (this.order) {
      if (this.order.orcamento) {
        this.order.orcamento.justificativaRejeicao = motivo;
      }
      this.logHistory(EstadoSolicitacao.rejeitada);
      this.order.estadoAtual = EstadoSolicitacao.rejeitada;
      }
      alert('Serviço Rejeitado');
      this.close.emit();
  }

  resgatarPedido() {
    this.logHistory(EstadoSolicitacao.orcada);
    if (this.order){
      this.order.estadoAtual = EstadoSolicitacao.orcada;
    }
    this.close.emit();
  }

  pagarPedido() {
    this.logHistory(EstadoSolicitacao.paga);
    if (this.order) {
    this.order.estadoAtual = EstadoSolicitacao.paga;
    }
    this.close.emit();
  }
}
