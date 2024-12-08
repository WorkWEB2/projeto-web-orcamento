import { EstadoSolicitacao } from "./EstadoSolicitacao.models";
import { Usuario } from "./usuario.model";

export class Movimentacao {
    dtHrMovimentacao: Date;
    estadoMovimentacao: EstadoSolicitacao;
    autorMovimentacao!: Usuario;
    constructor(dtHrMovimentacao:Date,estadoMovimentacao:EstadoSolicitacao) {
        this.dtHrMovimentacao = dtHrMovimentacao;
        this.estadoMovimentacao = estadoMovimentacao;
    }
}