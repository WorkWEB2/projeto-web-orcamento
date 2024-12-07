import { Categoria } from '../models/categoria.models';
import { EstadoSolicitacao } from './estadoSolicitacao.models';
import { Movimentacao } from './Movimentacao.models';
import { Usuario } from './usuario.model';

export class Solicitacao {
    id!: Number;
    equipamento?: string;
    descricaoEquipamento?: string;
    categoria?: Categoria;
    cliente?: Usuario;
    funcionario?:Usuario;
    dtHrCriacao?: Date;
    descricaoProblema?: string;
    descricaoManutencao?:string;
    orientacaoCliente?:string;
    estadoAtual?: EstadoSolicitacao;
    valorOrcamento?:number
    justificativaRejeicao?:string;
    historicoMovimentacao?: Movimentacao[];
    // orcamento: any;
}