export class Usuario {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    cep: string;
    endereco: string;
    cidade: string;
    estado: string;
    numero: number;
    celular: string;
    role: string;
    constructor(
            nome: string,
            email: string,
            cpf: string,
            cep: string,
            endereco: string,
            cidade: string,
            estado: string,
            numero: number,
            celular: string,
            role: string,

    ){
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.cep = cep;
        this.endereco = endereco;
        this.cidade = cidade;
        this.estado = estado;
        this.numero = numero;
        this.celular = celular;
        this.role = role;
    }
}
