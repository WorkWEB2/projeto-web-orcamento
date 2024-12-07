import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario, Login } from '../shared/models';
import { Route, Router } from '@angular/router';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router:Router) { }

  public get usuarioLogado(): Usuario | null {
    let usu = localStorage[LS_CHAVE];
    return (usu ? JSON.parse(localStorage[LS_CHAVE]) as Usuario : null);
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  } 

  logout() {
    delete localStorage[LS_CHAVE];
    this.router.navigate(['/login']);
  }

  login(login: Login): Observable<Usuario | null> {

    let usu = new Usuario(
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            0,
            "",
            "",
    );

    if (login.login === login.senha) {
      if (login.login === "admin@admin.com") {
        //usu.perfil = "ADMIN";
      }
      return of(usu);
    } else {
      return of(null);
      alert("Usuário ou senha inválidos");
    }
  }

  // Método para registrar um novo usuário
  registrarUsuario(usuario: Usuario): void {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  }
}
