export class Usuario {
  constructor(
    public nome: string = '',
    public cpf: string = '',
    public email: string = '',
    public cep: number = 0,
    public numero: number = 0,
    public endereco: string = '',
    public localidade: string = '',
    public estado: string = '',
    public telefone: string = '',
    public perfil: string = '',
    public senhaHash: string = '',
    public salt: string = ''
  ) {}
}
