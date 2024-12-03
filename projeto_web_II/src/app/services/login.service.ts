import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario, Login } from '../shared/models';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

const LS_CHAVE: string = 'usuarioLogado';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router) {}

  public get usuarioLogado(): Usuario | null {
    let usu = localStorage.getItem(LS_CHAVE);
    return usu ? JSON.parse(usu) : null;
  }

  public set usuarioLogado(usuario: Usuario | null) {
    if (usuario) {
      localStorage.setItem(LS_CHAVE, JSON.stringify(usuario));
    } else {
      localStorage.removeItem(LS_CHAVE);
    }
  }

  logout() {
    this.usuarioLogado = null;
    this.router.navigate(['/login']);
  }

  login(login: Login): Observable<Usuario | null> {
    // Obter usuários do localStorage
    const usuariosJSON = localStorage.getItem('usuarios');
    let usuarios: Usuario[] = [];
    if (usuariosJSON) {
      usuarios = JSON.parse(usuariosJSON);
    }

    // Encontrar o usuário com o e-mail fornecido
    const usuarioEncontrado = usuarios.find((u) => u.email === login.login);

    if (usuarioEncontrado) {
      // Hash da senha fornecida com o SALT armazenado
      const senhaHash = CryptoJS.SHA256(
        login.senha + usuarioEncontrado.salt
      ).toString();

      // Comparar o hash da senha fornecida com o hash armazenado
      if (senhaHash === usuarioEncontrado.senhaHash) {
        // Senha correta, logar o usuário
        return of(usuarioEncontrado);
      }
    }

    // Usuário não encontrado ou senha incorreta
    return of(null);
  }
}
