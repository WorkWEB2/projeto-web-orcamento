import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario, Login } from '../shared/models';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor() { }

  public getusuarioLogado(): Usuario | null {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) : null);
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  } 

  logout() {
    delete localStorage[LS_CHAVE];
  }

  login(login: Login): Observable<Usuario | null> {

    let usu = new Usuario(
      "",             // nome
      "",             // cpf
      login.login,    // email
      login.login,    // confirmarEmail
      0,              // cep
      0,              // numero
      "",             // endereco
      "",             // localidade
      "",             // estado
      "",             // telefone
      "CLIENTE",      // perfil
      login.senha     // senha
    );

    if (login.login === login.senha) {
      if (login.login === "admin@admin.com") {
        usu.perfil = "ADMIN";
      }
      return of(usu);
    } else {
      return of(null);
    }
  }
}
