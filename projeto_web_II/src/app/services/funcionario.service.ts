import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = 'http://localhost:8080/manutencao-equipamento-api';

  constructor(private http: HttpClient) { }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl + "/funcionario/registrar", usuario);
  }

  deletar(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + "/funcionario/deletar/" + id);
  }

  atualizar(usuario: any): Observable<any> {
    return this.http.put(this.apiUrl + "/funcionario/alterar/" + usuario.id, usuario);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl + "/funcionario");
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + "/funcionario/" + id);
  }

}
