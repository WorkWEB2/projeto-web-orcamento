export class ReceitaPeriodo {
    periodo: Date;
    valor: number;
    constructor(
            periodo: Date,
            valor: number,
    ){
        this.periodo = periodo;
        this.valor = valor;
    }
}