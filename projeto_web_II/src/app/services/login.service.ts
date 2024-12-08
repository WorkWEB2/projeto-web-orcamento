import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario, Login } from '../shared/models';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

const LS_CHAVE: string = "usuarioLogado";

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private router:Router,private http: HttpClient, private tokenService: TokenService) { }

  private apiUrl = 'http://localhost:8080/api-manutencao-equipamento';

  logar(login: Login): Observable<any> {
    return this.http.post(this.apiUrl + "/auth", login);
  }

  saveToken(token: string) {
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  private usuarioSubject = new BehaviorSubject<Usuario>({
    nome: "",
    email: "",
    cpf: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
    numero: 0,
    celular: "",
    role: "",
  });

  private decodeJWT() {
    const token = this.tokenService.returnToken();
    const usuario = jwtDecode<Usuario>(token);
    this.usuarioSubject.next(usuario);
  }

  retornarUsuario() : Observable<Usuario> {
    return this.usuarioSubject.asObservable();
  }

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

    if (login.email === login.password) {
      if (login.email === "admin@admin.com") {
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
